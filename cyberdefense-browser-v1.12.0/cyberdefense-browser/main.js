const { app, BrowserWindow, session, ipcMain, net, shell, dialog, clipboard, nativeImage } = require('electron');
const path = require('path');
const fs = require('fs');

// Désactive la politique stricte d'autoplay de Chromium: certains lecteurs
// (YouTube notamment) déclenchent play() via JS plutôt que sur l'élément
// <video> lui-même, ce que Chromium peut rejeter selon le contexte de geste
// utilisateur détecté dans un <iframe> imbriqué — ce qui provoque une pause
// immédiate après un clic sur "lecture".
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

// Enhanced logging utility
function log(message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString();
  const icons = {
    'info': 'ℹ️ ',
    'success': '✅ ',
    'warn': '⚠️ ',
    'error': '❌ ',
    'debug': '🐛 ',
    'net': '🌐 ',
    'vpn': '🔒 ',
    'security': '🔍 '
  };
  const icon = icons[type] || icons['info'];
  console.log(`[${timestamp}] ${icon} ${message}`);
}

let trackerBlockingEnabled = true;
let vpnEnabled = false;
let torEnabled = false;
let fastVpnEnabled = false;
let adBlockerEnabled = true;
let dntEnabled = true;
let cookieBlockerEnabled = true;
let popupBlockerEnabled = true; // Nouveau: bloqueur de popups activé par défaut
let vpnCountry = 'France';
let vpnProxy = null;
let securityScanEnabled = true; // Nouveau: scanner de sécurité activé par défaut

// ===================== EXTENSIONS =====================
// Support des extensions Chrome "non empaquetées" (dossier avec manifest.json),
// chargées via l'API Electron réelle session.loadExtension(). Les content
// scripts et le CSS injecté fonctionnent ; les popups de barre d'outils ne
// sont pas rendus (interface personnalisée, pas de Chromium standard).
const EXTENSIONS_FILE = path.join(app.getPath('userData'), 'extensions.json');
const SETTINGS_FILE = path.join(app.getPath('userData'), 'settings.json');

function loadSettings() {
  try {
    if (!fs.existsSync(SETTINGS_FILE)) return {};
    return JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf-8'));
  } catch (e) {
    return {};
  }
}

function saveSettings(settings) {
  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf-8');
  } catch (e) {
    log(`❌ Impossible d'enregistrer les préférences: ${e.message}`, 'error');
  }
}

function getDownloadDir() {
  const settings = loadSettings();
  if (settings.downloadDir && fs.existsSync(settings.downloadDir)) return settings.downloadDir;
  return app.getPath('downloads');
}

function loadExtensionsConfig() {
  try {
    if (!fs.existsSync(EXTENSIONS_FILE)) return [];
    return JSON.parse(fs.readFileSync(EXTENSIONS_FILE, 'utf-8'));
  } catch (e) {
    return [];
  }
}

function saveExtensionsConfig(list) {
  try {
    fs.writeFileSync(EXTENSIONS_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (e) {
    log(`❌ Impossible d'enregistrer la config des extensions: ${e.message}`, 'error');
  }
}

async function loadStoredExtensions() {
  const config = loadExtensionsConfig();
  for (const entry of config) {
    if (!entry.enabled) continue;
    try {
      const ext = await session.defaultSession.loadExtension(entry.extPath, { allowFileAccess: true });
      entry.id = ext.id;
      entry.name = ext.name;
      entry.version = ext.version;
      entry.error = null;
      log(`🧩 Extension chargée: ${ext.name} (${ext.version})`, 'success');
    } catch (e) {
      entry.error = e.message;
      log(`❌ Échec du chargement de l'extension ${entry.extPath}: ${e.message}`, 'error');
    }
  }
  saveExtensionsConfig(config);
}

function safeHostname(url) {
  try {
    return new URL(url).hostname;
  } catch (e) {
    return url;
  }
}

function notifyBlocked(hostname, kind) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('cyber-blocked', { hostname, kind });
  }
}

// Liste de proxies par pays pour le mode VPN réel app-level.
// Ces serveurs de proxy peuvent être remplacés par des endpoints privés
// ou des services VPN/proxy plus fiables si besoin.
const countryProxyMap = {
  'France': 'http=51.158.123.35:8888;https=51.158.123.35:8888',
  'États-Unis': 'http=192.241.213.154:8080;https=192.241.213.154:8080',
  'Canada': 'http=192.241.151.133:3128;https=192.241.151.133:3128',
  'Allemagne': 'http=51.158.162.18:8811;https=51.158.162.18:8811',
  'Pays-Bas': 'http=51.158.111.35:8080;https=51.158.111.35:8080',
  'Japon': 'http=45.77.35.21:8080;https=45.77.35.21:8080',
  'Singapour': 'http=162.62.88.196:8080;https=162.62.88.196:8080',
  'Brésil': 'http=45.189.115.5:3128;https=45.189.115.5:3128'
};

// Proxies ultra-rapides pour le mode VPN Rapide
// Ces serveurs sont sélectionnés pour leur faible latence et haute disponibilité
const fastProxyList = [
  'http=185.82.99.181:9091;https=185.82.99.181:9091',      // Proxy fiable européen
  'http=51.15.242.202:8888;https=51.15.242.202:8888',     // OVH Cloud - France
  'http=163.172.33.137:3128;https=163.172.33.137:3128',   // Scaleway - Paris
  'http=51.158.68.68:8811;https=51.158.68.68:8811',       // Online.net - France
  'http=51.15.56.161:8080;https=51.15.56.161:8080',       // OVH - Europe
  'http=145.239.81.69:3128;https=145.239.81.69:3128',     // OVH - UK
  'http=51.15.227.220:3128;https=51.15.227.220:3128',     // OVH - Germany
  'http=163.172.146.119:3128;https=163.172.146.119:3128', // Scaleway - Amsterdam
  'http=104.248.63.15:30588; https=104.248.63.15:30588',
// Digitalocean - Haute disponibilité
'http=134.195.101.26:1080;https=134.195.101.26:1080',
// OVH • Europe rapide
' http=167.71.5.83:3128; https=167.71.5.83:3128',
// DigitalOcean NYC
 'http=206.189.36.198:8080; https=206.189.36.198:8080',
// Digitalocean Singapore
'http=178.128.84.31:3128;https=178.128.84.31:3128'
// Digitalocean London
];

let mainWindow;

function createWindow() {
  log('🚀 Création de la fenêtre principale...', 'info');
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1040,
    minHeight: 720,
    title: 'Cyberdéfense Browser',
    backgroundColor: '#050816',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webviewTag: false,
      sandbox: false,
      webSecurity: false,
      allowRunningInsecureContent: true,
      backgroundThrottling: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  log('✅ Fenêtre créée avec succès', 'success');
  mainWindow.show();
  mainWindow.removeMenu();

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (popupBlockerEnabled) {
      log(`🚫 Popup bloqué: ${url}`, 'warn');
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });

  // Gestionnaire de téléchargements réel : intercepte chaque téléchargement
  // déclenché depuis n'importe quel <iframe> de la fenêtre.
  mainWindow.webContents.session.on('will-download', (event, item, webContents) => {
    const downloadId = 'dl-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6);
    const suggestedName = item.getFilename();
    const savePath = path.join(getDownloadDir(), suggestedName);
    item.setSavePath(savePath);

    log(`⬇️ Téléchargement démarré: ${suggestedName}`, 'info');
    sendDownloadEvent({
      type: 'started',
      id: downloadId,
      filename: suggestedName,
      totalBytes: item.getTotalBytes(),
      savePath
    });

    item.on('updated', (_e, state) => {
      if (state === 'progressing' && !item.isPaused()) {
        sendDownloadEvent({
          type: 'progress',
          id: downloadId,
          receivedBytes: item.getReceivedBytes(),
          totalBytes: item.getTotalBytes()
        });
      }
    });

    item.once('done', (_e, state) => {
      if (state === 'completed') {
        log(`✅ Téléchargement terminé: ${suggestedName}`, 'success');
        sendDownloadEvent({ type: 'done', id: downloadId, state: 'completed', savePath });
      } else {
        log(`❌ Téléchargement échoué (${state}): ${suggestedName}`, 'error');
        sendDownloadEvent({ type: 'done', id: downloadId, state, savePath });
      }
    });
  });
}

function sendDownloadEvent(payload) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('cyber-download-event', payload);
  }
}




app.whenReady().then(() => {
  log('🎯 Application en cours de démarrage...', 'info');

  // Remplace le User-Agent par défaut d'Electron (qui contient "Electron/x.x.x"
  // et déclenche des CAPTCHA/blocages anti-bot sur de nombreux sites) par un
  // User-Agent Chrome standard, cohérent avec la version de Chromium embarquée.
  const chromeVersion = process.versions.chrome || '128.0.0.0';
  const realisticUA = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${chromeVersion} Safari/537.36`;
  app.userAgentFallback = realisticUA;
  session.defaultSession.setUserAgent(realisticUA);

  // Évite le bandeau natif Chromium (mal positionné/peu lisible dans une
  // fenêtre sans chrome standard) pour les demandes de permission des sites :
  // on les refuse par défaut, cohérent avec l'esprit "vie privée" de l'app.
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    const autoAllowed = ['clipboard-sanitized-write', 'fullscreen'];
    if (autoAllowed.includes(permission)) {
      callback(true);
    } else {
      log(`🔒 Permission "${permission}" refusée automatiquement`, 'security');
      callback(false);
    }
  });

  createWindow();
  loadStoredExtensions();
  log('✨ Cyberdéfense Browser démarré avec succès!', 'success');

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  session.defaultSession.webRequest.onBeforeRequest({ urls: ['*://*/*'] }, (details, callback) => {
    const trackerPatterns = [
      'google-analytics.com',
      'googletagmanager.com',
      'doubleclick.net',
      'facebook.net',
      'facebook.com/tr',
      'connect.facebook.net',
      'ads.yahoo.com',
      'ads.twitter.com',
      'analytics.twitter.com',
      'scorecardresearch.com',
      'quantserve.com',
      'hotjar.com',
      'mixpanel.com',
      'segment.io',
      'segment.com',
      'amplitude.com',
      'fullstory.com',
      'crazyegg.com',
      'mouseflow.com',
      'clarity.ms',
      'matomo.cloud',
      'newrelic.com',
      'sentry.io',
      'bugsnag.com'
    ];

    const adPatterns = [
      'google.com/ads/',
      'pagead',
      'adservice.google',
      'ad.doubleclick.net',
      'googlesyndication.com',
      'googleadservices.com',
      'amazon-adsystem.com',
      'adnxs.com',
      'adsystem.',
      'moatads.com',
      'criteo.com',
      'criteo.net',
      'outbrain.com',
      'taboola.com',
      'media.net',
      'rubiconproject.com',
      'pubmatic.com',
      'openx.net',
      'advertising.',
      'advertisement.',
      'ads.',
      '/ads/',
      '.ads-'
    ];

    if (trackerBlockingEnabled && trackerPatterns.some((pattern) => details.url.includes(pattern))) {
      const hostname = safeHostname(details.url);
      log(`🚫 Tracker bloqué: ${hostname}`, 'warn');
      notifyBlocked(hostname, 'tracker');
      return callback({ cancel: true });
    }

    if (adBlockerEnabled && adPatterns.some((pattern) => details.url.includes(pattern))) {
      const hostname = safeHostname(details.url);
      log(`🚫 Pub bloquée: ${hostname}`, 'warn');
      notifyBlocked(hostname, 'ad');
      return callback({ cancel: true });
    }

    // Le bloc de suppression des en-têtes Cookie ne fonctionne pas ici
    // (onBeforeRequest n'expose pas `requestHeaders`). La suppression
    // doit se faire dans `onBeforeSendHeaders` (enregistré plus bas).

    callback({});
  });

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const responseHeaders = details.responseHeaders;
    // Supprimer CSP et X-Frame-Options pour permettre le rendu des pages dans l'iframe
    delete responseHeaders['Content-Security-Policy'];
    delete responseHeaders['content-security-policy'];
    delete responseHeaders['X-Frame-Options'];
    delete responseHeaders['x-frame-options'];
    delete responseHeaders['X-Content-Type-Options'];
    delete responseHeaders['x-content-type-options'];
    if (dntEnabled) {
      responseHeaders['DNT'] = ['1'];
    }
    callback({ responseHeaders });
  });

    // Enregistrer un seul gestionnaire pour supprimer les en-têtes Cookie
    session.defaultSession.webRequest.onBeforeSendHeaders({ urls: ['*://*/*'] }, (details, callback) => {
      if (cookieBlockerEnabled && details.requestHeaders && details.requestHeaders.Cookie) {
        log(`🍪 Cookie bloqué`, 'debug');
        delete details.requestHeaders.Cookie;
      }
      callback({ cancel: false, requestHeaders: details.requestHeaders });
    });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('set-tracker-blocking', (event, enabled) => {
  trackerBlockingEnabled = enabled;
  log(`Bloqueur de trackers ${enabled ? '✅ activé' : '❌ désactivé'}`, enabled ? 'success' : 'info');
  return trackerBlockingEnabled;
});

// Teste si un proxy configuré répond réellement (au lieu de simplement
// accepter la config sans vérifier — c'était la cause de la "page blanche").
function testProxyReachable(timeoutMs = 6000) {
  return new Promise((resolve) => {
    try {
      const request = net.request({
        method: 'GET',
        url: 'https://www.gstatic.com/generate_204',
        session: session.defaultSession
      });
      let settled = false;
      const timer = setTimeout(() => {
        if (!settled) {
          settled = true;
          try { request.abort(); } catch (e) { /* ignore */ }
          resolve(false);
        }
      }, timeoutMs);

      request.on('response', (response) => {
        if (!settled) {
          settled = true;
          clearTimeout(timer);
          resolve(response.statusCode >= 200 && response.statusCode < 500);
        }
        response.on('data', () => {});
        response.on('end', () => {});
      });
      request.on('error', () => {
        if (!settled) {
          settled = true;
          clearTimeout(timer);
          resolve(false);
        }
      });
      request.end();
    } catch (e) {
      resolve(false);
    }
  });
}

async function applyNetworkProxy() {
  if (torEnabled) {
    try {
      await session.defaultSession.setProxy({
        mode: 'fixed_servers',
        proxyRules: 'socks5://127.0.0.1:9050'
      });
      const reachable = await testProxyReachable();
      if (!reachable) {
        await session.defaultSession.setProxy({ mode: 'direct' });
        return { success: false, message: 'Tor ne répond pas. Vérifiez que le service Tor (port 9050) tourne bien sur cette machine.' };
      }
      return { success: true };
    } catch (error) {
      await session.defaultSession.setProxy({ mode: 'direct' });
      return { success: false, message: `Erreur Tor: ${error.message}` };
    }
  }

  if (fastVpnEnabled) {
    // Essaie jusqu'à 3 serveurs de la liste avant d'abandonner, car ce sont
    // des proxys publics/communautaires dont la disponibilité varie.
    const candidates = [...fastProxyList].sort(() => 0.5 - Math.random()).slice(0, 3);
    for (const candidate of candidates) {
      try {
        await session.defaultSession.setProxy({ mode: 'fixed_servers', proxyRules: candidate.trim() });
        const reachable = await testProxyReachable(4000);
        if (reachable) return { success: true };
      } catch (error) { /* essaie le suivant */ }
    }
    await session.defaultSession.setProxy({ mode: 'direct' });
    return { success: false, message: 'Aucun serveur VPN Rapide disponible actuellement (proxys publics hors ligne). Réessayez plus tard ou utilisez un proxy manuel.' };
  }

  if (!vpnEnabled) {
    await session.defaultSession.setProxy({ mode: 'direct' });
    return { success: true };
  }

  const proxyRules = vpnProxy || countryProxyMap[vpnCountry];
  if (!proxyRules) {
    await session.defaultSession.setProxy({ mode: 'direct' });
    return { success: false, message: 'Aucun proxy configuré pour ce pays ou proxy manuel.' };
  }

  try {
    await session.defaultSession.setProxy({
      mode: 'fixed_servers',
      proxyRules
    });
    const reachable = await testProxyReachable();
    if (!reachable) {
      await session.defaultSession.setProxy({ mode: 'direct' });
      const isManual = !!vpnProxy;
      return {
        success: false,
        message: isManual
          ? 'Le proxy manuel indiqué ne répond pas. Vérifiez l\'adresse et le port.'
          : `Le serveur proxy pour ${vpnCountry} ne répond pas actuellement (proxy public hors ligne). Essayez un autre pays ou un proxy manuel.`
      };
    }
    return { success: true };
  } catch (error) {
    await session.defaultSession.setProxy({ mode: 'direct' });
    return { success: false, message: `Erreur proxy: ${error.message}` };
  }
}

// Fonction d'analyse de sécurité des sites web
async function analyzeWebsiteSecurity(url) {
  try {
    const urlObj = new URL(url);
    let score = 100;
    const issues = [];
    const strengths = [];

    // Analyse HTTPS
    if (urlObj.protocol === 'https:') {
      strengths.push('Connexion HTTPS sécurisée');
    } else {
      score -= 50;
      issues.push('Connexion non chiffrée (HTTP)');
    }

    // Vérification des headers de sécurité via une requête
    try {
      const response = await net.fetch(url, {
        method: 'HEAD',
        timeout: 5000
      });

      const headers = response.headers;

      // Content Security Policy
      if (headers.get('content-security-policy')) {
        strengths.push('Content Security Policy présente');
        score += 5;
      } else {
        issues.push('Absence de Content Security Policy');
        score -= 10;
      }

      // HSTS (HTTP Strict Transport Security)
      if (headers.get('strict-transport-security')) {
        strengths.push('HSTS activé');
        score += 10;
      } else {
        issues.push('HSTS non configuré');
        score -= 15;
      }

      // X-Frame-Options
      if (headers.get('x-frame-options')) {
        strengths.push('Protection contre le clickjacking');
        score += 5;
      } else {
        issues.push('Vulnérable au clickjacking');
        score -= 10;
      }

      // X-Content-Type-Options
      if (headers.get('x-content-type-options') === 'nosniff') {
        strengths.push('Protection MIME sniffing');
        score += 5;
      } else {
        issues.push('Vulnérable au MIME sniffing');
        score -= 5;
      }

      // Referrer Policy
      if (headers.get('referrer-policy')) {
        strengths.push('Politique de référent configurée');
        score += 5;
      } else {
        issues.push('Référent non contrôlé');
        score -= 5;
      }

    } catch (error) {
      issues.push('Impossible d\'analyser les headers de sécurité');
      score -= 20;
    }

    // Détection heuristique de phishing (remplace l'ancienne "simulation" qui
    // comparait à une liste de 2 domaines factices ne matchant jamais rien).
    const phishingCheck = analyzePhishingHeuristics(urlObj, url);
    if (phishingCheck.reasons.length > 0) {
      score -= phishingCheck.penalty;
      phishingCheck.reasons.forEach(r => issues.push(r));
    } else {
      strengths.push('Aucun indicateur de phishing détecté');
    }

    // Analyse du domaine
    const domainParts = urlObj.hostname.split('.');
    if (domainParts.length > 2 && domainParts[domainParts.length - 2].length <= 3) {
      // Potentiel domaine suspect (ex: site.co.uk est ok, mais site.xxx est suspect)
      if (['xxx', 'adult', 'porn', 'sex'].includes(domainParts[domainParts.length - 2])) {
        score -= 15;
        issues.push('Domaine potentiellement suspect');
      }
    }

    // Score final borné entre 0 et 100
    score = Math.max(0, Math.min(100, score));

    return {
      score,
      grade: getSecurityGrade(score),
      issues,
      strengths,
      url: urlObj.hostname
    };

  } catch (error) {
    return {
      score: 0,
      grade: 'F',
      issues: ['Erreur lors de l\'analyse'],
      strengths: [],
      url: 'unknown',
      error: error.message
    };
  }
}

// Heuristiques anti-phishing réelles : détecte les techniques courantes
// (typosquatting de marques connues, IDN homographe/punycode, IP littérale,
// identifiants dans l'URL, sous-domaines excessifs) plutôt qu'une liste
// statique de domaines qui ne matchera jamais rien de réel.
function analyzePhishingHeuristics(urlObj, fullUrl) {
  const reasons = [];
  let penalty = 0;
  const hostname = urlObj.hostname.toLowerCase();

  // Adresse IP littérale utilisée à la place d'un nom de domaine
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname)) {
    reasons.push('Adresse IP utilisée à la place d\'un nom de domaine (technique fréquente de phishing)');
    penalty += 20;
  }

  // Domaine internationalisé encodé en punycode (souvent utilisé pour imiter
  // visuellement un vrai domaine avec des caractères Unicode similaires)
  if (hostname.includes('xn--')) {
    reasons.push('Domaine internationalisé (punycode) — vérifiez qu\'il ne mime pas un site connu');
    penalty += 15;
  }

  // Identifiants intégrés dans l'URL avant un @ (ex: http://vrai-site.com@evil.com)
  if (/@/.test(fullUrl.split('#')[0].split('?')[0])) {
    reasons.push('URL contenant un "@" — technique utilisée pour masquer le vrai domaine de destination');
    penalty += 25;
  }

  // Nombre de sous-domaines excessif (fréquent dans les kits de phishing)
  const labelCount = hostname.split('.').length;
  if (labelCount > 4) {
    reasons.push('Nombre inhabituel de sous-domaines');
    penalty += 10;
  }

  // Nom de domaine anormalement long (souvent utilisé pour noyer un vrai nom de marque)
  if (hostname.length > 45) {
    reasons.push('Nom de domaine anormalement long');
    penalty += 10;
  }

  // Typosquatting : le hostname contient le nom d'une marque connue, mais
  // n'est PAS son vrai domaine (ex: "paypal-secure-login.com" au lieu de paypal.com)
  const knownBrands = {
    'paypal': ['paypal.com'],
    'google': ['google.com'],
    'facebook': ['facebook.com'],
    'apple': ['apple.com'],
    'microsoft': ['microsoft.com', 'live.com', 'outlook.com'],
    'amazon': ['amazon.com', 'amazon.fr'],
    'netflix': ['netflix.com'],
    'banque': [],
    'impots': ['impots.gouv.fr'],
    'ameli': ['ameli.fr'],
    'laposte': ['laposte.fr'],
    'orange': ['orange.fr'],
    'instagram': ['instagram.com'],
    'whatsapp': ['whatsapp.com'],
    'steam': ['steamcommunity.com', 'steampowered.com']
  };
  for (const [brand, legitDomains] of Object.entries(knownBrands)) {
    if (hostname.includes(brand) && !legitDomains.some(d => hostname === d || hostname.endsWith('.' + d))) {
      reasons.push(`Le domaine contient "${brand}" mais ne correspond à aucun domaine officiel connu — typosquatting possible`);
      penalty += 30;
      break;
    }
  }

  // Mots-clés d'hameçonnage combinés à un tiret (ex: "secure-login-verify.com")
  const suspiciousKeywords = ['secure', 'login', 'verify', 'account', 'update', 'confirm', 'signin'];
  const hyphenCount = (hostname.match(/-/g) || []).length;
  if (hyphenCount >= 2 && suspiciousKeywords.some(k => hostname.includes(k))) {
    reasons.push('Combinaison de mots-clés et tirets caractéristique des URL d\'hameçonnage');
    penalty += 15;
  }

  return { reasons, penalty: Math.min(penalty, 60) };
}

function getSecurityGrade(score) {
  if (score >= 90) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
}

ipcMain.handle('set-vpn-enabled', async (event, enabled) => {
  if (enabled && torEnabled) {
    torEnabled = false;
  }
  if (enabled && fastVpnEnabled) {
    fastVpnEnabled = false;
  }
  vpnEnabled = enabled;
  const result = await applyNetworkProxy();
  if (!result.success) {
    vpnEnabled = false;
    log(`❌ Erreur VPN: ${result.message}`, 'error');
  } else {
    log(`🔒 VPN ${enabled ? '✅ activé' : '❌ désactivé'} (${vpnCountry})`, enabled ? 'success' : 'info');
  }
  return { enabled: vpnEnabled, message: result.message || null };
});

ipcMain.handle('set-vpn-country', async (event, country) => {
  vpnCountry = country;
  vpnProxy = null;
  if (!vpnEnabled) {
    return { country: vpnCountry, enabled: false };
  }

  const result = await applyNetworkProxy();
  if (!result.success) {
    vpnEnabled = false;
  }
  return { country: vpnCountry, enabled: vpnEnabled, message: result.message || null };
});

ipcMain.handle('set-vpn-proxy', async (event, proxyValue) => {
  if (torEnabled) {
    torEnabled = false;
  }
  if (fastVpnEnabled) {
    fastVpnEnabled = false;
  }
  vpnProxy = proxyValue;
  vpnEnabled = true;
  const result = await applyNetworkProxy();
  if (!result.success) {
    vpnEnabled = false;
  }
  return { enabled: vpnEnabled, message: result.message || null };
});

ipcMain.handle('set-tor-enabled', async (event, enabled) => {
  torEnabled = enabled;
  if (torEnabled) {
    vpnEnabled = false;
    fastVpnEnabled = false;
    vpnProxy = null;
  }
  const result = await applyNetworkProxy();
  if (!result.success) {
    torEnabled = false;
    log(`❌ Erreur Tor: ${result.message}`, 'error');
  } else {
    log(`🧅 Tor ${enabled ? '✅ activé' : '❌ désactivé'}`, enabled ? 'success' : 'info');
  }
  return { enabled: torEnabled, message: result.message || null };
});

ipcMain.handle('set-fast-vpn-enabled', async (event, enabled) => {
  fastVpnEnabled = enabled;
  if (fastVpnEnabled) {
    vpnEnabled = false;
    torEnabled = false;
    vpnProxy = null;
  }
  const result = await applyNetworkProxy();
  if (!result.success) {
    fastVpnEnabled = false;
    log(`❌ Erreur VPN Rapide: ${result.message}`, 'error');
  } else {
    log(`⚡ VPN Rapide ${enabled ? '✅ activé' : '❌ désactivé'}`, enabled ? 'success' : 'info');
  }
  return { enabled: fastVpnEnabled, message: result.message || null };
});

ipcMain.handle('set-ad-blocker', (event, enabled) => {
  adBlockerEnabled = enabled;
  log(`Bloqueur d'annonces ${enabled ? '✅ activé' : '❌ désactivé'}`, enabled ? 'success' : 'info');
  return { enabled: adBlockerEnabled };
});

ipcMain.handle('set-dnt', (event, enabled) => {
  dntEnabled = enabled;
  log(`Do Not Track ${enabled ? '✅ activé' : '❌ désactivé'}`, enabled ? 'success' : 'info');
  return { enabled: dntEnabled };
});

ipcMain.handle('set-cookie-blocker', (event, enabled) => {
  cookieBlockerEnabled = enabled;
  log(`Bloqueur de cookies ${enabled ? '✅ activé' : '❌ désactivé'}`, enabled ? 'success' : 'info');
  return { enabled: cookieBlockerEnabled };
});

ipcMain.handle('set-popup-blocker', (event, enabled) => {
  popupBlockerEnabled = enabled;
  return { enabled: popupBlockerEnabled };
});

ipcMain.handle('clear-browsing-data', async (event) => {
  try {
    await session.defaultSession.clearCache();
    await session.defaultSession.clearStorageData({
      storages: ['cookies', 'localStorage', 'sessionStorage', 'serviceWorkers', 'indexeddb']
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Nouvelles fonctionnalités : Scanner de sécurité
ipcMain.handle('analyze-security', async (event, url) => {
  try {
    const securityAnalysis = await analyzeWebsiteSecurity(url);
    return securityAnalysis;
  } catch (error) {
    return { error: error.message, score: 0 };
  }
});

ipcMain.handle('set-security-scan', (event, enabled) => {
  securityScanEnabled = enabled;
  return { enabled: securityScanEnabled };
});

// Gestionnaire de cookies
ipcMain.handle('get-cookies', async (event, domainFilter) => {
  try {
    const cookies = domainFilter
      ? await session.defaultSession.cookies.get({ domain: domainFilter })
      : await session.defaultSession.cookies.get({});
    return { cookies: cookies.slice(0, 300) };
  } catch (error) {
    return { cookies: [], error: error.message };
  }
});

// Supprime un cookie précis (nom + domaine + chemin)
ipcMain.handle('remove-cookie', async (event, cookie) => {
  try {
    const protocol = cookie.secure ? 'https://' : 'http://';
    const url = `${protocol}${cookie.domain.replace(/^\./, '')}${cookie.path}`;
    await session.defaultSession.cookies.remove(url, cookie.name);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Supprime tous les cookies d'un domaine (ou tous si non précisé)
ipcMain.handle('remove-all-cookies', async (event, domainFilter) => {
  try {
    const cookies = domainFilter
      ? await session.defaultSession.cookies.get({ domain: domainFilter })
      : await session.defaultSession.cookies.get({});
    for (const cookie of cookies) {
      const protocol = cookie.secure ? 'https://' : 'http://';
      const url = `${protocol}${cookie.domain.replace(/^\./, '')}${cookie.path}`;
      await session.defaultSession.cookies.remove(url, cookie.name);
    }
    return { success: true, removed: cookies.length };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Gestionnaire de tâches pour Mode Lecture (simulation)
ipcMain.handle('enable-reader-mode', (event) => {
  return { success: true, message: 'Mode Lecture activé' };
});

// Gestionnaire de performance
ipcMain.handle('get-performance-stats', (event, stats) => {
  return {
    avgLoadTime: stats.avgLoadTime || 0,
    totalPages: stats.totalPages || 0,
    performanceGrade: stats.avgLoadTime < 1000 ? 'A' : stats.avgLoadTime < 3000 ? 'B' : 'C'
  };
});

// Ouvre le dossier système et sélectionne le fichier téléchargé
ipcMain.handle('show-download-in-folder', (event, savePath) => {
  try {
    shell.showItemInFolder(savePath);
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
});

// Renvoie le dossier de téléchargement actuellement configuré
ipcMain.handle('get-download-dir', () => {
  return getDownloadDir();
});

// Ouvre un vrai sélecteur de dossier pour changer la destination des téléchargements
ipcMain.handle('choose-download-dir', async () => {
  try {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
      title: 'Choisir le dossier de téléchargement',
      defaultPath: getDownloadDir(),
      properties: ['openDirectory', 'createDirectory']
    });
    if (canceled || !filePaths || filePaths.length === 0) return { success: false, canceled: true };
    const settings = loadSettings();
    settings.downloadDir = filePaths[0];
    saveSettings(settings);
    log(`📁 Dossier de téléchargement changé: ${filePaths[0]}`, 'success');
    return { success: true, downloadDir: filePaths[0] };
  } catch (e) {
    return { success: false, error: e.message };
  }
});

// Export réel des favoris : ouvre un vrai sélecteur "Enregistrer sous" et écrit un fichier JSON
ipcMain.handle('export-favorites', async (event, favoritesJson) => {
  try {
    const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
      title: 'Exporter les favoris',
      defaultPath: path.join(app.getPath('documents'), 'favoris-cyberdefense.json'),
      filters: [{ name: 'JSON', extensions: ['json'] }]
    });
    if (canceled || !filePath) return { success: false, canceled: true };
    fs.writeFileSync(filePath, favoritesJson, 'utf-8');
    log(`⭐ Favoris exportés vers ${filePath}`, 'success');
    return { success: true, filePath };
  } catch (e) {
    return { success: false, error: e.message };
  }
});

// Import réel des favoris : ouvre un vrai sélecteur "Ouvrir" et lit le fichier choisi.
// Accepte le JSON de l'app ET le format HTML "Netscape Bookmark" standard
// (celui que produisent Chrome/Firefox/Edge à l'export des favoris).
ipcMain.handle('import-favorites', async (event) => {
  try {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
      title: 'Importer des favoris',
      properties: ['openFile'],
      filters: [
        { name: 'Favoris (JSON ou HTML)', extensions: ['json', 'html', 'htm'] }
      ]
    });
    if (canceled || !filePaths || filePaths.length === 0) return { success: false, canceled: true };

    const filePath = filePaths[0];
    const content = fs.readFileSync(filePath, 'utf-8');
    const isHtml = /\.html?$/i.test(filePath) || /<!DOCTYPE NETSCAPE-Bookmark-file-1>/i.test(content) || /<a\s+href/i.test(content);

    let data;
    if (isHtml) {
      // Extrait chaque lien <A HREF="url" ...>Titre</A> du fichier de favoris HTML standard
      data = [];
      const linkRegex = /<A\s+[^>]*HREF="([^"]+)"[^>]*>([^<]*)<\/A>/gi;
      let match;
      while ((match = linkRegex.exec(content)) !== null) {
        const url = match[1].trim();
        const title = match[2].trim();
        if (url && /^https?:\/\//i.test(url)) {
          data.push({ url, title: title || url });
        }
      }
    } else {
      data = JSON.parse(content);
    }

    log(`⭐ Favoris importés depuis ${filePath} (${isHtml ? 'HTML' : 'JSON'}, ${Array.isArray(data) ? data.length : 0} entrées)`, 'success');
    return { success: true, data };
  } catch (e) {
    return { success: false, error: e.message };
  }
});

// Capture d'écran réelle de la fenêtre active (fonctionne même avec du
// contenu cross-origin dans les iframes, car la capture se fait au niveau
// du compositeur, pas du DOM).
ipcMain.handle('capture-screenshot', async (event) => {
  try {
    if (!mainWindow || mainWindow.isDestroyed()) {
      return { success: false, error: 'Fenêtre indisponible' };
    }
    const image = await mainWindow.webContents.capturePage();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `cyberdefense-capture-${timestamp}.png`;
    const savePath = path.join(app.getPath('pictures'), filename);
    fs.writeFileSync(savePath, image.toPNG());
    clipboard.writeImage(image); // copie aussi l'image dans le presse-papiers (Ctrl+V direct)
    log(`📸 Capture d'écran enregistrée et copiée dans le presse-papiers: ${savePath}`, 'success');
    return { success: true, filename, savePath };
  } catch (e) {
    log(`❌ Échec de la capture d'écran: ${e.message}`, 'error');
    return { success: false, error: e.message };
  }
});

// ===== Extensions (dossier non empaqueté, comme le "mode développeur" de Chrome) =====

// Ouvre un sélecteur de dossier et charge une extension via l'API réelle Electron
ipcMain.handle('load-extension', async (event) => {
  try {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
      title: 'Sélectionner le dossier d\'une extension (contenant manifest.json)',
      properties: ['openDirectory']
    });
    if (canceled || !filePaths || filePaths.length === 0) return { success: false, canceled: true };
    const extPath = filePaths[0];

    if (!fs.existsSync(path.join(extPath, 'manifest.json'))) {
      return { success: false, error: 'Aucun manifest.json trouvé dans ce dossier' };
    }

    const ext = await session.defaultSession.loadExtension(extPath, { allowFileAccess: true });

    const config = loadExtensionsConfig();
    const existing = config.find(e => e.extPath === extPath);
    if (existing) {
      existing.id = ext.id;
      existing.name = ext.name;
      existing.version = ext.version;
      existing.enabled = true;
      existing.error = null;
    } else {
      config.push({ extPath, id: ext.id, name: ext.name, version: ext.version, enabled: true, error: null });
    }
    saveExtensionsConfig(config);

    log(`🧩 Extension installée: ${ext.name} (${ext.version})`, 'success');
    return { success: true, extension: { id: ext.id, name: ext.name, version: ext.version } };
  } catch (e) {
    log(`❌ Échec du chargement de l'extension: ${e.message}`, 'error');
    return { success: false, error: e.message };
  }
});

// Renvoie la liste des extensions connues (chargées ou désactivées)
ipcMain.handle('get-extensions', async (event) => {
  const config = loadExtensionsConfig();
  return config.map(e => ({
    id: e.id,
    name: e.name || e.extPath,
    version: e.version || '?',
    enabled: !!e.enabled,
    error: e.error || null
  }));
});

// Active / désactive une extension déjà installée
ipcMain.handle('toggle-extension', async (event, extId, enable) => {
  const config = loadExtensionsConfig();
  const entry = config.find(e => e.id === extId);
  if (!entry) return { success: false, error: 'Extension introuvable' };

  try {
    if (enable) {
      const ext = await session.defaultSession.loadExtension(entry.extPath, { allowFileAccess: true });
      entry.id = ext.id;
      entry.name = ext.name;
      entry.version = ext.version;
      entry.error = null;
    } else {
      try { session.defaultSession.removeExtension(extId); } catch (e) { /* déjà déchargée */ }
    }
    entry.enabled = enable;
    saveExtensionsConfig(config);
    log(`🧩 Extension ${entry.name} ${enable ? 'activée' : 'désactivée'}`, 'info');
    return { success: true };
  } catch (e) {
    entry.error = e.message;
    saveExtensionsConfig(config);
    return { success: false, error: e.message };
  }
});

// Supprime définitivement une extension de la liste
ipcMain.handle('remove-extension', async (event, extId) => {
  const config = loadExtensionsConfig();
  const entry = config.find(e => e.id === extId);
  if (!entry) return { success: false, error: 'Extension introuvable' };

  try { session.defaultSession.removeExtension(extId); } catch (e) { /* déjà déchargée */ }
  const updated = config.filter(e => e.id !== extId);
  saveExtensionsConfig(updated);
  log(`🗑️ Extension supprimée: ${entry.name}`, 'info');
  return { success: true };
});

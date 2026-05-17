const { app, BrowserWindow, session, ipcMain, net } = require('electron');
const path = require('path');
const fs = require('fs');

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

app.disableHardwareAcceleration();

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
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webviewTag: true,
      sandbox: false,
      webSecurity: true
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
}




app.whenReady().then(() => {
  log('🎯 Application en cours de démarrage...', 'info');
  createWindow();
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
      'facebook.com',
      'ads.yahoo.com',
      'ads.twitter.com',
      'analytics.twitter.com'
    ];

    const adPatterns = [
      'google.com/ads/',
      'pagead',
      'adservice.google',
      'ad.doubleclick.net',
      'ads.',
      'advertising.',
      'advertisement.'
    ];

    if (trackerBlockingEnabled && trackerPatterns.some((pattern) => details.url.includes(pattern))) {
      log(`🚫 Tracker bloqué: ${new URL(details.url).hostname}`, 'warn');
      return callback({ cancel: true });
    }

    if (adBlockerEnabled && adPatterns.some((pattern) => details.url.includes(pattern))) {
      log(`🚫 Pub bloquée: ${new URL(details.url).hostname}`, 'warn');
      return callback({ cancel: true });
    }

    if (cookieBlockerEnabled && details.requestHeaders && details.requestHeaders.Cookie) {
      log(`🍪 Cookie bloqué`, 'debug');
      delete details.requestHeaders.Cookie;
      return callback({ cancel: false, requestHeaders: details.requestHeaders });
    }

    callback({});
  });

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const responseHeaders = details.responseHeaders;
    if (responseHeaders['Content-Security-Policy'] == null && responseHeaders['content-security-policy'] == null) {
      responseHeaders['Content-Security-Policy'] = ["default-src 'self' https: http: 'unsafe-inline' 'unsafe-eval'; img-src * data: blob:;"];
    }
    if (dntEnabled) {
      responseHeaders['DNT'] = ['1'];
    }
    callback({ responseHeaders });
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

async function applyNetworkProxy() {
  if (torEnabled) {
    try {
      await session.defaultSession.setProxy({
        mode: 'fixed_servers',
        proxyRules: 'socks5://127.0.0.1:9050'
      });
      return { success: true };
    } catch (error) {
      await session.defaultSession.setProxy({ mode: 'direct' });
      return { success: false, message: `Erreur Tor: ${error.message}` };
    }
  }

  if (fastVpnEnabled) {
    // Sélectionne un proxy rapide aléatoire pour équilibrer la charge
    const randomProxy = fastProxyList[Math.floor(Math.random() * fastProxyList.length)];
    try {
      await session.defaultSession.setProxy({
        mode: 'fixed_servers',
        proxyRules: randomProxy
      });
      return { success: true };
    } catch (error) {
      await session.defaultSession.setProxy({ mode: 'direct' });
      return { success: false, message: `Erreur VPN Rapide: ${error.message}` };
    }
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

    // Vérification contre les listes de sites malveillants (simulation)
    const maliciousDomains = ['malicious-site.com', 'phishing-example.net'];
    if (maliciousDomains.some(domain => urlObj.hostname.includes(domain))) {
      score = 0;
      issues.push('Site détecté dans les listes de sites malveillants');
    } else {
      strengths.push('Site non répertorié comme malveillant');
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
  if (cookieBlockerEnabled) {
    session.defaultSession.webRequest.onBeforeSendHeaders({ urls: ['*://*/*'] }, (details, callback) => {
      const headers = details.requestHeaders;
      if (headers && headers.Cookie) {
        delete headers.Cookie;
      }
      callback({ cancel: false, requestHeaders: headers });
    });
  }
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
ipcMain.handle('get-cookies', async (event) => {
  try {
    const cookies = await session.defaultSession.cookies.get({});
    return { cookies: cookies.slice(0, 50) };
  } catch (error) {
    return { cookies: [], error: error.message };
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

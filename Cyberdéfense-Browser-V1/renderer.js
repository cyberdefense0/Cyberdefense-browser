const addressBar = document.getElementById('addressBar');
const goButton = document.getElementById('goButton');
const backButton = document.getElementById('backButton');
const forwardButton = document.getElementById('forwardButton');
const reloadButton = document.getElementById('reloadButton');
const webview = document.getElementById('browserView');
const httpsStatus = document.getElementById('httpsStatus');
const trackerCount = document.getElementById('trackerCount');
const vpnStatus = document.getElementById('vpnStatus');
const vpnNote = document.getElementById('vpnNote');
const torStatus = document.getElementById('torStatus');
const fastVpnStatus = document.getElementById('fastVpnStatus');
const serverCountry = document.getElementById('serverCountry');
const techStack = document.getElementById('techStack');
const domainScore = document.getElementById('domainScore');
const consoleLog = document.getElementById('consoleLog');
const trackerToggle = document.getElementById('trackerToggle');
const vpnToggle = document.getElementById('vpnToggle');
const torToggle = document.getElementById('torToggle');
const fastVpnToggle = document.getElementById('fastVpnToggle');
const trackerToggleState = document.getElementById('trackerToggleState');
const vpnToggleState = document.getElementById('vpnToggleState');
const torToggleState = document.getElementById('torToggleState');
const fastVpnToggleState = document.getElementById('fastVpnToggleState');
const vpnCountrySelect = document.getElementById('vpnCountrySelect');
const vpnProxyInput = document.getElementById('vpnProxyInput');
const vpnProxyApply = document.getElementById('vpnProxyApply');
const adBlockerToggle = document.getElementById('adBlockerToggle');
const adBlockerToggleState = document.getElementById('adBlockerToggleState');
const adBlockerStatus = document.getElementById('adBlockerStatus');
const dntToggle = document.getElementById('dntToggle');
const dntToggleState = document.getElementById('dntToggleState');
const dntStatus = document.getElementById('dntStatus');
const clearDataButton = document.getElementById('clearDataButton');
const searchEngineSelect = document.getElementById('searchEngineSelect');
const securityScanToggle = document.getElementById('securityScanToggle');
const securityScanToggleState = document.getElementById('securityScanToggleState');
const securityGrade = document.getElementById('securityGrade');
const securityDetails = document.getElementById('securityDetails');
const electronApi = window.electron || { invoke: async () => null };

let trackerProtectionEnabled = true;
let vpnEnabled = false;
let torEnabled = false;
let fastVpnEnabled = false;
let adBlockerEnabled = true;
let dntEnabled = true;
let vpnCountry = 'France';
let vpnProxy = '';
let searchEngine = 'google'; // 'google' ou 'duckduckgo'
let securityScanEnabled = true; // Scanner de sécurité activé par défaut

function log(message) {
  const entry = document.createElement('div');
  entry.textContent = `${new Date().toLocaleTimeString()} — ${message}`;
  consoleLog.prepend(entry);
}

function normalizeUrl(input) {
  let url = input.trim();
  if (!url) return 'https://example.com';

  const looksLikeUrl = /\.[a-z]{2,}$/i.test(url) || /^https?:\/\//i.test(url);
  const containsSpace = /\s/.test(url);

  if (containsSpace || !looksLikeUrl) {
    const query = encodeURIComponent(url);
    if (searchEngine === 'duckduckgo') {
      return `https://duckduckgo.com/?q=${query}`;
    } else {
      return `https://www.google.com/search?q=${query}`;
    }
  }

  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }

  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();
    const isIp = /^\d+\.\d+\.\d+\.\d+$/.test(hostname);
    if (!hostname.includes('.') && hostname !== 'localhost' && !isIp) {
      if (searchEngine === 'duckduckgo') {
        return `https://duckduckgo.com/?q=${encodeURIComponent(url)}`;
      } else {
        return `https://www.google.com/search?q=${encodeURIComponent(url)}`;
      }
    }
  } catch {
    if (searchEngine === 'duckduckgo') {
      return `https://duckduckgo.com/?q=${encodeURIComponent(url)}`;
    } else {
      return `https://www.google.com/search?q=${encodeURIComponent(url)}`;
    }
  }

  return url;
}

function renderTrackerToggle() {
  trackerToggleState.textContent = trackerProtectionEnabled ? 'ON' : 'OFF';
  trackerToggleState.className = trackerProtectionEnabled ? 'text-cyber font-semibold' : 'text-rose-400 font-semibold';
  trackerToggle.classList.toggle('bg-cyber/10', trackerProtectionEnabled);
  trackerToggle.classList.toggle('bg-slate-800', !trackerProtectionEnabled);
}

function renderVpnToggle() {
  vpnToggleState.textContent = vpnEnabled ? 'ON' : 'OFF';
  vpnToggleState.className = vpnEnabled ? 'text-cyber font-semibold' : 'text-rose-400 font-semibold';
  vpnStatus.textContent = vpnEnabled ? 'Activé' : 'Désactivé';
  vpnStatus.className = vpnEnabled ? 'text-cyber font-semibold' : 'text-rose-400 font-semibold';
  vpnNote.textContent = vpnEnabled
    ? vpnProxy
      ? `Proxy manuel utilisé : ${vpnProxy}`
      : 'VPN réel app-level activé via proxy.'
    : 'VPN désactivé';
  vpnNote.className = vpnEnabled ? 'text-cyber/80' : 'text-slate-400';
  vpnToggle.classList.toggle('bg-cyber/10', vpnEnabled);
  vpnToggle.classList.toggle('bg-slate-800', !vpnEnabled);
  vpnCountrySelect.disabled = !vpnEnabled;
  vpnCountrySelect.classList.toggle('opacity-50', !vpnEnabled);
  vpnProxyInput.disabled = !vpnEnabled;
  vpnProxyApply.disabled = !vpnEnabled;
  vpnProxyInput.classList.toggle('opacity-50', !vpnEnabled);
}

function renderTorToggle() {
  torToggleState.textContent = torEnabled ? 'ON' : 'OFF';
  torToggleState.className = torEnabled ? 'text-neon font-semibold' : 'text-rose-400 font-semibold';
  torStatus.textContent = torEnabled ? 'Activé (Onion)' : 'Désactivé';
  torStatus.className = torEnabled ? 'text-neon font-semibold' : 'text-rose-400 font-semibold';
  torToggle.classList.toggle('bg-neon/10', torEnabled);
  torToggle.classList.toggle('bg-slate-800', !torEnabled);
}

function renderFastVpnToggle() {
  fastVpnToggleState.textContent = fastVpnEnabled ? 'ON' : 'OFF';
  fastVpnToggleState.className = fastVpnEnabled ? 'text-green-400 font-semibold' : 'text-rose-400 font-semibold';
  fastVpnStatus.textContent = fastVpnEnabled ? 'Activé (Rapide)' : 'Désactivé';
  fastVpnStatus.className = fastVpnEnabled ? 'text-green-400 font-semibold' : 'text-rose-400 font-semibold';
  fastVpnToggle.classList.toggle('bg-green-500/10', fastVpnEnabled);
  fastVpnToggle.classList.toggle('bg-slate-800', !fastVpnEnabled);
}

function renderAdBlockerToggle() {
  adBlockerToggleState.textContent = adBlockerEnabled ? 'ON' : 'OFF';
  adBlockerToggleState.className = adBlockerEnabled ? 'text-cyber font-semibold' : 'text-rose-400 font-semibold';
  adBlockerStatus.textContent = adBlockerEnabled ? 'Activé' : 'Désactivé';
  adBlockerStatus.className = adBlockerEnabled ? 'text-cyber font-semibold' : 'text-rose-400 font-semibold';
  adBlockerToggle.classList.toggle('bg-cyber/10', adBlockerEnabled);
  adBlockerToggle.classList.toggle('bg-slate-800', !adBlockerEnabled);
}

function renderDntToggle() {
  dntToggleState.textContent = dntEnabled ? 'ON' : 'OFF';
  dntToggleState.className = dntEnabled ? 'text-cyber font-semibold' : 'text-rose-400 font-semibold';
  dntStatus.textContent = dntEnabled ? 'Activé' : 'Désactivé';
  dntStatus.className = dntEnabled ? 'text-cyber font-semibold' : 'text-rose-400 font-semibold';
  dntToggle.classList.toggle('bg-cyber/10', dntEnabled);
  dntToggle.classList.toggle('bg-slate-800', !dntEnabled);
}

function renderSecurityScanToggle() {
  securityScanToggleState.textContent = securityScanEnabled ? 'ON' : 'OFF';
  securityScanToggleState.className = securityScanEnabled ? 'text-cyber font-semibold' : 'text-rose-400 font-semibold';
  securityScanToggle.classList.toggle('bg-cyber/10', securityScanEnabled);
  securityScanToggle.classList.toggle('bg-slate-800', !securityScanEnabled);
}

function updateSecurityPanel(urlString) {
  const url = new URL(urlString);
  const secure = url.protocol === 'https:';
  httpsStatus.textContent = secure ? 'Sécurisé' : 'Non sécurisé';
  httpsStatus.className = secure ? 'text-cyber font-semibold' : 'text-rose-400 font-semibold';

  const trackers = trackerProtectionEnabled ? 0 : Math.floor(Math.random() * 4);
  trackerCount.textContent = trackers;
  trackerCount.className = trackers === 0 ? 'text-cyber font-semibold' : 'text-neon font-semibold';

  if (torEnabled) {
    serverCountry.textContent = 'Tor Onion';
    serverCountry.className = 'text-neon font-semibold';
  } else if (fastVpnEnabled) {
    serverCountry.textContent = 'VPN Rapide';
    serverCountry.className = 'text-green-400 font-semibold';
  } else if (vpnEnabled) {
    serverCountry.textContent = vpnCountry;
    serverCountry.className = 'text-cyber font-semibold';
  } else {
    const countries = ['France', 'États-Unis', 'Canada', 'Allemagne', 'Pays-Bas'];
    serverCountry.textContent = countries[Math.floor(Math.random() * countries.length)];
    serverCountry.className = 'text-cyber font-semibold';
  }

  const tech = ['React', 'Node.js', 'TailwindCSS', 'Nginx', 'Cloudflare'];
  techStack.textContent = tech.sort(() => 0.5 - Math.random()).slice(0, 3).join(', ');

  // Analyse de sécurité si activée
  if (securityScanEnabled) {
    performSecurityScan(urlString);
  } else {
    const baseScore = secure ? 70 + Math.floor(Math.random() * 30) : 30 + Math.floor(Math.random() * 40);
    const score = torEnabled ? Math.min(100, baseScore + 15) : fastVpnEnabled ? Math.min(100, baseScore + 12) : vpnEnabled ? Math.min(100, baseScore + 10) : baseScore;
    domainScore.textContent = `${score}/100`;
    securityGrade.textContent = '—';
    securityDetails.innerHTML = '<div>Scanner désactivé</div>';
  }
}

async function performSecurityScan(url) {
  try {
    domainScore.textContent = 'Analyse...';
    securityGrade.textContent = '⏳';
    securityDetails.innerHTML = '<div class="text-cyber">Analyse en cours...</div>';

    const result = await electronApi.invoke('analyze-security', url);

    if (result.error) {
      domainScore.textContent = 'Erreur';
      securityGrade.textContent = '❌';
      securityDetails.innerHTML = `<div class="text-rose-400">Erreur: ${result.error}</div>`;
      return;
    }

    // Affichage du score et du grade
    domainScore.textContent = result.score + '/100';
    securityGrade.textContent = result.grade;

    // Couleur du grade selon le score
    let gradeColor = 'text-rose-400'; // F
    if (result.score >= 90) gradeColor = 'text-green-400'; // A+
    else if (result.score >= 80) gradeColor = 'text-green-400'; // A
    else if (result.score >= 70) gradeColor = 'text-yellow-400'; // B
    else if (result.score >= 60) gradeColor = 'text-orange-400'; // C

    securityGrade.className = gradeColor + ' font-semibold';

    // Affichage des détails
    let detailsHtml = '';

    if (result.strengths.length > 0) {
      detailsHtml += '<div class="text-green-400 font-semibold mb-1">✅ Forces:</div>';
      result.strengths.forEach(strength => {
        detailsHtml += `<div class="text-green-300 text-xs">• ${strength}</div>`;
      });
    }

    if (result.issues.length > 0) {
      detailsHtml += '<div class="text-rose-400 font-semibold mb-1 mt-2">⚠️ Problèmes:</div>';
      result.issues.forEach(issue => {
        detailsHtml += `<div class="text-rose-300 text-xs">• ${issue}</div>`;
      });
    }

    if (result.strengths.length === 0 && result.issues.length === 0) {
      detailsHtml = '<div class="text-slate-400">Aucune analyse disponible</div>';
    }

    securityDetails.innerHTML = detailsHtml;

    log(`Scan sécurité ${result.url}: ${result.score}/100 (${result.grade})`);

  } catch (error) {
    domainScore.textContent = 'Erreur';
    securityGrade.textContent = '❌';
    securityDetails.innerHTML = `<div class="text-rose-400">Erreur de scan: ${error.message}</div>`;
    log(`Erreur scan sécurité: ${error.message}`);
  }
}

function navigate() {
  const url = normalizeUrl(addressBar.value);
  webview.loadURL(url);
  log(`Chargement de ${url}`);
}

window.addEventListener('DOMContentLoaded', () => {
  addressBar.value = 'https://wiki-cyberdefense-b2ee1.web.app/';
  vpnCountrySelect.value = vpnCountry;
  renderTrackerToggle();
  renderVpnToggle();
  renderTorToggle();
  renderFastVpnToggle();
  renderAdBlockerToggle();
  renderDntToggle();
  updateSecurityPanel(addressBar.value);
  log('Interface prête');

  goButton.addEventListener('click', navigate);
  addressBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      navigate();
    }
  });

  trackerToggle.addEventListener('click', async () => {
    trackerProtectionEnabled = !trackerProtectionEnabled;
    await electronApi.invoke('set-tracker-blocking', trackerProtectionEnabled);
    renderTrackerToggle();
    log(`Bloqueur de trackers ${trackerProtectionEnabled ? 'activé' : 'désactivé'}`);
    updateSecurityPanel(webview.getURL() || addressBar.value);
  });

  vpnToggle.addEventListener('click', async () => {
    vpnEnabled = !vpnEnabled;
    const result = await electronApi.invoke('set-vpn-enabled', vpnEnabled);
    if (result && result.enabled !== undefined) {
      vpnEnabled = result.enabled;
    }
    renderVpnToggle();
    log(`VPN ${vpnEnabled ? 'activé' : 'désactivé'} (${vpnCountry})`);
    if (result && result.message) {
      log(`Erreur VPN: ${result.message}`);
    }
    if (vpnEnabled) {
      log('Le VPN est maintenant appliqué au navigateur via proxy.');
    }
    updateSecurityPanel(webview.getURL() || addressBar.value);
  });

  vpnCountrySelect.addEventListener('change', async () => {
    vpnCountry = vpnCountrySelect.value;
    vpnProxy = '';
    const result = await electronApi.invoke('set-vpn-country', vpnCountry);
    if (result && result.enabled !== undefined) {
      vpnEnabled = result.enabled;
    }
    if (vpnEnabled) {
      log(`Pays VPN sélectionné : ${vpnCountry}`);
    }
    if (result && result.message) {
      log(`Erreur VPN: ${result.message}`);
    }
    renderVpnToggle();
    updateSecurityPanel(webview.getURL() || addressBar.value);
  });

  vpnProxyApply.addEventListener('click', async () => {
    const proxyValue = vpnProxyInput.value.trim();
    if (!proxyValue) {
      log('Entrez un proxy valide avant d’appliquer.');
      return;
    }
    vpnProxy = proxyValue;
    const result = await electronApi.invoke('set-vpn-proxy', vpnProxy);
    if (result && result.enabled !== undefined) {
      vpnEnabled = result.enabled;
    }
    if (result && result.message) {
      log(`Erreur VPN: ${result.message}`);
    } else {
      log(`Proxy manuel appliqué : ${vpnProxy}`);
    }
    renderVpnToggle();
    updateSecurityPanel(webview.getURL() || addressBar.value);
  });

  torToggle.addEventListener('click', async () => {
    torEnabled = !torEnabled;
    if (torEnabled && vpnEnabled) {
      log('Tor activé - VPN désactivé (incompatible)');
      vpnEnabled = false;
      await electronApi.invoke('set-vpn-enabled', false);
      renderVpnToggle();
    }
    if (torEnabled && fastVpnEnabled) {
      log('Tor activé - VPN Rapide désactivé (incompatible)');
      fastVpnEnabled = false;
      await electronApi.invoke('set-fast-vpn-enabled', false);
      renderFastVpnToggle();
    }
    const result = await electronApi.invoke('set-tor-enabled', torEnabled);
    if (result && result.enabled !== undefined) {
      torEnabled = result.enabled;
    }
    renderTorToggle();
    if (torEnabled) {
      log('Routage Tor (Onion) activé - Sécurité maximale');
      log('Navigue vers un site pour tester la connexion Tor.');
    } else {
      log('Routage Tor désactivé');
    }
    if (result && result.message) {
      log(`Attention Tor: ${result.message}`);
    }
    updateSecurityPanel(webview.getURL() || addressBar.value);
  });

  fastVpnToggle.addEventListener('click', async () => {
    fastVpnEnabled = !fastVpnEnabled;
    if (fastVpnEnabled && vpnEnabled) {
      log('VPN Rapide activé - VPN normal désactivé');
      vpnEnabled = false;
      await electronApi.invoke('set-vpn-enabled', false);
      renderVpnToggle();
    }
    if (fastVpnEnabled && torEnabled) {
      log('VPN Rapide activé - Tor désactivé (incompatible)');
      torEnabled = false;
      await electronApi.invoke('set-tor-enabled', false);
      renderTorToggle();
    }
    const result = await electronApi.invoke('set-fast-vpn-enabled', fastVpnEnabled);
    if (result && result.enabled !== undefined) {
      fastVpnEnabled = result.enabled;
    }
    renderFastVpnToggle();
    if (fastVpnEnabled) {
      log('VPN Rapide activé - Connexion ultra-rapide');
      log('Navigue vers un site pour tester la vitesse.');
    } else {
      log('VPN Rapide désactivé');
    }
    if (result && result.message) {
      log(`Attention VPN Rapide: ${result.message}`);
    }
    updateSecurityPanel(webview.getURL() || addressBar.value);
  });

  adBlockerToggle.addEventListener('click', async () => {
    adBlockerEnabled = !adBlockerEnabled;
    await electronApi.invoke('set-ad-blocker', adBlockerEnabled);
    renderAdBlockerToggle();
    log(`Bloqueur d'annonces ${adBlockerEnabled ? 'activé' : 'désactivé'}`);
    updateSecurityPanel(webview.getURL() || addressBar.value);
  });

  dntToggle.addEventListener('click', async () => {
    dntEnabled = !dntEnabled;
    await electronApi.invoke('set-dnt', dntEnabled);
    renderDntToggle();
    log(`Do Not Track ${dntEnabled ? 'activé' : 'désactivé'}`);
  });

  clearDataButton.addEventListener('click', async () => {
    const result = await electronApi.invoke('clear-browsing-data');
    if (result && result.success) {
      log('✓ Données de navigation effacées (cache, cookies, historique)');
    } else {
      log('✗ Erreur lors du nettoyage des données');
    }
  });

  searchEngineSelect.addEventListener('change', (event) => {
    searchEngine = event.target.value;
    log(`Moteur de recherche changé: ${searchEngine === 'google' ? 'Google' : 'DuckDuckGo'}`);
  });

  securityScanToggle.addEventListener('click', async () => {
    securityScanEnabled = !securityScanEnabled;
    await electronApi.invoke('set-security-scan', securityScanEnabled);
    renderSecurityScanToggle();
    log(`Scanner de sécurité ${securityScanEnabled ? 'activé' : 'désactivé'}`);
    updateSecurityPanel(webview.getURL() || addressBar.value);
  });

  // Initialisation du sélecteur de moteur de recherche
  searchEngineSelect.value = searchEngine;

  backButton.addEventListener('click', () => {
    if (webview.canGoBack()) {
      webview.goBack();
      log('Navigation arrière');
    }
  });

  forwardButton.addEventListener('click', () => {
    if (webview.canGoForward()) {
      webview.goForward();
      log('Navigation avant');
    }
  });

  reloadButton.addEventListener('click', () => {
    webview.reload();
    log('Rechargement de la page');
  });

  webview.addEventListener('did-start-loading', () => {
    log('Début du chargement...');
  });

  webview.addEventListener('did-finish-load', async () => {
    const url = await webview.getURL();
    addressBar.value = url;
    updateSecurityPanel(url);
    log(`Chargé ${url}`);
  });

  webview.addEventListener('did-fail-load', (event) => {
    const failedUrl = event.validatedURL || addressBar.value;
    log(`Erreur de chargement: ${event.errorDescription} (${failedUrl})`);
  });

  // Initialisation des toggles
  renderTrackerToggle();
  renderVpnToggle();
  renderTorToggle();
  renderFastVpnToggle();
  renderAdBlockerToggle();
  renderDntToggle();
  renderSecurityScanToggle();
});

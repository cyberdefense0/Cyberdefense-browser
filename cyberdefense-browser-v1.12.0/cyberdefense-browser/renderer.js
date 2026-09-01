// ===================== RÉFÉRENCES DOM =====================
const addressBar = document.getElementById('addressBar');
const addressSuggestions = document.getElementById('addressSuggestions');
const goButton = document.getElementById('goButton');
const backButton = document.getElementById('backButton');
const forwardButton = document.getElementById('forwardButton');
const reloadButton = document.getElementById('reloadButton');
const httpsStatus = document.getElementById('httpsStatus');
const trackerCount = document.getElementById('trackerCount');
const vpnStatus = document.getElementById('vpnStatus');
const vpnNote = document.getElementById('vpnNote');
const torStatus = document.getElementById('torStatus');
const fastVpnStatus = document.getElementById('fastVpnStatus');
const serverCountry = document.getElementById('serverCountry');
const techStack = document.getElementById('techStack');
const domainScore = document.getElementById('domainScore');
const domainReputation = document.getElementById('domainReputation');
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
const cookieBlockerToggle = document.getElementById('cookieBlockerToggle');
const cookieBlockerToggleState = document.getElementById('cookieBlockerToggleState');
const clearDataButton = document.getElementById('clearDataButton');
const searchEngineSelect = document.getElementById('searchEngineSelect');
const securityScanToggle = document.getElementById('securityScanToggle');
const securityScanToggleState = document.getElementById('securityScanToggleState');
const securityGrade = document.getElementById('securityGrade');
const securityDetails = document.getElementById('securityDetails');
const readerModeToggle = document.getElementById('readerModeToggle');
const readerModeToggleState = document.getElementById('readerModeToggleState');
const tabManagerToggle = document.getElementById('tabManagerToggle');
const tabManagerToggleState = document.getElementById('tabManagerToggleState');
const cookieInspectorButton = document.getElementById('cookieInspectorButton');
const performanceMonitorButton = document.getElementById('performanceMonitorButton');
const passwordManagerButton = document.getElementById('passwordManagerButton');
const themeSelect = document.getElementById('themeSelect');
const panelToggle = document.getElementById('panelToggle');
const tabsBar = document.getElementById('tabsBar');
const tabsContainer = document.getElementById('tabsContainer');
const newTabButton = document.getElementById('newTabButton');
const webviewsContainer = document.getElementById('webviewsContainer');
const currentTabTitle = document.getElementById('currentTabTitle');
const electronApi = window.electron || { invoke: async () => null };
const mainContent = document.getElementById('mainContent');
const cyberPanel = document.getElementById('cyberPanel');
const popupBlockerToggle = document.getElementById('popupBlockerToggle');
const popupBlockerToggleState = document.getElementById('popupBlockerToggleState');
const addFavoriteButton = document.getElementById('addFavoriteButton');
const favoritesList = document.getElementById('favoritesList');
const searchInPageButton = document.getElementById('searchInPageButton');
const historyList = document.getElementById('historyList');
const clearHistoryButton = document.getElementById('clearHistoryButton');
const zoomInButton = document.getElementById('zoomInButton');
const zoomOutButton = document.getElementById('zoomOutButton');
const zoomLevelDisplay = document.getElementById('zoomLevelDisplay');
const focusModeButton = document.getElementById('focusModeButton');
const focusExitButton = document.getElementById('focusExitButton');
const loadingBar = document.getElementById('loadingBar');
const toastContainer = document.getElementById('toastContainer');
const readerOverlay = document.getElementById('readerOverlay');
const readerContent = document.getElementById('readerContent');
const readerCloseButton = document.getElementById('readerCloseButton');
const readerFontDec = document.getElementById('readerFontDec');
const readerFontInc = document.getElementById('readerFontInc');
const readerReadingTime = document.getElementById('readerReadingTime');
const helpButton = document.getElementById('helpButton');
const onboardingOverlay = document.getElementById('onboardingOverlay');
const onboardingTitle = document.getElementById('onboardingTitle');
const onboardingText = document.getElementById('onboardingText');
const onboardingStepIndicator = document.getElementById('onboardingStepIndicator');
const onboardingNext = document.getElementById('onboardingNext');
const onboardingSkip = document.getElementById('onboardingSkip');
const screenshotButton = document.getElementById('screenshotButton');
const pipButton = document.getElementById('pipButton');
const printButton = document.getElementById('printButton');
const cookiesOverlay = document.getElementById('cookiesOverlay');
const closeCookiesButton = document.getElementById('closeCookiesButton');
const clearAllCookiesButton = document.getElementById('clearAllCookiesButton');
const cookiesFilterDomainOnly = document.getElementById('cookiesFilterDomainOnly');
const cookiesList = document.getElementById('cookiesList');
const cookiesCount = document.getElementById('cookiesCount');
const findBar = document.getElementById('findBar');
const findInput = document.getElementById('findInput');
const findCount = document.getElementById('findCount');
const findPrevButton = document.getElementById('findPrevButton');
const findNextButton = document.getElementById('findNextButton');
const findCloseButton = document.getElementById('findCloseButton');
const downloadsButton = document.getElementById('downloadsButton');
const downloadsBadge = document.getElementById('downloadsBadge');
const downloadsOverlay = document.getElementById('downloadsOverlay');
const downloadsList = document.getElementById('downloadsList');
const closeDownloadsButton = document.getElementById('closeDownloadsButton');
const clearDownloadsButton = document.getElementById('clearDownloadsButton');
const nightFilterToggle = document.getElementById('nightFilterToggle');
const nightFilterToggleState = document.getElementById('nightFilterToggleState');
const nightFilterIntensityWrap = document.getElementById('nightFilterIntensityWrap');
const nightFilterIntensity = document.getElementById('nightFilterIntensity');
const nightFilterIntensityValue = document.getElementById('nightFilterIntensityValue');
const passwordGenOverlay = document.getElementById('passwordGenOverlay');
const closePasswordGenButton = document.getElementById('closePasswordGenButton');
const passwordOutput = document.getElementById('passwordOutput');
const copyPasswordButton = document.getElementById('copyPasswordButton');
const passwordStrengthFill = document.getElementById('passwordStrengthFill');
const passwordStrengthLabel = document.getElementById('passwordStrengthLabel');
const passwordLength = document.getElementById('passwordLength');
const passwordLengthValue = document.getElementById('passwordLengthValue');
const passwordUpper = document.getElementById('passwordUpper');
const passwordLower = document.getElementById('passwordLower');
const passwordNumbers = document.getElementById('passwordNumbers');
const passwordSymbols = document.getElementById('passwordSymbols');
const regeneratePasswordButton = document.getElementById('regeneratePasswordButton');
const exportFavoritesButton = document.getElementById('exportFavoritesButton');
const importFavoritesButton = document.getElementById('importFavoritesButton');
const historySearchInput = document.getElementById('historySearchInput');
const loadExtensionButton = document.getElementById('loadExtensionButton');
const extensionsList = document.getElementById('extensionsList');
const downloadsDirLabel = document.getElementById('downloadsDirLabel');
const changeDownloadDirButton = document.getElementById('changeDownloadDirButton');

// ===================== ÉTAT GLOBAL =====================
let favorites = JSON.parse(localStorage.getItem('cyberBrowserFavorites') || '[]');
let browserHistory = JSON.parse(localStorage.getItem('cyberBrowserHistory') || '[]');
let trackerProtectionEnabled = true;
let vpnEnabled = false;
let torEnabled = false;
let fastVpnEnabled = false;
let adBlockerEnabled = true;
let dntEnabled = true;
let cookieBlockerEnabled = true;
let popupBlockerEnabled = true;
let vpnCountry = 'France';
let vpnProxy = '';
let searchEngine = 'google';
let readerModeEnabled = false;
let tabCount = 1;
let currentTheme = 'cyberpunk';
let performanceData = [];
let pageLoadTime = 0;
let securityScanEnabled = true;
let panelVisible = true;
let zoomLevel = 1;
let downloads = [];
let nightFilterEnabled = localStorage.getItem('cyberBrowserNightFilter') === 'true';
let nightFilterIntensityValue2 = parseInt(localStorage.getItem('cyberBrowserNightFilterIntensity') || '40', 10);
let handleGlobalShortcut = null; // assigné dans DOMContentLoaded, réutilisé pour forwarder les raccourcis depuis les iframes
let readerFontSize = 18;
let securityHistory = loadSecurityHistory();
let liveTrackerBlocked = 0;
let liveAdBlocked = 0;
let loadStartTime = 0;

const START_PAGE = (function() {
  try {
    if (typeof window !== 'undefined' && window.location && window.location.href.startsWith('file://')) {
      const base = window.location.href.replace(/\/index\.html.*$/i, '/');
      return base + 'start.html';
    }
  } catch (e) { /* fallback */ }
  return 'start.html';
})();
const HOME_PAGE = 'https://wiki-cyberdefense-b2ee1.web.app/';

let tabs = [];
let activeTabId = null;
let loadingIntervalId = null;

// ===================== LOGS CONSOLE =====================
function log(message, type = 'info') {
  const entry = document.createElement('div');
  const timestamp = new Date().toLocaleTimeString();
  const icons = {
    'info': '📌',
    'success': '✅',
    'warn': '⚠️',
    'error': '❌',
    'debug': '🐛'
  };
  const colors = {
    'info': 'border-l-4 border-l-cyan-400 bg-cyan-950/40 text-cyan-100',
    'success': 'border-l-4 border-l-green-400 bg-green-950/40 text-green-100',
    'warn': 'border-l-4 border-l-yellow-400 bg-yellow-950/40 text-yellow-100',
    'error': 'border-l-4 border-l-red-500 bg-red-950/50 text-red-100',
    'debug': 'border-l-4 border-l-purple-400 bg-purple-950/40 text-purple-100'
  };
  const colorClass = colors[type] || colors['info'];
  const icon = icons[type] || icons['info'];
  entry.className = `${colorClass} px-3 py-2 rounded font-mono text-base font-semibold tracking-wide`;
  entry.innerHTML = `<span class="text-slate-400">[${timestamp}]</span> ${icon} ${message}`;
  consoleLog.prepend(entry);
  consoleLog.scrollTop = 0;
  while (consoleLog.children.length > 30) {
    consoleLog.removeChild(consoleLog.lastChild);
  }
}

// ===================== NOTIFICATIONS TOAST =====================
function toast(message, type = 'info', duration = 3200) {
  if (!toastContainer) return;
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.textContent = message;
  toastContainer.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 300);
  }, duration);
}

// Intercepte console.log globalement
const originalLog = console.log;
const originalWarn = console.warn;
const originalError = console.error;

console.log = function(...args) {
  originalLog.apply(console, args);
  log(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' '), 'info');
};

console.warn = function(...args) {
  originalWarn.apply(console, args);
  log(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' '), 'warn');
};

console.error = function(...args) {
  originalError.apply(console, args);
  log(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' '), 'error');
};

// ===================== BARRE DE PROGRESSION =====================
function startLoading() {
  if (!loadingBar) return;
  loadStartTime = performance.now();
  liveTrackerBlocked = 0;
  liveAdBlocked = 0;
  trackerCount.textContent = '0';
  trackerCount.className = 'text-cyber font-semibold';
  clearInterval(loadingIntervalId);
  loadingBar.style.transition = 'none';
  loadingBar.style.width = '0%';
  loadingBar.style.opacity = '1';
  // Force reflow avant de réactiver la transition
  void loadingBar.offsetWidth;
  loadingBar.style.transition = 'width 0.4s ease, opacity 0.3s ease';
  loadingBar.style.width = '25%';
  let progress = 25;
  loadingIntervalId = setInterval(() => {
    progress += Math.random() * 10;
    if (progress > 85) progress = 85;
    loadingBar.style.width = progress + '%';
  }, 280);
}

function finishLoading() {
  if (!loadingBar) return;
  clearInterval(loadingIntervalId);
  loadingBar.style.width = '100%';
  setTimeout(() => {
    loadingBar.style.opacity = '0';
    setTimeout(() => { loadingBar.style.width = '0%'; }, 300);
  }, 180);
}

// ===================== UTILITAIRES =====================
function normalizeUrl(input) {
  let url = input.trim();
  if (!url) return HOME_PAGE;

  // Un préfixe de protocole explicite est un signal fort et prioritaire :
  // on encode les espaces plutôt que de router tout le texte vers une
  // recherche (ce qui causait un double-encodage type "https%3A%2F%2F...").
  if (/^https?:\/\//i.test(url)) {
    try {
      return encodeURI(url);
    } catch (e) {
      return url;
    }
  }

  const looksLikeUrl = /\.[a-z]{2,}$/i.test(url);
  const containsSpace = /\s/.test(url);

  if (containsSpace || !looksLikeUrl) {
    return searchUrlFor(url);
  }

  url = 'https://' + url;

  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();
    const isIp = /^\d+\.\d+\.\d+\.\d+$/.test(hostname);
    if (!hostname.includes('.') && hostname !== 'localhost' && !isIp) {
      return searchUrlFor(url);
    }
  } catch {
    return searchUrlFor(url);
  }

  return url;
}

function searchUrlFor(query) {
  const q = encodeURIComponent(query);
  if (searchEngine === 'duckduckgo') return `https://duckduckgo.com/?q=${q}`;
  if (searchEngine === 'brave') return `https://search.brave.com/search?q=${q}`;
  if (searchEngine === 'ecosia') return `https://www.ecosia.org/search?q=${q}`;
  return `https://www.google.com/search?q=${q}`;
}

function generatePassword(length = 16, options = {}) {
  const {
    upper = true,
    lower = true,
    numbers = true,
    symbols = true
  } = options;

  const sets = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  };

  let chars = '';
  if (upper) chars += sets.upper;
  if (lower) chars += sets.lower;
  if (numbers) chars += sets.numbers;
  if (symbols) chars += sets.symbols;
  if (!chars) chars = sets.lower; // sécurité: au moins un jeu de caractères

  // Génération cryptographiquement sûre via crypto.getRandomValues
  const randomValues = new Uint32Array(length);
  (window.crypto || window.msCrypto).getRandomValues(randomValues);

  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(randomValues[i] % chars.length);
  }
  return password;
}

function passwordStrength(password, options = {}) {
  const { upper = true, lower = true, numbers = true, symbols = true } = options;
  let poolSize = 0;
  if (upper) poolSize += 26;
  if (lower) poolSize += 26;
  if (numbers) poolSize += 10;
  if (symbols) poolSize += 27;
  poolSize = Math.max(poolSize, 26);

  // Entropie approximative en bits: longueur * log2(taille du jeu de caractères)
  const entropy = password.length * Math.log2(poolSize);
  if (entropy < 40) return { pct: 25, label: 'Faible', color: '#fb7185' };
  if (entropy < 60) return { pct: 50, label: 'Correct', color: '#facc15' };
  if (entropy < 90) return { pct: 75, label: 'Fort', color: '#34d399' };
  return { pct: 100, label: 'Excellent', color: '#22d3ee' };
}

function readPasswordOptions() {
  return {
    upper: passwordUpper.checked,
    lower: passwordLower.checked,
    numbers: passwordNumbers.checked,
    symbols: passwordSymbols.checked
  };
}

function refreshGeneratedPassword() {
  const length = parseInt(passwordLength.value, 10);
  const options = readPasswordOptions();
  const pwd = generatePassword(length, options);
  passwordOutput.value = pwd;
  const strength = passwordStrength(pwd, options);
  passwordStrengthFill.style.width = strength.pct + '%';
  passwordStrengthFill.style.background = strength.color;
  passwordStrengthLabel.textContent = strength.label;
  passwordStrengthLabel.style.color = strength.color;
}

function detectTechnologies(webview) {
  if (!webview) return 'n/a';
  try {
    const doc = webview.contentDocument;
    const win = webview.contentWindow;
    if (!doc) return 'Non détectable';

    const found = new Set();

    // Balise meta generator (CMS)
    const generator = doc.querySelector('meta[name="generator"]');
    if (generator && generator.content) {
      const g = generator.content;
      if (/wordpress/i.test(g)) found.add('WordPress');
      else if (/wix/i.test(g)) found.add('Wix');
      else if (/squarespace/i.test(g)) found.add('Squarespace');
      else if (/drupal/i.test(g)) found.add('Drupal');
      else if (/joomla/i.test(g)) found.add('Joomla');
      else if (/shopify/i.test(g)) found.add('Shopify');
      else if (/mediawiki/i.test(g)) found.add('MediaWiki');
      else found.add(g.split(' ')[0]);
    }

    // Variables globales exposées par les frameworks JS
    try {
      if (win.jQuery || win.$) found.add('jQuery');
      if (win.React || doc.querySelector('[data-reactroot], #root, #app')) {
        if (win.React) found.add('React');
      }
      if (win.Vue) found.add('Vue.js');
      if (win.angular) found.add('AngularJS');
      if (win.__NEXT_DATA__) found.add('Next.js');
      if (win.Alpine) found.add('Alpine.js');
    } catch (e) { /* accès cross-origin restreint */ }

    // Empreintes dans les scripts et feuilles de style chargés
    const srcs = Array.from(doc.scripts || []).map(s => s.src || '').join(' ')
      + ' ' + Array.from(doc.querySelectorAll('link[rel="stylesheet"]')).map(l => l.href || '').join(' ');

    const signatures = {
      'Bootstrap': /bootstrap/i,
      'Tailwind CSS': /tailwind/i,
      'Cloudflare': /cdn-cgi|cloudflare/i,
      'Google Analytics': /google-analytics|googletagmanager|gtag/i,
      'Font Awesome': /fontawesome|font-awesome/i,
      'jQuery': /jquery/i,
      'Vue.js': /vue(\.min)?\.js/i,
      'React': /react(-dom)?(\.min)?\.js/i,
      'Webpack': /webpack/i,
      'Google Fonts': /fonts\.googleapis/i,
      'jsDelivr CDN': /jsdelivr/i,
      'unpkg CDN': /unpkg\.com/i
    };
    Object.entries(signatures).forEach(([name, pattern]) => {
      if (pattern.test(srcs)) found.add(name);
    });

    if (found.size === 0) return 'Aucune détectée';
    return Array.from(found).slice(0, 4).join(', ');
  } catch (e) {
    return 'Non détectable';
  }
}

function getFaviconUrl(url) {
  try {
    const u = new URL(url);
    if (u.protocol.startsWith('http')) {
      return `https://www.google.com/s2/favicons?domain=${u.hostname}&sz=32`;
    }
  } catch (e) { /* ignore */ }
  return '';
}

function isInternalPage(url) {
  return !url || url === 'about:blank' || (url && url.includes(START_PAGE));
}

// ===================== RENDU DES TOGGLES =====================
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
  // Le champ proxy manuel reste toujours accessible : appliquer un proxy
  // manuel active le VPN directement avec cette valeur, pas besoin
  // d'activer le VPN au préalable (ce qui tentait sinon le proxy par pays,
  // souvent indisponible, et redésactivait tout — piège corrigé).
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

function renderCookieBlockerToggle() {
  cookieBlockerToggleState.textContent = cookieBlockerEnabled ? 'ON' : 'OFF';
  cookieBlockerToggleState.className = cookieBlockerEnabled ? 'text-cyber font-semibold' : 'text-rose-400 font-semibold';
  cookieBlockerToggle.classList.toggle('bg-cyber/10', cookieBlockerEnabled);
  cookieBlockerToggle.classList.toggle('bg-slate-800', !cookieBlockerEnabled);
}

function renderPopupBlockerToggle() {
  popupBlockerToggleState.textContent = popupBlockerEnabled ? 'ON' : 'OFF';
  popupBlockerToggleState.className = popupBlockerEnabled ? 'text-cyber font-semibold' : 'text-rose-400 font-semibold';
  popupBlockerToggle.classList.toggle('bg-cyber/10', popupBlockerEnabled);
  popupBlockerToggle.classList.toggle('bg-slate-800', !popupBlockerEnabled);
}

function renderReaderModeToggle() {
  readerModeToggleState.textContent = readerModeEnabled ? 'ON' : 'OFF';
  readerModeToggleState.className = readerModeEnabled ? 'text-cyber font-semibold' : 'text-rose-400 font-semibold';
  readerModeToggle.classList.toggle('bg-cyber/10', readerModeEnabled);
  readerModeToggle.classList.toggle('bg-slate-800', !readerModeEnabled);
}

function renderTabManager() {
  tabManagerToggleState.textContent = tabCount;
  tabManagerToggleState.className = 'text-cyber font-semibold';
}

function renderZoom() {
  if (zoomLevelDisplay) zoomLevelDisplay.textContent = Math.round(zoomLevel * 100) + '%';
}

function toggleCyberPanel() {
  panelVisible = !panelVisible;
  mainContent.classList.remove('grid-cols-[1fr]', 'grid-cols-[280px_1fr]', 'grid-cols-[300px_1fr]');
  if (panelVisible) {
    mainContent.classList.add('grid-cols-[300px_1fr]');
    cyberPanel.style.display = 'block';
    panelToggle.textContent = '◀';
    panelToggle.style.transform = 'rotate(0deg)';
    log('Panneau Cyber affiché');
  } else {
    mainContent.classList.add('grid-cols-[1fr]');
    cyberPanel.style.display = 'none';
    panelToggle.textContent = '▶';
    panelToggle.style.transform = 'rotate(180deg)';
    log('Panneau Cyber masqué - Page web en plein écran');
  }
  resizeAllWebviews();
  saveSession();
}

// ===================== FAVORIS =====================
function addFavorite(url, title) {
  if (!url || !title) return;

  if (favorites.some(fav => fav.url === url)) {
    toast('Ce favori existe déjà', 'warn');
    log('Ce favori existe déjà');
    return;
  }

  favorites.push({ url, title, dateAdded: new Date().toISOString() });
  saveFavorites();
  renderFavorites();
  toast(`Favori ajouté : ${title}`, 'success');
  log(`Favori ajouté: ${title}`);
}

function removeFavorite(url) {
  favorites = favorites.filter(fav => fav.url !== url);
  saveFavorites();
  renderFavorites();
  log('Favori supprimé');
}

function saveFavorites() {
  localStorage.setItem('cyberBrowserFavorites', JSON.stringify(favorites));
}

function renderFavorites() {
  favoritesList.innerHTML = '';

  if (favorites.length === 0) {
    favoritesList.innerHTML = '<div class="text-slate-400 text-xs text-center py-2">Aucun favori</div>';
    return;
  }

  favorites.forEach(fav => {
    const favElement = document.createElement('div');
    favElement.className = 'flex items-center justify-between group';

    const link = document.createElement('button');
    link.className = 'text-cyber text-xs hover:text-cyber/80 truncate flex-1 text-left';
    link.textContent = fav.title;
    link.onclick = () => {
      addressBar.value = fav.url;
      navigate();
    };

    const removeBtn = document.createElement('button');
    removeBtn.className = 'text-rose-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity ml-2';
    removeBtn.textContent = '×';
    removeBtn.onclick = () => removeFavorite(fav.url);

    favElement.appendChild(link);
    favElement.appendChild(removeBtn);
    favoritesList.appendChild(favElement);
  });
}

// ===================== HISTORIQUE =====================
function addHistoryEntry(url, title) {
  if (isInternalPage(url)) return;
  // Évite les doublons consécutifs
  if (browserHistory.length > 0 && browserHistory[0].url === url) return;
  browserHistory.unshift({ url, title: title || url, date: new Date().toISOString() });
  if (browserHistory.length > 100) browserHistory.length = 100;
  localStorage.setItem('cyberBrowserHistory', JSON.stringify(browserHistory));
  renderHistory();
}

function renderHistory(filterTerm = '') {
  if (!historyList) return;
  historyList.innerHTML = '';

  const term = filterTerm.trim().toLowerCase();
  const filtered = term
    ? browserHistory.filter(e => e.title.toLowerCase().includes(term) || e.url.toLowerCase().includes(term))
    : browserHistory;

  if (filtered.length === 0) {
    historyList.innerHTML = `<div class="text-slate-400 text-xs text-center py-2">${term ? 'Aucun résultat' : 'Aucun historique'}</div>`;
    return;
  }

  filtered.slice(0, 20).forEach(entry => {
    const row = document.createElement('div');
    row.className = 'flex items-center justify-between group';

    const link = document.createElement('button');
    link.className = 'text-slate-300 text-xs hover:text-cyber truncate flex-1 text-left';
    link.title = entry.url;
    link.textContent = entry.title;
    link.onclick = () => {
      addressBar.value = entry.url;
      navigate();
    };

    row.appendChild(link);
    historyList.appendChild(row);
  });
}

// ===================== ONGLETS =====================
function createTab(url = START_PAGE, title = 'Nouvel onglet') {
  const tabId = 'tab-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);

  const tab = {
    id: tabId,
    url: url,
    title: title,
    webview: null,
    history: [url],
    historyIndex: 0,
    zoom: 1,
    pinned: false
  };

  tabs.push(tab);
  renderTabs();
  tabCount = tabs.length;
  renderTabManager();

  return tabId;
}

function resizeWebview(webview) {
  if (!webview || !webviewsContainer) return;
  webview.style.width = '100%';
  webview.style.height = '100%';
}

function resizeAllWebviews() {
  if (!webviewsContainer) return;
  tabs.forEach(tab => {
    if (tab.webview) {
      resizeWebview(tab.webview);
    }
  });
}

function getRealFrameUrl(webview) {
  try {
    const href = webview.contentWindow && webview.contentWindow.location && webview.contentWindow.location.href;
    if (href && href !== 'about:blank') return href;
  } catch (e) { /* cross-origin inaccessible dans de rares cas */ }
  return null;
}

function createTabIframe(tab, initialUrl) {
  const webview = document.createElement('iframe');
  webview.id = tab.id;
  webview.src = initialUrl || START_PAGE;
  webview.setAttribute('allowfullscreen', '');
  webview.setAttribute('allow', 'fullscreen; autoplay; clipboard-write; encrypted-media; picture-in-picture');
  webview.style.position      = 'absolute';
  webview.style.top           = '0';
  webview.style.left          = '0';
  webview.style.width         = '100%';
  webview.style.height        = '100%';
  webview.style.border        = 'none';
  webview.style.display       = 'none';
  webview.style.zIndex        = '0';
  webview.style.pointerEvents = 'none';
  webview.style.zoom          = tab.zoom || 1;

  webview.addEventListener('load', () => {
    finishLoading();

    // Forwarde les raccourcis clavier globaux (F5, Ctrl+R, Ctrl+/-, etc.) :
    // sans ça, ils ne fonctionnent que si le focus est resté sur l'UI de
    // l'appli, jamais quand le focus est dans la page chargée (comportement
    // normal des iframes, chaque document a son propre contexte clavier).
    try {
      if (handleGlobalShortcut && webview.contentDocument) {
        webview.contentDocument.addEventListener('keydown', handleGlobalShortcut, true);
      }
    } catch (e) { /* contenu inaccessible */ }
    if (loadStartTime) {
      pageLoadTime = Math.round(performance.now() - loadStartTime);
      performanceData.push(pageLoadTime);
      if (performanceData.length > 20) performanceData.shift();
    }
    const currentUrl = getRealFrameUrl(webview) || webview.src || initialUrl;
    tab.url = currentUrl;

    if (tab.history[tab.historyIndex] !== currentUrl) {
      tab.history = tab.history.slice(0, tab.historyIndex + 1);
      tab.history.push(currentUrl);
      tab.historyIndex = tab.history.length - 1;
    }

    // Envoie les données à la page de démarrage locale
    if (currentUrl && currentUrl.includes(START_PAGE)) {
      try {
        webview.contentWindow.postMessage({
          type: 'cyber-init',
          favorites,
          searchEngine
        }, '*');
      } catch (e) { /* ignore */ }
    }

    if (activeTabId === tab.id) {
      addressBar.value = isInternalPage(currentUrl) ? '' : currentUrl;
      try {
        const title = webview.contentDocument && webview.contentDocument.title
          ? webview.contentDocument.title
          : currentUrl.replace(/^https?:\/\//, '').split('/')[0];
        tab.title = title || currentUrl;
      } catch (e) {
        tab.title = currentUrl.replace(/^https?:\/\//, '').split('/')[0] || currentUrl;
      }
      currentTabTitle.textContent = tab.title;
      updateTabTitle(tab.id, tab.title);
      updateSecurityPanel(currentUrl);
      addHistoryEntry(currentUrl, tab.title);
      log('Chargé ' + currentUrl);
      saveSession();
    } else {
      try {
        const title = webview.contentDocument && webview.contentDocument.title;
        if (title) {
          tab.title = title;
          updateTabTitle(tab.id, title);
        }
      } catch (e) { /* ignore */ }
      addHistoryEntry(currentUrl, tab.title);
    }
  });

  webviewsContainer.appendChild(webview);
  tab.webview = webview;
  return webview;
}

function switchToTab(tabId) {
  if (readerModeEnabled) {
    readerModeEnabled = false;
    renderReaderModeToggle();
    exitReaderMode();
  }

  tabs.forEach(t => {
    if (t.webview) {
      t.webview.style.display  = 'none';
      t.webview.style.zIndex   = '0';
      t.webview.style.pointerEvents = 'none';
    }
  });

  const tab = tabs.find(t => t.id === tabId);
  if (!tab) {
    console.error('❌ Tab introuvable:', tabId);
    return;
  }

  if (!tab.webview) {
    const url = tab.history[tab.historyIndex] || tab.url || START_PAGE;
    startLoading();
    createTabIframe(tab, url);
  }

  tab.webview.style.display       = 'block';
  tab.webview.style.zIndex        = '10';
  tab.webview.style.pointerEvents = 'auto';
  resizeWebview(tab.webview);

  activeTabId = tabId;
  zoomLevel = tab.zoom || 1;
  tab.webview.style.zoom = zoomLevel;
  renderZoom();

  const currentUrl = tab.history[tab.historyIndex] || tab.url;
  addressBar.value = isInternalPage(currentUrl) ? '' : currentUrl;
  currentTabTitle.textContent = tab.title;
  updateSecurityPanel(currentUrl);
  log('Onglet actif: ' + tab.title);
  renderTabs();
  saveSession();
}

function closeTab(tabId) {
  const tabIndex = tabs.findIndex(t => t.id === tabId);
  if (tabIndex === -1) return;

  const tab = tabs[tabIndex];

  if (tab.webview) {
    webviewsContainer.removeChild(tab.webview);
  }

  tabs.splice(tabIndex, 1);

  if (activeTabId === tabId) {
    if (tabs.length > 0) {
      const newActiveTab = tabs[Math.min(tabIndex, tabs.length - 1)];
      switchToTab(newActiveTab.id);
    } else {
      const newTabId = createTab();
      switchToTab(newTabId);
    }
  }

  tabCount = tabs.length;
  renderTabManager();
  renderTabs();
  saveSession();
  log('Onglet fermé: ' + tab.title);
}

function renderTabs() {
  tabsContainer.innerHTML = '';

  // Les onglets épinglés sont regroupés en premier, comme dans les vrais navigateurs
  const sortedTabs = [...tabs].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  sortedTabs.forEach(tab => {
    const tabButton = document.createElement('div');
    tabButton.className = tab.pinned
      ? 'tab-button group flex items-center justify-center gap-2 px-2 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer transition-colors flex-shrink-0 w-10'
      : 'tab-button group flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer transition-colors min-w-0 flex-1 max-w-48';
    tabButton.setAttribute('data-tab-id', tab.id);

    const currentUrl = tab.history[tab.historyIndex] || tab.url;
    if (!isInternalPage(currentUrl)) {
      const favicon = document.createElement('img');
      favicon.className = 'tab-favicon';
      favicon.src = getFaviconUrl(currentUrl);
      favicon.alt = '';
      favicon.title = tab.pinned ? tab.title : '';
      favicon.onerror = () => { favicon.style.display = 'none'; };
      tabButton.appendChild(favicon);
    }

    if (!tab.pinned) {
      const titleSpan = document.createElement('span');
      titleSpan.className = 'truncate text-sm';
      titleSpan.textContent = tab.title;
      tabButton.appendChild(titleSpan);

      const closeBtn = document.createElement('button');
      closeBtn.className = 'text-slate-400 hover:text-rose-400 text-xs ml-1 opacity-0 group-hover:opacity-100 transition-opacity';
      closeBtn.textContent = '×';
      closeBtn.onclick = (e) => {
        e.stopPropagation();
        closeTab(tab.id);
      };
      tabButton.appendChild(closeBtn);
    }

    if (tab.id === activeTabId) {
      tabButton.classList.remove('bg-slate-800', 'text-slate-300');
      tabButton.classList.add('bg-cyber/20', 'text-cyber');
    }

    tabButton.onclick = () => switchToTab(tab.id);
    tabButton.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      showTabContextMenu(e.clientX, e.clientY, tab.id);
    });

    tabsContainer.appendChild(tabButton);
  });
}

function updateTabTitle(tabId, newTitle) {
  const tab = tabs.find(t => t.id === tabId);
  if (tab) {
    tab.title = newTitle;
    const tabButton = document.querySelector(`[data-tab-id="${tabId}"]`);
    if (tabButton) {
      const titleSpan = tabButton.querySelector('span');
      if (titleSpan) {
        titleSpan.textContent = newTitle;
      }
    }
  }
}

function getActiveWebview() {
  const activeTab = tabs.find(t => t.id === activeTabId);
  return activeTab ? activeTab.webview : null;
}

// ===================== MENU CONTEXTUEL D'ONGLET =====================
function closeTabContextMenu() {
  const menu = document.getElementById('tabContextMenu');
  if (menu) menu.remove();
}

function showTabContextMenu(x, y, tabId) {
  closeTabContextMenu();
  const tab = tabs.find(t => t.id === tabId);
  if (!tab) return;

  const menu = document.createElement('div');
  menu.id = 'tabContextMenu';
  menu.className = 'tab-context-menu';
  menu.style.left = Math.min(x, window.innerWidth - 200) + 'px';
  menu.style.top = Math.min(y, window.innerHeight - 160) + 'px';

  const items = [
    {
      label: tab.pinned ? '📌 Désépingler l\'onglet' : '📌 Épingler l\'onglet',
      action: () => {
        tab.pinned = !tab.pinned;
        renderTabs();
      }
    },
    {
      label: '🖨️ Imprimer la page',
      action: () => {
        const url = tab.history[tab.historyIndex] || tab.url;
        if (tab.webview && tab.webview.contentWindow) {
          try { tab.webview.contentWindow.print(); } catch (e) { toast('Impression impossible sur cette page', 'error'); }
        }
      }
    },
    {
      label: '📑 Dupliquer l\'onglet',
      action: () => {
        const url = tab.history[tab.historyIndex] || tab.url;
        const id = createTab(url, tab.title);
        switchToTab(id);
      }
    },
    {
      label: '⭐ Ajouter aux favoris',
      action: () => {
        const url = tab.history[tab.historyIndex] || tab.url;
        addFavorite(url, tab.title);
      }
    },
    {
      label: '✖ Fermer les autres',
      action: () => {
        tabs.filter(t => t.id !== tabId && !t.pinned).map(t => t.id).forEach(id => closeTab(id));
      }
    },
    {
      label: '🗑 Fermer tous les onglets',
      action: () => {
        [...tabs].filter(t => !t.pinned).forEach(t => closeTab(t.id));
      }
    }
  ];

  items.forEach(item => {
    const btn = document.createElement('button');
    btn.textContent = item.label;
    btn.onclick = () => {
      item.action();
      closeTabContextMenu();
    };
    menu.appendChild(btn);
  });

  document.body.appendChild(menu);
  setTimeout(() => document.addEventListener('click', closeTabContextMenu, { once: true }), 0);
}

// ===================== RECHERCHE DANS LA PAGE =====================
function countOccurrences(text, term) {
  if (!term) return 0;
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const matches = text.match(new RegExp(escaped, 'gi'));
  return matches ? matches.length : 0;
}

function updateFindCount() {
  const webview = getActiveWebview();
  const term = findInput.value;
  if (!webview || !term) {
    findCount.textContent = '0/0';
    return;
  }
  try {
    const doc = webview.contentDocument;
    const total = doc ? countOccurrences(doc.body.innerText || '', term) : 0;
    findCount.textContent = total > 0 ? `${Math.min(findMatchIndex, total)}/${total}` : '0/0';
  } catch (e) {
    findCount.textContent = '?/?';
  }
}

let findMatchIndex = 0;

function performFind(backwards = false) {
  const webview = getActiveWebview();
  const term = findInput.value;
  if (!webview || !term) return;

  try {
    const win = webview.contentWindow;
    if (!win || typeof win.find !== 'function') throw new Error('Contenu inaccessible (page distante)');

    const found = win.find(term, false, backwards, true, false, true, false);
    if (found) {
      findMatchIndex = backwards ? Math.max(1, findMatchIndex - 1) : findMatchIndex + 1;
    } else {
      // Redémarre la recherche depuis le début/la fin de la page (cycle)
      if (typeof win.getSelection === 'function') win.getSelection().removeAllRanges();
      const wrapped = win.find(term, false, backwards, true, false, true, false);
      findMatchIndex = wrapped ? 1 : 0;
      if (!wrapped) toast(`Aucun résultat pour « ${term} »`, 'warn');
    }
    updateFindCount();
  } catch (error) {
    toast('Recherche indisponible sur cette page', 'error');
  }
}

function openFindBar() {
  findBar.classList.remove('hidden');
  findInput.value = '';
  findCount.textContent = '0/0';
  findMatchIndex = 0;
  findInput.focus();
}

function closeFindBar() {
  findBar.classList.add('hidden');
  const webview = getActiveWebview();
  try {
    if (webview && webview.contentWindow && typeof webview.contentWindow.getSelection === 'function') {
      webview.contentWindow.getSelection().removeAllRanges();
    }
  } catch (e) { /* ignore */ }
}

function searchInPage() {
  openFindBar();
}

// ===================== MODE LECTURE (extraction réelle du contenu) =====================
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}

function sanitizeReaderElement(root) {
  root.querySelectorAll('*').forEach(node => {
    [...node.attributes].forEach(attr => {
      const name = attr.name.toLowerCase();
      if (name.startsWith('on')) {
        node.removeAttribute(attr.name);
      } else if ((name === 'href' || name === 'src') && /^\s*javascript:/i.test(attr.value)) {
        node.removeAttribute(attr.name);
      }
    });
  });
}

function extractReadableContent(doc) {
  const clone = doc.cloneNode(true);
  clone.querySelectorAll('script, style, noscript, iframe, nav, footer, header, aside, form, svg, button, input, select, textarea, [role="navigation"], [role="banner"], [role="contentinfo"]').forEach(el => el.remove());
  sanitizeReaderElement(clone);

  const candidates = Array.from(clone.querySelectorAll('article, main, [role="main"], section, div'))
    .filter(el => el.querySelectorAll('p').length >= 2);

  let best = clone.body;
  let bestScore = -1;
  const pool = candidates.length ? candidates : [clone.body];
  pool.forEach(el => {
    const text = (el.textContent || '').trim();
    if (text.length > bestScore) {
      bestScore = text.length;
      best = el;
    }
  });

  if (!best) return null;

  best.querySelectorAll('img[src]').forEach(img => {
    try { img.setAttribute('src', new URL(img.getAttribute('src'), doc.baseURI).href); } catch (e) { img.remove(); }
  });
  best.querySelectorAll('a[href]').forEach(a => {
    try {
      a.setAttribute('href', new URL(a.getAttribute('href'), doc.baseURI).href);
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    } catch (e) { /* lien relatif invalide, on laisse tel quel */ }
  });

  return {
    title: doc.title || '',
    html: best.innerHTML,
    text: best.textContent || ''
  };
}

function enterReaderMode() {
  const tab = tabs.find(t => t.id === activeTabId);
  const webview = getActiveWebview();
  const currentUrl = tab ? (tab.history[tab.historyIndex] || tab.url) : null;

  if (!webview || !tab || isInternalPage(currentUrl)) {
    toast('Aucune page à lire', 'warn');
    readerModeEnabled = false;
    renderReaderModeToggle();
    return;
  }

  let doc;
  try {
    doc = webview.contentDocument;
  } catch (e) {
    doc = null;
  }

  if (!doc || !doc.body) {
    toast('Impossible de lire le contenu de cette page', 'error');
    readerModeEnabled = false;
    renderReaderModeToggle();
    return;
  }

  const data = extractReadableContent(doc);
  if (!data || !data.text || data.text.trim().length < 80) {
    toast('Contenu insuffisant pour le mode lecture', 'warn');
    readerModeEnabled = false;
    renderReaderModeToggle();
    return;
  }

  readerContent.innerHTML = `<h1>${escapeHtml(data.title)}</h1>${data.html}`;
  readerContent.style.fontSize = readerFontSize + 'px';
  const words = data.text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  readerReadingTime.textContent = `~${minutes} min de lecture`;
  readerOverlay.classList.remove('hidden');
  log('📖 Mode Lecture activé pour ' + currentUrl);
}

function exitReaderMode() {
  readerOverlay.classList.add('hidden');
  readerContent.innerHTML = '';
}

// ===================== HISTORIQUE DE SÉCURITÉ PAR DOMAINE =====================
function loadSecurityHistory() {
  try {
    return JSON.parse(localStorage.getItem('cyberBrowserSecurityHistory') || '{}');
  } catch (e) {
    return {};
  }
}

function recordDomainSecurity(hostname, score, grade) {
  if (!hostname) return;
  if (!securityHistory[hostname]) securityHistory[hostname] = [];
  securityHistory[hostname].push({ score, grade, date: new Date().toISOString() });
  if (securityHistory[hostname].length > 15) securityHistory[hostname].shift();
  try {
    localStorage.setItem('cyberBrowserSecurityHistory', JSON.stringify(securityHistory));
  } catch (e) { /* stockage indisponible, on ignore */ }
}

function getDomainTrend(hostname) {
  const entries = securityHistory[hostname];
  if (!entries || entries.length === 0) return null;
  const avg = Math.round(entries.reduce((sum, e) => sum + e.score, 0) / entries.length);
  let trendIcon = '';
  if (entries.length >= 2) {
    const diff = entries[entries.length - 1].score - entries[entries.length - 2].score;
    trendIcon = diff > 0 ? ' ↑' : diff < 0 ? ' ↓' : ' →';
  }
  return { avg, visits: entries.length, trendIcon };
}

// ===================== THÈMES =====================
const THEME_LABELS = {
  cyberpunk: 'Cyberpunk Neon',
  dark: 'Dark Mode',
  light: 'Light Mode',
  matrix: 'Matrix Green',
  sunset: 'Sunset'
};

function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  log('Thème changé: ' + theme);
  toast(`Thème : ${THEME_LABELS[theme] || theme}`, 'info', 1800);
  saveSession();
}

// ===================== PANNEAU DE SÉCURITÉ =====================
function renderSecurityScanToggle() {
  securityScanToggleState.textContent = securityScanEnabled ? 'ON' : 'OFF';
  securityScanToggleState.className = securityScanEnabled ? 'text-cyber font-semibold' : 'text-rose-400 font-semibold';
  securityScanToggle.classList.toggle('bg-cyber/10', securityScanEnabled);
  securityScanToggle.classList.toggle('bg-slate-800', !securityScanEnabled);
}

function updateSecurityPanel(urlString) {
  if (isInternalPage(urlString)) {
    httpsStatus.textContent = '—';
    httpsStatus.className = 'text-slate-400 font-semibold';
    trackerCount.textContent = '0';
    serverCountry.textContent = '—';
    techStack.textContent = 'n/a';
    domainScore.textContent = '—';
    securityGrade.textContent = '—';
    domainReputation.textContent = '—';
    domainReputation.className = 'text-slate-400 font-semibold';
    securityDetails.innerHTML = '<div class="text-slate-400">Page interne — rien à analyser</div>';
    return;
  }

  let url;
  try {
    url = new URL(urlString);
  } catch {
    url = new URL(HOME_PAGE);
  }
  const secure = url.protocol === 'https:';
  httpsStatus.textContent = secure ? 'Sécurisé' : 'Non sécurisé';
  httpsStatus.className = secure ? 'text-cyber font-semibold' : 'text-rose-400 font-semibold';

  trackerCount.textContent = String(liveTrackerBlocked + liveAdBlocked);
  trackerCount.className = (liveTrackerBlocked + liveAdBlocked) === 0 ? 'text-cyber font-semibold' : 'text-neon font-semibold';

  const trend = getDomainTrend(url.hostname);
  if (trend) {
    domainReputation.textContent = `${trend.avg}/100${trend.trendIcon}`;
    domainReputation.className = trend.avg >= 70 ? 'text-cyber font-semibold' : trend.avg >= 50 ? 'text-yellow-400 font-semibold' : 'text-rose-400 font-semibold';
  } else {
    domainReputation.textContent = 'Nouveau site';
    domainReputation.className = 'text-slate-400 font-semibold';
  }

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
    serverCountry.textContent = 'Local (non protégé)';
    serverCountry.className = 'text-slate-400 font-semibold';
  }

  techStack.textContent = detectTechnologies(getActiveWebview());

  if (securityScanEnabled) {
    performSecurityScan(urlString);
  } else {
    // Score indicatif basé sur des critères réels et vérifiables (pas de scan approfondi)
    let score = secure ? 65 : 35;
    if (torEnabled) score += 15;
    else if (fastVpnEnabled) score += 12;
    else if (vpnEnabled) score += 10;
    if (trackerProtectionEnabled) score += 5;
    if (adBlockerEnabled) score += 5;
    score = Math.min(100, score);
    domainScore.textContent = score + '/100';
    securityGrade.textContent = '—';
    securityDetails.innerHTML = '<div>Scanner désactivé — score indicatif (HTTPS + protections actives)</div>';
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
      securityDetails.innerHTML = '<div class="text-rose-400">Erreur: ' + result.error + '</div>';
      return;
    }

    domainScore.textContent = result.score + '/100';
    securityGrade.textContent = result.grade;

    let gradeColor = 'text-rose-400';
    if (result.score >= 90) gradeColor = 'text-green-400';
    else if (result.score >= 80) gradeColor = 'text-green-400';
    else if (result.score >= 70) gradeColor = 'text-yellow-400';
    else if (result.score >= 60) gradeColor = 'text-orange-400';

    securityGrade.className = gradeColor + ' font-semibold';

    let detailsHtml = '';

    if (result.strengths.length > 0) {
      detailsHtml += '<div class="text-green-400 font-semibold mb-1">✅ Forces:</div>';
      result.strengths.forEach(strength => {
        detailsHtml += '<div class="text-green-300 text-xs">• ' + strength + '</div>';
      });
    }

    if (result.issues.length > 0) {
      detailsHtml += '<div class="text-rose-400 font-semibold mb-1 mt-2">⚠️ Problèmes:</div>';
      result.issues.forEach(issue => {
        detailsHtml += '<div class="text-rose-300 text-xs">• ' + issue + '</div>';
      });
    }

    if (result.strengths.length === 0 && result.issues.length === 0) {
      detailsHtml = '<div class="text-slate-400">Aucune analyse disponible</div>';
    }

    recordDomainSecurity(result.url, result.score, result.grade);
    const trend = getDomainTrend(result.url);
    if (trend && trend.visits > 1) {
      detailsHtml += `<div class="text-slate-400 text-xs mt-2 pt-2 border-t border-slate-700">🕘 ${trend.visits} visites · score moyen ${trend.avg}/100${trend.trendIcon}</div>`;
    }

    securityDetails.innerHTML = detailsHtml;

    log('Scan sécurité ' + result.url + ': ' + result.score + '/100 (' + result.grade + ')');

    if (result.score < 50) {
      toast(`Site à risque : ${result.url} (${result.score}/100)`, 'error', 4500);
    }

  } catch (error) {
    domainScore.textContent = 'Erreur';
    securityGrade.textContent = '❌';
    securityDetails.innerHTML = '<div class="text-rose-400">Erreur de scan: ' + error.message + '</div>';
    log('Erreur scan sécurité: ' + error.message);
  }
}

// ===================== NAVIGATION =====================
function navigate(url) {
  const target = url || normalizeUrl(addressBar.value);
  if (!target) return;
  const activeWebview = getActiveWebview();
  const tab = tabs.find(t => t.id === activeTabId);
  if (activeWebview && tab) {
    if (readerModeEnabled) {
      readerModeEnabled = false;
      renderReaderModeToggle();
      exitReaderMode();
    }
    startLoading();
    tab.history = tab.history.slice(0, tab.historyIndex + 1);
    if (tab.history[tab.historyIndex] !== target) {
      tab.history.push(target);
      tab.historyIndex = tab.history.length - 1;
    }
    tab.url = target;
    activeWebview.src = target;
    addressBar.value = isInternalPage(target) ? '' : target;
    updateSecurityPanel(target);
    log('Chargement de ' + target);
    hideAddressSuggestions();
  }
}

// ===================== SUGGESTIONS D'ADRESSE (basées sur l'historique/favoris) =====================
function hideAddressSuggestions() {
  if (addressSuggestions) addressSuggestions.classList.add('hidden');
}

function showAddressSuggestions(query) {
  if (!addressSuggestions) return;
  const q = query.trim().toLowerCase();
  if (!q) {
    hideAddressSuggestions();
    return;
  }

  const pool = [
    ...favorites.map(f => ({ url: f.url, title: f.title })),
    ...browserHistory.map(h => ({ url: h.url, title: h.title }))
  ];

  const seen = new Set();
  const matches = [];
  for (const item of pool) {
    if (seen.has(item.url)) continue;
    if (item.url.toLowerCase().includes(q) || (item.title || '').toLowerCase().includes(q)) {
      seen.add(item.url);
      matches.push(item);
    }
    if (matches.length >= 6) break;
  }

  if (matches.length === 0) {
    hideAddressSuggestions();
    return;
  }

  addressSuggestions.innerHTML = '';
  matches.forEach(match => {
    const btn = document.createElement('button');
    btn.innerHTML = `${match.title || match.url}<span class="sugg-url">${match.url}</span>`;
    btn.onclick = () => {
      addressBar.value = match.url;
      navigate(match.url);
    };
    addressSuggestions.appendChild(btn);
  });
  addressSuggestions.classList.remove('hidden');
}

// ===================== SESSION (persistance) =====================
function saveSession() {
  try {
    const data = {
      tabs: tabs.map(t => ({
        url: t.history[t.historyIndex] || t.url,
        title: t.title
      })),
      activeIndex: tabs.findIndex(t => t.id === activeTabId),
      theme: currentTheme,
      searchEngine,
      panelVisible,
      panelWidth: cyberPanel && cyberPanel.style.width ? cyberPanel.style.width : null
    };
    localStorage.setItem('cyberBrowserSession', JSON.stringify(data));
  } catch (e) { /* stockage indisponible, on ignore */ }
}

function restoreSession() {
  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem('cyberBrowserSession') || 'null');
  } catch (e) {
    saved = null;
  }

  if (!saved || !Array.isArray(saved.tabs) || saved.tabs.length === 0) {
    const initialTabId = createTab(HOME_PAGE, 'Wiki Cyberdéfense');
    switchToTab(initialTabId);
    addressBar.value = HOME_PAGE;
    return;
  }

  if (saved.theme) {
    themeSelect.value = saved.theme;
    applyTheme(saved.theme);
  }
  if (saved.searchEngine) {
    searchEngine = saved.searchEngine;
    searchEngineSelect.value = saved.searchEngine;
  }
  if (saved.panelWidth) {
    cyberPanel.style.width = saved.panelWidth;
  }

  let firstId = null;
  saved.tabs.forEach((t, idx) => {
    const id = createTab(t.url, t.title || 'Onglet');
    if (idx === (saved.activeIndex >= 0 ? saved.activeIndex : 0)) firstId = id;
  });

  if (saved.panelVisible === false) {
    panelVisible = true; // sera basculé à false par toggleCyberPanel()
    toggleCyberPanel();
  }

  switchToTab(firstId || tabs[0].id);
  log('Session précédente restaurée (' + saved.tabs.length + ' onglet(s))');
}

// ===================== MESSAGES INTER-FRAMES (page de démarrage) =====================
window.addEventListener('message', (event) => {
  const data = event.data;
  if (!data || !data.type) return;

  if (data.type === 'cyber-navigate' && data.url) {
    addressBar.value = data.url;
    navigate(data.url);
  }

  if (data.type === 'cyber-start-ready') {
    const activeWebview = getActiveWebview();
    if (activeWebview && activeWebview.contentWindow) {
      try {
        activeWebview.contentWindow.postMessage({
          type: 'cyber-init',
          favorites,
          searchEngine
        }, '*');
      } catch (e) { /* ignore */ }
    }
  }
});

// ===================== TUTORIEL DE BIENVENUE =====================
const ONBOARDING_STEPS = [
  {
    title: 'Bienvenue sur Cyberdéfense Browser 👋',
    text: "Un navigateur prototype pensé autour de la sécurité et de la vie privée, avec une interface façon cyberpunk. Petite visite guidée en quelques étapes."
  },
  {
    title: 'Le Cyber Panel 🛡️',
    text: "À gauche, active ou désactive le bloqueur de trackers, le VPN, Tor, le bloqueur de pubs et de cookies. Le panneau se redimensionne (glisser le bord) et se replie avec le bouton ◀ en haut."
  },
  {
    title: 'Onglets & favoris 📑',
    text: "Ctrl+T ouvre un nouvel onglet sur une page de démarrage avec recherche rapide et favoris. Clic droit sur un onglet pour le dupliquer ou fermer les autres. Ton historique et tes favoris sont dans le panneau."
  },
  {
    title: 'Scanner de sécurité 🔍',
    text: "Chaque site visité reçoit un score et un grade de sécurité (HTTPS, en-têtes, etc.), avec un historique par domaine pour suivre son évolution dans le temps."
  },
  {
    title: 'Raccourcis utiles ⌨️',
    text: "Ctrl+L (adresse), Ctrl+D (favori), Ctrl+F (recherche dans la page), Ctrl +/- (zoom), et le bouton ⛶ pour un mode focus sans distraction. Le ❔ en haut relance cette visite guidée."
  }
];
let onboardingStep = 0;

function renderOnboardingStep() {
  const step = ONBOARDING_STEPS[onboardingStep];
  onboardingTitle.textContent = step.title;
  onboardingText.textContent = step.text;
  onboardingStepIndicator.innerHTML = '';
  ONBOARDING_STEPS.forEach((_, idx) => {
    const dot = document.createElement('span');
    if (idx === onboardingStep) dot.classList.add('active');
    onboardingStepIndicator.appendChild(dot);
  });
  onboardingNext.textContent = onboardingStep === ONBOARDING_STEPS.length - 1 ? 'Commencer la navigation' : 'Suivant';
}

function openOnboarding() {
  onboardingStep = 0;
  renderOnboardingStep();
  onboardingOverlay.classList.remove('hidden');
}

function closeOnboarding() {
  onboardingOverlay.classList.add('hidden');
  try { localStorage.setItem('cyberBrowserOnboardingSeen', '1'); } catch (e) { /* ignore */ }
}

// ===================== INITIALISATION =====================
window.addEventListener('DOMContentLoaded', () => {
  restoreSession();

  backButton.addEventListener('click', () => {
    const activeWebview = getActiveWebview();
    const tab = tabs.find(t => t.id === activeTabId);
    if (activeWebview && tab && tab.historyIndex > 0) {
      startLoading();
      tab.historyIndex--;
      const prevUrl = tab.history[tab.historyIndex];
      activeWebview.src = prevUrl;
      addressBar.value = isInternalPage(prevUrl) ? '' : prevUrl;
      updateSecurityPanel(prevUrl);
      log('Navigation arrière: ' + prevUrl);
    }
  });

  forwardButton.addEventListener('click', () => {
    const activeWebview = getActiveWebview();
    const tab = tabs.find(t => t.id === activeTabId);
    if (activeWebview && tab && tab.historyIndex < tab.history.length - 1) {
      startLoading();
      tab.historyIndex++;
      const nextUrl = tab.history[tab.historyIndex];
      activeWebview.src = nextUrl;
      addressBar.value = isInternalPage(nextUrl) ? '' : nextUrl;
      updateSecurityPanel(nextUrl);
      log('Navigation avant: ' + nextUrl);
    }
  });

  reloadButton.addEventListener('click', () => {
    const activeWebview = getActiveWebview();
    if (activeWebview) {
      startLoading();
      const tab = tabs.find(t => t.id === activeTabId);
      const reloadUrl = tab ? tab.history[tab.historyIndex] : activeWebview.src;
      activeWebview.src = reloadUrl;
      log('Rechargement de la page');
    }
  });

  vpnCountrySelect.value = vpnCountry;
  renderTrackerToggle();
  renderVpnToggle();
  renderTorToggle();
  renderFastVpnToggle();
  renderAdBlockerToggle();
  renderDntToggle();
  renderPopupBlockerToggle();
  renderZoom();
  renderHistory();
  renderFavorites();

  // ── DIVISEUR DE PANNEAU ────────────────────────────────────────────────
  (function() {
    const resizer = document.getElementById('panelResizer');
    const panel   = document.getElementById('cyberPanel');
    if (!resizer || !panel) return;
    const MIN_WIDTH = 160;
    const MAX_WIDTH = 600;
    let isDragging = false;
    let startX = 0;
    let startWidth = 0;

    resizer.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX     = e.clientX;
      startWidth = panel.offsetWidth;
      resizer.classList.add('dragging');
      document.body.style.cursor     = 'col-resize';
      document.body.style.userSelect = 'none';
      const overlay = document.createElement('div');
      overlay.id = 'resizeOverlay';
      overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;cursor:col-resize;';
      document.body.appendChild(overlay);
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const delta    = e.clientX - startX;
      const newWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth + delta));
      panel.style.width = newWidth + 'px';
      resizeAllWebviews();
    });

    document.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      resizer.classList.remove('dragging');
      document.body.style.cursor     = '';
      document.body.style.userSelect = '';
      const overlay = document.getElementById('resizeOverlay');
      if (overlay) overlay.remove();
      resizeAllWebviews();
      saveSession();
    });
  })();

  log('Interface prête');

  if (typeof electronApi.onBlocked === 'function') {
    // Remarque: le blocage est mesuré au niveau de la session Electron (toute la fenêtre),
    // donc ce compteur reflète l'activité de blocage globale, pas uniquement l'onglet actif.
    electronApi.onBlocked((data) => {
      if (data.kind === 'tracker') liveTrackerBlocked++;
      else if (data.kind === 'ad') liveAdBlocked++;
      trackerCount.textContent = String(liveTrackerBlocked + liveAdBlocked);
      trackerCount.className = 'text-neon font-semibold';
    });
  }

  window.addEventListener('resize', () => {
    resizeAllWebviews();
  });

  // ── NOUVEL ONGLET / RECHERCHE / ADRESSE ─────────────────────────────────
  newTabButton.addEventListener('click', () => {
    const newTabId = createTab(START_PAGE, 'Nouvel onglet');
    switchToTab(newTabId);
    addressBar.value = '';
    addressBar.focus();
  });

  goButton.addEventListener('click', () => navigate());
  addressBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      navigate();
    } else if (event.key === 'Escape') {
      hideAddressSuggestions();
      addressBar.blur();
    }
  });
  addressBar.addEventListener('input', () => showAddressSuggestions(addressBar.value));
  addressBar.addEventListener('focus', () => {
    if (addressBar.value) showAddressSuggestions(addressBar.value);
  });
  document.addEventListener('click', (e) => {
    if (addressSuggestions && !addressSuggestions.contains(e.target) && e.target !== addressBar) {
      hideAddressSuggestions();
    }
  });

  // ── RACCOURCIS CLAVIER GLOBAUX ───────────────────────────────────────────
  function handleGlobalShortcutImpl(event) {
    const mod = event.ctrlKey || event.metaKey;

    if (event.key === 'F5' || (mod && event.key.toLowerCase() === 'r')) {
      event.preventDefault();
      reloadButton.click();
      return;
    }
    if (mod && event.key.toLowerCase() === 'f') {
      event.preventDefault();
      searchInPage();
      return;
    }
    if (mod && event.key.toLowerCase() === 't') {
      event.preventDefault();
      newTabButton.click();
      return;
    }
    if (mod && event.key.toLowerCase() === 'w') {
      event.preventDefault();
      if (activeTabId) closeTab(activeTabId);
      return;
    }
    if (mod && event.key.toLowerCase() === 'l') {
      event.preventDefault();
      addressBar.focus();
      addressBar.select();
      return;
    }
    if (mod && event.key.toLowerCase() === 'd') {
      event.preventDefault();
      addFavoriteButton.click();
      return;
    }
    if (mod && event.key.toLowerCase() === 'p') {
      event.preventDefault();
      printButton.click();
      return;
    }
    if (mod && (event.key === '+' || event.key === '=')) {
      event.preventDefault();
      zoomInButton.click();
      return;
    }
    if (mod && event.key === '-') {
      event.preventDefault();
      zoomOutButton.click();
      return;
    }
    if (mod && event.key === '0') {
      event.preventDefault();
      zoomLevel = 1;
      applyZoomToActiveTab();
      return;
    }
    if (mod && event.key >= '1' && event.key <= '9') {
      const idx = parseInt(event.key, 10) - 1;
      if (tabs[idx]) {
        event.preventDefault();
        switchToTab(tabs[idx].id);
      }
      return;
    }
    if (event.key === 'Tab' && mod) {
      event.preventDefault();
      if (tabs.length > 1) {
        const currentIndex = tabs.findIndex(t => t.id === activeTabId);
        const nextIndex = event.shiftKey
          ? (currentIndex - 1 + tabs.length) % tabs.length
          : (currentIndex + 1) % tabs.length;
        switchToTab(tabs[nextIndex].id);
      }
      return;
    }
    if (event.key === 'Escape' && document.body.classList.contains('focus-mode')) {
      document.body.classList.remove('focus-mode');
      resizeAllWebviews();
    }
  }

  document.addEventListener('keydown', handleGlobalShortcutImpl);
  handleGlobalShortcut = handleGlobalShortcutImpl;

  panelToggle.addEventListener('click', toggleCyberPanel);

  const clearLogsButton = document.getElementById('clearLogsButton');
  if (clearLogsButton) {
    clearLogsButton.addEventListener('click', () => {
      consoleLog.innerHTML = '';
      log('Console cleared', 'success');
    });
  }

  // ── ZOOM ──────────────────────────────────────────────────────────────
  function applyZoomToActiveTab() {
    const tab = tabs.find(t => t.id === activeTabId);
    const activeWebview = getActiveWebview();
    if (activeWebview) activeWebview.style.zoom = zoomLevel;
    if (tab) tab.zoom = zoomLevel;
    renderZoom();
  }

  zoomInButton.addEventListener('click', () => {
    zoomLevel = Math.min(2, +(zoomLevel + 0.1).toFixed(2));
    applyZoomToActiveTab();
  });

  zoomOutButton.addEventListener('click', () => {
    zoomLevel = Math.max(0.5, +(zoomLevel - 0.1).toFixed(2));
    applyZoomToActiveTab();
  });

  zoomLevelDisplay.addEventListener('dblclick', () => {
    zoomLevel = 1;
    applyZoomToActiveTab();
  });

  // ── MODE FOCUS ───────────────────────────────────────────────────────
  focusModeButton.addEventListener('click', () => {
    document.body.classList.toggle('focus-mode');
    const active = document.body.classList.contains('focus-mode');
    toast(active ? 'Mode focus activé — Échap pour quitter' : 'Mode focus désactivé', 'info');
    resizeAllWebviews();
  });
  focusExitButton.addEventListener('click', () => {
    document.body.classList.remove('focus-mode');
    resizeAllWebviews();
  });

  // ── HISTORIQUE ───────────────────────────────────────────────────────
  clearHistoryButton.addEventListener('click', () => {
    browserHistory = [];
    localStorage.removeItem('cyberBrowserHistory');
    renderHistory();
    toast('Historique effacé', 'success');
    log('Historique de navigation effacé');
  });

  // ── TOGGLES DU CYBER PANEL ───────────────────────────────────────────
  trackerToggle.addEventListener('click', async () => {
    trackerProtectionEnabled = !trackerProtectionEnabled;
    await electronApi.invoke('set-tracker-blocking', trackerProtectionEnabled);
    renderTrackerToggle();
    log(`Bloqueur de trackers ${trackerProtectionEnabled ? 'activé' : 'désactivé'}`);
    const activeWebview = getActiveWebview();
    updateSecurityPanel(activeWebview ? activeWebview.src : addressBar.value);
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
      log(`Erreur VPN: ${result.message}`, 'error');
      toast(result.message, 'error', 5000);
      renderVpnToggle();
    }
    if (vpnEnabled) {
      log('Le VPN est maintenant appliqué au navigateur via proxy.');
      toast('VPN activé', 'success');
    }
    const activeWebview = getActiveWebview();
    updateSecurityPanel(activeWebview ? activeWebview.src : addressBar.value);
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
      log(`Erreur VPN: ${result.message}`, 'error');
      toast(result.message, 'error', 5000);
    }
    renderVpnToggle();
    const activeWebview = getActiveWebview();
    updateSecurityPanel(activeWebview ? activeWebview.src : addressBar.value);
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
    if (vpnEnabled) {
      // Le backend désactive Tor et VPN Rapide en appliquant un proxy manuel
      torEnabled = false;
      fastVpnEnabled = false;
      renderTorToggle();
      renderFastVpnToggle();
    }
    if (result && result.message) {
      log(`Erreur VPN: ${result.message}`, 'error');
      toast(result.message, 'error', 5000);
    } else {
      log(`Proxy manuel appliqué : ${vpnProxy}`);
      toast('Proxy manuel connecté', 'success');
    }
    renderVpnToggle();
    const activeWebview = getActiveWebview();
    updateSecurityPanel(activeWebview ? activeWebview.src : addressBar.value);
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
      toast('Tor activé', 'success');
    } else {
      log('Routage Tor désactivé');
    }
    if (result && result.message) {
      log(`Attention Tor: ${result.message}`, 'error');
      toast(result.message, 'error', 5000);
      renderTorToggle();
    }
    const activeWebview = getActiveWebview();
    updateSecurityPanel(activeWebview ? activeWebview.src : addressBar.value);
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
      log(`Attention VPN Rapide: ${result.message}`, 'error');
      toast(result.message, 'error', 5000);
      renderFastVpnToggle();
    }
    const activeWebview = getActiveWebview();
    updateSecurityPanel(activeWebview ? activeWebview.src : addressBar.value);
  });

  adBlockerToggle.addEventListener('click', async () => {
    adBlockerEnabled = !adBlockerEnabled;
    await electronApi.invoke('set-ad-blocker', adBlockerEnabled);
    renderAdBlockerToggle();
    log(`Bloqueur d'annonces ${adBlockerEnabled ? 'activé' : 'désactivé'}`);
    const activeWebview = getActiveWebview();
    updateSecurityPanel(activeWebview ? activeWebview.src : addressBar.value);
  });

  dntToggle.addEventListener('click', async () => {
    dntEnabled = !dntEnabled;
    await electronApi.invoke('set-dnt', dntEnabled);
    renderDntToggle();
    log(`Do Not Track ${dntEnabled ? 'activé' : 'désactivé'}`);
  });

  cookieBlockerToggle.addEventListener('click', async () => {
    cookieBlockerEnabled = !cookieBlockerEnabled;
    await electronApi.invoke('set-cookie-blocker', cookieBlockerEnabled);
    renderCookieBlockerToggle();
    log(`Bloqueur de cookies ${cookieBlockerEnabled ? 'activé' : 'désactivé'}`);
  });

  popupBlockerToggle.addEventListener('click', async () => {
    popupBlockerEnabled = !popupBlockerEnabled;
    await electronApi.invoke('set-popup-blocker', popupBlockerEnabled);
    renderPopupBlockerToggle();
    log(`Bloqueur de popups ${popupBlockerEnabled ? 'activé' : 'désactivé'}`);
  });

  clearDataButton.addEventListener('click', async () => {
    const result = await electronApi.invoke('clear-browsing-data');
    if (result && result.success) {
      log('✓ Données de navigation effacées (cache, cookies, historique)');
      toast('Données de navigation effacées', 'success');
    } else {
      log('✗ Erreur lors du nettoyage des données');
      toast('Erreur lors du nettoyage des données', 'error');
    }
  });

  readerModeToggle.addEventListener('click', () => {
    readerModeEnabled = !readerModeEnabled;
    renderReaderModeToggle();
    if (readerModeEnabled) {
      enterReaderMode();
    } else {
      exitReaderMode();
    }
  });

  readerCloseButton.addEventListener('click', () => {
    readerModeEnabled = false;
    renderReaderModeToggle();
    exitReaderMode();
  });

  readerFontDec.addEventListener('click', () => {
    readerFontSize = Math.max(14, readerFontSize - 2);
    readerContent.style.fontSize = readerFontSize + 'px';
  });

  readerFontInc.addEventListener('click', () => {
    readerFontSize = Math.min(28, readerFontSize + 2);
    readerContent.style.fontSize = readerFontSize + 'px';
  });

  tabManagerToggle.addEventListener('click', () => {
    const newTabId = createTab(START_PAGE, 'Nouvel onglet');
    switchToTab(newTabId);
    log(`Onglet créé (${tabCount} au total)`);
  });

  cookieInspectorButton.addEventListener('click', async () => {
    cookiesOverlay.classList.remove('hidden');
    await refreshCookiesList();
  });

  closeCookiesButton.addEventListener('click', () => {
    cookiesOverlay.classList.add('hidden');
  });

  cookiesOverlay.addEventListener('click', (event) => {
    if (event.target === cookiesOverlay) cookiesOverlay.classList.add('hidden');
  });

  cookiesFilterDomainOnly.addEventListener('change', refreshCookiesList);

  async function refreshCookiesList() {
    let domainFilter = null;
    if (cookiesFilterDomainOnly.checked) {
      const activeWebview = getActiveWebview();
      const url = activeWebview ? (getRealFrameUrl(activeWebview) || activeWebview.src) : null;
      try {
        domainFilter = url ? new URL(url).hostname : null;
      } catch (e) { domainFilter = null; }
    }

    const result = await electronApi.invoke('get-cookies', domainFilter);
    const cookies = (result && result.cookies) || [];
    cookiesCount.textContent = cookies.length;

    if (cookies.length === 0) {
      cookiesList.innerHTML = '<p class="downloads-empty">Aucun cookie</p>';
      return;
    }

    cookiesList.innerHTML = '';
    cookies.forEach((cookie) => {
      const item = document.createElement('div');
      item.className = 'cookie-item';

      const info = document.createElement('div');
      info.className = 'cookie-item-info';
      const nameEl = document.createElement('div');
      nameEl.className = 'cookie-item-name';
      nameEl.textContent = cookie.name;
      const domainEl = document.createElement('div');
      domainEl.className = 'cookie-item-domain';
      domainEl.textContent = cookie.domain + cookie.path;
      info.appendChild(nameEl);
      info.appendChild(domainEl);

      const removeBtn = document.createElement('button');
      removeBtn.className = 'cookie-item-remove';
      removeBtn.textContent = 'Suppr.';
      removeBtn.onclick = async () => {
        await electronApi.invoke('remove-cookie', cookie);
        refreshCookiesList();
      };

      item.appendChild(info);
      item.appendChild(removeBtn);
      cookiesList.appendChild(item);
    });
  }

  clearAllCookiesButton.addEventListener('click', async () => {
    let domainFilter = null;
    if (cookiesFilterDomainOnly.checked) {
      const activeWebview = getActiveWebview();
      const url = activeWebview ? (getRealFrameUrl(activeWebview) || activeWebview.src) : null;
      try {
        domainFilter = url ? new URL(url).hostname : null;
      } catch (e) { domainFilter = null; }
    }
    const result = await electronApi.invoke('remove-all-cookies', domainFilter);
    if (result && result.success) {
      toast(`${result.removed} cookie(s) supprimé(s)`, 'success');
      log(`🍪 ${result.removed} cookie(s) supprimé(s)${domainFilter ? ' pour ' + domainFilter : ''}`, 'success');
      refreshCookiesList();
    }
  });

  performanceMonitorButton.addEventListener('click', async () => {
    if (pageLoadTime > 0 && performanceData.length > 0) {
      const avg = Math.round(performanceData.reduce((a, b) => a + b, 0) / performanceData.length);
      log(`⚙️ Dernier chargement: ${pageLoadTime}ms`);
      log(`📊 Moyenne sur ${performanceData.length} page(s): ${avg}ms — ${avg < 1000 ? 'Rapide ✓' : avg < 3000 ? 'Normal' : 'Lent ⚠️'}`);
    } else {
      log('⚙️ Chargez une page pour voir les statistiques');
    }
  });

  passwordManagerButton.addEventListener('click', () => {
    passwordGenOverlay.classList.remove('hidden');
    refreshGeneratedPassword();
    log('🔐 Générateur de mot de passe ouvert');
  });

  closePasswordGenButton.addEventListener('click', () => {
    passwordGenOverlay.classList.add('hidden');
  });

  passwordGenOverlay.addEventListener('click', (event) => {
    if (event.target === passwordGenOverlay) passwordGenOverlay.classList.add('hidden');
  });

  regeneratePasswordButton.addEventListener('click', refreshGeneratedPassword);

  passwordLength.addEventListener('input', () => {
    passwordLengthValue.textContent = passwordLength.value;
    refreshGeneratedPassword();
  });

  [passwordUpper, passwordLower, passwordNumbers, passwordSymbols].forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const options = readPasswordOptions();
      if (!options.upper && !options.lower && !options.numbers && !options.symbols) {
        checkbox.checked = true; // au moins une option doit rester active
        toast('Au moins un type de caractère est requis', 'warn');
        return;
      }
      refreshGeneratedPassword();
    });
  });

  copyPasswordButton.addEventListener('click', () => {
    navigator.clipboard?.writeText(passwordOutput.value).catch(() => {});
    toast('Mot de passe copié dans le presse-papiers', 'success');
    log('📋 Mot de passe copié dans le presse-papiers');
  });

  // ===== Filtre lumière bleue / Mode nuit =====
  function applyNightFilter() {
    if (nightFilterEnabled) {
      const intensity = nightFilterIntensityValue2 / 100;
      webviewsContainer.style.filter = `sepia(${intensity * 0.6}) hue-rotate(${-20 * intensity}deg) brightness(${1 - intensity * 0.25}) saturate(${1 - intensity * 0.2})`;
    } else {
      webviewsContainer.style.filter = 'none';
    }
  }

  nightFilterToggle.addEventListener('click', () => {
    nightFilterEnabled = !nightFilterEnabled;
    localStorage.setItem('cyberBrowserNightFilter', nightFilterEnabled);
    nightFilterToggleState.textContent = nightFilterEnabled ? 'ON' : 'OFF';
    nightFilterToggleState.className = nightFilterEnabled ? 'text-cyber font-semibold' : 'text-rose-400 font-semibold';
    nightFilterIntensityWrap.classList.toggle('hidden', !nightFilterEnabled);
    applyNightFilter();
    log(`🌙 Filtre lumière bleue ${nightFilterEnabled ? 'activé' : 'désactivé'}`);
  });

  nightFilterIntensity.addEventListener('input', () => {
    nightFilterIntensityValue2 = parseInt(nightFilterIntensity.value, 10);
    nightFilterIntensityValue.textContent = nightFilterIntensityValue2 + '%';
    localStorage.setItem('cyberBrowserNightFilterIntensity', nightFilterIntensityValue2);
    applyNightFilter();
  });

  // Initialisation de l'état du filtre nuit au démarrage
  nightFilterIntensity.value = nightFilterIntensityValue2;
  nightFilterIntensityValue.textContent = nightFilterIntensityValue2 + '%';
  if (nightFilterEnabled) {
    nightFilterToggleState.textContent = 'ON';
    nightFilterToggleState.className = 'text-cyber font-semibold';
    nightFilterIntensityWrap.classList.remove('hidden');
    applyNightFilter();
  }

  // ===== Impression =====
  function printActiveTab() {
    const webview = getActiveWebview();
    if (webview && webview.contentWindow) {
      try {
        webview.contentWindow.print();
        log('🖨️ Impression lancée');
      } catch (e) {
        toast('Impression impossible sur cette page', 'error');
      }
    } else {
      toast('Aucun onglet actif à imprimer', 'warn');
    }
  }
  printButton.addEventListener('click', printActiveTab);

  // ===== Barre de recherche dans la page =====
  findInput.addEventListener('input', () => {
    findMatchIndex = 0;
    performFind(false);
  });
  findInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      performFind(event.shiftKey);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      closeFindBar();
    }
  });
  findNextButton.addEventListener('click', () => performFind(false));
  findPrevButton.addEventListener('click', () => performFind(true));
  findCloseButton.addEventListener('click', closeFindBar);

  // ===== Picture-in-Picture =====
  pipButton.addEventListener('click', () => {
    const webview = getActiveWebview();
    if (!webview) {
      toast('Aucun onglet actif', 'warn');
      return;
    }
    try {
      const doc = webview.contentDocument;
      if (!doc) {
        toast('Page inaccessible pour le PiP', 'error');
        return;
      }
      // Prend la plus grande vidéo visible de la page (le lecteur principal)
      const videos = Array.from(doc.querySelectorAll('video'));
      const video = videos.sort((a, b) => (b.videoWidth * b.videoHeight) - (a.videoWidth * a.videoHeight))[0];
      if (!video) {
        toast('Aucune vidéo trouvée sur cette page', 'warn');
        return;
      }
      if (doc.pictureInPictureElement) {
        doc.exitPictureInPicture().catch(() => {});
        return;
      }
      video.requestPictureInPicture()
        .then(() => {
          log('🖼️ Picture-in-Picture activé');
          toast('Vidéo incrustée activée', 'success');
        })
        .catch((err) => {
          toast('PiP non supporté sur cette vidéo', 'error');
          log(`❌ Échec PiP: ${err.message}`, 'error');
        });
    } catch (e) {
      toast('Impossible d\'activer le PiP sur cette page', 'error');
      log(`❌ Erreur PiP: ${e.message}`, 'error');
    }
  });

  // ===== Capture d'écran =====
  screenshotButton.addEventListener('click', async () => {
    log('📸 Capture d\'écran en cours...');
    const result = await electronApi.invoke('capture-screenshot');
    if (result && result.success) {
      toast(`Capture copiée dans le presse-papiers et enregistrée: ${result.filename}`, 'success');
      log(`📸 Capture enregistrée: ${result.savePath}`, 'success');
    } else {
      toast('Échec de la capture d\'écran', 'error');
      log(`❌ Échec de la capture: ${result?.error || 'erreur inconnue'}`, 'error');
    }
  });

  // ===== Gestionnaire de téléchargements =====
  function formatBytes(bytes) {
    if (!bytes || bytes <= 0) return '0 Ko';
    const units = ['o', 'Ko', 'Mo', 'Go'];
    let value = bytes;
    let unitIndex = 0;
    while (value >= 1024 && unitIndex < units.length - 1) {
      value /= 1024;
      unitIndex++;
    }
    return `${value.toFixed(1)} ${units[unitIndex]}`;
  }

  function renderDownloads() {
    if (downloads.length === 0) {
      downloadsList.innerHTML = '<p class="downloads-empty">Aucun téléchargement pour le moment.</p>';
      return;
    }
    downloadsList.innerHTML = downloads.slice().reverse().map((dl) => {
      const pct = dl.totalBytes > 0 ? Math.min(100, Math.round((dl.receivedBytes / dl.totalBytes) * 100)) : (dl.state === 'completed' ? 100 : 0);
      const statusClass = dl.state === 'completed' ? 'completed' : (dl.state && dl.state !== 'progressing' ? 'failed' : '');
      const statusLabel = dl.state === 'completed' ? 'Terminé ✓' : dl.state === 'progressing' ? `${pct}%` : dl.state ? `Échec (${dl.state})` : 'En cours...';
      return `
        <div class="download-item ${statusClass}" data-id="${dl.id}">
          <div class="download-item-name">${dl.filename}</div>
          <div class="download-progress-track"><div class="download-progress-fill" style="width:${pct}%"></div></div>
          <div class="download-item-meta">
            <span>${statusLabel} · ${formatBytes(dl.receivedBytes || dl.totalBytes)}</span>
            ${dl.state === 'completed' ? `<button class="show-in-folder-btn" data-path="${dl.savePath}">📁 Dossier</button>` : ''}
          </div>
        </div>`;
    }).join('');

    downloadsList.querySelectorAll('.show-in-folder-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        electronApi.invoke('show-download-in-folder', btn.dataset.path);
      });
    });
  }

  function updateDownloadsBadge() {
    const active = downloads.filter(d => d.state === 'progressing').length;
    if (active > 0) {
      downloadsBadge.textContent = active;
      downloadsBadge.classList.remove('hidden');
    } else {
      downloadsBadge.classList.add('hidden');
    }
  }

  async function refreshDownloadDirLabel() {
    const dir = await electronApi.invoke('get-download-dir');
    downloadsDirLabel.textContent = dir || '…';
    downloadsDirLabel.title = dir || '';
  }

  changeDownloadDirButton.addEventListener('click', async () => {
    const result = await electronApi.invoke('choose-download-dir');
    if (result && result.success) {
      toast('Dossier de téléchargement changé', 'success');
      log(`📁 Nouveau dossier de téléchargement: ${result.downloadDir}`, 'success');
      refreshDownloadDirLabel();
    }
  });

  if (typeof electronApi.onDownloadEvent === 'function') {
    electronApi.onDownloadEvent((data) => {
      if (data.type === 'started') {
        downloads.push({ id: data.id, filename: data.filename, totalBytes: data.totalBytes, receivedBytes: 0, state: 'progressing', savePath: data.savePath });
        toast(`Téléchargement démarré: ${data.filename}`, 'info');
      } else if (data.type === 'progress') {
        const dl = downloads.find(d => d.id === data.id);
        if (dl) {
          dl.receivedBytes = data.receivedBytes;
          dl.totalBytes = data.totalBytes;
        }
      } else if (data.type === 'done') {
        const dl = downloads.find(d => d.id === data.id);
        if (dl) {
          dl.state = data.state;
          dl.savePath = data.savePath;
          if (data.state === 'completed') {
            toast(`Téléchargement terminé: ${dl.filename}`, 'success');
          } else {
            toast(`Téléchargement échoué: ${dl.filename}`, 'error');
          }
        }
      }
      renderDownloads();
      updateDownloadsBadge();
    });
  }

  downloadsButton.addEventListener('click', () => {
    downloadsOverlay.classList.toggle('hidden');
    renderDownloads();
    refreshDownloadDirLabel();
  });

  closeDownloadsButton.addEventListener('click', () => {
    downloadsOverlay.classList.add('hidden');
  });

  downloadsOverlay.addEventListener('click', (event) => {
    if (event.target === downloadsOverlay) downloadsOverlay.classList.add('hidden');
  });

  clearDownloadsButton.addEventListener('click', () => {
    downloads = downloads.filter(d => d.state === 'progressing');
    renderDownloads();
    updateDownloadsBadge();
    toast('Liste des téléchargements effacée', 'info');
  });

  // ===== Recherche dans l'historique =====
  historySearchInput.addEventListener('input', () => {
    renderHistory(historySearchInput.value);
  });

  // ===== Export / import des favoris (fichier JSON réel) =====
  exportFavoritesButton.addEventListener('click', async () => {
    if (favorites.length === 0) {
      toast('Aucun favori à exporter', 'warn');
      return;
    }
    const result = await electronApi.invoke('export-favorites', JSON.stringify(favorites, null, 2));
    if (result && result.success) {
      toast(`Favoris exportés vers ${result.filePath}`, 'success');
      log(`⭐ Favoris exportés: ${result.filePath}`, 'success');
    } else if (result && !result.canceled) {
      toast('Échec de l\'export des favoris', 'error');
    }
  });

  importFavoritesButton.addEventListener('click', async () => {
    const result = await electronApi.invoke('import-favorites');
    if (result && result.success) {
      const imported = Array.isArray(result.data) ? result.data : [];
      let added = 0;
      imported.forEach((fav) => {
        if (fav && fav.url && !favorites.some(f => f.url === fav.url)) {
          favorites.push({ url: fav.url, title: fav.title || fav.url });
          added++;
        }
      });
      localStorage.setItem('cyberBrowserFavorites', JSON.stringify(favorites));
      renderFavorites();
      toast(`${added} favori(s) importé(s)`, 'success');
      log(`⭐ ${added} favori(s) importé(s) depuis un fichier JSON`, 'success');
    } else if (result && !result.canceled) {
      toast('Échec de l\'import des favoris (fichier invalide ?)', 'error');
    }
  });

  // ===== Extensions (dossier non empaqueté) =====
  function renderExtensions(list) {
    if (!list || list.length === 0) {
      extensionsList.innerHTML = '<div class="text-slate-400 text-xs text-center py-2">Aucune extension chargée</div>';
      return;
    }
    extensionsList.innerHTML = '';
    list.forEach((ext) => {
      const row = document.createElement('div');
      row.className = 'flex items-center justify-between group py-1';

      const info = document.createElement('div');
      info.className = 'flex-1 min-w-0';
      const nameEl = document.createElement('div');
      nameEl.className = 'text-slate-200 text-xs truncate';
      nameEl.textContent = `${ext.name} `;
      const versionEl = document.createElement('span');
      versionEl.className = 'text-slate-500';
      versionEl.textContent = `v${ext.version}`;
      nameEl.appendChild(versionEl);
      info.appendChild(nameEl);
      if (ext.error) {
        const errEl = document.createElement('div');
        errEl.className = 'text-rose-400 text-[10px] truncate';
        errEl.textContent = `⚠️ ${ext.error}`;
        info.appendChild(errEl);
      }

      const actions = document.createElement('div');
      actions.className = 'flex items-center gap-2 flex-shrink-0';

      const toggleBtn = document.createElement('button');
      toggleBtn.className = ext.enabled ? 'text-cyber text-xs font-semibold' : 'text-rose-400 text-xs font-semibold';
      toggleBtn.textContent = ext.enabled ? 'ON' : 'OFF';
      toggleBtn.title = ext.enabled ? 'Désactiver' : 'Activer';
      toggleBtn.onclick = async () => {
        const result = await electronApi.invoke('toggle-extension', ext.id, !ext.enabled);
        if (result && result.success) {
          toast(`Extension ${!ext.enabled ? 'activée' : 'désactivée'} — rechargez la page`, 'success');
          refreshExtensions();
        } else {
          toast(result?.error || 'Échec', 'error');
        }
      };

      const removeBtn = document.createElement('button');
      removeBtn.className = 'text-rose-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity';
      removeBtn.textContent = '×';
      removeBtn.title = 'Supprimer';
      removeBtn.onclick = async () => {
        const result = await electronApi.invoke('remove-extension', ext.id);
        if (result && result.success) {
          toast('Extension supprimée', 'info');
          refreshExtensions();
        }
      };

      actions.appendChild(toggleBtn);
      actions.appendChild(removeBtn);
      row.appendChild(info);
      row.appendChild(actions);
      extensionsList.appendChild(row);
    });
  }

  async function refreshExtensions() {
    const list = await electronApi.invoke('get-extensions');
    renderExtensions(list || []);
  }

  loadExtensionButton.addEventListener('click', async () => {
    log('🧩 Sélection du dossier de l\'extension...');
    const result = await electronApi.invoke('load-extension');
    if (result && result.success) {
      toast(`Extension "${result.extension.name}" installée — rechargez la page`, 'success');
      log(`🧩 Extension installée: ${result.extension.name} v${result.extension.version}`, 'success');
      refreshExtensions();
    } else if (result && !result.canceled) {
      toast(result.error || 'Échec du chargement de l\'extension', 'error');
      log(`❌ Échec extension: ${result.error}`, 'error');
    }
  });

  refreshExtensions();
  refreshDownloadDirLabel();

  themeSelect.addEventListener('change', (event) => {
    applyTheme(event.target.value);
  });

  searchEngineSelect.addEventListener('change', (event) => {
    searchEngine = event.target.value;
    const labels = { google: 'Google', duckduckgo: 'DuckDuckGo', brave: 'Brave Search', ecosia: 'Ecosia 🌱' };
    log(`Moteur de recherche changé: ${labels[searchEngine] || searchEngine}`);
    saveSession();
  });

  securityScanToggle.addEventListener('click', async () => {
    securityScanEnabled = !securityScanEnabled;
    await electronApi.invoke('set-security-scan', securityScanEnabled);
    renderSecurityScanToggle();
    log(`Scanner de sécurité ${securityScanEnabled ? 'activé' : 'désactivé'}`);
    const activeWebview = getActiveWebview();
    updateSecurityPanel(activeWebview ? activeWebview.src : addressBar.value);
  });

  addFavoriteButton.addEventListener('click', async () => {
    const activeWebview = getActiveWebview();
    const tab = tabs.find(t => t.id === activeTabId);
    if (!activeWebview || !tab) {
      toast('Aucune page chargée pour ajouter aux favoris', 'warn');
      return;
    }

    const currentUrl = tab.history[tab.historyIndex] || tab.url;
    if (isInternalPage(currentUrl)) {
      toast('Aucune page chargée pour ajouter aux favoris', 'warn');
      return;
    }

    let title = tab.title || currentUrl;
    try {
      if (activeWebview.contentDocument && activeWebview.contentDocument.title) {
        title = activeWebview.contentDocument.title;
      }
    } catch (e) { /* contenu inaccessible, on garde le titre connu */ }

    addFavorite(currentUrl, title);
  });

  searchInPageButton.addEventListener('click', searchInPage);

  // Initialisation finale
  renderTrackerToggle();
  renderVpnToggle();
  renderTorToggle();
  renderFastVpnToggle();
  renderAdBlockerToggle();
  renderDntToggle();
  renderCookieBlockerToggle();
  renderPopupBlockerToggle();
  renderSecurityScanToggle();
  renderReaderModeToggle();
  renderTabManager();

  // ── TUTORIEL DE BIENVENUE ────────────────────────────────────────────
  helpButton.addEventListener('click', openOnboarding);
  onboardingSkip.addEventListener('click', closeOnboarding);
  onboardingNext.addEventListener('click', () => {
    if (onboardingStep < ONBOARDING_STEPS.length - 1) {
      onboardingStep++;
      renderOnboardingStep();
    } else {
      closeOnboarding();
    }
  });

  let onboardingSeen = false;
  try { onboardingSeen = localStorage.getItem('cyberBrowserOnboardingSeen') === '1'; } catch (e) { /* ignore */ }
  if (!onboardingSeen) {
    openOnboarding();
  }
});

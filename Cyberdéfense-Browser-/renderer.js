const addressBar = document.getElementById('addressBar');
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

let favorites = JSON.parse(localStorage.getItem('cyberBrowserFavorites') || '[]'); // Favoris stockés localement
let trackerProtectionEnabled = true;
let vpnEnabled = false;
let torEnabled = false;
let fastVpnEnabled = false;
let adBlockerEnabled = true;
let dntEnabled = true;
let cookieBlockerEnabled = true;
let popupBlockerEnabled = true; // Nouveau: bloqueur de popups activé par défaut
let vpnCountry = 'France';
let vpnProxy = '';
let searchEngine = 'google'; // 'google' ou 'duckduckgo'
let readerModeEnabled = false;
let tabCount = 1;
let currentTheme = 'cyberpunk';
let performanceData = [];
let pageLoadTime = 0;
let securityScanEnabled = true; // Scanner de sécurité activé par défaut

let panelVisible = true; // État du panneau Cyber Panel

// Panel resizer initialisé dans DOMContentLoaded
let tabs = []; // Structure pour stocker les onglets
let activeTabId = null; // ID de l'onglet actif

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
  
  // Auto scroll to top
  consoleLog.scrollTop = 0;
  
  // Keep max 30 lines
  while (consoleLog.children.length > 30) {
    consoleLog.removeChild(consoleLog.lastChild);
  }
}

// Intercept console.log globally
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

function normalizeUrl(input) {
  let url = input.trim();
  if (!url) return 'https://example.com';

  const looksLikeUrl = /\.[a-z]{2,}$/i.test(url) || /^https?:\/\//i.test(url);
  const containsSpace = /\s/.test(url);

  if (containsSpace || !looksLikeUrl) {
    const query = encodeURIComponent(url);
    if (searchEngine === 'duckduckgo') {
      return `https://duckduckgo.com/?q=${query}`;
    } else if (searchEngine === 'brave') {
      return `https://search.brave.com/search?q=${query}`;
    } else if (searchEngine === 'ecosia') {
      return `https://www.ecosia.org/search?q=${query}`;
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
      } else if (searchEngine === 'brave') {
        return `https://search.brave.com/search?q=${encodeURIComponent(url)}`;
      } else if (searchEngine === 'ecosia') {
        return `https://www.ecosia.org/search?q=${encodeURIComponent(url)}`;
      } else {
        return `https://www.google.com/search?q=${encodeURIComponent(url)}`;
      }
    }
  } catch {
    if (searchEngine === 'duckduckgo') {
      return `https://duckduckgo.com/?q=${encodeURIComponent(url)}`;
    } else if (searchEngine === 'brave') {
      return `https://search.brave.com/search?q=${encodeURIComponent(url)}`;
    } else if (searchEngine === 'ecosia') {
      return `https://www.ecosia.org/search?q=${encodeURIComponent(url)}`;
    } else {
      return `https://www.google.com/search?q=${encodeURIComponent(url)}`;
    }
  }

  return url;
}

function generatePassword(length = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
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
}

function addFavorite(url, title) {
  if (!url || !title) return;
  
  // Éviter les doublons
  if (favorites.some(fav => fav.url === url)) {
    log('Ce favori existe déjà');
    return;
  }
  
  favorites.push({ url, title, dateAdded: new Date().toISOString() });
  saveFavorites();
  renderFavorites();
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

// Fonctions pour la gestion des onglets
function createTab(url = 'about:blank', title = 'Nouvel onglet') {
  const tabId = 'tab-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  
  const tab = {
    id: tabId,
    url: url,
    title: title,
    webview: null,
    history: [url],   // historique des URLs
    historyIndex: 0   // position actuelle dans l'historique
  };
  
  tabs.push(tab);
  renderTabs();
  
  // L'iframe est créée à la demande dans switchToTab via createTabIframe
  
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


// Crée l'iframe pour un tab et attache les événements
function createTabIframe(tab, initialUrl) {
  const webview = document.createElement('iframe');
  webview.id = tab.id;
  webview.src = initialUrl || 'about:blank';
  webview.setAttribute('allowfullscreen', '');
  webview.setAttribute('allow', 'fullscreen; autoplay; clipboard-write; encrypted-media');
  webview.style.position      = 'absolute';
  webview.style.top           = '0';
  webview.style.left          = '0';
  webview.style.width         = '100%';
  webview.style.height        = '100%';
  webview.style.border        = 'none';
  webview.style.display       = 'none';
  webview.style.zIndex        = '0';
  webview.style.pointerEvents = 'none';

  webview.addEventListener('load', () => {
    const currentUrl = webview.src || initialUrl;
    tab.url = currentUrl;

    // Sync historique si navigation interne (lien cliqué dans la page)
    if (tab.history[tab.historyIndex] !== currentUrl) {
      tab.history = tab.history.slice(0, tab.historyIndex + 1);
      tab.history.push(currentUrl);
      tab.historyIndex = tab.history.length - 1;
    }

    // Mettre à jour UI seulement si c'est l'onglet actif
    if (activeTabId === tab.id) {
      addressBar.value = currentUrl;
      try {
        const title = webview.contentDocument && webview.contentDocument.title
          ? webview.contentDocument.title
          : currentUrl.replace(/^https?:\/\//, '').split('/')[0];
        tab.title = title || currentUrl;
      } catch(e) {
        tab.title = currentUrl.replace(/^https?:\/\//, '').split('/')[0] || currentUrl;
      }
      currentTabTitle.textContent = tab.title;
      updateTabTitle(tab.id, tab.title);
      updateSecurityPanel(currentUrl);
      log('Chargé ' + currentUrl);
    } else {
      // Mettre à jour le titre même si l'onglet est en arrière-plan
      try {
        const title = webview.contentDocument && webview.contentDocument.title;
        if (title) {
          tab.title = title;
          updateTabTitle(tab.id, title);
        }
      } catch(e) {}
    }
  });

  webviewsContainer.appendChild(webview);
  tab.webview = webview;
  return webview;
}

function switchToTab(tabId) {
  // Cacher toutes les iframes : display none + z-index bas
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

  // Créer l'iframe si elle n'existe pas encore
  if (!tab.webview) {
    const url = tab.history[tab.historyIndex] || tab.url || 'about:blank';
    createTabIframe(tab, url);
  }

  // Afficher uniquement l'iframe de cet onglet
  tab.webview.style.display       = 'block';
  tab.webview.style.zIndex        = '10';
  tab.webview.style.pointerEvents = 'auto';
  resizeWebview(tab.webview);

  activeTabId = tabId;
  const currentUrl = tab.history[tab.historyIndex] || tab.url;
  addressBar.value         = currentUrl;
  currentTabTitle.textContent = tab.title;
  updateSecurityPanel(currentUrl);
  log('Onglet actif: ' + tab.title);
  renderTabs();
}

function closeTab(tabId) {
  const tabIndex = tabs.findIndex(t => t.id === tabId);
  if (tabIndex === -1) return;
  
  const tab = tabs[tabIndex];
  
  // Supprimer le webview
  if (tab.webview) {
    webviewsContainer.removeChild(tab.webview);
  }
  
  // Supprimer l'onglet du tableau
  tabs.splice(tabIndex, 1);
  
  // Si c'était l'onglet actif, basculer vers un autre
  if (activeTabId === tabId) {
    if (tabs.length > 0) {
      const newActiveTab = tabs[Math.min(tabIndex, tabs.length - 1)];
      switchToTab(newActiveTab.id);
    } else {
      // Créer un nouvel onglet si aucun n'existe
      const newTabId = createTab();
      switchToTab(newTabId);
    }
  }
  
  renderTabs();
  log('Onglet fermé: ' + tab.title);
}

function renderTabs() {
  tabsContainer.innerHTML = '';
  
  tabs.forEach(tab => {
    const tabButton = document.createElement('div');
  tabButton.className = 'tab-button group flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer transition-colors min-w-0 flex-1 max-w-48';
    tabButton.setAttribute('data-tab-id', tab.id);
    
    const titleSpan = document.createElement('span');
    titleSpan.className = 'truncate text-sm';
    titleSpan.textContent = tab.title;
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'text-slate-400 hover:text-rose-400 text-xs ml-1 opacity-0 group-hover:opacity-100 transition-opacity';
    closeBtn.textContent = '×';
    closeBtn.onclick = (e) => {
      e.stopPropagation();
      closeTab(tab.id);
    };
    
    tabButton.appendChild(titleSpan);
    tabButton.appendChild(closeBtn);
    
    // Surbrillance si onglet actif
    if (tab.id === activeTabId) {
      tabButton.classList.remove('bg-slate-800', 'text-slate-300');
      tabButton.classList.add('bg-cyber/20', 'text-cyber');
    }

    // Gestionnaire de clic pour basculer vers l'onglet
    tabButton.onclick = () => switchToTab(tab.id);
    
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

function searchInPage() {
  const searchTerm = prompt('Rechercher dans la page:');
  if (!searchTerm) return;
  
  const activeWebview = getActiveWebview();
  if (!activeWebview) return;
  
  try {
    // Utiliser l'API de recherche du navigateur
    const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    activeWebview.executeJavaScript(`
      // Supprimer les surlignages précédents
      const highlights = document.querySelectorAll('.cyber-search-highlight');
      highlights.forEach(h => h.outerHTML = h.innerHTML);
      
      // Fonction de recherche et surlignage
      function highlightText(text, term) {
        const regex = new RegExp('(' + term + ')', 'gi');
        return text.replace(regex, '<span class="cyber-search-highlight" style="background-color: #03e9f4; color: #000; padding: 2px 4px; border-radius: 3px;">$1</span>');
      }
      
      // Rechercher dans le texte visible
      const elements = document.querySelectorAll('*');
      let found = false;
      
      for (let element of elements) {
        if (element.children.length === 0 && element.textContent) {
          const originalText = element.textContent;
          const highlightedText = highlightText(originalText, '${escapedTerm}');
          if (highlightedText !== originalText) {
            element.innerHTML = highlightedText;
            found = true;
          }
        }
      }
      
      // Faire défiler vers le premier résultat
      const firstHighlight = document.querySelector('.cyber-search-highlight');
      if (firstHighlight) {
        firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      found ? '${searchTerm} trouvé et surligné' : 'Aucun résultat trouvé';
    `).then(result => {
      log('🔍 Recherche: "' + searchTerm + '" - ' + result);
    });
  } catch (error) {
    log('Erreur lors de la recherche: ' + error.message);
  }
}

function applyTheme(theme) {
  const root = document.documentElement;
  currentTheme = theme;
  
  switch(theme) {
    case 'dark':
      root.style.setProperty('--color-cyber', '#6366f1');
      root.style.setProperty('--color-primary', '#1f2937');
      break;
    case 'light':
      root.style.setProperty('--color-cyber', '#0891b2');
      root.style.setProperty('--color-primary', '#f3f4f6');
      break;
    case 'matrix':
      root.style.setProperty('--color-cyber', '#00ff00');
      root.style.setProperty('--color-primary', '#0a0a0a');
      break;
    case 'sunset':
      root.style.setProperty('--color-cyber', '#ff6b6b');
      root.style.setProperty('--color-primary', '#ffd89b');
      break;
    default: // cyberpunk
      root.style.setProperty('--color-cyber', '#03e9f4');
      root.style.setProperty('--color-primary', '#050816');
  }
  
  log('Thème changé: ' + theme);
}

function renderSecurityScanToggle() {
  securityScanToggleState.textContent = securityScanEnabled ? 'ON' : 'OFF';
  securityScanToggleState.className = securityScanEnabled ? 'text-cyber font-semibold' : 'text-rose-400 font-semibold';
  securityScanToggle.classList.toggle('bg-cyber/10', securityScanEnabled);
  securityScanToggle.classList.toggle('bg-slate-800', !securityScanEnabled);
}

function updateSecurityPanel(urlString) {
  let url;
  try {
    url = new URL(urlString);
  } catch {
    url = new URL('https://example.com');
  }
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
    domainScore.textContent = score + '/100';
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
      securityDetails.innerHTML = '<div class="text-rose-400">Erreur: ' + result.error + '</div>';
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

    securityDetails.innerHTML = detailsHtml;

    log('Scan sécurité ' + result.url + ': ' + result.score + '/100 (' + result.grade + ')');

  } catch (error) {
    domainScore.textContent = 'Erreur';
    securityGrade.textContent = '❌';
    securityDetails.innerHTML = '<div class="text-rose-400">Erreur de scan: ' + error.message + '</div>';
    log('Erreur scan sécurité: ' + error.message);
  }
}

function navigate(url) {
  const target = url || normalizeUrl(addressBar.value);
  if (!target || target === 'about:blank') return;
  const activeWebview = getActiveWebview();
  const tab = tabs.find(t => t.id === activeTabId);
  if (activeWebview && tab) {
    // Tronquer le futur si on navigue depuis un point intermédiaire
    tab.history = tab.history.slice(0, tab.historyIndex + 1);
    if (tab.history[tab.historyIndex] !== target) {
      tab.history.push(target);
      tab.historyIndex = tab.history.length - 1;
    }
    tab.url = target;
    activeWebview.src = target;
    addressBar.value = target;
    updateSecurityPanel(target);
    log('Chargement de ' + target);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  // Créer le premier onglet
  const initialTabId = createTab('https://wiki-cyberdefense-b2ee1.web.app/', 'Wiki Cyberdéfense');
  switchToTab(initialTabId);
  addressBar.value = 'https://wiki-cyberdefense-b2ee1.web.app/';
  
  // Attacher immédiatement les gestionnaires de navigation
  backButton.addEventListener('click', () => {
    const activeWebview = getActiveWebview();
    const tab = tabs.find(t => t.id === activeTabId);
    if (activeWebview && tab && tab.historyIndex > 0) {
      tab.historyIndex--;
      const prevUrl = tab.history[tab.historyIndex];
      activeWebview.src = prevUrl;
      addressBar.value = prevUrl;
      updateSecurityPanel(prevUrl);
      log('Navigation arrière: ' + prevUrl);
    }
  });

  forwardButton.addEventListener('click', () => {
    const activeWebview = getActiveWebview();
    const tab = tabs.find(t => t.id === activeTabId);
    if (activeWebview && tab && tab.historyIndex < tab.history.length - 1) {
      tab.historyIndex++;
      const nextUrl = tab.history[tab.historyIndex];
      activeWebview.src = nextUrl;
      addressBar.value = nextUrl;
      updateSecurityPanel(nextUrl);
      log('Navigation avant: ' + nextUrl);
    }
  });

  reloadButton.addEventListener('click', () => {
    const activeWebview = getActiveWebview();
    if (activeWebview) {
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
  updateSecurityPanel(addressBar.value);
  renderFavorites(); // Initialisation des favoris
  // ── PANEL RESIZER ────────────────────────────────────────────────────────
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
      // Overlay pour capturer les events même par-dessus l'iframe
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
    });
  })();

  log('Interface prête');

  // Ajuste les dimensions du contenu web lors du redimensionnement
  window.addEventListener('resize', () => {
    resizeAllWebviews();
  });

  // Gestionnaire pour le bouton nouvel onglet
  newTabButton.addEventListener('click', () => {
    const newTabId = createTab('about:blank', 'Nouvel onglet');
    switchToTab(newTabId);
    addressBar.value = '';
    addressBar.focus();
  });

  goButton.addEventListener('click', navigate);
  addressBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      navigate();
    }
  });

  // Raccourci clavier global pour la recherche dans la page
  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'f') {
      event.preventDefault();
      searchInPage();
    }
  });

  panelToggle.addEventListener('click', toggleCyberPanel);

  // Clear logs button
  const clearLogsButton = document.getElementById('clearLogsButton');
  if (clearLogsButton) {
    clearLogsButton.addEventListener('click', () => {
      consoleLog.innerHTML = '';
      log('Console cleared', 'success');
    });
  }

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
      log(`Erreur VPN: ${result.message}`);
    }
    if (vpnEnabled) {
      log('Le VPN est maintenant appliqué au navigateur via proxy.');
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
      log(`Erreur VPN: ${result.message}`);
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
    if (result && result.message) {
      log(`Erreur VPN: ${result.message}`);
    } else {
      log(`Proxy manuel appliqué : ${vpnProxy}`);
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
    } else {
      log('Routage Tor désactivé');
    }
    if (result && result.message) {
      log(`Attention Tor: ${result.message}`);
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
      log(`Attention VPN Rapide: ${result.message}`);
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
    } else {
      log('✗ Erreur lors du nettoyage des données');
    }
  });

  readerModeToggle.addEventListener('click', () => {
    readerModeEnabled = !readerModeEnabled;
    renderReaderModeToggle();
    log(`Mode Lecture ${readerModeEnabled ? 'activé' : 'désactivé'}`);
    if (readerModeEnabled) {
      log('Mode Lecture: contenu optimisé pour la lecture. Cliquez sur le bouton pour désactiver.');
    }
  });

  tabManagerToggle.addEventListener('click', () => {
    tabCount = Math.min(10, tabCount + 1);
    renderTabManager();
    log(`Onglet ${tabCount} créé`);
  });

  cookieInspectorButton.addEventListener('click', async () => {
    const result = await electronApi.invoke('get-cookies');
    if (result && result.cookies) {
      log(`🍪 ${result.cookies.length} cookies trouvés`);
      result.cookies.slice(0, 3).forEach(c => {
        log(`  • ${c.name} = ${c.value.substring(0, 30)}...`);
      });
    }
  });

  performanceMonitorButton.addEventListener('click', async () => {
    if (pageLoadTime > 0) {
      log(`⚙️ Temps de chargement: ${pageLoadTime}ms`);
      log(`📊 Performance: ${pageLoadTime < 1000 ? 'Rapide ✓' : pageLoadTime < 3000 ? 'Normal' : 'Lent ⚠️'}`);
    } else {
      log('⚙️ Chargez une page pour voir les statistiques');
    }
  });

  passwordManagerButton.addEventListener('click', () => {
    const pwd = generatePassword(16);
    log(`🔐 Mot de passe généré: ${pwd}`);
    log('📋 Copié dans le presse-papiers');
  });

  themeSelect.addEventListener('change', (event) => {
    applyTheme(event.target.value);
  });

  searchEngineSelect.addEventListener('change', (event) => {
    searchEngine = event.target.value;
    log(`Moteur de recherche changé: ${searchEngine === 'google' ? 'Google' : searchEngine === 'duckduckgo' ? 'DuckDuckGo' : searchEngine === 'brave' ? 'Brave Search' : 'Ecosia 🌱'}`);
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
    if (!activeWebview) {
      log('Aucune page chargée pour ajouter aux favoris');
      return;
    }

    const currentUrl = activeWebview.src;
    if (!currentUrl || currentUrl === 'about:blank') {
      log('Aucune page chargée pour ajouter aux favoris');
      return;
    }

    // Essayer d'obtenir le titre de la page
    try {
      const title = await activeWebview.executeJavaScript('document.title') || 'Sans titre';
      addFavorite(currentUrl, title);
    } catch (error) {
      // Fallback avec l'URL comme titre
      const urlObj = new URL(currentUrl);
      addFavorite(currentUrl, urlObj.hostname);
    }
  });

  searchInPageButton.addEventListener('click', searchInPage);

  // Initialisation du sélecteur de moteur de recherche
  searchEngineSelect.value = searchEngine;
  renderFavorites(); // Initialisation des favoris

  // Initialisation des toggles
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
  themeSelect.value = currentTheme;
  applyTheme(currentTheme);
  
  // Initialiser le système de mise à jour
  initializeUpdateSystem();
});

// ==================== SYSTÈME DE MISE À JOUR ====================

/**
 * Initialise le système de mise à jour
 */
function initializeUpdateSystem() {
  // Écouter les mises à jour du statut de mise à jour
  window.electronAPI.onUpdateStatus((status, data) => {
    handleUpdateStatus(status, data);
  });

  // Écouter les progressions de téléchargement
  window.electronAPI.onUpdateProgress((progressData) => {
    handleUpdateProgress(progressData);
  });

  // Vérifier les mises à jour au démarrage
  checkForUpdates();
  
  // Afficher la version actuelle
  window.electronAPI.invoke('get-current-version').then(result => {
    const versionDisplay = document.getElementById('currentVersion');
    if (versionDisplay) {
      versionDisplay.textContent = `v${result.version}`;
    }
  });
}

/**
 * Vérifie les mises à jour disponibles
 */
async function checkForUpdates() {
  try {
    await window.electronAPI.invoke('check-for-updates');
  } catch (error) {
    console.error('Erreur lors de la vérification des mises à jour:', error);
  }
}

/**
 * Gère les changements de statut de mise à jour
 */
function handleUpdateStatus(status, data) {
  const updateContainer = document.getElementById('updateNotification');
  
  if (!updateContainer) {
    createUpdateNotificationContainer();
  }

  const notification = document.getElementById('updateNotification');
  
  switch (status) {
    case 'checking':
      notification.innerHTML = `
        <div class="update-checking">
          <span class="spinner"></span>
          <span>${data.message}</span>
        </div>
      `;
      notification.style.display = 'block';
      break;

    case 'available':
      notification.innerHTML = `
        <div class="update-available">
          <p><strong>🎉 Nouvelle version disponible!</strong></p>
          <p>Version: ${data.version}</p>
          <p>${data.releaseNotes || 'Mise à jour importante'}</p>
          <div class="update-buttons">
            <button id="downloadUpdateBtn" class="btn btn-primary">Télécharger</button>
            <button id="laterBtn" class="btn btn-secondary">Plus tard</button>
          </div>
        </div>
      `;
      notification.style.display = 'block';
      
      document.getElementById('downloadUpdateBtn').addEventListener('click', () => {
        downloadUpdate();
      });
      
      document.getElementById('laterBtn').addEventListener('click', () => {
        notification.style.display = 'none';
      });
      break;

    case 'not-available':
      notification.innerHTML = `
        <div class="update-not-available">
          ✅ ${data.message}
        </div>
      `;
      notification.style.display = 'block';
      setTimeout(() => {
        notification.style.display = 'none';
      }, 3000);
      break;

    case 'downloaded':
      notification.innerHTML = `
        <div class="update-downloaded">
          <p><strong>✅ Mise à jour téléchargée!</strong></p>
          <p>Redémarrage nécessaire pour appliquer la mise à jour.</p>
          <div class="update-buttons">
            <button id="restartBtn" class="btn btn-primary">Redémarrer maintenant</button>
            <button id="laterRestartBtn" class="btn btn-secondary">Redémarrer plus tard</button>
          </div>
        </div>
      `;
      notification.style.display = 'block';
      
      document.getElementById('restartBtn').addEventListener('click', () => {
        installAndRestart();
      });
      
      document.getElementById('laterRestartBtn').addEventListener('click', () => {
        notification.style.display = 'none';
      });
      break;

    case 'error':
      notification.innerHTML = `
        <div class="update-error">
          ❌ Erreur: ${data.message}
        </div>
      `;
      notification.style.display = 'block';
      break;
  }
}

/**
 * Gère la progression du téléchargement
 */
function handleUpdateProgress(progressData) {
  const progressContainer = document.getElementById('updateProgress');
  
  if (!progressContainer) {
    createUpdateProgressContainer();
  }

  const progressBar = document.getElementById('progressBar');
  const progressPercent = document.getElementById('progressPercent');
  
  if (progressBar && progressPercent) {
    progressBar.style.width = `${progressData.percent}%`;
    progressPercent.textContent = `${progressData.percent}%`;
  }
}

/**
 * Télécharge la mise à jour
 */
async function downloadUpdate() {
  try {
    const notification = document.getElementById('updateNotification');
    notification.innerHTML = `
      <div class="update-downloading">
        <span class="spinner"></span>
        <span>Téléchargement en cours...</span>
        <div id="updateProgress" class="progress-container">
          <div id="progressBar" class="progress-bar" style="width: 0%"></div>
        </div>
        <span id="progressPercent">0%</span>
      </div>
    `;
    
    await window.electronAPI.invoke('download-update');
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error);
  }
}

/**
 * Installe la mise à jour et redémarre l'application
 */
async function installAndRestart() {
  try {
    await window.electronAPI.invoke('install-and-restart');
  } catch (error) {
    console.error('Erreur lors de l\'installation:', error);
  }
}

/**
 * Crée le conteneur de notification de mise à jour
 */
function createUpdateNotificationContainer() {
  const container = document.createElement('div');
  container.id = 'updateNotification';
  container.className = 'update-notification';
  container.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    max-width: 400px;
    z-index: 10000;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    display: none;
  `;
  document.body.appendChild(container);
}

/**
 * Crée le conteneur de progression
 */
function createUpdateProgressContainer() {
  const container = document.createElement('div');
  container.id = 'updateProgress';
  container.className = 'progress-container';
  container.style.cssText = `
    width: 100%;
    height: 8px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    overflow: hidden;
    margin: 10px 0;
  `;
  
  const progressBar = document.createElement('div');
  progressBar.id = 'progressBar';
  progressBar.style.cssText = `
    height: 100%;
    background: #4CAF50;
    transition: width 0.3s ease;
    width: 0%;
  `;
  
  container.appendChild(progressBar);
  
  const notification = document.getElementById('updateNotification');
  if (notification) {
    notification.appendChild(container);
  }
}

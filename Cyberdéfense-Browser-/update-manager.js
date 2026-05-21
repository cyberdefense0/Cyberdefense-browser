const { app, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const fs = require('fs');
const path = require('path');

// Configuration de electron-updater
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

let updateCheckInterval = null;

const UpdateManager = {
  mainWindow: null,
  
  /**
   * Initialise le gestionnaire de mises à jour
   */
  init(mainWindow) {
    this.mainWindow = mainWindow;
    
    // Configuration des événements de mise à jour
    autoUpdater.on('checking-for-update', () => {
      this.log('Vérification des mises à jour...', 'info');
      this.sendToRenderer('update-status', { 
        status: 'checking',
        message: 'Vérification des mises à jour...'
      });
    });
    
    autoUpdater.on('update-available', (info) => {
      this.log(`Nouvelle version disponible: ${info.version}`, 'success');
      this.sendToRenderer('update-status', {
        status: 'available',
        message: `Nouvelle version disponible: ${info.version}`,
        version: info.version,
        releaseDate: info.releaseDate,
        releaseNotes: info.releaseNotes
      });
    });
    
    autoUpdater.on('update-not-available', () => {
      this.log('Vous avez la dernière version', 'info');
      this.sendToRenderer('update-status', {
        status: 'not-available',
        message: 'Vous avez la dernière version'
      });
    });
    
    autoUpdater.on('error', (error) => {
      this.log(`Erreur de mise à jour: ${error}`, 'error');
      this.sendToRenderer('update-status', {
        status: 'error',
        message: `Erreur: ${error.message}`
      });
    });
    
    autoUpdater.on('download-progress', (progressObj) => {
      const percent = Math.round(progressObj.percent);
      this.log(`Téléchargement: ${percent}%`, 'info');
      this.sendToRenderer('update-progress', {
        percent,
        bytesPerSecond: progressObj.bytesPerSecond,
        total: progressObj.total,
        transferred: progressObj.transferred
      });
    });
    
    autoUpdater.on('update-downloaded', () => {
      this.log('Mise à jour téléchargée, prête à être installée', 'success');
      this.sendToRenderer('update-status', {
        status: 'downloaded',
        message: 'Mise à jour téléchargée. Redémarrage nécessaire.'
      });
    });
    
    // Vérifier les mises à jour au démarrage
    setTimeout(() => this.checkForUpdates(), 3000);
    
    // Vérifier périodiquement (toutes les heures)
    updateCheckInterval = setInterval(() => {
      this.checkForUpdates();
    }, 60 * 60 * 1000);
  },
  
  /**
   * Vérifie les mises à jour
   */
  checkForUpdates() {
    try {
      autoUpdater.checkForUpdates();
    } catch (error) {
      this.log(`Erreur lors de la vérification: ${error}`, 'error');
    }
  },
  
  /**
   * Télécharge la mise à jour
   */
  downloadUpdate() {
    try {
      this.log('Démarrage du téléchargement...', 'info');
      autoUpdater.downloadUpdate();
    } catch (error) {
      this.log(`Erreur du téléchargement: ${error}`, 'error');
      this.sendToRenderer('update-status', {
        status: 'error',
        message: `Erreur: ${error.message}`
      });
    }
  },
  
  /**
   * Installe la mise à jour et redémarre l'application
   */
  installAndRestart() {
    this.log('Installation de la mise à jour...', 'info');
    autoUpdater.quitAndInstall();
  },
  
  /**
   * Obtient les informations de version actuelles
   */
  getCurrentVersion() {
    return app.getVersion();
  },
  
  /**
   * Configure la source de mise à jour
   * @param {string} provider - 'github' ou 'custom'
   * @param {object} options - Options spécifiques au provider
   */
  setUpdateProvider(provider, options) {
    if (provider === 'github') {
      autoUpdater.setFeedURL({
        provider: 'github',
        owner: options.owner,
        repo: options.repo,
        updaterCacheDirName: 'cyberdefense-browser-updater'
      });
      this.log('Provider de mise à jour: GitHub', 'info');
    } else if (provider === 'custom') {
      autoUpdater.setFeedURL(options.url);
      this.log(`Provider de mise à jour: ${options.url}`, 'info');
    }
  },
  
  /**
   * Envoie un message au renderer
   */
  sendToRenderer(channel, data) {
    if (this.mainWindow && this.mainWindow.webContents) {
      this.mainWindow.webContents.send(channel, data);
    }
  },
  
  /**
   * Logs
   */
  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const icons = {
      'info': 'ℹ️ ',
      'success': '✅ ',
      'warn': '⚠️ ',
      'error': '❌ '
    };
    const icon = icons[type] || icons['info'];
    console.log(`[${timestamp}] ${icon} [UPDATE] ${message}`);
  },
  
  /**
   * Nettoie les ressources
   */
  destroy() {
    if (updateCheckInterval) {
      clearInterval(updateCheckInterval);
    }
  }
};

module.exports = UpdateManager;

# Configuration Complète du Système de Mise à Jour

## Configuration Rapide (2 minutes)

### 1. Définir votre Git Repository

```bash
# Dans package.json
{
  "build": {
    "publish": [
      {
        "provider": "github",
        "owner": "votre-username",
        "repo": "cybersecurity-browser"
      }
    ]
  }
}
```

### 2. Créer un Token GitHub

1. Allez sur : https://github.com/settings/tokens
2. Cliquez "Generate new token (classic)"
3. Sélectionnez les permissions : `repo`, `admin:repo_hook`, `workflow`
4. Copiez le token
5. Dans votre terminal :
   ```bash
   export GH_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

### 3. Publier une Mise à Jour

**Option A : Script Bash (Linux/Mac)**
```bash
chmod +x scripts/publish-update.sh
./scripts/publish-update.sh 1.2.0 github
```

**Option B : Script PowerShell (Windows)**
```powershell
.\scripts\publish-update.ps1 -Version "1.2.0" -Provider "github" -GithubToken "ghp_xxx"
```

**Option C : Manuellement**
```bash
# 1. Mettre à jour la version
nano package.json  # Changez "version": "1.2.0"

# 2. Commit et tag
git add package.json
git commit -m "Release v1.2.0"
git tag -a v1.2.0 -m "Version 1.2.0"
git push origin main --tags

# 3. Installer et construire
npm install
npm run build-all

# 4. Publier (si GitHub)
export GH_TOKEN=votre_token
npm run publish
```

## Architecture Technique

```
Application
    ↓
update-manager.js (electron-updater)
    ↓
Détecte nouvelle version
    ↓
renderer.js affiche notification
    ↓
Utilisateur clique "Télécharger"
    ↓
Download + Installation
    ↓
Redémarrage automatique
```

## Fichiers Modifiés

### package.json
- Ajout de `electron-updater` en dépendance
- Configuration `electron-builder` avec `publish`
- Script npm pour publier

### main.js
- Import de `update-manager.js`
- Initialisation dans `app.whenReady()`
- IPC handlers pour les contrôles

### renderer.js
- Interface utilisateur de mise à jour
- Gestion des événements de mise à jour
- Affichage de la progression

### preload.js
- API exposée pour la mise à jour
- Gestion des IPC

### update-manager.js (NOUVEAU)
- Logique complète de mise à jour
- Gestion des événements electron-updater
- Configuration du provider

## Cas d'Usage Courants

### Cas 1 : Mettre à jour de 1.1.0 à 1.2.0 (GitHub)

```bash
# 1. Préparez la release
cd /chemin/vers/repo
git checkout main
git pull

# 2. Mettez à jour la version
echo 'Changez "version" dans package.json de 1.1.0 à 1.2.0'
nano package.json

# 3. Publiez
chmod +x scripts/publish-update.sh
export GH_TOKEN=votre_token
./scripts/publish-update.sh 1.2.0

# Résultat:
# - Release créée sur GitHub
# - Les utilisateurs voient la notification en 1-2 minutes
# - Clic sur "Télécharger" lance la mise à jour
```

### Cas 2 : Utiliser un Serveur Personnalisé

**Sur le serveur (nginx/Apache):**

```nginx
server {
    listen 443 ssl;
    server_name updates.example.com;

    ssl_certificate /etc/ssl/certs/example.com.crt;
    ssl_certificate_key /etc/ssl/private/example.com.key;

    location /releases/ {
        alias /var/www/updates/releases/;
        types {
            application/octet-stream .deb;
            application/octet-stream .exe;
            text/yaml yml;
        }
    }
}
```

**Dans main.js:**

```javascript
UpdateManager.setUpdateProvider('custom', {
  url: 'https://updates.example.com/releases'
});
```

**Générer la configuration:**

```bash
SERVER_URL=https://updates.example.com npm run build-all
./scripts/generate-server-config.sh
# Cela génère latest.yml et latest-linux.yml
```

**Uploader les fichiers:**

```bash
scp dist/*.deb user@updates.example.com:/var/www/updates/releases/
scp dist/*.exe user@updates.example.com:/var/www/updates/releases/
scp dist/latest.yml user@updates.example.com:/var/www/updates/releases/
scp dist/latest-linux.yml user@updates.example.com:/var/www/updates/releases/
```

### Cas 3 : Tester Localement

```javascript
// Dans main.js, remplacer:
UpdateManager.setUpdateProvider('custom', {
  url: 'file:///path/to/dist'
});
```

## Sécurité

### Prote Protection du Token GitHub

```bash
# ❌ Ne pas faire
git push "https://token:password@github.com/..."

# ✅ Faire
export GH_TOKEN=votre_token
npm run publish
# ou
git config credential.helper cache
git push
```

### Intégrité des Fichiers

electron-updater vérifie automatiquement:
- **SHA512** de chaque fichier
- **Signatures** si configurées
- **Certificats SSL**

### HTTPS Obligatoire

Pour la production, utilisez toujours HTTPS:

```javascript
// ✅ Correct
UpdateManager.setUpdateProvider('custom', {
  url: 'https://updates.example.com/releases'
});

// ❌ Dangereux
UpdateManager.setUpdateProvider('custom', {
  url: 'http://updates.example.com/releases'
});
```

## Dépannage

### Les utilisateurs ne voient pas la mise à jour

```bash
# 1. Vérifier les tags Git
git tag -l | grep -E "^v[0-9]"

# 2. Vérifier la version dans package.json
cat package.json | grep version

# 3. Vérifier que les fichiers existent
ls -la dist/

# 4. Vérifier les permissions du repo GitHub
# (doit être public ou l'utilisateur doit avoir accès)
```

### Erreur "Failed to download update"

```javascript
// Ajouter des logs dans update-manager.js
autoUpdater.on('error', (error) => {
  console.error('❌ Erreur complète:', error);
});
```

### Le serveur personnalisé ne fonctionne pas

1. Vérifier le HTTPS:
   ```bash
   curl -I https://updates.example.com/releases/latest.yml
   ```

2. Vérifier les fichiers YAML:
   ```bash
   cat dist/latest.yml
   # Doit avoir: version, files[], releaseDate
   ```

3. Vérifier les URLs:
   ```bash
   curl -I https://updates.example.com/releases/app-1.2.0.deb
   ```

## Exemples de latest.yml

### Pour Windows

```yaml
version: 1.2.0
files:
  - url: https://updates.example.com/releases/CyberDefense-Browser-1.2.0.exe
    sha512: abc123...
    size: 123456789
releaseDate: '2024-01-15T10:00:00.000Z'
path: CyberDefense-Browser-1.2.0.exe
sha512: abc123...
```

### Pour Linux

```yaml
version: 1.2.0
files:
  - url: https://updates.example.com/releases/CyberDefense-Browser-1.2.0.deb
    sha512: def456...
    size: 456789123
releaseDate: '2024-01-15T10:00:00.000Z'
```

## Performance

### Vérifications de Mise à Jour

- **Au démarrage** : Immédiat (après 3 secondes de délai)
- **Périodiquement** : Toutes les heures

### Optimisations

```javascript
// Dans update-manager.js
autoUpdater.autoDownload = false;    // Ne pas télécharger automatiquement
autoUpdater.autoInstallOnAppQuit = true; // Installer à la fermeture
```

## Version Actuellement Supportées

- **Electron** : 42.1.0+
- **Node.js** : 14.0+
- **electron-updater** : 6.1.4+

## Ressources

- [electron-builder Documentation](https://www.electron.build/)
- [electron-updater Documentation](https://www.electron.build/auto-update)
- [GitHub Releases API](https://docs.github.com/en/rest/releases)
- [Semantic Versioning](https://semver.org/lang/fr/)

## Support

Pour toute question, consultez la documentation officielle ou ouvrez une issue sur le repository GitHub.

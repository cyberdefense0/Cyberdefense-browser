# Système de Mise à Jour - Guide d'Utilisation

## Vue d'ensemble

Le système de mise à jour permet de déployer facilement les nouvelles versions de l'application Cyberdéfense Browser aux utilisateurs.

## Architecture

### Fichiers du système

- **update-manager.js** - Module principal gérant les mises à jour avec electron-updater
- **updates-config.json** - Configuration des versions et du serveur de mise à jour
- **preload.js** - Communication IPC (Inter-Process Communication)
- **renderer.js** - Interface utilisateur de notification de mise à jour
- **main.js** - Intégration du gestionnaire de mises à jour

## Configuration

### 1. Configurer le Provider de Mises à Jour

#### Option A : GitHub Releases (Recommandé)

Modifiez `main.js` ligne ~115 :

```javascript
UpdateManager.setUpdateProvider('github', {
  owner: 'votre-username',
  repo: 'cybersecurity-browser'
});
```

Et dans `package.json`, configurez :

```json
"build": {
  "appId": "com.cyberdefense.browser",
  "publish": [
    {
      "provider": "github",
      "owner": "votre-username",
      "repo": "cybersecurity-browser"
    }
  ]
}
```

#### Option B : Serveur Personnalisé

```javascript
UpdateManager.setUpdateProvider('custom', {
  url: 'https://votre-serveur.com/updates'
});
```

### 2. Incrémenter la Version

Modifiez `package.json` :

```json
{
  "version": "1.2.0"
}
```

### 3. Construire et Publier

#### Avec GitHub Releases

```bash
# Vérifiez que vous avez un token GitHub
export GH_TOKEN=votre_token_github

# Construisez et publiez
npm run publish
```

Cela crée automatiquement une release GitHub avec les assets.

#### Avec un Serveur Personnel

```bash
# Construisez les fichiers
npm run build-all

# Uploadez les fichiers dans `dist/` sur votre serveur
# Créez un fichier latest.yml ou latest-linux.yml
```

## Format du Serveur de Mise à Jour Personnalisé

Si vous utilisez un serveur personnalisé, créez un endpoint qui retourne :

```yaml
version: 1.2.0
files:
  - url: https://votre-serveur.com/releases/app-1.2.0.deb
    sha512: <hash-du-fichier>
    size: 123456
  - url: https://votre-serveur.com/releases/app-1.2.0-x64.nsis.exe
    sha512: <hash-du-fichier>
    size: 654321
releaseDate: '2024-01-15T10:00:00.000Z'
```

## Flux d'Utilisation

### Pour les Utilisateurs

1. **Au Démarrage** - L'application vérifie automatiquement les mises à jour
2. **Notification** - Si une mise à jour est disponible, une notification s'affiche (haut-droit)
3. **Téléchargement** - L'utilisateur clique sur "Télécharger"
4. **Installation** - Une fois téléchargée, l'application demande de redémarrer
5. **Mise à Jour** - Après redémarrage, la nouvelle version est installée

### Pour les Développeurs

#### Étape 1 : Préparer la Release

```bash
# 1. Mettez à jour la version dans package.json
nano package.json  # Changez "version": "1.2.0"

# 2. Commitez les changements
git add package.json
git commit -m "Version 1.2.0: Description des changements"
git tag v1.2.0
git push origin main --tags
```

#### Étape 2 : Construire

```bash
# Installez les dépendances
npm install

# Construisez pour Linux et Windows
npm run build-all
```

#### Étape 3 : Publier (GitHub)

```bash
# Définissez votre token GitHub
export GH_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Publiez automatiquement (crée une release GitHub)
npm run publish
```

#### Étape 3 Alternative : Publier (Serveur Personnel)

```bash
# Les fichiers compilés sont dans dist/
ls dist/

# Uploadez sur votre serveur:
# - *.deb (Linux)
# - *.exe (Windows)
# - latest-linux.yml
# - latest.yml
```

## Fichiers de Sortie

Après `npm run build-all`, vous aurez dans le dossier `dist/` :

```
dist/
├── CyberDefense Browser-1.2.0.deb          # Package Linux
├── CyberDefense Browser-1.2.0.exe          # Installateur Windows
├── CyberDefense Browser-1.2.0 Setup.exe    # NSIS Windows
├── latest-linux.yml                        # Metadata Linux
├── latest.yml                              # Metadata Windows
└── builder-effective-config.yaml           # Config utilisée
```

## Gestion des Erreurs

### L'application n'trouve pas de mises à jour

- Vérifiez que le token GitHub est valide : `export GH_TOKEN=<votre_token>`
- Vérifiez que le repository GitHub existe et est public/accessible
- Consultez les logs : Ouvrez DevTools (F12) pour les erreurs

### Les utilisateurs ne reçoivent pas les mises à jour

- Vérifiez que vous avez bien "taggé" la release sur GitHub : `git tag v1.2.0`
- Attendez 1-2 minutes que le cache se mette à jour
- Forcez la vérification : cliquez sur l'icône de paramètres (en développement)

### Erreur "certificate/signature"

- Vérifiez que le fichier n'a pas été corrompu
- Régénérez le hash SHA512 du fichier

## Sécurité

- Les mises à jour sont vérifiées par hash SHA512
- Utilisez HTTPS pour votre serveur de mise à jour
- Ne commitez jamais vos tokens GitHub dans le repository

## Dépannage

### Vérifier l'état actuel

```bash
# Dans la console (F12 du navigateur)
window.electronAPI.invoke('get-current-version').then(console.log)
```

### Tester manuellement

```bash
# Dans la console
window.electronAPI.invoke('check-for-updates')
```

### Logs

Les logs de mise à jour s'affichent dans la console principale (terminal où l'app est lancée).

## Améliorations Futures

- [ ] Interface graphique pour gérer les mises à jour
- [ ] Mise à jour des extensions séparément
- [ ] Rollback automatique en cas d'erreur
- [ ] Mise à jour silencieuse en arrière-plan
- [ ] Notes de version détaillées avec images

## Support

Pour toute question ou problème, consultez la documentation officielle d'electron-updater : https://www.electron.build/auto-update

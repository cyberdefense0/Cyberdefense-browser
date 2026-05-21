# 🚀 Système de Mise à Jour Cyberdéfense Browser

Bienvenue ! Votre système de mise à jour est maintenant configuré et prêt à être utilisé.

## 📋 Sommaire Rapide

Le système de mise à jour a été intégré avec succès dans votre application. Voici ce qui a été ajouté :

### ✅ Fichiers Créés

| Fichier | Description |
|---------|-------------|
| `update-manager.js` | Module principal de gestion des mises à jour |
| `updates-config.json` | Configuration des versions |
| `UPDATE-GUIDE.md` | Guide complet détaillé |
| `SETUP-UPDATE-SYSTEM.md` | Guide de configuration avec exemples |
| `scripts/publish-update.sh` | Script d'automatisation (Linux/Mac) |
| `scripts/publish-update.ps1` | Script d'automatisation (Windows) |
| `scripts/generate-server-config.sh` | Générateur de config serveur |

### 🔄 Fichiers Modifiés

| Fichier | Modifications |
|---------|--------------|
| `package.json` | Ajout de `electron-updater`, configuration de build |
| `main.js` | Intégration du gestionnaire de mises à jour |
| `renderer.js` | Interface utilisateur de mise à jour |
| `preload.js` | API de mise à jour exposée |

### 📦 Dépendances Installées

- `electron-updater@6.1.4` - Gestion automatique des mises à jour

---

## 🚀 Démarrage Rapide (3 étapes)

### Étape 1️⃣ : Choisir le Provider

#### Option A : GitHub (Recommandé - Gratuit)

```bash
# 1. Créer un token GitHub:
# https://github.com/settings/tokens
# → Generate new token (classic)
# → Sélectionner: repo, admin:repo_hook, workflow
# → Copier le token

# 2. Définir le token dans votre terminal
export GH_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# 3. Modifier main.js (ligne ~115):
# UpdateManager.setUpdateProvider('github', {
#   owner: 'votre-username',
#   repo: 'cybersecurity-browser'
# });
```

#### Option B : Serveur Personnel (Avancé)

```bash
# Voir SETUP-UPDATE-SYSTEM.md section "Cas 2"
```

### Étape 2️⃣ : Publier une Mise à Jour

**Pour Linux/Mac :**
```bash
chmod +x scripts/publish-update.sh
./scripts/publish-update.sh 1.2.0
```

**Pour Windows :**
```powershell
.\scripts\publish-update.ps1 -Version "1.2.0" -Provider "github" -GithubToken "ghp_xxx"
```

**Ou Manuellement :**
```bash
# Mettre à jour la version
sed -i 's/"version": "1.1.0"/"version": "1.2.0"/' package.json

# Commit et tag
git add package.json
git commit -m "Release v1.2.0"
git tag v1.2.0
git push origin main --tags

# Construire et publier
npm install
npm run build-all
export GH_TOKEN=votre_token
npm run publish
```

### Étape 3️⃣ : Tester

```bash
# Lancer l'application
npm start

# Observer la vérification des mises à jour (console)
# Si une mise à jour est disponible:
# - Notification apparaîtra en haut-droit
# - Cliquer sur "Télécharger"
# - Attendre le téléchargement
# - Cliquer sur "Redémarrer maintenant"
```

---

## 📖 Documentation Complète

### Pour les **Utilisateurs de l'App**

👉 **Guide Utilisateur** : `UPDATE-GUIDE.md` (sections "Pour les Utilisateurs")

### Pour les **Développeurs**

👉 **Guide Complet** : `SETUP-UPDATE-SYSTEM.md`
- Configuration détaillée
- Cas d'usage courants
- Dépannage

👉 **Guide d'Implémentation** : `UPDATE-GUIDE.md`
- Architecture technique
- Code source commenté
- Sécurité

---

## 🎯 Fonctionnalités

✅ **Vérification Automatique** - À chaque démarrage + toutes les heures

✅ **Notification Élégante** - Interface moderne avec progression du téléchargement

✅ **Téléchargement Sécurisé** - Vérification SHA512 + SSL/TLS

✅ **Installation Sans Friction** - Redémarrage automatique

✅ **GitHub & Serveur Personnel** - Deux options de distribution

✅ **Support Cross-Platform** - Windows, Linux, macOS

✅ **Scripts d'Automatisation** - Bash et PowerShell inclus

---

## 📦 Structure des Dossiers

```
Cyberdéfense-Browser/
├── update-manager.js              # Gestionnaire de mises à jour
├── updates-config.json            # Configuration
├── package.json                   # Dépendances
├── main.js                        # Intégration
├── renderer.js                    # Interface
├── preload.js                     # API
├── scripts/
│   ├── publish-update.sh          # Script publication (Linux)
│   ├── publish-update.ps1         # Script publication (Windows)
│   └── generate-server-config.sh  # Générateur config
├── UPDATE-GUIDE.md                # Guide détaillé
├── SETUP-UPDATE-SYSTEM.md         # Configuration
└── dist/                          # Fichiers compilés
    ├── *.deb                      # Packages Linux
    ├── *.exe                      # Installateurs Windows
    ├── latest.yml                 # Config Windows
    └── latest-linux.yml           # Config Linux
```

---

## 🔍 Vérifier l'Installation

```bash
# 1. Vérifier que electron-updater est installé
npm list electron-updater

# 2. Vérifier les fichiers créés
ls -la update-manager.js
ls -la scripts/publish-update.sh

# 3. Lancer l'app
npm start

# 4. Ouvrir la console (F12)
# Vous devriez voir: [UPDATE] Vérification des mises à jour...
```

---

## 🔐 Sécurité

### Configuration Recommandée

```javascript
// Dans update-manager.js (déjà configuré)
autoUpdater.autoDownload = false;      // Utilisateur contrôle le téléchargement
autoUpdater.autoInstallOnAppQuit = true; // Installation automatique à la fermeture
```

### Bonnes Pratiques

- ✅ Utilisez HTTPS pour les serveurs personnalisés
- ✅ Limitez l'accès au token GitHub aux CI/CD
- ✅ Signez vos releases avec une clé privée
- ✅ Testez chaque mise à jour avant la publication

---

## 🐛 Dépannage Rapide

| Problème | Solution |
|----------|----------|
| Pas de notification | `F12` → Console → Vérifier les erreurs |
| Téléchargement échoue | Vérifier HTTPS, vérifier les URLs |
| Token GitHub invalide | Regénérer sur https://github.com/settings/tokens |
| App ne redémarre pas | Redémarrer manuellement après mise à jour |

Pour plus : Voir `SETUP-UPDATE-SYSTEM.md` section "Dépannage"

---

## 📝 Checklist de Mise en Production

- [ ] Token GitHub créé et testé
- [ ] Repository GitHub créé et configuré
- [ ] `package.json` version mise à jour
- [ ] `main.js` configuré avec le bon provider
- [ ] Scripts de publication testés localement
- [ ] Une mise à jour test publiée et testée
- [ ] Documentation lue par l'équipe

---

## 🎓 Prochaines Étapes

1. **Lire la documentation** → `SETUP-UPDATE-SYSTEM.md`
2. **Tester localement** → `npm start`
3. **Publier une version test** → `./scripts/publish-update.sh 1.1.1`
4. **Vérifier auprès des utilisateurs** → Demander feedback
5. **Automatiser via CI/CD** → GitHub Actions ou autre

---

## 📞 Support

### Documentation Incluse

- `UPDATE-GUIDE.md` - Guide complet (utilisateur + développeur)
- `SETUP-UPDATE-SYSTEM.md` - Configuration détaillée avec exemples

### Ressources Externes

- [electron-builder docs](https://www.electron.build/)
- [electron-updater docs](https://www.electron.build/auto-update)
- [GitHub Releases API](https://docs.github.com/en/rest/releases)

---

## ✨ Félicitations !

Votre système de mise à jour est prêt. 🎉

**Prochaine action** : Lire `SETUP-UPDATE-SYSTEM.md` pour les détails de configuration.

Bonne chance avec votre application ! 🚀

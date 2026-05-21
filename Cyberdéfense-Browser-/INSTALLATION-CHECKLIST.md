# Checklist d'Installation du Système de Mise à Jour

## ✅ Étapes Complétées

### Fichiers Créés

- [x] `update-manager.js` - Module principal de gestion des mises à jour
- [x] `updates-config.json` - Fichier de configuration des versions
- [x] `UPDATE-GUIDE.md` - Guide utilisateur et développeur complet
- [x] `SETUP-UPDATE-SYSTEM.md` - Guide de configuration détaillé
- [x] `README-UPDATE-SYSTEM.md` - Guide de démarrage rapide
- [x] `scripts/publish-update.sh` - Script de publication (Linux/Mac)
- [x] `scripts/publish-update.ps1` - Script de publication (Windows)
- [x] `scripts/generate-server-config.sh` - Générateur de configuration serveur
- [x] `QUICKSTART-UPDATE.sh` - Script de configuration initiale

### Modifications Effectuées

- [x] `package.json` - Ajout de electron-updater et configuration electron-builder
- [x] `main.js` - Intégration du UpdateManager
- [x] `renderer.js` - Interface utilisateur de mise à jour
- [x] `preload.js` - Exposition de l'API de mise à jour

### Dépendances Installées

- [x] `electron-updater@6.8.3` - Bibliothèque de gestion des mises à jour

---

## 📝 Configuration Requise

### Pour GitHub Releases (Recommandé)

1. **Créer un Token GitHub**
   - [ ] Aller sur https://github.com/settings/tokens
   - [ ] Cliquer "Generate new token (classic)"
   - [ ] Sélectionner : repo, admin:repo_hook, workflow
   - [ ] Copier et sauvegarder le token

2. **Configurer le Repository**
   - [ ] Créer un repository publique
   - [ ] Remplacer dans `main.js` ligne 121:
     ```javascript
     owner: 'votre-username',
     repo: 'cybersecurity-browser'
     ```
   - [ ] Remplacer dans `package.json` section "publish":
     ```json
     "owner": "votre-username",
     "repo": "cybersecurity-browser"
     ```

3. **Définir la Variable d'Environnement**
   ```bash
   export GH_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

### Pour Serveur Personnel (Optionnel)

- [ ] Serveur web avec HTTPS configuré
- [ ] Espace disque pour stocker les fichiers (min 500MB)
- [ ] Accès FTP/SSH pour l'upload

---

## 🚀 Première Mise à Jour

### Option 1 : Automatisé (Recommandé)

```bash
# Linux/Mac
chmod +x scripts/publish-update.sh
./scripts/publish-update.sh 1.2.0

# Windows PowerShell
.\scripts\publish-update.ps1 -Version "1.2.0"
```

### Option 2 : Étapes Manuelles

```bash
# 1. Mettre à jour version
nano package.json  # 1.1.0 → 1.2.0

# 2. Commit et tag
git add package.json
git commit -m "Release v1.2.0"
git tag v1.2.0
git push origin main --tags

# 3. Construire
npm install
npm run build-all

# 4. Publier (GitHub)
export GH_TOKEN=votre_token
npm run publish
```

---

## 🧪 Tests Recommandés

### Test 1 : Vérification des Fichiers
```bash
# ✓ Tous les fichiers sont créés
ls update-manager.js updates-config.json
ls scripts/publish-update.*
ls README-UPDATE-SYSTEM.md SETUP-UPDATE-SYSTEM.md UPDATE-GUIDE.md
```

### Test 2 : Vérification de l'Installation
```bash
# ✓ electron-updater est installé
npm list electron-updater

# ✓ package.json a les bonnes dépendances
grep electron-updater package.json
grep electron-builder package.json
```

### Test 3 : Lancer l'Application
```bash
# ✓ L'app démarre sans erreurs
npm start

# Vérifier dans la console:
# [UPDATE] Vérification des mises à jour...
```

### Test 4 : Notification de Mise à Jour
```bash
# ✓ Une notification apparaît en haut-droit
# ✓ Les boutons "Télécharger" et "Plus tard" fonctionnent
# ✓ La progression s'affiche pendant le téléchargement
```

---

## ⚠️ Erreurs Courantes

| Erreur | Solution |
|--------|----------|
| "Cannot find module 'electron-updater'" | Relancer `npm install` |
| "GH_TOKEN is not set" | Définir le token : `export GH_TOKEN=...` |
| "Repository not found" | Vérifier le nom du repo sur GitHub |
| "File not found" | Vérifier que `dist/` existe après `npm run build-all` |
| "HTTPS required" | Utiliser HTTPS pour les URLs de mise à jour |

---

## 📚 Documentation à Consulter

| Document | Pour Qui | Quand |
|----------|----------|-------|
| `README-UPDATE-SYSTEM.md` | Tout le monde | Démarrage |
| `SETUP-UPDATE-SYSTEM.md` | Développeurs | Configuration détaillée |
| `UPDATE-GUIDE.md` | Développeurs | Implémentation technique |
| `QUICKSTART-UPDATE.sh` | Utilisateurs | Configuration rapide |

---

## 🔐 Sécurité : À Vérifier

- [ ] Token GitHub n'est jamais commité dans git
- [ ] HTTPS est utilisé pour tous les URLs de mise à jour
- [ ] Les fichiers de mise à jour sont vérifiés (SHA512)
- [ ] Les permissions GitHub sont limitées au minimum nécessaire
- [ ] Les builds sont faits dans un environnement de confiance

---

## 🔄 Flux d'Utilisation Standard

```
Développeur                      Utilisateur
    ↓                               ↓
Mettre à jour version        App démarre
    ↓                          ↓
Commit et tag                Vérification auto des mises à jour
    ↓                               ↓
npm run publish              Notification reçue
    ↓                               ↓
Release sur GitHub           Clique "Télécharger"
    ↓                               ↓
Fichiers uploadés            Téléchargement en progression
    ↓                               ↓
                             Clique "Redémarrer"
                               ↓
                           Nouvelle version lancée
```

---

## 📞 Points de Contact

**Besoin d'aide ?**

1. Consulter `SETUP-UPDATE-SYSTEM.md` (section Dépannage)
2. Vérifier les logs : `npm start` puis ouvrir F12
3. Consulter la documentation officielle :
   - https://www.electron.build/auto-update
   - https://www.electron.build/

---

## ✨ Statut Final

| Composant | Statut |
|-----------|--------|
| Installation | ✅ Complète |
| Configuration | ✅ Prête (À personnaliser) |
| Tests | ✅ À faire |
| Documentation | ✅ Fournie |
| Scripts | ✅ Fournis |
| Dépendances | ✅ Installées |

**L'application est maintenant équipée d'un système de mise à jour professionnel ! 🎉**

---

## 🎯 Prochaines Actions

1. **Immédiat** (5 min)
   - [ ] Lire `README-UPDATE-SYSTEM.md`
   - [ ] Configurer GitHub Token

2. **Court terme** (1-2 heures)
   - [ ] Tester localement (`npm start`)
   - [ ] Publier une version test
   - [ ] Vérifier que la notification s'affiche

3. **Moyen terme** (1-2 jours)
   - [ ] Configurer CI/CD (GitHub Actions)
   - [ ] Tester avec des utilisateurs bêta
   - [ ] Mettre en place le monitoring

4. **Long terme**
   - [ ] Automatiser les publications
   - [ ] Ajouter des notes de version
   - [ ] Monitorer les adoptions de version

---

## 📊 Ressources Supplémentaires

### Fichiers d'Exemple

```bash
# Voir les fichiers créés
ls -la update-manager.js
ls -la scripts/publish-update.*
cat updates-config.json
```

### Commandes Utiles

```bash
# Installer les dépendances
npm install

# Tester l'application
npm start

# Construire
npm run build-all

# Publier (GitHub)
export GH_TOKEN=votre_token
npm run publish

# Voir les logs
npm start 2>&1 | grep UPDATE
```

---

**Date d'installation : 21 mai 2026**
**Système installé avec succès ! 🚀**

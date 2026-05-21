# Système de Mise à Jour Automatique avec GitHub Actions

## 🚀 Vue d'Ensemble

Votre système de mise à jour passe maintenant **entièrement par Git et GitHub Actions**. Plus besoin de compiler manuellement ou de publier - tout est automatique !

### Le Workflow

```
Développeur          Git              GitHub Actions      Utilisateurs
    ↓                ↓                     ↓                    ↓
Modifier code    Commit               Trigger workflow    Notification
    ↓                ↓                     ↓                    ↓
Augmenter version Push tag          Compile (Linux+Win) Téléchargement
    ↓                ↓                     ↓                    ↓
Push origin      GitHub Release      Publication        Mise à jour
```

---

## ⚡ Démarrage Rapide

### Pour Linux/Mac

```bash
# 1. Faire ses changements
git add .
git commit -m "Ma nouvelle feature"

# 2. Créer une release
chmod +x git-release.sh
./git-release.sh 1.2.0

# C'est tout ! GitHub Actions fait le reste
```

### Pour Windows

```powershell
# 1. Faire ses changements
git add .
git commit -m "Ma nouvelle feature"

# 2. Créer une release
.\git-release.ps1 -Version "1.2.0"

# C'est tout ! GitHub Actions fait le reste
```

---

## 🔧 Configuration Initiale (Une seule fois)

### Étape 1 : Configuration GitHub Repository

1. **Créer un repository publique** sur GitHub
2. **Remplacer dans package.json** :
   ```json
   "build": {
     "publish": [
       {
         "provider": "github",
         "owner": "your-username",  // ← Remplacer
         "repo": "cybersecurity-browser"  // ← Remplacer
       }
     ]
   }
   ```

3. **Mettre à jour les URLs** dans les scripts :
   - `git-release.sh` et `git-release.ps1` contiennent des références à remplacer
   - `.github/workflows/publish-release.yml` (déjà bon)

### Étape 2 : Activer GitHub Actions

GitHub Actions fonctionne automatiquement si :
- ✅ Votre repository est public OU vous avez les droits
- ✅ Le fichier `.github/workflows/publish-release.yml` existe (déjà créé)
- ✅ Vous poussez un tag (automatisé par le script)

### Étape 3 : Tester

```bash
# Vous n'avez rien à faire - le workflow s'active automatiquement !
```

---

## 📝 Comment Publier une Mise à Jour

### Cas 1 : Release Mineure (v1.1.1 → v1.1.2)

```bash
# Linux/Mac
./git-release.sh 1.1.2

# Windows
.\git-release.ps1 -Version "1.1.2"
```

### Cas 2 : Release Majeure (v1.1.0 → v1.2.0)

```bash
# Linux/Mac
./git-release.sh 1.2.0

# Windows
.\git-release.ps1 -Version "1.2.0"
```

### Cas 3 : Avec Changements Non Committés

```bash
# 1. Committer d'abord
git add .
git commit -m "Description des changements"

# 2. Puis créer la release
./git-release.sh 1.2.0
```

---

## 🔄 Ce Qu'il Se Passe Automatiquement

### 1️⃣ Vous exécutez le script
```bash
./git-release.sh 1.2.0
```

### 2️⃣ Le script :
- Met à jour `package.json`
- Crée un commit
- Crée un tag git `v1.2.0`
- Pousse le tout vers GitHub

### 3️⃣ GitHub Actions se déclenche automatiquement
- Compile pour Linux (`.deb`)
- Compile pour Windows (`.exe`)
- Crée les fichiers de métadonnées
- Upload sur GitHub Releases

### 4️⃣ Les utilisateurs reçoivent la notification
- Dans 1-2 minutes
- Avec les fichiers prêts à télécharger
- Installation automatique

---

## 📊 Suivre la Progression

### Sur GitHub

```
https://github.com/your-username/cybersecurity-browser/actions
```

Vous verrez :
- ✅ Status du workflow
- 📊 Logs de compilation
- 📦 Fichiers générés
- 🎉 Release créée

### Dans l'Application

L'application affichera la notification :
```
┌─────────────────────────────┐
│ 🎉 Nouvelle version         │
│    disponible!              │
│                             │
│ Version: v1.2.0             │
│                             │
│ [Télécharger] [Plus tard]   │
└─────────────────────────────┘
```

---

## 🐛 Dépannage

### Le workflow ne se déclenche pas

**Cause 1** : Vous n'avez pas poussé le tag
```bash
# Vérifier les tags locaux
git tag -l

# Vérifier les tags distants
git ls-remote --tags origin
```

**Cause 2** : Le workflow n'est pas actif
```bash
# Vérifier que le fichier existe
cat .github/workflows/publish-release.yml
```

**Cause 3** : Permissions insuffisantes
```bash
# Vérifier que vous avez les droits de push
git push origin main
```

### La compilation échoue

**Vérifier les logs** :
1. Allez sur https://github.com/your-username/cybersecurity-browser/actions
2. Cliquez sur le workflow qui a échoué
3. Vérifiez les erreurs dans les logs

**Causes courantes** :
- Erreurs de syntaxe dans le code
- Dépendances manquantes
- Permissions insuffisantes

### Les utilisateurs ne voient pas la mise à jour

- Attendre 1-2 minutes (cache de vérification)
- Vérifier que la release existe sur GitHub
- Vérifier la configuration dans `update-manager.js`

---

## ✨ Fichiers Impliqués

| Fichier | Rôle |
|---------|------|
| `.github/workflows/publish-release.yml` | Workflow GitHub Actions (automatique) |
| `git-release.sh` | Script de release (Linux/Mac) |
| `git-release.ps1` | Script de release (Windows) |
| `update-manager.js` | Détecte et télécharge les mises à jour |
| `package.json` | Configuration de build et publication |
| `main.js` | Lance le gestionnaire de mises à jour |

---

## 🔐 Sécurité

### Automatisation GitHub

- ✅ GitHub Token est géré par GitHub (sécurisé)
- ✅ Pas besoin de token local
- ✅ Permissions limitées au repository

### Bonnes Pratiques

```bash
# ✅ Faire
./git-release.sh 1.2.0

# ❌ Ne pas faire
git push avec --force
rm -rf .git
```

---

## 📈 Cas d'Usage Avancés

### Publier deux versions en même temps

```bash
# Version de production
./git-release.sh 1.2.0

# Version bêta
./git-release.sh 1.3.0-beta.1
```

### Voir l'historique des releases

```bash
git tag -l
# v1.0.0
# v1.1.0
# v1.1.1
# v1.2.0
```

### Revenir à une version précédente

```bash
# Montrer tous les tags
git tag -l

# Checker une version
git checkout v1.1.0

# Créer une branche de maintenance
git checkout -b maintenance/1.1.x v1.1.0
```

---

## 📚 Documentation Complète

- **README-UPDATE-SYSTEM.md** - Vue d'ensemble du système
- **SETUP-UPDATE-SYSTEM.md** - Configuration détaillée
- **UPDATE-GUIDE.md** - Guide utilisateur et technique
- **GITHUB-ACTIONS-WORKFLOW.md** - Ce fichier

---

## ✅ Checklist de Configuration

- [ ] Repository GitHub créé
- [ ] Owner et repo correctement configurés dans `package.json`
- [ ] Fichiers `.github/workflows/publish-release.yml` présents
- [ ] Scripts `git-release.sh` et `git-release.ps1` exécutables
- [ ] Une release test créée et vérifiée
- [ ] Les utilisateurs ont bien reçu la notification

---

## 🎯 Prochaines Actions

1. **Immédiat** - Remplacer `your-username` dans `package.json`
2. **Avant la première release** - Tester le workflow en local
3. **À la première release** - Vérifier que GitHub Actions fonctionne
4. **Continu** - Utiliser `git-release.sh` pour toutes les mises à jour

---

**Le système est maintenant entièrement automatisé ! 🎉**

Plus d'étapes manuelles - juste `./git-release.sh X.Y.Z` et c'est parti !

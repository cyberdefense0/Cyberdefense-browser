# 🎯 Guide Rapide - Mise à Jour via GitHub Actions

## 📋 Résumé

Le système de mise à jour de **Cyberdéfense Browser** utilise maintenant **GitHub Actions** pour automatiser complètement le processus de publication.

### Ce que vous devez faire

1. Faire vos changements
2. Committer
3. Exécuter UN script
4. C'est tout ! ✅

### Ce qui se passe automatiquement

- Compilation Linux et Windows
- Upload sur GitHub Releases
- Notification aux utilisateurs
- Mise à jour installée

---

## 🚀 Mise en Place (5 minutes)

### Step 1️⃣ : Configuration GitHub

**Linux/Mac :**
```bash
chmod +x setup-github.sh
./setup-github.sh
```

**Windows :**
```powershell
.\setup-github.ps1
```

Cela demande :
- Votre username GitHub
- Le nom de votre repository
- L'URL du repository

### Step 2️⃣ : Push Initial

```bash
git add .
git commit -m "Initial commit"
git push -u origin main
```

### Step 3️⃣ : Première Release (Optionnel - pour tester)

```bash
# Linux/Mac
./git-release.sh 1.1.0

# Windows
.\git-release.ps1 -Version "1.1.0"
```

---

## 💼 Utilisation Courante

### Publier une Mise à Jour

**Linux/Mac :**
```bash
./git-release.sh 1.2.0
```

**Windows :**
```powershell
.\git-release.ps1 -Version "1.2.0"
```

### C'est littéralement tout !

Les utilisateurs reçoivent la notification en 1-2 minutes.

---

## 📊 Architecture

```
Votre Code
    ↓
Git Commit
    ↓
Git Tag (v1.2.0)
    ↓
GitHub Push
    ↓
GitHub Actions Workflow ⚙️
    ├─ Build Linux (.deb)
    ├─ Build Windows (.exe)
    ├─ Create Release
    └─ Upload Files
    ↓
GitHub Releases 📦
    ↓
App Check Update ↻
    ↓
Notification to Users 📬
    ↓
Auto Download + Install ⬇️
```

---

## 🔍 Fichiers Importants

| Fichier | Rôle |
|---------|------|
| `.github/workflows/publish-release.yml` | ⚙️ Workflow automatique |
| `git-release.sh` | 🐧 Script Linux/Mac |
| `git-release.ps1` | 🪟 Script Windows |
| `setup-github.sh` | ⚙️ Configuration Linux/Mac |
| `setup-github.ps1` | ⚙️ Configuration Windows |

---

## ✅ Étapes Complètes

### Première Fois

```bash
# 1. Configuration
./setup-github.sh

# 2. Push initial
git add .
git commit -m "Initial commit"
git push -u origin main

# 3. Première release
./git-release.sh 1.1.0

# 4. Vérifier sur GitHub
# https://github.com/your-username/cybersecurity-browser/actions
```

### Mises à Jour Futures

```bash
# Simplement :
./git-release.sh X.Y.Z
```

---

## 🎯 Vérifier que Tout Fonctionne

### Les utilisateurs voient la notification ?

1. Ouvrir l'app
2. Une notification devrait apparaître (haut-droit)
3. Cliquer "Télécharger"
4. Attendre la fin du téléchargement
5. Cliquer "Redémarrer"

### Le workflow GitHub s'est déclenché ?

1. Aller sur : https://github.com/your-username/cybersecurity-browser/actions
2. Vous devriez voir le workflow "Publier Mise à Jour" en cours

### Les fichiers sont sur GitHub Releases ?

1. Aller sur : https://github.com/your-username/cybersecurity-browser/releases
2. Vous devriez voir v1.2.0 avec :
   - `.deb` (Linux)
   - `.exe` (Windows)

---

## 🐛 Problèmes Courants

### "Le workflow ne se déclenche pas"

→ Vérifier que vous avez poussé le tag :
```bash
git push origin v1.2.0
```

### "GitHub Actions dit 'Failed'"

→ Vérifier les logs :
1. Aller sur https://github.com/your-username/cybersecurity-browser/actions
2. Cliquer sur le workflow qui a échoué
3. Lire les erreurs

### "Les utilisateurs ne reçoivent pas la notification"

→ Attendre 1-2 minutes (cache)
Vérifier que :
- La release existe sur GitHub
- `update-manager.js` est bien configuré

---

## 📚 Documentation Complète

- **GITHUB-ACTIONS-WORKFLOW.md** - Détails du workflow
- **INSTALLATION-CHECKLIST.md** - Checklist complète
- **README-UPDATE-SYSTEM.md** - Vue d'ensemble générale
- **SETUP-UPDATE-SYSTEM.md** - Configuration avancée

---

## 🎉 C'est Prêt !

Vous avez maintenant un système de mise à jour **professionnel et complètement automatisé**.

### Commande à Retenir

```bash
./git-release.sh X.Y.Z
```

C'est tout ce que vous avez besoin de faire ! 🚀

---

**Questions ? Consultez la documentation ou ouvrez une issue sur GitHub.**

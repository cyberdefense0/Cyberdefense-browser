#!/bin/bash

# Quick Start Script - Système de Mise à Jour
# Ce script configure rapidement le système de mise à jour

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  Démarrage Rapide - Système de Mise à Jour                ║"
echo "║  Cyberdéfense Browser                                      ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Demander les informations
echo "📋 Configuration Initiale"
echo ""
read -p "GitHub Username: " USERNAME
read -p "GitHub Repository: " REPO
read -sp "GitHub Token (laissez vide pour tester localement): " TOKEN
echo ""
echo ""

# Sauvegarder les informations
cat > .env.update << EOF
GH_USERNAME=$USERNAME
GH_REPO=$REPO
GH_TOKEN=$TOKEN
EOF

echo "✅ Configuration sauvegardée dans .env.update"
echo ""

# Mettre à jour main.js
echo "📝 Configuration de main.js..."
sed -i "s/owner: '[^']*'/owner: '$USERNAME'/" main.js
sed -i "s/repo: '[^']*'/repo: '$REPO'/" main.js
echo "✅ main.js configuré"
echo ""

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install
echo "✅ Dépendances installées"
echo ""

# Afficher le résumé
echo "════════════════════════════════════════════════════════════"
echo "✨ CONFIGURATION TERMINÉE!"
echo "════════════════════════════════════════════════════════════"
echo ""
echo "Prochaines étapes:"
echo ""
echo "1️⃣  Tester l'application:"
echo "   npm start"
echo ""
echo "2️⃣  Publier une mise à jour:"
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    echo "   .\\scripts\\publish-update.ps1 -Version '1.2.0'"
else
    echo "   chmod +x scripts/publish-update.sh"
    echo "   ./scripts/publish-update.sh 1.2.0"
fi
echo ""
echo "3️⃣  Lire la documentation:"
echo "   - README-UPDATE-SYSTEM.md (Vue d'ensemble)"
echo "   - SETUP-UPDATE-SYSTEM.md (Configuration détaillée)"
echo "   - UPDATE-GUIDE.md (Guide complet)"
echo ""
echo "Ressources:"
echo "   📖 Documentation: voir les fichiers .md"
echo "   🐛 Dépannage: SETUP-UPDATE-SYSTEM.md (section Dépannage)"
echo "   💾 Config: cat .env.update"
echo ""
echo "════════════════════════════════════════════════════════════"
echo ""

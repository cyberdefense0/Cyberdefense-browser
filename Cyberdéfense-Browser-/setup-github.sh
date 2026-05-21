#!/bin/bash

# Script de Configuration GitHub - Initialisation Rapide
# Configure automatiquement votre repository GitHub

set -e

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Configuration GitHub - Cyberdéfense Browser              ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Demander les informations
echo -e "${YELLOW}📋 Informations GitHub Requises${NC}"
echo ""

read -p "Username GitHub: " GITHUB_USERNAME
read -p "Nom du Repository: " GITHUB_REPO
read -p "URL du Repository (https://github.com/user/repo): " GITHUB_URL

echo ""
echo -e "${BLUE}ℹ️  Configuration détectée:${NC}"
echo "  Username: $GITHUB_USERNAME"
echo "  Repository: $GITHUB_REPO"
echo "  URL: $GITHUB_URL"
echo ""

# Confirmer
read -p "Continuer? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
fi

echo ""
echo -e "${BLUE}⚙️  Configuration en cours...${NC}"
echo ""

# 1. Mettre à jour package.json
echo -e "${BLUE}1️⃣  Mise à jour de package.json${NC}"
sed -i.bak "s|\"owner\": \"[^\"]*\"|\"owner\": \"$GITHUB_USERNAME\"|g" package.json
sed -i "s|\"repo\": \"[^\"]*\"|\"repo\": \"$GITHUB_REPO\"|g" package.json
rm -f package.json.bak
echo -e "${GREEN}   ✅ package.json configuré${NC}"

# 2. Mettre à jour git-release.sh
echo -e "${BLUE}2️⃣  Mise à jour de git-release.sh${NC}"
sed -i.bak "s|https://github.com/your-username/cybersecurity-browser|$GITHUB_URL|g" git-release.sh
rm -f git-release.sh.bak
echo -e "${GREEN}   ✅ git-release.sh configuré${NC}"

# 3. Vérifier le repo git
echo -e "${BLUE}3️⃣  Vérification du repository Git${NC}"
CURRENT_REPO=$(git config --get remote.origin.url)
echo -e "${YELLOW}   Repository git actuel: $CURRENT_REPO${NC}"

if [ "$CURRENT_REPO" != "$GITHUB_URL" ] && [ "$CURRENT_REPO" != "$GITHUB_URL.git" ]; then
    echo -e "${YELLOW}   ⚠️  Le repository git ne correspond pas${NC}"
    read -p "   Mettre à jour? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git remote set-url origin "$GITHUB_URL"
        echo -e "${GREEN}   ✅ Repository git mis à jour${NC}"
    fi
fi

# 4. Tester la connexion GitHub
echo -e "${BLUE}4️⃣  Test de connexion GitHub${NC}"
if git ls-remote origin HEAD > /dev/null 2>&1; then
    echo -e "${GREEN}   ✅ Connexion GitHub OK${NC}"
else
    echo -e "${YELLOW}   ⚠️  Impossible de vérifier la connexion${NC}"
    echo "   Assurez-vous que:"
    echo "   - Le repository existe et est accessible"
    echo "   - Vous êtes authentifiés sur GitHub"
    echo "   - SSH/HTTPS est configuré correctement"
fi

echo ""
echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ CONFIGURATION TERMINÉE!${NC}"
echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}Prochaines étapes:${NC}"
echo ""
echo "1. Initialiser le repository:"
echo "   git add ."
echo "   git commit -m 'Initial commit'"
echo "   git push -u origin main"
echo ""
echo "2. Créer la première release:"
echo "   ./git-release.sh 1.1.0"
echo ""
echo "3. Vérifier sur GitHub:"
echo "   $GITHUB_URL/actions"
echo ""
echo -e "${BLUE}💾 Configuration sauvegardée dans:${NC}"
echo "   - package.json"
echo "   - git-release.sh"
echo "   - .git/config"
echo ""

# Sauvegarder la config
cat > .github-config << EOF
GITHUB_USERNAME=$GITHUB_USERNAME
GITHUB_REPO=$GITHUB_REPO
GITHUB_URL=$GITHUB_URL
EOF

echo -e "${GREEN}✨ Vous êtes prêt à publier vos mises à jour!${NC}"
echo ""

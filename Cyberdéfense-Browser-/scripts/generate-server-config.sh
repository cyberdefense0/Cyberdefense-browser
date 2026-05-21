#!/bin/bash

# Script pour configurer le serveur de mise à jour sur un serveur personnel
# Ce script génère les fichiers de configuration nécessaires

set -e

# Configuration
VERSION="1.0.0"
OUTPUT_DIR="./dist"
SERVER_URL="${SERVER_URL:-https://updates.example.com}"

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}=== Générateur de Configuration Serveur ===${NC}"
echo ""

# Vérifier que les fichiers existent
if [ ! -f "$OUTPUT_DIR/CyberDefense Browser-$VERSION.deb" ]; then
    echo -e "${YELLOW}⚠️  Fichier DEB non trouvé${NC}"
fi

if [ ! -f "$OUTPUT_DIR/CyberDefense Browser-$VERSION.exe" ]; then
    echo -e "${YELLOW}⚠️  Fichier EXE non trouvé${NC}"
fi

# Calculer les hashes SHA512
echo -e "${BLUE}📊 Calcul des hashes...${NC}"

DEB_FILE=$(ls "$OUTPUT_DIR"/*.deb 2>/dev/null | head -1)
EXE_FILE=$(ls "$OUTPUT_DIR"/*.exe 2>/dev/null | head -1)

if [ -n "$DEB_FILE" ]; then
    DEB_SIZE=$(stat -f%z "$DEB_FILE" 2>/dev/null || stat -c%s "$DEB_FILE")
    DEB_SHA512=$(shasum -a 512 "$DEB_FILE" | cut -d' ' -f1)
    echo -e "${GREEN}✅ DEB: $DEB_SHA512${NC}"
fi

if [ -n "$EXE_FILE" ]; then
    EXE_SIZE=$(stat -f%z "$EXE_FILE" 2>/dev/null || stat -c%s "$EXE_FILE")
    EXE_SHA512=$(shasum -a 512 "$EXE_FILE" | cut -d' ' -f1)
    echo -e "${GREEN}✅ EXE: $EXE_SHA512${NC}"
fi

# Créer latest-linux.yml
cat > "$OUTPUT_DIR/latest-linux.yml" << EOF
version: $VERSION
files:
  - url: $SERVER_URL/releases/CyberDefense%20Browser-$VERSION.deb
    sha512: $DEB_SHA512
    size: $DEB_SIZE
releaseDate: '$(date -u +'%Y-%m-%dT%H:%M:%S.000Z')'
EOF

# Créer latest.yml (pour Windows)
cat > "$OUTPUT_DIR/latest.yml" << EOF
version: $VERSION
files:
  - url: $SERVER_URL/releases/CyberDefense%20Browser-$VERSION.exe
    sha512: $EXE_SHA512
    size: $EXE_SIZE
releaseDate: '$(date -u +'%Y-%m-%dT%H:%M:%S.000Z')'
path: CyberDefense%20Browser-$VERSION.exe
sha512: $EXE_SHA512
EOF

echo -e "${GREEN}✅ Configuration générée${NC}"
echo ""
echo "Fichiers créés:"
echo "  - latest-linux.yml"
echo "  - latest.yml"
echo ""
echo "Étapes suivantes:"
echo "1. Uploadez les fichiers DEB/EXE sur: $SERVER_URL/releases/"
echo "2. Uploadez latest-linux.yml et latest.yml"
echo "3. Configurez votre application pour utiliser: $SERVER_URL"
echo ""
echo "Dans main.js, modifiez:"
echo "  UpdateManager.setUpdateProvider('custom', {"
echo "    url: '$SERVER_URL/latest.yml'  // Windows"
echo "  });"
echo ""

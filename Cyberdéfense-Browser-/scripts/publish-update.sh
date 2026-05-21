#!/bin/bash

# Script de publication de mise à jour pour Cyberdéfense Browser
# Usage: ./publish-update.sh <version> [github|custom]

set -e  # Arrêter en cas d'erreur

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # Pas de couleur

# Configuration
GITHUB_TOKEN=${GH_TOKEN:-""}
VERSION=${1:-""}
PROVIDER=${2:-"github"}

# Afficher l'aide
show_help() {
  echo -e "${BLUE}=== Outil de Publication de Mise à Jour ===${NC}"
  echo ""
  echo "Usage: ./publish-update.sh <version> [provider]"
  echo ""
  echo "Arguments:"
  echo "  <version>   - Version à publier (ex: 1.2.0)"
  echo "  [provider]  - 'github' (défaut) ou 'custom'"
  echo ""
  echo "Exemples:"
  echo "  ./publish-update.sh 1.2.0"
  echo "  ./publish-update.sh 1.2.0 github"
  echo "  ./publish-update.sh 1.2.0 custom"
  echo ""
  echo "Prérequis:"
  echo "  - GH_TOKEN défini pour GitHub Releases"
  echo "  - npm installé"
  echo "  - git installé"
  echo ""
}

# Vérifications initiales
check_prerequisites() {
  if [ -z "$VERSION" ]; then
    echo -e "${RED}❌ Erreur: Version manquante${NC}"
    echo ""
    show_help
    exit 1
  fi

  if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm n'est pas installé${NC}"
    exit 1
  fi

  if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ git n'est pas installé${NC}"
    exit 1
  fi

  if [ "$PROVIDER" = "github" ] && [ -z "$GITHUB_TOKEN" ]; then
    echo -e "${YELLOW}⚠️  GH_TOKEN n'est pas défini${NC}"
    echo "Pour GitHub Releases, définissez: export GH_TOKEN=votre_token"
    echo ""
    read -p "Continuer quand même? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
      exit 1
    fi
  fi
}

# Mettre à jour la version
update_version() {
  echo -e "${BLUE}📝 Mise à jour de la version dans package.json...${NC}"
  
  # Utilisez sed ou jq selon ce qui est disponible
  if command -v jq &> /dev/null; then
    jq ".version = \"$VERSION\"" package.json > package.json.tmp && mv package.json.tmp package.json
  else
    sed -i "s/\"version\": \"[^\"]*\"/\"version\": \"$VERSION\"/" package.json
  fi
  
  echo -e "${GREEN}✅ Version mise à jour: $VERSION${NC}"
}

# Committer et tagger
commit_and_tag() {
  echo -e "${BLUE}📌 Création du commit et du tag...${NC}"
  
  git add package.json
  git commit -m "Release v$VERSION"
  git tag -a "v$VERSION" -m "Version $VERSION"
  git push origin main
  git push origin --tags
  
  echo -e "${GREEN}✅ Commit et tags poussés${NC}"
}

# Installer les dépendances
install_dependencies() {
  echo -e "${BLUE}📦 Installation des dépendances...${NC}"
  npm install
  echo -e "${GREEN}✅ Dépendances installées${NC}"
}

# Construire l'application
build_application() {
  echo -e "${BLUE}🔨 Construction de l'application...${NC}"
  npm run build-all
  echo -e "${GREEN}✅ Construction terminée${NC}"
}

# Publier sur GitHub
publish_github() {
  echo -e "${BLUE}🚀 Publication sur GitHub Releases...${NC}"
  
  if [ -z "$GITHUB_TOKEN" ]; then
    echo -e "${YELLOW}⚠️  GH_TOKEN vide - saut de la publication automatique${NC}"
    echo ""
    echo "Pour publier automatiquement:"
    echo "1. Créez un Personal Access Token: https://github.com/settings/tokens"
    echo "2. Définissez: export GH_TOKEN=votre_token"
    echo "3. Relancez ce script"
    echo ""
    echo "Fichiers de distribution disponibles dans: dist/"
    return
  fi
  
  export GH_TOKEN="$GITHUB_TOKEN"
  npm run publish
  
  echo -e "${GREEN}✅ Publication sur GitHub effectuée${NC}"
}

# Publier sur serveur personnalisé
publish_custom() {
  echo -e "${BLUE}🚀 Préparation pour upload sur serveur personnalisé...${NC}"
  
  if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Le dossier dist n'existe pas${NC}"
    exit 1
  fi
  
  echo ""
  echo "Fichiers disponibles pour upload:"
  ls -lh dist/ | grep -E '\.(deb|exe|yml)$'
  
  echo ""
  echo -e "${YELLOW}📤 Actions manuelles:${NC}"
  echo "1. Uploadez les fichiers suivants sur votre serveur:"
  echo "   - dist/*.deb (Linux)"
  echo "   - dist/*.exe (Windows)"
  echo "   - dist/latest-linux.yml"
  echo "   - dist/latest.yml"
  echo ""
  echo "2. Mettez à jour latest.yml et latest-linux.yml sur votre serveur"
  echo "3. Vérifiez que les URLs pointent vers votre serveur"
  echo ""
  echo -e "${GREEN}✅ Préparation terminée${NC}"
}

# Afficher le résumé
show_summary() {
  echo ""
  echo -e "${BLUE}=== RÉSUMÉ ===${NC}"
  echo -e "Version: ${GREEN}$VERSION${NC}"
  echo -e "Provider: ${GREEN}$PROVIDER${NC}"
  echo -e "Statut: ${GREEN}✅ SUCCÈS${NC}"
  echo ""
  echo "Prochaines étapes:"
  
  if [ "$PROVIDER" = "github" ]; then
    echo "- Vérifiez la release sur: https://github.com/your-username/cybersecurity-browser/releases/tag/v$VERSION"
    echo "- Les utilisateurs recevront la notification de mise à jour automatiquement"
  else
    echo "- Uploadez les fichiers dist/ sur votre serveur"
    echo "- Mettez à jour latest.yml avec les bonnes URLs"
  fi
  
  echo ""
}

# Fonction principale
main() {
  echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
  echo -e "${BLUE}║  Outil de Publication - Cyberdéfense Browser              ║${NC}"
  echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
  echo ""
  
  check_prerequisites
  update_version
  install_dependencies
  build_application
  commit_and_tag
  
  if [ "$PROVIDER" = "github" ]; then
    publish_github
  else
    publish_custom
  fi
  
  show_summary
}

# Lancer
main

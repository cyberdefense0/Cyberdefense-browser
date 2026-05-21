#!/bin/bash

# Script de Release Simplifié
# Utilise Git et GitHub Actions pour publier automatiquement
# Usage: ./git-release.sh <version>

set -e

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

VERSION=${1:-""}

# Fonctions
show_help() {
  echo -e "${BLUE}=== Outil de Release Git ===${NC}"
  echo ""
  echo "Usage: ./git-release.sh <version>"
  echo ""
  echo "Exemple:"
  echo "  ./git-release.sh 1.2.0"
  echo ""
  echo "Cet outil:"
  echo "  1. Met à jour package.json"
  echo "  2. Crée un commit"
  echo "  3. Crée un tag git"
  echo "  4. Pousse vers GitHub"
  echo "  5. GitHub Actions publie automatiquement"
  echo ""
}

error() {
  echo -e "${RED}❌ Erreur: $1${NC}"
  exit 1
}

info() {
  echo -e "${BLUE}ℹ️  $1${NC}"
}

success() {
  echo -e "${GREEN}✅ $1${NC}"
}

warning() {
  echo -e "${YELLOW}⚠️  $1${NC}"
}

# Vérifications
check_requirements() {
  info "Vérification des prérequis..."
  
  if [ -z "$VERSION" ]; then
    echo -e "${RED}❌ Version manquante${NC}"
    echo ""
    show_help
    exit 1
  fi

  # Vérifier format de version (X.Y.Z)
  if ! [[ $VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    error "Format de version invalide. Utiliser X.Y.Z (ex: 1.2.0)"
  fi

  # Vérifier que c'est un repo git
  if [ ! -d .git ]; then
    error "Pas un repository git. Allez dans le dossier du projet."
  fi

  # Vérifier que git est à jour
  if [ -n "$(git status --porcelain)" ]; then
    warning "Changements non commitées détectées"
    echo ""
    git status --short
    echo ""
    read -p "Continuer quand même? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
      exit 1
    fi
  fi

  # Vérifier que le tag n'existe pas déjà
  if git rev-parse "v$VERSION" 2>/dev/null; then
    error "La version v$VERSION existe déjà"
  fi

  success "Prérequis vérifiés"
}

# Mettre à jour package.json
update_version() {
  info "Mise à jour de package.json..."
  
  CURRENT_VERSION=$(grep '"version"' package.json | head -1 | sed 's/.*"version": "\([^"]*\)".*/\1/')
  info "Version actuelle: $CURRENT_VERSION → Nouvelle: $VERSION"
  
  if command -v jq &> /dev/null; then
    jq ".version = \"$VERSION\"" package.json > package.json.tmp && mv package.json.tmp package.json
  else
    sed -i.bak "s/\"version\": \"[^\"]*\"/\"version\": \"$VERSION\"/" package.json
    rm -f package.json.bak
  fi
  
  success "package.json mis à jour"
}

# Commit et tag
commit_and_tag() {
  info "Création du commit et du tag..."
  
  git add package.json
  git commit -m "Release v$VERSION" --no-verify
  
  git tag -a "v$VERSION" -m "Version $VERSION - $(date '+%d/%m/%Y')')"
  
  success "Commit créé et taggé"
}

# Push vers GitHub
push_to_github() {
  info "Push vers GitHub..."
  
  git push origin main
  git push origin "v$VERSION"
  
  success "Données poussées vers GitHub"
}

# Afficher le résumé
show_summary() {
  echo ""
  echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
  echo -e "${GREEN}✨ RELEASE CRÉÉE AVEC SUCCÈS!${NC}"
  echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
  echo ""
  echo -e "Version: ${GREEN}v$VERSION${NC}"
  echo ""
  echo "🔄 GitHub Actions a été déclenché!"
  echo ""
  echo "Étapes automatiques en cours:"
  echo "  1️⃣  Compilation Linux (deb)"
  echo "  2️⃣  Compilation Windows (exe)"
  echo "  3️⃣  Upload sur GitHub Releases"
  echo "  4️⃣  Notification des utilisateurs"
  echo ""
  echo "📊 Suivre la progression:"
  echo "  https://github.com/your-username/cybersecurity-browser/actions"
  echo ""
  echo "✅ Les utilisateurs recevront la notification de mise à jour"
  echo "   dans 1-2 minutes."
  echo ""
}

# Main
main() {
  echo ""
  echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
  echo -e "${BLUE}║  Outil de Release - Cyberdéfense Browser                  ║${NC}"
  echo -e "${BLUE}║  GitHub Actions Edition                                   ║${NC}"
  echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
  echo ""
  
  check_requirements
  update_version
  commit_and_tag
  push_to_github
  show_summary
}

# Lancer
main

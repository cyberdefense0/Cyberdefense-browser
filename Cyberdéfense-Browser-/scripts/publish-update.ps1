# Script de publication de mise à jour pour Cyberdéfense Browser (Windows)
# Usage: .\publish-update.ps1 -Version "1.2.0" -Provider "github"

param(
    [Parameter(Mandatory=$true, HelpMessage="Version à publier (ex: 1.2.0)")]
    [string]$Version,
    
    [Parameter(Mandatory=$false, HelpMessage="Provider: 'github' ou 'custom'")]
    [string]$Provider = "github",
    
    [Parameter(Mandatory=$false, HelpMessage="Token GitHub")]
    [string]$GithubToken = ""
)

# Couleurs
$ErrorColor = "Red"
$SuccessColor = "Green"
$InfoColor = "Cyan"
$WarningColor = "Yellow"

function Write-Info {
    param([string]$Message)
    Write-Host "ℹ️  $Message" -ForegroundColor $InfoColor
}

function Write-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor $SuccessColor
}

function Write-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor $ErrorColor
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠️  $Message" -ForegroundColor $WarningColor
}

# Vérifications
function Check-Prerequisites {
    Write-Info "Vérification des prérequis..."
    
    if (-not (Test-Path "package.json")) {
        Write-Error "package.json non trouvé"
        exit 1
    }
    
    # Vérifier npm
    $npm = Get-Command npm -ErrorAction SilentlyContinue
    if (-not $npm) {
        Write-Error "npm n'est pas installé"
        exit 1
    }
    
    # Vérifier git
    $git = Get-Command git -ErrorAction SilentlyContinue
    if (-not $git) {
        Write-Error "git n'est pas installé"
        exit 1
    }
    
    Write-Success "Prérequis vérifiés"
}

# Mettre à jour la version
function Update-Version {
    Write-Info "Mise à jour de la version dans package.json..."
    
    $content = Get-Content "package.json" -Raw | ConvertFrom-Json
    $content.version = $Version
    $content | ConvertTo-Json -Depth 10 | Set-Content "package.json"
    
    Write-Success "Version mise à jour: $Version"
}

# Git commit et tag
function Commit-And-Tag {
    Write-Info "Création du commit et du tag..."
    
    & git add package.json
    & git commit -m "Release v$Version"
    & git tag -a "v$Version" -m "Version $Version"
    & git push origin main
    & git push origin --tags
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Commit et tags poussés"
    } else {
        Write-Error "Erreur lors du git push"
        exit 1
    }
}

# Installer les dépendances
function Install-Dependencies {
    Write-Info "Installation des dépendances..."
    & npm install
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Dépendances installées"
    } else {
        Write-Error "Erreur lors de l'installation"
        exit 1
    }
}

# Construire
function Build-Application {
    Write-Info "Construction de l'application..."
    & npm run build-all
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Construction terminée"
    } else {
        Write-Error "Erreur lors de la construction"
        exit 1
    }
}

# Publier sur GitHub
function Publish-GitHub {
    Write-Info "Publication sur GitHub Releases..."
    
    if ([string]::IsNullOrEmpty($GithubToken)) {
        Write-Warning "GH_TOKEN vide - saut de la publication"
        Write-Host ""
        Write-Host "Pour publier automatiquement:"
        Write-Host "1. Créez un Personal Access Token: https://github.com/settings/tokens"
        Write-Host "2. Passez le token: -GithubToken 'votre_token'"
        Write-Host ""
        Write-Host "Fichiers disponibles dans: dist/"
        return
    }
    
    $env:GH_TOKEN = $GithubToken
    & npm run publish
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Publication sur GitHub effectuée"
    } else {
        Write-Error "Erreur lors de la publication"
        exit 1
    }
}

# Publier sur serveur personnalisé
function Publish-Custom {
    Write-Info "Préparation pour upload sur serveur personnalisé..."
    
    if (-not (Test-Path "dist")) {
        Write-Error "Le dossier dist n'existe pas"
        exit 1
    }
    
    Write-Host ""
    Write-Host "Fichiers disponibles pour upload:" -ForegroundColor $InfoColor
    Get-ChildItem "dist\" -Include "*.deb", "*.exe", "*.yml" | Format-Table -Property Name, @{Name="Taille";Expression={"{0:N0} KB" -f ($_.Length/1KB)}}
    
    Write-Host ""
    Write-Warning "Actions manuelles:"
    Write-Host "1. Uploadez les fichiers suivants sur votre serveur:"
    Write-Host "   - dist/*.deb (Linux)"
    Write-Host "   - dist/*.exe (Windows)"
    Write-Host "   - dist/latest-linux.yml"
    Write-Host "   - dist/latest.yml"
    Write-Host ""
    Write-Host "2. Mettez à jour latest.yml et latest-linux.yml"
    Write-Host "3. Vérifiez les URLs"
    Write-Host ""
    Write-Success "Préparation terminée"
}

# Résumé
function Show-Summary {
    Write-Host ""
    Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor $InfoColor
    Write-Host "RÉSUMÉ" -ForegroundColor $InfoColor
    Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor $InfoColor
    Write-Host "Version: $Version" -ForegroundColor $SuccessColor
    Write-Host "Provider: $Provider" -ForegroundColor $SuccessColor
    Write-Host "Statut: ✅ SUCCÈS" -ForegroundColor $SuccessColor
    Write-Host ""
    Write-Host "Prochaines étapes:" -ForegroundColor $InfoColor
    
    if ($Provider -eq "github") {
        Write-Host "- Vérifiez la release sur GitHub"
        Write-Host "- Les utilisateurs recevront la notification automatiquement"
    } else {
        Write-Host "- Uploadez les fichiers dist/"
        Write-Host "- Mettez à jour latest.yml"
    }
    Write-Host ""
}

# Main
function Main {
    Write-Host ""
    Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor $InfoColor
    Write-Host "║  Outil de Publication - Cyberdéfense Browser              ║" -ForegroundColor $InfoColor
    Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor $InfoColor
    Write-Host ""
    
    Check-Prerequisites
    Update-Version
    Install-Dependencies
    Build-Application
    Commit-And-Tag
    
    if ($Provider -eq "github") {
        Publish-GitHub
    } else {
        Publish-Custom
    }
    
    Show-Summary
}

Main

# Script de Release - Version PowerShell
# Utilise Git et GitHub Actions pour publier automatiquement
# Usage: .\git-release.ps1 -Version "1.2.0"

param(
    [Parameter(Mandatory=$true, HelpMessage="Version à publier (ex: 1.2.0)")]
    [string]$Version
)

$ErrorActionPreference = "Stop"

# Couleurs
$Error_Color = "Red"
$Success_Color = "Green"
$Info_Color = "Cyan"
$Warning_Color = "Yellow"

function Write-Info {
    param([string]$Message)
    Write-Host "ℹ️  $Message" -ForegroundColor $Info_Color
}

function Write-Success {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor $Success_Color
}

function Write-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor $Error_Color
    exit 1
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠️  $Message" -ForegroundColor $Warning_Color
}

# Vérifications
function Check-Requirements {
    Write-Info "Vérification des prérequis..."
    
    # Vérifier format version
    if ($Version -notmatch '^\d+\.\d+\.\d+$') {
        Write-Error "Format de version invalide. Utiliser X.Y.Z (ex: 1.2.0)"
    }
    
    # Vérifier git
    $git = Get-Command git -ErrorAction SilentlyContinue
    if (-not $git) {
        Write-Error "git n'est pas installé"
    }
    
    # Vérifier repo git
    if (-not (Test-Path ".git")) {
        Write-Error "Pas un repository git"
    }
    
    # Vérifier changements
    $status = & git status --porcelain
    if ($status) {
        Write-Warning "Changements non commitées:"
        & git status --short
        Write-Host ""
        $response = Read-Host "Continuer? (y/n)"
        if ($response -ne "y") {
            exit 1
        }
    }
    
    # Vérifier tag n'existe pas
    $tagExists = & git rev-parse "v$Version" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Error "La version v$Version existe déjà"
    }
    
    Write-Success "Prérequis vérifiés"
}

# Mettre à jour version
function Update-Version {
    Write-Info "Mise à jour de package.json..."
    
    $packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json
    $oldVersion = $packageJson.version
    $packageJson.version = $Version
    
    Write-Info "Version actuelle: $oldVersion → Nouvelle: $Version"
    
    $packageJson | ConvertTo-Json -Depth 10 | Set-Content "package.json"
    
    Write-Success "package.json mis à jour"
}

# Commit et tag
function Commit-And-Tag {
    Write-Info "Création du commit et du tag..."
    
    & git add package.json
    & git commit -m "Release v$Version" --no-verify
    
    $date = Get-Date -Format "dd/MM/yyyy"
    & git tag -a "v$Version" -m "Version $Version - $date"
    
    Write-Success "Commit créé et taggé"
}

# Push vers GitHub
function Push-To-GitHub {
    Write-Info "Push vers GitHub..."
    
    & git push origin main
    & git push origin "v$Version"
    
    Write-Success "Données poussées vers GitHub"
}

# Afficher résumé
function Show-Summary {
    Write-Host ""
    Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor $Info_Color
    Write-Host "✨ RELEASE CRÉÉE AVEC SUCCÈS!" -ForegroundColor $Success_Color
    Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor $Info_Color
    Write-Host ""
    Write-Host "Version: v$Version" -ForegroundColor $Success_Color
    Write-Host ""
    Write-Host "🔄 GitHub Actions a été déclenché!"
    Write-Host ""
    Write-Host "Étapes automatiques en cours:"
    Write-Host "  1️⃣  Compilation Linux (deb)"
    Write-Host "  2️⃣  Compilation Windows (exe)"
    Write-Host "  3️⃣  Upload sur GitHub Releases"
    Write-Host "  4️⃣  Notification des utilisateurs"
    Write-Host ""
    Write-Host "📊 Suivre la progression:"
    Write-Host "  https://github.com/your-username/cybersecurity-browser/actions"
    Write-Host ""
    Write-Host "✅ Les utilisateurs recevront la notification de mise à jour"
    Write-Host "   dans 1-2 minutes."
    Write-Host ""
}

# Main
function Main {
    Write-Host ""
    Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor $Info_Color
    Write-Host "║  Outil de Release - Cyberdéfense Browser                  ║" -ForegroundColor $Info_Color
    Write-Host "║  GitHub Actions Edition                                   ║" -ForegroundColor $Info_Color
    Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor $Info_Color
    Write-Host ""
    
    Check-Requirements
    Update-Version
    Commit-And-Tag
    Push-To-GitHub
    Show-Summary
}

Main

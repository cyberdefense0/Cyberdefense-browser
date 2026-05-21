# Script de Configuration GitHub - Windows PowerShell
# Configure automatiquement votre repository GitHub

$ErrorActionPreference = "Stop"

$Info_Color = "Cyan"
$Success_Color = "Green"
$Warning_Color = "Yellow"
$Error_Color = "Red"

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════╗" -ForegroundColor $Info_Color
Write-Host "║  Configuration GitHub - Cyberdéfense Browser              ║" -ForegroundColor $Info_Color
Write-Host "╚════════════════════════════════════════════════════════════╝" -ForegroundColor $Info_Color
Write-Host ""

# Demander les informations
Write-Host "📋 Informations GitHub Requises" -ForegroundColor $Warning_Color
Write-Host ""

$GITHUB_USERNAME = Read-Host "Username GitHub"
$GITHUB_REPO = Read-Host "Nom du Repository"
$GITHUB_URL = Read-Host "URL du Repository (https://github.com/user/repo)"

Write-Host ""
Write-Host "ℹ️  Configuration détectée:" -ForegroundColor $Info_Color
Write-Host "  Username: $GITHUB_USERNAME"
Write-Host "  Repository: $GITHUB_REPO"
Write-Host "  URL: $GITHUB_URL"
Write-Host ""

# Confirmer
$confirm = Read-Host "Continuer? (y/n)"
if ($confirm -ne "y") {
    exit 1
}

Write-Host ""
Write-Host "⚙️  Configuration en cours..." -ForegroundColor $Info_Color
Write-Host ""

# 1. Mettre à jour package.json
Write-Host "1️⃣  Mise à jour de package.json" -ForegroundColor $Info_Color
$packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json
$packageJson.build.publish[0].owner = $GITHUB_USERNAME
$packageJson.build.publish[0].repo = $GITHUB_REPO
$packageJson | ConvertTo-Json -Depth 10 | Set-Content "package.json"
Write-Host "   ✅ package.json configuré" -ForegroundColor $Success_Color

# 2. Mettre à jour git-release.ps1
Write-Host "2️⃣  Mise à jour de git-release.ps1" -ForegroundColor $Info_Color
$gitReleaseContent = Get-Content "git-release.ps1" -Raw
$gitReleaseContent = $gitReleaseContent -replace "https://github.com/your-username/cybersecurity-browser", $GITHUB_URL
$gitReleaseContent | Set-Content "git-release.ps1"
Write-Host "   ✅ git-release.ps1 configuré" -ForegroundColor $Success_Color

# 3. Vérifier le repo git
Write-Host "3️⃣  Vérification du repository Git" -ForegroundColor $Info_Color
$CURRENT_REPO = & git config --get remote.origin.url
Write-Host "   Repository git actuel: $CURRENT_REPO" -ForegroundColor $Warning_Color

if ($CURRENT_REPO -ne $GITHUB_URL -and $CURRENT_REPO -ne "$GITHUB_URL.git") {
    Write-Host "   ⚠️  Le repository git ne correspond pas" -ForegroundColor $Warning_Color
    $updateRepo = Read-Host "   Mettre à jour? (y/n)"
    if ($updateRepo -eq "y") {
        & git remote set-url origin $GITHUB_URL
        Write-Host "   ✅ Repository git mis à jour" -ForegroundColor $Success_Color
    }
}

# 4. Tester la connexion GitHub
Write-Host "4️⃣  Test de connexion GitHub" -ForegroundColor $Info_Color
try {
    & git ls-remote origin HEAD > $null 2>&1
    Write-Host "   ✅ Connexion GitHub OK" -ForegroundColor $Success_Color
} catch {
    Write-Host "   ⚠️  Impossible de vérifier la connexion" -ForegroundColor $Warning_Color
    Write-Host "   Assurez-vous que:"
    Write-Host "   - Le repository existe et est accessible"
    Write-Host "   - Vous êtes authentifiés sur GitHub"
    Write-Host "   - SSH/HTTPS est configuré correctement"
}

Write-Host ""
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor $Success_Color
Write-Host "✅ CONFIGURATION TERMINÉE!" -ForegroundColor $Success_Color
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor $Success_Color
Write-Host ""
Write-Host "Prochaines étapes:" -ForegroundColor $Info_Color
Write-Host ""
Write-Host "1. Initialiser le repository:"
Write-Host "   git add ."
Write-Host "   git commit -m 'Initial commit'"
Write-Host "   git push -u origin main"
Write-Host ""
Write-Host "2. Créer la première release:"
Write-Host "   .\git-release.ps1 -Version '1.1.0'"
Write-Host ""
Write-Host "3. Vérifier sur GitHub:"
Write-Host "   $GITHUB_URL/actions"
Write-Host ""
Write-Host "💾 Configuration sauvegardée dans:" -ForegroundColor $Info_Color
Write-Host "   - package.json"
Write-Host "   - git-release.ps1"
Write-Host "   - .git/config"
Write-Host ""
Write-Host "✨ Vous êtes prêt à publier vos mises à jour!" -ForegroundColor $Success_Color
Write-Host ""

# Cyberdéfense Browser

Prototype de navigateur Electron avec panneau de sécurité façon cyberpunk.

## Fonctionnalités

### Navigation
- Barre d'adresse avec suggestions (favoris + historique) en direct
- Onglets multiples avec favicon, clic droit (dupliquer, fermer les autres, fermer tout)
- Historique de navigation consultable et effaçable
- Favoris avec ajout/suppression rapide
- Page "Nouvel onglet" dédiée (`start.html`) : horloge, recherche rapide, grille de favoris
- Barre de progression de chargement en haut de la fenêtre
- Zoom par onglet (−/+, raccourcis Ctrl +/-, double-clic pour réinitialiser)
- Mode focus (masque tout sauf la page active — Échap pour quitter)
- Session restaurée automatiquement au redémarrage (onglets, thème, moteur de recherche)

### Sécurité & vie privée
- Bloqueur de trackers et de publicités, avec **liste étendue** de domaines connus (analytics, pubs, régies) et **compteur en temps réel** des éléments réellement bloqués (fini le chiffre aléatoire)
- VPN intégré (par pays ou proxy manuel), VPN Rapide, routage Tor (Onion)
- Do Not Track, bloqueur de cookies, bloqueur de popups
- Scanner de sécurité par site (HTTPS, HSTS, CSP, clickjacking, MIME sniffing…) avec score et grade
- **Réputation de domaine réelle** : calculée à partir de l'historique de sécurité du site, avec tendance ↑/↓
- Alerte automatique (toast) si un site obtient un score de sécurité faible
- Inspecteur de cookies, **moniteur de performance réel** (temps de chargement mesuré et moyenne glissante)
- **Générateur de mot de passe avancé** : longueur réglable (8-64), choix des types de caractères, indicateur de force basé sur l'entropie réelle, génération cryptographiquement sûre (`crypto.getRandomValues`), copie en un clic
- **Filtre lumière bleue / Mode nuit** : teinte chaude appliquée à la page active, intensité réglable, préférence mémorisée
- **Détection de technologies réelle** : analyse le DOM de la page active (scripts, meta generator, feuilles de style) pour identifier CMS/frameworks/CDN réellement utilisés (fini la liste aléatoire)
- **Export / Import des favoris** en JSON via un vrai sélecteur de fichier système
- **Recherche dans l'historique** en direct
- **Extensions** : chargement d'extensions Chrome non empaquetées (dossier avec `manifest.json`), via l'API réelle Electron `session.loadExtension()`. Active/désactive, supprime, persiste entre les sessions. Les scripts de contenu et le CSS injecté fonctionnent ; pas d'icône de barre d'outils (interface personnalisée) — recharger la page après activation

### Interface
- **Capture d'écran** de la page active, enregistrée dans le dossier Images
- **Gestionnaire de téléchargements réel** : suit chaque téléchargement (progression, taille, statut), accessible depuis l'en-tête avec badge du nombre de téléchargements en cours, bouton pour ouvrir le dossier contenant le fichier
- 5 thèmes (Cyberpunk Neon, Dark, Light, Matrix Green, Sunset) qui recolorent toute l'interface
- **Mode Lecture réel** : extrait le contenu principal de la page (titre + texte), l'affiche dans une vue épurée avec réglage de la taille du texte et temps de lecture estimé
- **Tutoriel de bienvenue** au premier lancement (relançable via le bouton ❔), 5 étapes qui présentent le panneau, les onglets, le scanner et les raccourcis
- Notifications toast pour les actions importantes
- Panneau latéral redimensionnable (glisser le séparateur) et repliable
- Console de logs intégrée avec horodatage et niveaux (info/succès/avertissement/erreur)

### Raccourcis clavier
| Raccourci | Action |
|---|---|
| `Ctrl+T` | Nouvel onglet |
| `Ctrl+W` | Fermer l'onglet actif |
| `Ctrl+L` | Sélectionner la barre d'adresse |
| `Ctrl+D` | Ajouter la page aux favoris |
| `Ctrl+F` | Rechercher dans la page |
| `Ctrl+ +` / `Ctrl+ -` / `Ctrl+0` | Zoom avant / arrière / réinitialiser |
| `Ctrl+1`…`Ctrl+9` | Aller à l'onglet N |
| `Ctrl+Tab` / `Ctrl+Maj+Tab` | Onglet suivant / précédent |
| `Ctrl+P` | Imprimer la page |
| `F5` / `Ctrl+R` | Recharger la page |
| `Échap` | Quitter le mode focus |

## Installation

1. Ouvrez un terminal dans le dossier du projet.
2. Lancez `npm install`.
3. Lancez `npm start`.

## Notes

- Prototype de navigateur desktop — la navigation utilise des `<iframe>` (le tag `<webview>` est désactivé côté Electron).
- Le VPN utilise un routage proxy au niveau de l'application ; ce n'est pas un tunnel VPN complet. Les serveurs "VPN Pays" et "VPN Rapide" sont des proxys publics/communautaires : leur disponibilité varie, une vérification de connexion réelle est faite avant activation et l'app revient automatiquement en mode direct si le serveur ne répond pas. Pour une fiabilité garantie, utilisez un proxy manuel (votre propre fournisseur).
- Les extensions supportées sont des dossiers non empaquetés (mode développeur, comme dans Chrome) : les scripts de contenu et le CSS injecté fonctionnent, mais les icônes/popups de barre d'outils ne s'affichent pas (interface personnalisée).
- Améliorations possibles : détection de phishing, scan SSL avancé, outils OSINT, terminal intégré, analyse IA.

### v1.12.0 — nouveautés
- **Vraie barre de recherche dans la page** (Ctrl+F) : l'ancienne version utilisait un `prompt()` natif sans compteur ni navigation. Maintenant : barre intégrée avec compteur "X/Y" en direct, boutons précédent/suivant (↑↓), Entrée/Maj+Entrée, Échap pour fermer

### v1.11.0 — nouveautés
- **Inspecteur de cookies refondu** : l'ancien bouton n'affichait que 3 cookies tronqués dans les logs. Nouveau panneau complet : liste tous les cookies (du domaine actif ou globalement), suppression individuelle ou en masse

### v1.10.0 — nouveautés
- **Épingler un onglet** 📌 (menu clic-droit) : onglet réduit à l'icône, protégé de "Fermer les autres/tous"
- **Imprimer la page** 🖨️ : bouton dans la barre d'outils, menu clic-droit, et raccourci Ctrl+P
- **Navigation entre onglets** : Ctrl+Tab / Ctrl+Maj+Tab pour passer à l'onglet suivant/précédent

### v1.9.0 — nouveautés
- **Picture-in-Picture** 🖼️ : incruste la vidéo active dans un mini-lecteur flottant (bouton dans la barre d'outils)
- **Détection de phishing réelle** : l'ancienne "vérification" comparait à 2 domaines factices qui ne matchaient jamais rien. Remplacée par de vraies heuristiques (typosquatting de marques connues, IP littérale, punycode/IDN, identifiants dans l'URL, sous-domaines excessifs, mots-clés suspects)
- F5 / Ctrl+R / Ctrl+±0 fonctionnent maintenant même quand le focus est dans la page chargée
- La barre d'adresse affiche le vrai lien de la page (plus `iframe.src` figé)
- Une URL explicite (`https://...`) contenant des espaces n'est plus routée par erreur vers une recherche
- User-Agent Chrome réaliste (réduit les CAPTCHA liés à la détection d'Electron)
- Bulle de permission native (notifications, etc.) refusée par défaut au lieu de s'afficher illisible
- Capture d'écran copiée dans le presse-papiers en plus du fichier
- Politique d'autoplay assouplie (corrige la lecture vidéo qui se remettait en pause instantanément, ex. YouTube)
- VPN/Tor : vraie vérification de connexion avant activation, message d'erreur clair sinon
- Dossier de téléchargement configurable
- Import des favoris : accepte aussi le format HTML standard (export Chrome/Firefox/Edge)

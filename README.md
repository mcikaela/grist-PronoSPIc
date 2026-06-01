# PronoSPIc - Widget Grist de Pronostics Coupe du Monde 2026

![PronoSPIc](https://img.shields.io/badge/Widget-PronoSPIc-blue) ![License](https://img.shields.io/badge/License-Apache%202.0-green) ![Version](https://img.shields.io/badge/Version-3.0.0-orange)

Widget Grist complet pour gérer les pronostics de la Coupe du Monde 2026 avec interface bilingue, classement dynamique et récupération automatique des résultats.

## 🌟 Fonctionnalités

### 🏟️ **Gestion des Matchs**
- **48 équipes** réparties en 12 groupes
- **104 matchs** : phases de groupes, 8e, quarts, demies, finale, 3e place
- **Interface intuitive** pour saisir ses pronostics
- **Filtres** par phase de compétition et par groupe
- **Affichage des résultats officiels** avec calcul des points

### 👥 **Gestion des Utilisateurs**
- **Profils personnalisables** : nom d'affichage et avatar
- **Identification automatique** via email Grist
- **Classement en temps réel** avec podium 🥇🥈🥉
- **Statistiques personnelles** détaillées

### 🤖 **Récupération Automatique des Résultats**
- **API openfootball** intégrée (pas de clé API requise)
- **Mise à jour en un clic** des scores officiels
- **Recalcul automatique** des points de tous les joueurs
- **Compatible** avec la saisie manuelle

### 🏆 **Système de Points**
- **3 points** : score exact
- **1 point** : bon résultat (victoire/défaite/nul)
- **Bonus** : pronostics sur le vainqueur et meilleur buteur
- **Recalcul** automatique des points

### 🌍 **Internationalisation**
- **Français / Anglais** en un clic
- **Interface adaptative** selon la langue
- **Noms d'équipes** bilingues

### ⚙️ **Administration**
- **Interface propriétaire** pour saisir les résultats
- **Rafraîchissement automatique** via API
- **Recalcul global** des points
- **Gestion des tables** automatique

## 📋 Tables Grist Créées

| Table | Description | Colonnes |
|-------|-------------|----------|
| `Prono_Teams` | Informations des 48 équipes | Code, Name_FR, Name_EN, Group_Letter, FlagCode |
| `Prono_Matches` | Liste des 104 matchs | Match_Number, Phase, Group_Letter, Team1_Code, Team2_Code, Match_Date, Match_Time, Stadium, City, Score1, Score2 |
| `Prono_Predictions` | Pronostics des utilisateurs | User_Email, Match_Number, Pred_Score1, Pred_Score2, Points |
| `Prono_Bonus` | Pronostics bonus | User_Email, Winner_Code, Top_Scorer, Points |
| `Prono_Profiles` | Profils utilisateurs | User_Email, Display_Name, Avatar_URL |
| `Prono_UserInfo` | Helper pour détection email | UserEmail (formule) |

## 🚀 Installation

### Méthode 1 : Vercel (Recommandé)
1. **Fork** ce repository sur GitHub
2. **Connectez** votre fork à Vercel
3. **Déployez** automatiquement
4. **Intégrez** l'URL Vercel dans Grist

### Méthode 2 : GitHub Pages
1. **Fork** ce repository
2. **Activez** GitHub Pages dans les settings
3. **Utilisez** l'URL GitHub Pages dans Grist

### Méthode 3 : Auto-hébergement
1. **Clonez** ce repository
2. **Servez** les fichiers avec un serveur web
3. **Configurez** les headers CORS si nécessaire

## ⚙️ Configuration dans Grist

1. **Créez** une nouvelle page Grist
2. **Ajoutez** un widget de type "Web Page"
3. **Collez** l'URL du widget déployé
4. **Accordez** les permissions nécessaires (full access)

Le widget créera automatiquement toutes les tables requises lors de la première utilisation.

## 🎯 Utilisation

### Pour les Joueurs

1. **Personnalisez votre profil** (onglet "Mon Profil")
   - Choisissez un nom d'affichage
   - Ajoutez un avatar (optionnel)

2. **Faites vos pronostics** (onglet "Matchs")
   - Filtrez par phase ou groupe
   - Saisissez les scores attendus
   - Validez chaque pronostic

3. **Consultez vos stats** (onglet "Mes Stats")
   - Points totaux
   - Nombre de pronostics
   - Taux de réussite

4. **Suivez le classement** (onglet "Classement")
   - Podium des 3 premiers
   - Tableau détaillé de tous les joueurs

### Pour les Propriétaires

1. **Saisissez les résultats** (onglet "Admin")
   - Mode manuel : entrez les scores un par un
   - Mode automatique : cliquez sur "Rafraîchir les résultats"

2. **Gérez la compétition**
   - Recalculez tous les points si nécessaire
   - Vérifiez l'état des matchs

## 🔄 Récupération Automatique des Résultats

Le widget utilise l'API **openfootball** pour récupérer les résultats officiels :

```javascript
// URL de l'API (pas de clé requise)
https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json
```

**Fonctionnement :**
- Le propriétaire clique sur "🔄 Rafraîchir les résultats"
- Le widget compare les scores de l'API avec les scores locaux
- Seuls les matchs avec des résultats officiels sont mis à jour
- Les points sont automatiquement recalculés pour tous les joueurs

## 👤 Profils Utilisateurs

Chaque joueur peut personnaliser son profil :

- **Nom d'affichage** : Remplace l'email dans le classement
- **Avatar** : Image personnelle (URL)
- **Fallback** : Si pas de profil, utilise la partie avant @ de l'email

## 🌐 Déploiement

### Vercel
```bash
# Après avoir forké le repo
git clone https://github.com/VOTRE_USERNAME/grist-PronoSPIc.git
cd grist-PronoSPIc
# Push vers votre fork triggera le déploiement automatique
git push origin main
```

### Configuration Vercel
Le `vercel.json` inclus configure les headers pour l'embedding dans Grist :
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "ALLOWALL" },
        { "key": "Content-Security-Policy", "value": "frame-ancestors *" }
      ]
    }
  ]
}
```

## 🛠️ Développement

### Structure du Projet
```
grist-PronoSPIc/
├── index.html          # Interface principale
├── widget.js           # Logique du widget
├── vercel.json         # Configuration Vercel
└── README.md           # Documentation
```

### Technologies
- **HTML5** / **CSS3** / **JavaScript (ES6+)**
- **API Grist** pour l'interaction avec les tables
- **openfootball API** pour les résultats
- **Vercel** pour le déploiement

### Personnalisation
Les principales variables peuvent être modifiées dans `widget.js` :
```javascript
// Tables Grist
var TEAMS_TABLE = 'Prono_Teams';
var MATCHES_TABLE = 'Prono_Matches';
// ... etc

// API de résultats
var WORLD_CUP_API_URL = 'https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json';
```

## 🐛 Dépannage

### Problèmes Communs

**Widget ne se charge pas :**
- Vérifiez que l'URL est correcte dans Grist
- Assurez-vous d'avoir accordé les permissions "full access"
- Vérifiez la console du navigateur pour les erreurs

**Bouton "Rafraîchir les résultats" ne fonctionne pas :**
- Vérifiez la connexion internet
- L'API openfootball peut avoir des latences
- Les résultats ne sont disponibles qu'après les matchs

**Nom d'affichage ne change pas :**
- Sauvegardez le profil dans l'onglet "Mon Profil"
- Actualisez l'onglet "Classement"
- Vérifiez que vous êtes bien connecté avec le bon email

### Logs et Debug
Le widget utilise la console pour les messages de debug :
```javascript
console.log('[PronoSPIc] Message de debug');
console.warn('[PronoSPIc] Avertissement');
console.error('[PronoSPIc] Erreur');
```

## 📄 Licence

Ce projet est sous licence **Apache 2.0**. Voir le fichier LICENSE pour plus de détails.

## 👤 Auteur

**Said Hamadou (isaytoo)**
- [GitHub](https://github.com/isaytoo)
- [gristup.fr](https://gristup.fr)

## 🙏 Contributions

Les contributions sont les bienvenues ! Pour contribuer :

1. **Fork** le projet
2. **Créez** une branche (`git checkout -b feature/amazing-feature`)
3. **Commitez** vos changements (`git commit -m 'Add amazing feature'`)
4. **Pushez** (`git push origin feature/amazing-feature`)
5. **Ouvrez** une Pull Request

## 📞 Support

Pour toute question ou problème :
- **Issues GitHub** : [Signaler un problème](https://github.com/isaytoo/grist-PronoSPIc/issues)
- **Email** : contact@gristup.fr
- **Documentation** : [gristup.fr](https://gristup.fr)

---

**Version 3.0.0** - Dernière mise à jour : Juin 2026

*Fait avec ❤️ pour la Coupe du Monde 2026*

/**
 * PronoSPIc — Widget Grist de Pronostics Coupe du Monde 2026
 * @author isaytoo
 * @license Apache-2.0
 */

// =============================================================================
// I18N
// =============================================================================

var currentLang = (navigator.language || 'fr').substring(0, 2) === 'en' ? 'en' : 'fr';

var i18n = {
  fr: {
    subtitle: 'Pronostics Coupe du Monde 2026',
    tabMatches: 'Matchs', tabGroups: 'Groupes', tabLeaderboard: 'Classement', tabMyStats: 'Mes Stats', tabProfile: 'Mon Profil',
    allMatches: 'Tous', groupStage: 'Poules', roundOf32: '1/16', roundOf16: '1/8', quarterFinals: '1/4', semiFinals: '1/2', thirdPlace: '3e place', final: 'Finale',
    today: "Aujourd'hui", tomorrow: 'Demain', all: 'Tous',
    saveProno: 'Valider', saved: 'Validé ✓', noMatches: 'Aucun match',
    pts: 'pts', exact: 'Exact !', goodResult: 'Bon résultat', wrong: 'Raté', pending: 'En attente',
    played: 'J', won: 'V', drawn: 'N', lost: 'D', goalsFor: 'BP', goalsAgainst: 'BC', diff: 'Diff', points: 'Pts',
    rank: '#', player: 'Joueur', totalPts: 'Points', exactCount: 'Exacts', goodCount: 'Bons',
    myPoints: 'Mes points', myPronos: 'Pronos', myExact: 'Exacts', myRate: 'Réussite',
    adminTitle: 'Saisie des résultats', adminSave: 'Enregistrer', adminOnly: 'Réservé au propriétaire',
    recalculate: 'Recalculer les points', recalcDone: 'Points recalculés',
    refreshResults: 'Rafraîchir les résultats', refreshing: 'Récupération...',
    bonusTitle: 'Pronos Bonus', bonusWinner: 'Vainqueur final', bonusTopScorer: 'Meilleur buteur',
    bonusSave: 'Enregistrer mes bonus', bonusSaved: 'Bonus enregistrés ✓',
    topScorersTitle: 'Classement des buteurs', goals: 'buts', noGoalsYet: 'Aucun but enregistré',
    validateBonus: 'Valider les bonus', bonusValidated: 'Bonus validés ✓',
    realWinner: 'Vainqueur réel', realTopScorer: 'Meilleur buteur réel',
    profileTitle: 'Mon Profil', profileName: 'Nom d\'affichage', profileSave: 'Enregistrer mon profil',
    profileSaved: 'Profil enregistré ✓', profileAvatar: 'URL de l\'avatar (optionnel)',
    avatarGenerator: 'Générateur d\'avatar', avatarStyle: 'Style', avatarGenerate: 'Générer un avatar',
    avatarUseGenerated: 'Utiliser cet avatar', avatarRandom: 'Aléatoire', avatarCustom: 'URL personnalisée',
    tbd: 'À déterminer', matchNumber: 'Match', vs: '-',
    group: 'Groupe', noPronosYet: 'Tu n\'as pas encore pronostiqué',
    locked: 'Pronostics verrouillés', lockedForMatch: 'Pronostics verrouillés pour ce match'
  },
  en: {
    subtitle: 'World Cup 2026 Predictions',
    tabMatches: 'Matches', tabGroups: 'Groups', tabLeaderboard: 'Leaderboard', tabMyStats: 'My Stats', tabProfile: 'My Profile',
    allMatches: 'All', groupStage: 'Groups', roundOf32: 'R32', roundOf16: 'R16', quarterFinals: 'QF', semiFinals: 'SF', thirdPlace: '3rd', final: 'Final',
    today: 'Today', tomorrow: 'Tomorrow', all: 'All',
    saveProno: 'Submit', saved: 'Saved ✓', noMatches: 'No matches',
    pts: 'pts', exact: 'Exact!', goodResult: 'Good result', wrong: 'Wrong', pending: 'Pending',
    played: 'P', won: 'W', drawn: 'D', lost: 'L', goalsFor: 'GF', goalsAgainst: 'GA', diff: 'GD', points: 'Pts',
    rank: '#', player: 'Player', totalPts: 'Points', exactCount: 'Exact', goodCount: 'Good',
    myPoints: 'My points', myPronos: 'Predictions', myExact: 'Exact', myRate: 'Success',
    adminTitle: 'Enter Results', adminSave: 'Save', adminOnly: 'Owner only',
    recalculate: 'Recalculate points', recalcDone: 'Points recalculated',
    refreshResults: 'Refresh Results', refreshing: 'Fetching...',
    bonusTitle: 'Bonus Predictions', bonusWinner: 'Tournament winner', bonusTopScorer: 'Top scorer',
    bonusSave: 'Save bonus', bonusSaved: 'Bonus saved ✓',
    topScorersTitle: 'Top scorers', goals: 'goals', noGoalsYet: 'No goals recorded',
    validateBonus: 'Validate bonus', bonusValidated: 'Bonus validated ✓',
    realWinner: 'Actual winner', realTopScorer: 'Actual top scorer',
    profileTitle: 'My Profile', profileName: 'Display Name', profileSave: 'Save Profile',
    profileSaved: 'Profile saved ✓', profileAvatar: 'Avatar URL (optional)',
    avatarGenerator: 'Avatar Generator', avatarStyle: 'Style', avatarGenerate: 'Generate Avatar',
    avatarUseGenerated: 'Use this avatar', avatarRandom: 'Random', avatarCustom: 'Custom URL',
    tbd: 'TBD', matchNumber: 'Match', vs: '-',
    group: 'Group', noPronosYet: 'No predictions yet',
    locked: 'Predictions locked', lockedForMatch: 'Predictions locked for this match'
  }
};

function t(key) { return (i18n[currentLang] && i18n[currentLang][key]) || key; }

function switchLang(lang) {
  currentLang = lang;
  document.getElementById('btn-fr').classList.toggle('active', lang === 'fr');
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var k = el.getAttribute('data-i18n');
    if (i18n[lang][k]) el.textContent = i18n[lang][k];
  });
  renderCurrentTab();
}

// =============================================================================
// GLOBALS
// =============================================================================

var isOwner = false;
var currentUserEmail = '';
var currentDisplayName = null;
var teams = [];
var matches = [];
var predictions = [];
var allPredictions = [];
var bonusData = [];
var profiles = [];

var topScorers = [];
var activeTab = 'matches';
var activePhaseFilter = 'all';
var activeGroupFilter = '';

var TEAMS_TABLE = 'Prono_Teams';
var MATCHES_TABLE = 'Prono_Matches';
var PREDICTIONS_TABLE = 'Prono_Predictions';
var BONUS_TABLE = 'Prono_Bonus';
var USERINFO_TABLE = 'Prono_UserInfo';
var PROFILES_TABLE = 'Prono_Profiles';

// =============================================================================
// DATA: 48 TEAMS
// =============================================================================

var TEAM_DATA = [
  { code: 'MEX', name_fr: 'Mexique',            name_en: 'Mexico',            group: 'A', flag: 'mx' },
  { code: 'KOR', name_fr: 'Corée du Sud',        name_en: 'South Korea',       group: 'A', flag: 'kr' },
  { code: 'RSA', name_fr: 'Afrique du Sud',      name_en: 'South Africa',      group: 'A', flag: 'za' },
  { code: 'CZE', name_fr: 'Tchéquie',            name_en: 'Czechia',           group: 'A', flag: 'cz' },
  { code: 'CAN', name_fr: 'Canada',              name_en: 'Canada',            group: 'B', flag: 'ca' },
  { code: 'SUI', name_fr: 'Suisse',              name_en: 'Switzerland',       group: 'B', flag: 'ch' },
  { code: 'QAT', name_fr: 'Qatar',               name_en: 'Qatar',             group: 'B', flag: 'qa' },
  { code: 'BIH', name_fr: 'Bosnie-Herzégovine',  name_en: 'Bosnia-Herzegovina',group: 'B', flag: 'ba' },
  { code: 'BRA', name_fr: 'Brésil',              name_en: 'Brazil',            group: 'C', flag: 'br' },
  { code: 'MAR', name_fr: 'Maroc',               name_en: 'Morocco',           group: 'C', flag: 'ma' },
  { code: 'HAI', name_fr: 'Haïti',               name_en: 'Haiti',             group: 'C', flag: 'ht' },
  { code: 'SCO', name_fr: 'Écosse',              name_en: 'Scotland',          group: 'C', flag: 'gb-sct' },
  { code: 'USA', name_fr: 'États-Unis',          name_en: 'United States',     group: 'D', flag: 'us' },
  { code: 'PAR', name_fr: 'Paraguay',            name_en: 'Paraguay',          group: 'D', flag: 'py' },
  { code: 'AUS', name_fr: 'Australie',           name_en: 'Australia',         group: 'D', flag: 'au' },
  { code: 'TUR', name_fr: 'Turquie',             name_en: 'Türkiye',           group: 'D', flag: 'tr' },
  { code: 'GER', name_fr: 'Allemagne',           name_en: 'Germany',           group: 'E', flag: 'de' },
  { code: 'CUW', name_fr: 'Curaçao',             name_en: 'Curaçao',           group: 'E', flag: 'cw' },
  { code: 'CIV', name_fr: "Côte d'Ivoire",       name_en: 'Ivory Coast',       group: 'E', flag: 'ci' },
  { code: 'ECU', name_fr: 'Équateur',            name_en: 'Ecuador',           group: 'E', flag: 'ec' },
  { code: 'NED', name_fr: 'Pays-Bas',            name_en: 'Netherlands',       group: 'F', flag: 'nl' },
  { code: 'JPN', name_fr: 'Japon',               name_en: 'Japan',             group: 'F', flag: 'jp' },
  { code: 'SWE', name_fr: 'Suède',               name_en: 'Sweden',            group: 'F', flag: 'se' },
  { code: 'TUN', name_fr: 'Tunisie',             name_en: 'Tunisia',           group: 'F', flag: 'tn' },
  { code: 'BEL', name_fr: 'Belgique',            name_en: 'Belgium',           group: 'G', flag: 'be' },
  { code: 'EGY', name_fr: 'Égypte',              name_en: 'Egypt',             group: 'G', flag: 'eg' },
  { code: 'IRN', name_fr: 'Iran',                name_en: 'Iran',              group: 'G', flag: 'ir' },
  { code: 'NZL', name_fr: 'Nouvelle-Zélande',    name_en: 'New Zealand',       group: 'G', flag: 'nz' },
  { code: 'ESP', name_fr: 'Espagne',             name_en: 'Spain',             group: 'H', flag: 'es' },
  { code: 'CPV', name_fr: 'Cap-Vert',            name_en: 'Cape Verde',        group: 'H', flag: 'cv' },
  { code: 'KSA', name_fr: 'Arabie Saoudite',     name_en: 'Saudi Arabia',      group: 'H', flag: 'sa' },
  { code: 'URU', name_fr: 'Uruguay',             name_en: 'Uruguay',           group: 'H', flag: 'uy' },
  { code: 'FRA', name_fr: 'France',              name_en: 'France',            group: 'I', flag: 'fr' },
  { code: 'SEN', name_fr: 'Sénégal',             name_en: 'Senegal',           group: 'I', flag: 'sn' },
  { code: 'NOR', name_fr: 'Norvège',             name_en: 'Norway',            group: 'I', flag: 'no' },
  { code: 'IRQ', name_fr: 'Irak',                name_en: 'Iraq',              group: 'I', flag: 'iq' },
  { code: 'ARG', name_fr: 'Argentine',           name_en: 'Argentina',         group: 'J', flag: 'ar' },
  { code: 'ALG', name_fr: 'Algérie',             name_en: 'Algeria',           group: 'J', flag: 'dz' },
  { code: 'AUT', name_fr: 'Autriche',            name_en: 'Austria',           group: 'J', flag: 'at' },
  { code: 'JOR', name_fr: 'Jordanie',            name_en: 'Jordan',            group: 'J', flag: 'jo' },
  { code: 'POR', name_fr: 'Portugal',            name_en: 'Portugal',          group: 'K', flag: 'pt' },
  { code: 'COD', name_fr: 'RD Congo',            name_en: 'DR Congo',          group: 'K', flag: 'cd' },
  { code: 'UZB', name_fr: 'Ouzbékistan',         name_en: 'Uzbekistan',        group: 'K', flag: 'uz' },
  { code: 'COL', name_fr: 'Colombie',            name_en: 'Colombia',          group: 'K', flag: 'co' },
  { code: 'ENG', name_fr: 'Angleterre',          name_en: 'England',           group: 'L', flag: 'gb-eng' },
  { code: 'CRO', name_fr: 'Croatie',             name_en: 'Croatia',           group: 'L', flag: 'hr' },
  { code: 'GHA', name_fr: 'Ghana',               name_en: 'Ghana',             group: 'L', flag: 'gh' },
  { code: 'PAN', name_fr: 'Panama',              name_en: 'Panama',            group: 'L', flag: 'pa' }
];

// =============================================================================
// DATA: MATCHES (72 groupes + 24 knockout = 96 matchs)
// =============================================================================


var MATCH_DATA = [
  // ── Groupe A (MEX, RSA, KOR, CZE) ──────────────────────────────────
  { num: 1,  phase: 'group', group: 'A', t1: 'MEX', t2: 'RSA', date: '2026-06-11', time: '13:00', stadium: 'Estadio Azteca',        city: 'Mexico City'  },
  { num: 2,  phase: 'group', group: 'A', t1: 'KOR', t2: 'CZE', date: '2026-06-11', time: '20:00', stadium: 'Estadio Akron',         city: 'Guadalajara'  },
  { num: 3,  phase: 'group', group: 'A', t1: 'CZE', t2: 'RSA', date: '2026-06-18', time: '12:00', stadium: 'Mercedes-Benz Stadium', city: 'Atlanta'      },
  { num: 4,  phase: 'group', group: 'A', t1: 'MEX', t2: 'KOR', date: '2026-06-18', time: '19:00', stadium: 'Estadio Akron',         city: 'Guadalajara'  },
  { num: 5,  phase: 'group', group: 'A', t1: 'CZE', t2: 'MEX', date: '2026-06-24', time: '19:00', stadium: 'Estadio Azteca',        city: 'Mexico City'  },
  { num: 6,  phase: 'group', group: 'A', t1: 'RSA', t2: 'KOR', date: '2026-06-24', time: '19:00', stadium: 'Estadio BBVA',          city: 'Monterrey'    },
  // ── Groupe B (CAN, BIH, QAT, SUI) ──────────────────────────────────
  { num: 7,  phase: 'group', group: 'B', t1: 'CAN', t2: 'BIH', date: '2026-06-12', time: '15:00', stadium: 'BMO Field',             city: 'Toronto'      },
  { num: 8,  phase: 'group', group: 'B', t1: 'QAT', t2: 'SUI', date: '2026-06-13', time: '12:00', stadium: "Levi's Stadium",        city: 'San Francisco'},
  { num: 9,  phase: 'group', group: 'B', t1: 'SUI', t2: 'BIH', date: '2026-06-18', time: '12:00', stadium: 'SoFi Stadium',          city: 'Los Angeles'  },
  { num: 10, phase: 'group', group: 'B', t1: 'CAN', t2: 'QAT', date: '2026-06-18', time: '15:00', stadium: 'BC Place',              city: 'Vancouver'    },
  { num: 11, phase: 'group', group: 'B', t1: 'SUI', t2: 'CAN', date: '2026-06-24', time: '12:00', stadium: 'BC Place',              city: 'Vancouver'    },
  { num: 12, phase: 'group', group: 'B', t1: 'BIH', t2: 'QAT', date: '2026-06-24', time: '12:00', stadium: 'Lumen Field',           city: 'Seattle'      },
  // ── Groupe C (BRA, MAR, HAI, SCO) ──────────────────────────────────
  { num: 13, phase: 'group', group: 'C', t1: 'BRA', t2: 'MAR', date: '2026-06-13', time: '18:00', stadium: 'MetLife Stadium',       city: 'New York'     },
  { num: 14, phase: 'group', group: 'C', t1: 'HAI', t2: 'SCO', date: '2026-06-13', time: '21:00', stadium: 'Gillette Stadium',      city: 'Boston'       },
  { num: 15, phase: 'group', group: 'C', t1: 'SCO', t2: 'MAR', date: '2026-06-19', time: '18:00', stadium: 'Gillette Stadium',      city: 'Boston'       },
  { num: 16, phase: 'group', group: 'C', t1: 'BRA', t2: 'HAI', date: '2026-06-19', time: '20:30', stadium: 'Lincoln Financial Field', city: 'Philadelphia'},
  { num: 17, phase: 'group', group: 'C', t1: 'SCO', t2: 'BRA', date: '2026-06-24', time: '18:00', stadium: 'Hard Rock Stadium',     city: 'Miami'        },
  { num: 18, phase: 'group', group: 'C', t1: 'MAR', t2: 'HAI', date: '2026-06-24', time: '18:00', stadium: 'Mercedes-Benz Stadium', city: 'Atlanta'      },
  // ── Groupe D (USA, PAR, AUS, TUR) ──────────────────────────────────
  { num: 19, phase: 'group', group: 'D', t1: 'USA', t2: 'PAR', date: '2026-06-12', time: '21:00', stadium: 'SoFi Stadium',          city: 'Los Angeles'  },
  { num: 20, phase: 'group', group: 'D', t1: 'AUS', t2: 'TUR', date: '2026-06-13', time: '00:00', stadium: 'BC Place',              city: 'Vancouver'    },
  { num: 21, phase: 'group', group: 'D', t1: 'USA', t2: 'AUS', date: '2026-06-19', time: '15:00', stadium: 'Lumen Field',           city: 'Seattle'      },
  { num: 22, phase: 'group', group: 'D', t1: 'TUR', t2: 'PAR', date: '2026-06-19', time: '23:00', stadium: "Levi's Stadium",        city: 'San Francisco'},
  { num: 23, phase: 'group', group: 'D', t1: 'TUR', t2: 'USA', date: '2026-06-25', time: '22:00', stadium: 'SoFi Stadium',          city: 'Los Angeles'  },
  { num: 24, phase: 'group', group: 'D', t1: 'PAR', t2: 'AUS', date: '2026-06-25', time: '22:00', stadium: "Levi's Stadium",        city: 'San Francisco'},
  // ── Groupe E (GER, CUW, CIV, ECU) ──────────────────────────────────
  { num: 25, phase: 'group', group: 'E', t1: 'GER', t2: 'CUW', date: '2026-06-14', time: '13:00', stadium: 'NRG Stadium',           city: 'Houston'      },
  { num: 26, phase: 'group', group: 'E', t1: 'CIV', t2: 'ECU', date: '2026-06-14', time: '19:00', stadium: 'Lincoln Financial Field', city: 'Philadelphia'},
  { num: 27, phase: 'group', group: 'E', t1: 'GER', t2: 'CIV', date: '2026-06-20', time: '16:00', stadium: 'BMO Field',             city: 'Toronto'      },
  { num: 28, phase: 'group', group: 'E', t1: 'ECU', t2: 'CUW', date: '2026-06-20', time: '20:00', stadium: 'Arrowhead Stadium',     city: 'Kansas City'  },
  { num: 29, phase: 'group', group: 'E', t1: 'CUW', t2: 'CIV', date: '2026-06-25', time: '16:00', stadium: 'Lincoln Financial Field', city: 'Philadelphia'},
  { num: 30, phase: 'group', group: 'E', t1: 'ECU', t2: 'GER', date: '2026-06-25', time: '16:00', stadium: 'MetLife Stadium',       city: 'New York'     },
  // ── Groupe F (NED, JPN, SWE, TUN) ──────────────────────────────────
  { num: 31, phase: 'group', group: 'F', t1: 'NED', t2: 'JPN', date: '2026-06-14', time: '16:00', stadium: "AT&T Stadium",          city: 'Dallas'       },
  { num: 32, phase: 'group', group: 'F', t1: 'SWE', t2: 'TUN', date: '2026-06-14', time: '22:00', stadium: 'Estadio BBVA',          city: 'Monterrey'    },
  { num: 33, phase: 'group', group: 'F', t1: 'NED', t2: 'SWE', date: '2026-06-20', time: '13:00', stadium: 'NRG Stadium',           city: 'Houston'      },
  { num: 34, phase: 'group', group: 'F', t1: 'TUN', t2: 'JPN', date: '2026-06-20', time: '00:00', stadium: 'Estadio BBVA',          city: 'Monterrey'    },
  { num: 35, phase: 'group', group: 'F', t1: 'JPN', t2: 'SWE', date: '2026-06-25', time: '19:00', stadium: "AT&T Stadium",          city: 'Dallas'       },
  { num: 36, phase: 'group', group: 'F', t1: 'TUN', t2: 'NED', date: '2026-06-25', time: '19:00', stadium: 'Arrowhead Stadium',     city: 'Kansas City'  },
  // ── Groupe G (BEL, EGY, IRN, NZL) ──────────────────────────────────
  { num: 37, phase: 'group', group: 'G', t1: 'BEL', t2: 'EGY', date: '2026-06-15', time: '15:00', stadium: 'Lumen Field',           city: 'Seattle'      },
  { num: 38, phase: 'group', group: 'G', t1: 'IRN', t2: 'NZL', date: '2026-06-15', time: '21:00', stadium: 'SoFi Stadium',          city: 'Los Angeles'  },
  { num: 39, phase: 'group', group: 'G', t1: 'BEL', t2: 'IRN', date: '2026-06-21', time: '15:00', stadium: 'SoFi Stadium',          city: 'Los Angeles'  },
  { num: 40, phase: 'group', group: 'G', t1: 'NZL', t2: 'EGY', date: '2026-06-21', time: '21:00', stadium: 'BC Place',              city: 'Vancouver'    },
  { num: 41, phase: 'group', group: 'G', t1: 'EGY', t2: 'IRN', date: '2026-06-26', time: '23:00', stadium: 'Lumen Field',           city: 'Seattle'      },
  { num: 42, phase: 'group', group: 'G', t1: 'NZL', t2: 'BEL', date: '2026-06-26', time: '23:00', stadium: 'BC Place',              city: 'Vancouver'    },
  // ── Groupe H (ESP, CPV, KSA, URU) ──────────────────────────────────
  { num: 43, phase: 'group', group: 'H', t1: 'ESP', t2: 'CPV', date: '2026-06-15', time: '12:00', stadium: 'Mercedes-Benz Stadium', city: 'Atlanta'      },
  { num: 44, phase: 'group', group: 'H', t1: 'KSA', t2: 'URU', date: '2026-06-15', time: '18:00', stadium: 'Hard Rock Stadium',     city: 'Miami'        },
  { num: 45, phase: 'group', group: 'H', t1: 'ESP', t2: 'KSA', date: '2026-06-21', time: '12:00', stadium: 'Mercedes-Benz Stadium', city: 'Atlanta'      },
  { num: 46, phase: 'group', group: 'H', t1: 'URU', t2: 'CPV', date: '2026-06-21', time: '18:00', stadium: 'Hard Rock Stadium',     city: 'Miami'        },
  { num: 47, phase: 'group', group: 'H', t1: 'CPV', t2: 'KSA', date: '2026-06-26', time: '20:00', stadium: 'NRG Stadium',           city: 'Houston'      },
  { num: 48, phase: 'group', group: 'H', t1: 'URU', t2: 'ESP', date: '2026-06-26', time: '20:00', stadium: 'Estadio Akron',         city: 'Guadalajara'  },
  // ── Groupe I (FRA, SEN, IRQ, NOR) ──────────────────────────────────
  { num: 49, phase: 'group', group: 'I', t1: 'FRA', t2: 'SEN', date: '2026-06-16', time: '15:00', stadium: 'MetLife Stadium',       city: 'New York'     },
  { num: 50, phase: 'group', group: 'I', t1: 'IRQ', t2: 'NOR', date: '2026-06-16', time: '18:00', stadium: 'Gillette Stadium',      city: 'Boston'       },
  { num: 51, phase: 'group', group: 'I', t1: 'FRA', t2: 'IRQ', date: '2026-06-22', time: '17:00', stadium: 'Lincoln Financial Field', city: 'Philadelphia'},
  { num: 52, phase: 'group', group: 'I', t1: 'NOR', t2: 'SEN', date: '2026-06-22', time: '20:00', stadium: 'MetLife Stadium',       city: 'New York'     },
  { num: 53, phase: 'group', group: 'I', t1: 'NOR', t2: 'FRA', date: '2026-06-26', time: '15:00', stadium: 'Gillette Stadium',      city: 'Boston'       },
  { num: 54, phase: 'group', group: 'I', t1: 'SEN', t2: 'IRQ', date: '2026-06-26', time: '15:00', stadium: 'BMO Field',             city: 'Toronto'      },
  // ── Groupe J (ARG, ALG, AUT, JOR) ──────────────────────────────────
  { num: 55, phase: 'group', group: 'J', t1: 'ARG', t2: 'ALG', date: '2026-06-16', time: '21:00', stadium: 'Arrowhead Stadium',     city: 'Kansas City'  },
  { num: 56, phase: 'group', group: 'J', t1: 'AUT', t2: 'JOR', date: '2026-06-16', time: '00:00', stadium: "Levi's Stadium",        city: 'San Francisco'},
  { num: 57, phase: 'group', group: 'J', t1: 'ARG', t2: 'AUT', date: '2026-06-22', time: '13:00', stadium: "AT&T Stadium",          city: 'Dallas'       },
  { num: 58, phase: 'group', group: 'J', t1: 'JOR', t2: 'ALG', date: '2026-06-22', time: '23:00', stadium: "Levi's Stadium",        city: 'San Francisco'},
  { num: 59, phase: 'group', group: 'J', t1: 'JOR', t2: 'ARG', date: '2026-06-27', time: '22:00', stadium: "AT&T Stadium",          city: 'Dallas'       },
  { num: 60, phase: 'group', group: 'J', t1: 'ALG', t2: 'AUT', date: '2026-06-27', time: '22:00', stadium: 'Arrowhead Stadium',     city: 'Kansas City'  },
  // ── Groupe K (POR, COD, UZB, COL) ──────────────────────────────────
  { num: 61, phase: 'group', group: 'K', t1: 'POR', t2: 'COD', date: '2026-06-17', time: '13:00', stadium: 'NRG Stadium',           city: 'Houston'      },
  { num: 62, phase: 'group', group: 'K', t1: 'UZB', t2: 'COL', date: '2026-06-17', time: '22:00', stadium: 'Estadio Azteca',        city: 'Mexico City'  },
  { num: 63, phase: 'group', group: 'K', t1: 'POR', t2: 'UZB', date: '2026-06-23', time: '13:00', stadium: 'NRG Stadium',           city: 'Houston'      },
  { num: 64, phase: 'group', group: 'K', t1: 'COL', t2: 'COD', date: '2026-06-23', time: '22:00', stadium: 'Estadio Akron',         city: 'Guadalajara'  },
  { num: 65, phase: 'group', group: 'K', t1: 'COL', t2: 'POR', date: '2026-06-27', time: '19:30', stadium: 'Hard Rock Stadium',     city: 'Miami'        },
  { num: 66, phase: 'group', group: 'K', t1: 'COD', t2: 'UZB', date: '2026-06-27', time: '19:30', stadium: 'Mercedes-Benz Stadium', city: 'Atlanta'      },
  // ── Groupe L (ENG, CRO, GHA, PAN) ──────────────────────────────────
  { num: 67, phase: 'group', group: 'L', t1: 'ENG', t2: 'CRO', date: '2026-06-17', time: '16:00', stadium: "AT&T Stadium",          city: 'Dallas'       },
  { num: 68, phase: 'group', group: 'L', t1: 'GHA', t2: 'PAN', date: '2026-06-17', time: '19:00', stadium: 'BMO Field',             city: 'Toronto'      },
  { num: 69, phase: 'group', group: 'L', t1: 'ENG', t2: 'GHA', date: '2026-06-23', time: '16:00', stadium: 'Gillette Stadium',      city: 'Boston'       },
  { num: 70, phase: 'group', group: 'L', t1: 'PAN', t2: 'CRO', date: '2026-06-23', time: '19:00', stadium: 'BMO Field',             city: 'Toronto'      },
  { num: 71, phase: 'group', group: 'L', t1: 'PAN', t2: 'ENG', date: '2026-06-27', time: '17:00', stadium: 'MetLife Stadium',       city: 'New York'     },
  { num: 72, phase: 'group', group: 'L', t1: 'CRO', t2: 'GHA', date: '2026-06-27', time: '17:00', stadium: 'Lincoln Financial Field', city: 'Philadelphia'},
  // ── Round of 32 (16 matchs, 28 juin – 3 juillet) ───────────────────
  { num: 73,  phase: 'r32', group: '', t1: 'TBD', t2: 'TBD', date: '2026-06-28', time: '15:00', stadium: 'SoFi Stadium',          city: 'Los Angeles'  },
  { num: 74,  phase: 'r32', group: '', t1: 'TBD', t2: 'TBD', date: '2026-06-29', time: '16:30', stadium: 'Gillette Stadium',      city: 'Boston'       },
  { num: 75,  phase: 'r32', group: '', t1: 'TBD', t2: 'TBD', date: '2026-06-29', time: '21:00', stadium: 'Estadio BBVA',          city: 'Monterrey'    },
  { num: 76,  phase: 'r32', group: '', t1: 'TBD', t2: 'TBD', date: '2026-06-29', time: '13:00', stadium: 'NRG Stadium',           city: 'Houston'      },
  { num: 77,  phase: 'r32', group: '', t1: 'TBD', t2: 'TBD', date: '2026-06-30', time: '17:00', stadium: 'MetLife Stadium',       city: 'New York'     },
  { num: 78,  phase: 'r32', group: '', t1: 'TBD', t2: 'TBD', date: '2026-06-30', time: '13:00', stadium: "AT&T Stadium",          city: 'Dallas'       },
  { num: 79,  phase: 'r32', group: '', t1: 'TBD', t2: 'TBD', date: '2026-06-30', time: '21:00', stadium: 'Estadio Azteca',        city: 'Mexico City'  },
  { num: 80,  phase: 'r32', group: '', t1: 'TBD', t2: 'TBD', date: '2026-07-01', time: '12:00', stadium: 'Mercedes-Benz Stadium', city: 'Atlanta'      },
  { num: 81,  phase: 'r32', group: '', t1: 'TBD', t2: 'TBD', date: '2026-07-01', time: '20:00', stadium: "Levi's Stadium",        city: 'San Francisco'},
  { num: 82,  phase: 'r32', group: '', t1: 'TBD', t2: 'TBD', date: '2026-07-01', time: '16:00', stadium: 'Lumen Field',           city: 'Seattle'      },
  { num: 83,  phase: 'r32', group: '', t1: 'TBD', t2: 'TBD', date: '2026-07-02', time: '19:00', stadium: 'BMO Field',             city: 'Toronto'      },
  { num: 84,  phase: 'r32', group: '', t1: 'TBD', t2: 'TBD', date: '2026-07-02', time: '15:00', stadium: 'SoFi Stadium',          city: 'Los Angeles'  },
  { num: 85,  phase: 'r32', group: '', t1: 'TBD', t2: 'TBD', date: '2026-07-02', time: '23:00', stadium: 'BC Place',              city: 'Vancouver'    },
  { num: 86,  phase: 'r32', group: '', t1: 'TBD', t2: 'TBD', date: '2026-07-03', time: '18:00', stadium: 'Hard Rock Stadium',     city: 'Miami'        },
  { num: 87,  phase: 'r32', group: '', t1: 'TBD', t2: 'TBD', date: '2026-07-03', time: '20:30', stadium: 'Arrowhead Stadium',     city: 'Kansas City'  },
  { num: 88,  phase: 'r32', group: '', t1: 'TBD', t2: 'TBD', date: '2026-07-03', time: '14:00', stadium: "AT&T Stadium",          city: 'Dallas'       },
  // ── Round of 16 (8 matchs, 4–7 juillet) ────────────────────────────
  { num: 89,  phase: 'r16', group: '', t1: 'TBD', t2: 'TBD', date: '2026-07-04', time: '17:00', stadium: 'Lincoln Financial Field', city: 'Philadelphia'},
  { num: 90,  phase: 'r16', group: '', t1: 'TBD', t2: 'TBD', date: '2026-07-04', time: '13:00', stadium: 'NRG Stadium',           city: 'Houston'      },
  { num: 91,  phase: 'r16', group: '', t1: 'TBD', t2: 'TBD', date: '2026-07-05', time: '16:00', stadium: 'MetLife Stadium',       city: 'New York'     },
  { num: 92,  phase: 'r16', group: '', t1: 'TBD', t2: 'TBD', date: '2026-07-05', time: '20:00', stadium: 'Estadio Azteca',        city: 'Mexico City'  },
  { num: 93,  phase: 'r16', group: '', t1: 'TBD', t2: 'TBD', date: '2026-07-06', time: '15:00', stadium: "AT&T Stadium",          city: 'Dallas'       },
  { num: 94,  phase: 'r16', group: '', t1: 'TBD', t2: 'TBD', date: '2026-07-06', time: '18:00', stadium: 'Lumen Field',           city: 'Seattle'      },
  { num: 95,  phase: 'r16', group: '', t1: 'TBD', t2: 'TBD', date: '2026-07-07', time: '12:00', stadium: 'Mercedes-Benz Stadium', city: 'Atlanta'      },
  { num: 96,  phase: 'r16', group: '', t1: 'TBD', t2: 'TBD', date: '2026-07-07', time: '16:00', stadium: 'BC Place',              city: 'Vancouver'    },
  // ── Quarts de finale (4 matchs) ────────────────────────────────────
  { num: 97,  phase: 'qf', group: '', t1: 'TBD', t2: 'TBD', date: '2026-07-09', time: '16:00', stadium: 'Gillette Stadium',      city: 'Boston'       },
  { num: 98,  phase: 'qf', group: '', t1: 'TBD', t2: 'TBD', date: '2026-07-10', time: '15:00', stadium: 'SoFi Stadium',          city: 'Los Angeles'  },
  { num: 99,  phase: 'qf', group: '', t1: 'TBD', t2: 'TBD', date: '2026-07-11', time: '18:00', stadium: 'Hard Rock Stadium',     city: 'Miami'        },
  { num: 100, phase: 'qf', group: '', t1: 'TBD', t2: 'TBD', date: '2026-07-11', time: '21:00', stadium: 'Arrowhead Stadium',     city: 'Kansas City'  },
  // ── Demi-finales (2 matchs) ────────────────────────────────────────
  { num: 101, phase: 'sf', group: '', t1: 'TBD', t2: 'TBD', date: '2026-07-14', time: '15:00', stadium: "AT&T Stadium",          city: 'Dallas'       },
  { num: 102, phase: 'sf', group: '', t1: 'TBD', t2: 'TBD', date: '2026-07-15', time: '15:00', stadium: 'Mercedes-Benz Stadium', city: 'Atlanta'      },
  // ── 3e place + Finale ──────────────────────────────────────────────
  { num: 103, phase: '3rd',   group: '', t1: 'TBD', t2: 'TBD', date: '2026-07-18', time: '17:00', stadium: 'Hard Rock Stadium',  city: 'Miami'        },
  { num: 104, phase: 'final', group: '', t1: 'TBD', t2: 'TBD', date: '2026-07-19', time: '15:00', stadium: 'MetLife Stadium',     city: 'New York'     }
];


// =============================================================================
// UTILS
// =============================================================================

function flagUrl(flagCode) {
  if (!flagCode || flagCode === 'TBD') return '';
  return 'https://flagcdn.com/w80/' + flagCode + '.png';
}

function getTeam(code) {
  if (!code || code === 'TBD') return { code: 'TBD', name_fr: 'À déterminer', name_en: 'TBD', flag: '', group: '' };
  return TEAM_DATA.find(function(t) { return t.code === code; }) || { code: code, name_fr: code, name_en: code, flag: '', group: '' };
}

function teamName(code) {
  var team = getTeam(code);
  return currentLang === 'fr' ? team.name_fr : team.name_en;
}

function phaseLabel(phase) {
  var map = { group: 'groupStage', r32: 'roundOf32', r16: 'roundOf16', qf: 'quarterFinals', sf: 'semiFinals', '3rd': 'thirdPlace', final: 'final' };
  return t(map[phase] || phase);
}

function phaseClass(phase) {
  var map = { group: 'phase-group', r32: 'phase-r32', r16: 'phase-r16', qf: 'phase-qf', sf: 'phase-sf', '3rd': 'phase-final', final: 'phase-final' };
  return map[phase] || 'phase-group';
}

function formatMatchDate(dateStr) {
  if (!dateStr) return '';
  var d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString(currentLang === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'short' });
}

function isInsideGrist() {
  try { return window.self !== window.top; } catch (e) { return true; }
}

function showToast(msg, type) {
  var el = document.createElement('div');
  el.className = 'toast toast-' + (type || 'info');
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(function() { el.remove(); }, 3000);
}

function sanitize(str) {
  var div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

function switchTab(tabId) {
  if (tabId === 'admin' && !isOwner) return;
  activeTab = tabId;
  document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.toggle('active', b.getAttribute('data-tab') === tabId); });
  document.querySelectorAll('.tab-content').forEach(function(c) { c.classList.toggle('active', c.id === 'tab-' + tabId); });
  renderCurrentTab();
}

function renderCurrentTab() {
  if (activeTab === 'matches') renderMatchesView();
  if (activeTab === 'groups') renderGroupsView();
  if (activeTab === 'leaderboard') renderLeaderboard();
  if (activeTab === 'mystats') renderMyStats();
  if (activeTab === 'profile') renderProfile();
  if (activeTab === 'admin') renderAdmin();
}


// =============================================================================
// MATCH LOCKING
// =============================================================================

// The match times in MATCH_DATA are local stadium times. These offsets are valid
// for the World Cup 2026 dates in June/July. They are used to store a single
// UTC kickoff instant in Grist.
var CITY_UTC_OFFSET_HOURS = {
  'Mexico City': -6,
  'Guadalajara': -6,
  'Monterrey': -6,
  'Atlanta': -4,
  'Boston': -4,
  'Miami': -4,
  'New York': -4,
  'Philadelphia': -4,
  'Toronto': -4,
  'Dallas': -5,
  'Houston': -5,
  'Kansas City': -5,
  'Los Angeles': -7,
  'San Francisco': -7,
  'Seattle': -7,
  'Vancouver': -7
};

var MATCH_CLOSED_FORMULA = "m = Prono_Matches.lookupOne(Match_Number=$Match_Number)\n" +
  "return True if not m else bool(m.Locked or (m.Kickoff_UTC and NOW() >= m.Kickoff_UTC))";

function kickoffUtcSecondsFromLocal(dateStr, timeStr, city) {
  if (!dateStr || !timeStr) return null;
  var offset = CITY_UTC_OFFSET_HOURS[city];
  if (offset === undefined || offset === null) return null;

  var dateParts = String(dateStr).split('-').map(function(x) { return parseInt(x, 10); });
  var timeParts = String(timeStr).split(':').map(function(x) { return parseInt(x, 10); });
  if (dateParts.length < 3 || timeParts.length < 2) return null;

  var y = dateParts[0];
  var m = dateParts[1];
  var d = dateParts[2];
  var h = timeParts[0];
  var min = timeParts[1];
  if ([y, m, d, h, min].some(function(v) { return isNaN(v); })) return null;

  // Local time = UTC + offset, so UTC = local - offset.
  var utcMillis = Date.UTC(y, m - 1, d, h - offset, min, 0, 0);
  return Math.floor(utcMillis / 1000);
}

function gristDateTimeToMillis(value) {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'number') return value * 1000;
  if (value instanceof Date) return value.getTime();

  var text = String(value).trim();
  if (!text) return null;

  // Numeric strings from Grist are usually seconds since epoch.
  if (/^-?\d+(\.\d+)?$/.test(text)) return parseFloat(text) * 1000;

  var parsed = Date.parse(text);
  return isNaN(parsed) ? null : parsed;
}

function isMatchClosed(m) {
  if (!m) return true;
  if (m.locked) return true;

  var kickoff = gristDateTimeToMillis(m.kickoffUtc);
  if (!kickoff) return false; // If the kickoff is not configured yet, do not block the UI.

  return Date.now() >= kickoff;
}

function formatKickoffForDebug(seconds) {
  if (!seconds) return '';
  try { return new Date(seconds * 1000).toISOString(); } catch (e) { return ''; }
}

async function ensureColumn(tableId, colId, fields) {
  try {
    await grist.docApi.applyUserActions([['AddColumn', tableId, colId, fields]]);
  } catch (e) {
    // Column probably already exists, or the current user cannot change structure.
  }
}

async function ensureLockColumns() {
  await ensureColumn(MATCHES_TABLE, 'Kickoff_UTC', { type: 'DateTime:UTC', label: 'Kickoff UTC' });
  await ensureColumn(MATCHES_TABLE, 'Locked', { type: 'Bool', label: 'Locked' });
  await ensureColumn(PREDICTIONS_TABLE, 'Match_Closed', {
    type: 'Bool',
    label: 'Match Closed',
    isFormula: true,
    formula: MATCH_CLOSED_FORMULA
  });

  // Keep the formula up to date if the column already existed.
  try {
    await grist.docApi.applyUserActions([['ModifyColumn', PREDICTIONS_TABLE, 'Match_Closed', {
      type: 'Bool',
      isFormula: true,
      formula: MATCH_CLOSED_FORMULA
    }]]);
  } catch (e) { /* non-owner or column missing: ignored */ }
}

async function backfillKickoffUtc() {
  if (!isOwner) return;
  try {
    var md = await grist.docApi.fetchTable(MATCHES_TABLE);
    if (!md || !md.id) return;

    var actions = [];
    for (var i = 0; i < md.id.length; i++) {
      var existingKickoff = md.Kickoff_UTC ? md.Kickoff_UTC[i] : null;
      var kickoffSeconds = kickoffUtcSecondsFromLocal(md.Match_Date[i], md.Match_Time[i], md.City[i]);
      var fields = {};

      if (!existingKickoff && kickoffSeconds) fields.Kickoff_UTC = kickoffSeconds;
      if (md.Locked && (md.Locked[i] === null || md.Locked[i] === undefined || md.Locked[i] === '')) fields.Locked = false;

      if (Object.keys(fields).length > 0) {
        actions.push(['UpdateRecord', MATCHES_TABLE, md.id[i], fields]);
      }
    }

    if (actions.length > 0) await grist.docApi.applyUserActions(actions);
  } catch (e) {
    console.warn('[PronoSPIc] backfillKickoffUtc skipped:', e.message);
  }
}

async function autoLockStartedMatches() {
  if (!isOwner) return;

  var toLock = matches.filter(function(m) {
    return !m.locked && isMatchClosed({ kickoffUtc: m.kickoffUtc, locked: false });
  });
  if (toLock.length === 0) return;

  try {
    var actions = toLock.map(function(m) {
      return ['UpdateRecord', MATCHES_TABLE, m.id, { Locked: true }];
    });
    await grist.docApi.applyUserActions(actions);
    toLock.forEach(function(m) { m.locked = true; });
  } catch (e) {
    console.warn('[PronoSPIc] autoLockStartedMatches skipped:', e.message);
  }
}

// =============================================================================
// GRIST: TABLE MANAGEMENT
// =============================================================================

async function ensureTables() {
  try {
    var tables = await grist.docApi.listTables();
    if (tables.indexOf(TEAMS_TABLE) === -1) {
      await grist.docApi.applyUserActions([['AddTable', TEAMS_TABLE, [
        { id: 'Code', type: 'Text' }, { id: 'Name_FR', type: 'Text' }, { id: 'Name_EN', type: 'Text' },
        { id: 'Group_Letter', type: 'Text' }, { id: 'FlagCode', type: 'Text' }
      ]]]);
    }
    if (tables.indexOf(MATCHES_TABLE) === -1) {
      await grist.docApi.applyUserActions([['AddTable', MATCHES_TABLE, [
        { id: 'Match_Number', type: 'Int' }, { id: 'Phase', type: 'Text' }, { id: 'Group_Letter', type: 'Text' },
        { id: 'Team1_Code', type: 'Text' }, { id: 'Team2_Code', type: 'Text' },
        { id: 'Match_Date', type: 'Text' }, { id: 'Match_Time', type: 'Text' },
        { id: 'Stadium', type: 'Text' }, { id: 'City', type: 'Text' },
        { id: 'Score1', type: 'Int' }, { id: 'Score2', type: 'Int' },
        { id: 'Kickoff_UTC', type: 'DateTime:UTC' }, { id: 'Locked', type: 'Bool' }
      ]]]);
    }
    if (tables.indexOf(PREDICTIONS_TABLE) === -1) {
      await grist.docApi.applyUserActions([['AddTable', PREDICTIONS_TABLE, [
        { id: 'User_Email', type: 'Text' }, { id: 'Match_Number', type: 'Int' },
        { id: 'Pred_Score1', type: 'Int' }, { id: 'Pred_Score2', type: 'Int' },
        { id: 'Points', type: 'Int' },
        { id: 'Match_Closed', type: 'Bool', isFormula: true, formula: MATCH_CLOSED_FORMULA }
      ]]]);
    }
    if (tables.indexOf(BONUS_TABLE) === -1) {
      await grist.docApi.applyUserActions([['AddTable', BONUS_TABLE, [
        { id: 'User_Email', type: 'Text' }, { id: 'Winner_Code', type: 'Text' },
        { id: 'Top_Scorer', type: 'Text' }, { id: 'Points', type: 'Int' }
      ]]]);
    }
    if (tables.indexOf(USERINFO_TABLE) === -1) {
      await grist.docApi.applyUserActions([['AddTable', USERINFO_TABLE, [
        { id: 'UserEmail', fields: { type: 'Text', label: 'UserEmail' } }
      ]]]);
      await grist.docApi.applyUserActions([['ModifyColumn', USERINFO_TABLE, 'UserEmail', {
        isFormula: false, formula: 'user.Email', recalcWhen: 2, recalcDeps: null
      }]]);
    }
    if (tables.indexOf(PROFILES_TABLE) === -1) {
      await grist.docApi.applyUserActions([['AddTable', PROFILES_TABLE, [
        { id: 'User_Email', type: 'Text' }, { id: 'Display_Name', type: 'Text' },
        { id: 'Avatar_URL', type: 'Text' }
      ]]]);
    }
    await ensureLockColumns();
  } catch (e) {
    console.warn('[PronoSPIc] ensureTables error:', e.message);
  }
}

async function seedTeams() {
  try {
    var existing = await grist.docApi.fetchTable(TEAMS_TABLE);
    if (existing && existing.id && existing.id.length > 0) return;
    var actions = TEAM_DATA.map(function(t) {
      return ['AddRecord', TEAMS_TABLE, null, { Code: t.code, Name_FR: t.name_fr, Name_EN: t.name_en, Group_Letter: t.group, FlagCode: t.flag }];
    });
    await grist.docApi.applyUserActions(actions);
  } catch (e) { console.warn('[PronoSPIc] seedTeams:', e.message); }
}

async function seedMatches() {
  try {
    var existing = await grist.docApi.fetchTable(MATCHES_TABLE);
    if (existing && existing.id && existing.id.length > 0) return;
    var actions = MATCH_DATA.map(function(m) {
      return ['AddRecord', MATCHES_TABLE, null, {
        Match_Number: m.num, Phase: m.phase, Group_Letter: m.group,
        Team1_Code: m.t1, Team2_Code: m.t2, Match_Date: m.date, Match_Time: m.time,
        Stadium: m.stadium, City: m.city, Score1: -1, Score2: -1,
        Kickoff_UTC: kickoffUtcSecondsFromLocal(m.date, m.time, m.city), Locked: false
      }];
    });
    await grist.docApi.applyUserActions(actions);
  } catch (e) { console.warn('[PronoSPIc] seedMatches:', e.message); }
}

async function loadAllData() {
  try {
    var md = await grist.docApi.fetchTable(MATCHES_TABLE);
    matches = [];
    if (md && md.id) {
      for (var i = 0; i < md.id.length; i++) {
        matches.push({
          id: md.id[i], num: md.Match_Number[i], phase: md.Phase[i], group: md.Group_Letter[i],
          t1: md.Team1_Code[i], t2: md.Team2_Code[i], date: md.Match_Date[i], time: md.Match_Time[i],
          stadium: md.Stadium[i], city: md.City[i],
          s1: md.Score1[i] !== undefined ? md.Score1[i] : -1,
          s2: md.Score2[i] !== undefined ? md.Score2[i] : -1,
          kickoffUtc: md.Kickoff_UTC ? md.Kickoff_UTC[i] : null,
          locked: md.Locked ? !!md.Locked[i] : false
        });
      }
    }
    matches.sort(function(a, b) { return a.num - b.num; });
  } catch (e) { matches = []; }

  try {
    var pd = await grist.docApi.fetchTable(PREDICTIONS_TABLE);
    allPredictions = [];
    if (pd && pd.id) {
      for (var j = 0; j < pd.id.length; j++) {
        allPredictions.push({
          id: pd.id[j], email: pd.User_Email[j], matchNum: pd.Match_Number[j],
          ps1: pd.Pred_Score1[j], ps2: pd.Pred_Score2[j], pts: pd.Points[j]
        });
      }
    }
    predictions = allPredictions.filter(function(p) { return (p.email || '').toLowerCase().trim() === (currentUserEmail || '').toLowerCase().trim(); });
  } catch (e) { allPredictions = []; predictions = []; }

  try {
    var bd = await grist.docApi.fetchTable(BONUS_TABLE);
    bonusData = [];
    if (bd && bd.id) {
      for (var k = 0; k < bd.id.length; k++) {
        bonusData.push({ id: bd.id[k], email: bd.User_Email[k], winner: bd.Winner_Code[k], scorer: bd.Top_Scorer[k], pts: bd.Points[k] });
      }
    }
  } catch (e) { bonusData = []; }

  try {
    var prd = await grist.docApi.fetchTable(PROFILES_TABLE);
    profiles = [];
    if (prd && prd.id) {
      for (var l = 0; l < prd.id.length; l++) {
        profiles.push({
          id: prd.id[l],
          email: prd.User_Email[l],
          displayName: prd.Display_Name[l],
          avatarUrl: prd.Avatar_URL[l]
        });
      }
    }
  } catch (e) { profiles = []; }

  updateHeaderUserInfo();
}

// =============================================================================
// PROFILE HELPERS
// =============================================================================

function getDisplayName(email) {
  if (!email) return '';
  var profile = profiles.find(function(p) { return p.email === email; });
  if (profile && profile.displayName) return profile.displayName;
  return email.split('@')[0];
}

function getAvatarUrl(email) {
  if (!email) return '';
  var profile = profiles.find(function(p) { return p.email === email; });
  return (profile && profile.avatarUrl) ? profile.avatarUrl : '';
}

function updateHeaderUserInfo() {
  if (!currentUserEmail) { setTimeout(updateHeaderUserInfo, 300); return; }
  var userNameElement = document.getElementById('header-user-name');
  var avatarElement = document.getElementById('header-avatar');
  if (!userNameElement || !avatarElement) { setTimeout(updateHeaderUserInfo, 200); return; }

  userNameElement.textContent = getDisplayName(currentUserEmail);
  var avatarUrl = getAvatarUrl(currentUserEmail);
  if (avatarUrl && avatarUrl.match(/^https?:\/\/.+/)) {
    avatarElement.src = avatarUrl;
    avatarElement.style.display = 'block';
    avatarElement.onerror = function() { this.style.display = 'none'; };
  } else {
    avatarElement.style.display = 'none';
  }
}

// =============================================================================
// AVATAR (DiceBear)
// =============================================================================

var avatarStyles = [
  { id: 'avataaars',          name: 'Avataaars',          description: 'Personnage cartoon' },
  { id: 'avataaars-neutral',  name: 'Avataaars Neutre',   description: 'Cartoon sans genre' },
  { id: 'lorelei',            name: 'Lorelei',            description: 'Personnage illustré' },
  { id: 'lorelei-neutral',    name: 'Lorelei Neutre',     description: 'Illustré sans genre' },
  { id: 'adventurer',         name: 'Adventurer',         description: 'Style aventurier' },
  { id: 'adventurer-neutral', name: 'Adventurer Neutre',  description: 'Aventurier sans genre' },
  { id: 'big-ears',           name: 'Big Ears',           description: 'Grandes oreilles' },
  { id: 'big-ears-neutral',   name: 'Big Ears Neutre',    description: 'Sans genre' },
  { id: 'notionists',         name: 'Notionists',         description: 'Style minimaliste' },
  { id: 'notionists-neutral', name: 'Notionists Neutre',  description: 'Minimaliste neutre' },
  { id: 'pixel-art',          name: 'Pixel Art',          description: 'Style rétro 8-bits' },
  { id: 'pixel-art-neutral',  name: 'Pixel Art Neutre',   description: 'Rétro sans genre' },
  { id: 'bottts',             name: 'Bottts',             description: 'Robots' },
  { id: 'bottts-neutral',     name: 'Bottts Neutre',      description: 'Robots neutres' },
  { id: 'micah',              name: 'Micah',              description: 'Style illustré moderne' },
  { id: 'open-peeps',         name: 'Open Peeps',         description: 'Illustrations ouvertes' },
  { id: 'personas',           name: 'Personas',           description: 'Personnages diversifiés' },
  { id: 'fun-emoji',          name: 'Fun Emoji',          description: 'Emojis amusants' },
  { id: 'shapes',             name: 'Shapes',             description: 'Formes abstraites' },
  { id: 'identicon',          name: 'Identicon',          description: 'Géométrique unique' }
];

var currentAvatarStyle = 'avataaars';
var generatedAvatars = [];

function generateAvatarUrl(style, seed) {
  if (!seed) seed = Math.random().toString(36).substring(7);
  var timestamp = Date.now();
  var random = Math.random().toString(36).substring(7);
  return 'https://api.dicebear.com/7.x/' + style + '/svg?seed=' + seed + '&t=' + timestamp + '&r=' + random;
}

function generateMultipleAvatars(style, count) {
  count = count || 6;
  generatedAvatars = [];
  var timestamp = Date.now();
  for (var i = 0; i < count; i++) {
    var uniqueSeed = currentUserEmail + '_' + timestamp + '_' + i + '_' + Math.random().toString(36).substring(7);
    generatedAvatars.push({ url: generateAvatarUrl(style, uniqueSeed), seed: uniqueSeed, style: style });
  }
  return generatedAvatars;
}

// =============================================================================
// RENDER: MATCHES
// =============================================================================

function renderMatchFilters() {
  var container = document.getElementById('match-filters');
  var phases = [
    { key: 'all',   label: t('allMatches') },
    { key: 'group', label: t('groupStage') },
    { key: 'r32',   label: t('roundOf32') },
    { key: 'r16',   label: t('roundOf16') },
    { key: 'qf',    label: t('quarterFinals') },
    { key: 'sf',    label: t('semiFinals') },
    { key: '3rd',   label: t('thirdPlace') },
    { key: 'final', label: t('final') }
  ];
  var html = '';
  phases.forEach(function(p) {
    html += '<button class="filter-btn ' + (activePhaseFilter === p.key ? 'active' : '') + '" onclick="setPhaseFilter(\'' + p.key + '\')">' + p.label + '</button>';
  });
  html += '<span style="width:1px;height:24px;background:#e2e8f0;margin:0 4px;"></span>';
  var groups = ['A','B','C','D','E','F','G','H','I','J','K','L'];
  groups.forEach(function(g) {
    html += '<button class="filter-btn ' + (activeGroupFilter === g ? 'active' : '') + '" onclick="setGroupFilter(\'' + g + '\')" style="min-width:32px;">' + g + '</button>';
  });
  container.innerHTML = html;
}

function setPhaseFilter(phase) {
  activePhaseFilter = phase;
  activeGroupFilter = '';
  renderMatchesView();
}

function setGroupFilter(group) {
  activeGroupFilter = activeGroupFilter === group ? '' : group;
  activePhaseFilter = activeGroupFilter ? 'group' : 'all';
  renderMatchesView();
}

function renderMatchesView() {
  renderMatchFilters();
  renderBonusBar();
  var filtered = matches.filter(function(m) {
    if (activeGroupFilter) return m.group === activeGroupFilter;
    if (activePhaseFilter !== 'all') return m.phase === activePhaseFilter;
    return true;
  });

  var container = document.getElementById('matches-list');
  if (filtered.length === 0) { container.innerHTML = '<div style="text-align:center;color:#94a3b8;padding:40px;">' + t('noMatches') + '</div>'; return; }

  var html = '';
  filtered.forEach(function(m) {
    var team1 = getTeam(m.t1);
    var team2 = getTeam(m.t2);
    var myPred = predictions.find(function(p) { return p.matchNum === m.num; });
    var hasResult = m.s1 >= 0 && m.s2 >= 0;
    var isTBD = m.t1 === 'TBD' || m.t2 === 'TBD';
    var isClosed = isMatchClosed(m);

    html += '<div class="match-card">';
    html += '<div class="match-header">';
    html += '<span class="match-phase-badge ' + phaseClass(m.phase) + '">';
    html += m.group ? t('group') + ' ' + m.group : phaseLabel(m.phase);
    html += '</span>';
    html += '<span>' + formatMatchDate(m.date) + ' · ' + (m.time || '') + '</span>';
    html += '</div>';

    html += '<div class="match-teams">';
    html += '<div class="team-block">';
    if (team1.flag) html += '<img class="team-flag" src="' + flagUrl(team1.flag) + '" alt="' + team1.code + '" onerror="this.style.display=\'none\'">';
    html += '<span class="team-name">' + teamName(m.t1) + '</span>';
    html += '</div>';

    if (hasResult) {
      html += '<div class="official-score"><span>' + m.s1 + '</span><span style="color:#94a3b8;font-size:18px;">-</span><span>' + m.s2 + '</span></div>';
    } else {
      html += '<span class="match-vs">VS</span>';
    }

    html += '<div class="team-block">';
    if (team2.flag) html += '<img class="team-flag" src="' + flagUrl(team2.flag) + '" alt="' + team2.code + '" onerror="this.style.display=\'none\'">';
    html += '<span class="team-name">' + teamName(m.t2) + '</span>';
    html += '</div>';
    html += '</div>';

    if (hasResult && myPred) {
      var ptsClass = myPred.pts === 3 ? 'result-exact' : (myPred.pts === 1 ? 'result-good' : 'result-wrong');
      var ptsLabel = myPred.pts === 3 ? t('exact') + ' +3' : (myPred.pts === 1 ? t('goodResult') + ' +1' : t('wrong'));
      html += '<div class="match-result ' + ptsClass + '">' + (currentLang === 'fr' ? 'Mon prono' : 'My pred') + ': ' + myPred.ps1 + '-' + myPred.ps2 + ' · ' + ptsLabel + '</div>';
    } else if (!hasResult && myPred) {
      html += '<div class="match-result result-pending">' + (currentLang === 'fr' ? 'Mon prono' : 'My pred') + ': ' + myPred.ps1 + '-' + myPred.ps2 + ' · ' + (isClosed ? '🔒 ' + t('locked') : t('pending')) + '</div>';
    }

    if (!hasResult && !isTBD && !isClosed) {
      var ps1 = myPred ? myPred.ps1 : 0;
      var ps2 = myPred ? myPred.ps2 : 0;
      html += '<div class="match-score">';
      html += '<input type="number" class="score-input" id="s1-' + m.num + '" value="' + ps1 + '" min="0" max="20">';
      html += '<span class="score-sep">-</span>';
      html += '<input type="number" class="score-input" id="s2-' + m.num + '" value="' + ps2 + '" min="0" max="20">';
      html += '</div>';
      html += '<button class="btn-prono' + (myPred ? ' saved' : '') + '" onclick="savePrediction(' + m.num + ')">' + (myPred ? t('saved') : t('saveProno')) + '</button>';
    } else if (!hasResult && !isTBD && isClosed) {
      html += '<div class="match-result result-pending">🔒 ' + t('locked') + '</div>';
    }

    html += '<div class="match-info">🏟️ ' + sanitize(m.stadium) + ' · ' + sanitize(m.city) + '</div>';
    html += '</div>';
  });
  container.innerHTML = html;
}

// =============================================================================
// RENDER: BONUS BAR
// =============================================================================

function renderBonusBar() {
  var container = document.getElementById('bonus-bar');
  if (!container) return;
  var myBonus = bonusData.find(function(b) { return (b.email || '').toLowerCase().trim() === (currentUserEmail || '').toLowerCase().trim(); });

  var html = '<div class="bonus-section">';
  html += '<div class="bonus-title">🎯 ' + t('bonusTitle') + '</div>';
  html += '<div style="display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end;">';
  html += '<div style="flex:1;min-width:150px;">';
  html += '<label style="font-size:11px;font-weight:600;color:#64748b;">' + t('bonusWinner') + '</label>';
  html += '<select id="bonus-winner" style="width:100%;padding:8px;border:1px solid #e2e8f0;border-radius:8px;font-size:13px;">';
  html += '<option value="">--</option>';
  TEAM_DATA.forEach(function(team) {
    var sel = myBonus && myBonus.winner === team.code ? ' selected' : '';
    html += '<option value="' + team.code + '"' + sel + '>' + (currentLang === 'fr' ? team.name_fr : team.name_en) + '</option>';
  });
  html += '</select></div>';
  html += '<div style="flex:1;min-width:150px;">';
  html += '<label style="font-size:11px;font-weight:600;color:#64748b;">' + t('bonusTopScorer') + '</label>';
  html += '<input type="text" id="bonus-scorer" value="' + sanitize(myBonus ? myBonus.scorer : '') + '" placeholder="Ex: Mbappé" style="width:100%;padding:8px;border:1px solid #e2e8f0;border-radius:8px;font-size:13px;">';
  html += '</div>';
  html += '<button class="btn-prono" onclick="saveBonus()" style="min-width:120px;">' + t('bonusSave') + '</button>';
  html += '</div></div>';
  container.innerHTML = html;
}

async function saveBonus() {
  var winner = document.getElementById('bonus-winner').value;
  var scorer = document.getElementById('bonus-scorer').value.trim();
  var myBonus = bonusData.find(function(b) { return (b.email || '').toLowerCase().trim() === (currentUserEmail || '').toLowerCase().trim(); });
  try {
    if (myBonus) {
      await grist.docApi.applyUserActions([['UpdateRecord', BONUS_TABLE, myBonus.id, { Winner_Code: winner, Top_Scorer: scorer }]]);
      myBonus.winner = winner; myBonus.scorer = scorer;
    } else {
      await grist.docApi.applyUserActions([['AddRecord', BONUS_TABLE, null, { User_Email: currentUserEmail, Winner_Code: winner, Top_Scorer: scorer, Points: 0 }]]);
      bonusData.push({ email: currentUserEmail, winner: winner, scorer: scorer, pts: 0 });
    }
    showToast(t('bonusSaved'), 'success');
  } catch (e) { showToast('Error: ' + e.message, 'error'); }
}

// =============================================================================
// SAVE PREDICTION
// =============================================================================

async function savePrediction(matchNum) {
  var s1El = document.getElementById('s1-' + matchNum);
  var s2El = document.getElementById('s2-' + matchNum);
  if (!s1El || !s2El) return;
  var match = matches.find(function(m) { return m.num === matchNum; });
  if (isMatchClosed(match)) {
    showToast(t('lockedForMatch'), 'error');
    await loadAllData();
    renderMatchesView();
    return;
  }

  var ps1 = parseInt(s1El.value) || 0;
  var ps2 = parseInt(s2El.value) || 0;
  var existing = predictions.find(function(p) { return p.matchNum === matchNum; });
  try {
    if (existing) {
      await grist.docApi.applyUserActions([['UpdateRecord', PREDICTIONS_TABLE, existing.id, { Pred_Score1: ps1, Pred_Score2: ps2 }]]);
      existing.ps1 = ps1; existing.ps2 = ps2;
    } else {
      await grist.docApi.applyUserActions([['AddRecord', PREDICTIONS_TABLE, null, {
        User_Email: currentUserEmail, Match_Number: matchNum, Pred_Score1: ps1, Pred_Score2: ps2, Points: 0
      }]]);
      var newPred = { email: currentUserEmail, matchNum: matchNum, ps1: ps1, ps2: ps2, pts: 0 };
      predictions.push(newPred); allPredictions.push(newPred);
    }
    showToast(t('saved'), 'success');
    renderMatchesView();
  } catch (e) { showToast('Error: ' + e.message, 'error'); }
}

// =============================================================================
// RENDER: GROUPS
// =============================================================================

function renderGroupsView() {
  var groups = ['A','B','C','D','E','F','G','H','I','J','K','L'];
  var container = document.getElementById('groups-list');
  var html = '';
  groups.forEach(function(g) {
    var groupTeams = TEAM_DATA.filter(function(t) { return t.group === g; });
    var groupMatches = matches.filter(function(m) { return m.group === g && m.s1 >= 0 && m.s2 >= 0; });
    var standings = groupTeams.map(function(team) {
      var s = { code: team.code, flag: team.flag, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 };
      groupMatches.forEach(function(m) {
        if (m.t1 === team.code) { s.p++; s.gf += m.s1; s.ga += m.s2; if (m.s1 > m.s2) { s.w++; s.pts += 3; } else if (m.s1 === m.s2) { s.d++; s.pts += 1; } else { s.l++; } }
        if (m.t2 === team.code) { s.p++; s.gf += m.s2; s.ga += m.s1; if (m.s2 > m.s1) { s.w++; s.pts += 3; } else if (m.s2 === m.s1) { s.d++; s.pts += 1; } else { s.l++; } }
      });
      s.diff = s.gf - s.ga;
      return s;
    }).sort(function(a, b) { return b.pts - a.pts || (b.gf - b.ga) - (a.gf - a.ga) || b.gf - a.gf; });

    html += '<div class="group-card">';
    html += '<div class="group-title">' + t('group') + ' ' + g + '</div>';
    html += '<table class="group-table"><thead><tr>';
    var tipP = currentLang === 'fr' ? 'Joués' : 'Played';
    var tipW = currentLang === 'fr' ? 'Victoires' : 'Won';
    var tipN = currentLang === 'fr' ? 'Nuls' : 'Drawn';
    var tipL = currentLang === 'fr' ? 'Défaites' : 'Lost';
    var tipGF = currentLang === 'fr' ? 'Buts pour' : 'Goals for';
    var tipGA = currentLang === 'fr' ? 'Buts contre' : 'Goals against';
    var tipGD = currentLang === 'fr' ? 'Différence de buts' : 'Goal difference';
    html += '<th></th><th title="' + tipP + '">' + t('played') + '</th><th title="' + tipW + '">' + t('won') + '</th><th title="' + tipN + '">' + t('drawn') + '</th><th title="' + tipL + '">' + t('lost') + '</th><th title="' + tipGF + '">' + t('goalsFor') + '</th><th title="' + tipGA + '">' + t('goalsAgainst') + '</th><th title="' + tipGD + '">' + t('diff') + '</th><th>Pts</th>';
    html += '</tr></thead><tbody>';
    standings.forEach(function(s, idx) {
      var rankClass = idx < 2 ? 'group-rank-' + (idx + 1) : (idx === 2 ? 'group-rank-3' : '');
      html += '<tr class="' + rankClass + '">';
      html += '<td><div class="group-team-cell"><img class="group-flag" src="' + flagUrl(s.flag) + '" onerror="this.style.display=\'none\'"> ' + teamName(s.code) + '</div></td>';
      html += '<td>' + s.p + '</td><td>' + s.w + '</td><td>' + s.d + '</td><td>' + s.l + '</td>';
      html += '<td>' + s.gf + '</td><td>' + s.ga + '</td><td>' + (s.diff > 0 ? '+' : '') + s.diff + '</td>';
      html += '<td><strong>' + s.pts + '</strong></td>';
      html += '</tr>';
    });
    html += '</tbody></table></div>';
  });

  if (topScorers.length > 0) {
    html += '<div class="group-card" style="grid-column: 1 / -1;">';
    html += '<div class="group-title">⚽ ' + t('topScorersTitle') + '</div>';
    html += '<table class="group-table"><thead><tr><th>#</th><th></th><th>' + t('goals') + '</th></tr></thead><tbody>';
    var showCount = Math.min(topScorers.length, 20);
    for (var tsi = 0; tsi < showCount; tsi++) {
      var sc = topScorers[tsi];
      html += '<tr' + (tsi === 0 ? ' style="background:#fef9c3;"' : '') + '>';
      html += '<td style="font-weight:800;color:#7c1d4e;">' + (tsi + 1) + '</td>';
      html += '<td style="text-align:left;"><strong>' + sanitize(sc.name) + '</strong>';
      if (sc.team) html += ' <span style="font-size:10px;color:#94a3b8;">(' + sanitize(sc.team) + ')</span>';
      html += '</td>';
      html += '<td style="font-weight:800;font-size:16px;">' + sc.goals + '</td>';
      html += '</tr>';
    }
    html += '</tbody></table></div>';
  }

  container.innerHTML = html;
}

// =============================================================================
// RENDER: LEADERBOARD
// =============================================================================

function renderLeaderboard() {
  var playerMap = {};
  allPredictions.forEach(function(p) {
    var e = (p.email || '').toLowerCase().trim();
    if (!e) return;
    if (!playerMap[e]) playerMap[e] = { email: e, total: 0, exact: 0, good: 0 };
    playerMap[e].total += (p.pts || 0);
    if (p.pts === 3) playerMap[e].exact++;
    if (p.pts === 1) playerMap[e].good++;
  });
  bonusData.forEach(function(b) {
    var e = (b.email || '').toLowerCase().trim();
    if (!e) return;
    if (!playerMap[e]) playerMap[e] = { email: e, total: 0, exact: 0, good: 0 };
    playerMap[e].total += (b.pts || 0);
  });
  var ranked = Object.values(playerMap).sort(function(a, b) { return b.total - a.total || b.exact - a.exact; });

  var container = document.getElementById('leaderboard-content');
  var html = '';

  if (ranked.length >= 1) {
    html += '<div class="podium">';
    var podiumOrder = ranked.length >= 3 ? [ranked[1], ranked[0], ranked[2]] : ranked;
    var medals = ['🥈', '🥇', '🥉'];
    var classes = ['podium-2', 'podium-1', 'podium-3'];
    for (var pi = 0; pi < Math.min(3, ranked.length); pi++) {
      var p = ranked.length >= 3 ? podiumOrder[pi] : ranked[pi];
      var cls = ranked.length >= 3 ? classes[pi] : classes[pi === 0 ? 1 : (pi === 1 ? 0 : 2)];
      var medal = ranked.length >= 3 ? medals[pi] : medals[pi === 0 ? 1 : (pi === 1 ? 0 : 2)];
      var pAvatar = getAvatarUrl(p.email);
      html += '<div class="podium-item ' + cls + '">';
      html += '<div class="podium-rank">' + medal + '</div>';
      if (pAvatar) {
        html += '<img src="' + sanitize(pAvatar) + '" style="width:48px;height:48px;border-radius:50%;object-fit:cover;border:2px solid #fff;margin-bottom:4px;">';
      } else {
        html += '<div style="width:48px;height:48px;border-radius:50%;background:#e2e8f0;display:flex;align-items:center;justify-content:center;font-size:22px;margin:0 auto 4px;">👤</div>';
      }
      html += '<div class="podium-name">' + sanitize(getDisplayName(p.email)) + '</div>';
      html += '<div class="podium-points">' + p.total + ' ' + t('pts') + '</div>';
      html += '</div>';
    }
    html += '</div>';
  }

  html += '<table class="leaderboard-table"><thead><tr>';
  html += '<th>' + t('rank') + '</th><th>' + t('player') + '</th><th>' + t('exactCount') + '</th><th>' + t('goodCount') + '</th><th>' + t('totalPts') + '</th>';
  html += '</tr></thead><tbody>';
  ranked.forEach(function(p, i) {
    var rowAvatar = getAvatarUrl(p.email);
    var avatarHtml = rowAvatar
      ? '<img src="' + sanitize(rowAvatar) + '" style="width:28px;height:28px;border-radius:50%;object-fit:cover;vertical-align:middle;margin-right:6px;">'
      : '<span style="display:inline-block;width:28px;height:28px;border-radius:50%;background:#e2e8f0;text-align:center;line-height:28px;font-size:14px;vertical-align:middle;margin-right:6px;">👤</span>';
    html += '<tr' + (p.email === currentUserEmail ? ' style="background:#f0f7ff;font-weight:600;"' : '') + '>';
    html += '<td class="lb-rank">' + (i + 1) + '</td>';
    html += '<td>' + avatarHtml + sanitize(getDisplayName(p.email)) + '</td>';
    html += '<td>' + p.exact + '</td><td>' + p.good + '</td>';
    html += '<td class="lb-points">' + p.total + '</td>';
    html += '</tr>';
  });
  html += '</tbody></table>';
  container.innerHTML = html;
}

// =============================================================================
// RENDER: PROFILE
// =============================================================================

function renderProfile() {
  var container = document.getElementById('profile-content');
  var myProfile = profiles.find(function(p) { return p.email === currentUserEmail; });
  var currentDisplayNameVal = myProfile ? myProfile.displayName : '';
  var currentAvatar = myProfile ? myProfile.avatarUrl : '';

  var html = '<div style="max-width:600px;margin:0 auto;">';
  html += '<h2 style="margin-bottom:20px;text-align:center;">' + t('profileTitle') + '</h2>';

  html += '<div style="background:white;border-radius:16px;padding:24px;box-shadow:0 2px 8px rgba(0,0,0,0.06);margin-bottom:20px;">';
  html += '<div style="text-align:center;margin-bottom:20px;">';
  if (currentAvatar) {
    html += '<img id="avatar-preview" src="' + sanitize(currentAvatar) + '" style="width:80px;height:80px;border-radius:50%;object-fit:cover;border:3px solid #e2e8f0;">';
  } else {
    html += '<div id="avatar-preview" style="width:80px;height:80px;border-radius:50%;background:#f1f5f9;display:flex;align-items:center;justify-content:center;font-size:32px;color:#94a3b8;margin:0 auto;">👤</div>';
  }
  html += '</div>';
  html += '<div style="margin-bottom:16px;">';
  html += '<label style="display:block;margin-bottom:6px;font-weight:600;color:#374151;">' + t('profileName') + '</label>';
  html += '<input type="text" id="profile-display-name" value="' + sanitize(currentDisplayNameVal) + '" ';
  html += 'placeholder="' + sanitize(currentUserEmail.split('@')[0]) + '" ';
  html += 'style="width:100%;padding:10px;border:2px solid #e2e8f0;border-radius:8px;font-size:14px;outline:none;">';
  html += '</div>';
  html += '<button class="btn-prono" onclick="saveProfile()" style="width:100%;">' + t('profileSave') + '</button>';
  html += '</div>';

  html += '<div style="background:white;border-radius:16px;padding:24px;box-shadow:0 2px 8px rgba(0,0,0,0.06);margin-bottom:20px;">';
  html += '<h3 style="margin-bottom:16px;text-align:center;">' + t('avatarGenerator') + '</h3>';
  html += '<div style="margin-bottom:16px;">';
  html += '<label style="display:block;margin-bottom:6px;font-weight:600;color:#374151;">' + t('avatarStyle') + '</label>';
  html += '<select id="avatar-style-select" onchange="changeAvatarStyle(this.value)" style="width:100%;padding:10px;border:2px solid #e2e8f0;border-radius:8px;font-size:14px;outline:none;">';
  avatarStyles.forEach(function(style) {
    html += '<option value="' + style.id + '"' + (currentAvatarStyle === style.id ? ' selected' : '') + '>' + style.name + ' — ' + style.description + '</option>';
  });
  html += '</select></div>';
  html += '<button class="btn-prono" onclick="generateNewAvatars()" style="width:100%;margin-bottom:16px;">' + t('avatarGenerate') + '</button>';
  html += '<div id="avatar-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:16px;"></div>';
  html += '</div>';

  html += '<div style="background:white;border-radius:16px;padding:24px;box-shadow:0 2px 8px rgba(0,0,0,0.06);margin-bottom:20px;">';
  html += '<h4 style="margin-bottom:12px;">' + t('avatarCustom') + '</h4>';
  html += '<input type="url" id="profile-avatar-url" value="' + sanitize(currentAvatar) + '" placeholder="https://..." ';
  html += 'style="width:100%;padding:10px;border:2px solid #e2e8f0;border-radius:8px;font-size:14px;outline:none;" ';
  html += 'oninput="updateAvatarPreview(this.value)">';
  html += '</div>';

  html += '<div style="padding:16px;background:#f8fafc;border-radius:12px;font-size:13px;color:#64748b;">';
  html += '<div style="margin-bottom:8px;"><strong>Email:</strong> ' + sanitize(currentUserEmail) + '</div>';
  html += '<div><strong>Nom affiché:</strong> ' + sanitize(currentDisplayNameVal || currentUserEmail.split('@')[0]) + '</div>';
  html += '</div>';
  html += '</div>';
  container.innerHTML = html;

  setTimeout(function() { generateNewAvatars(); updateHeaderUserInfo(); }, 100);
}

function updateAvatarPreview(url) {
  var preview = document.getElementById('avatar-preview');
  if (!preview) return;
  if (url && url.match(/^https?:\/\/.+/)) {
    preview.outerHTML = '<img id="avatar-preview" src="' + sanitize(url) + '" style="width:80px;height:80px;border-radius:50%;object-fit:cover;border:3px solid #e2e8f0;">';
  } else {
    preview.outerHTML = '<div id="avatar-preview" style="width:80px;height:80px;border-radius:50%;background:#f1f5f9;display:flex;align-items:center;justify-content:center;font-size:32px;color:#94a3b8;margin:0 auto;">👤</div>';
  }
}

function changeAvatarStyle(style) {
  currentAvatarStyle = style;
  generateNewAvatars();
}

function generateNewAvatars() {
  var avatars = generateMultipleAvatars(currentAvatarStyle, 6);
  var grid = document.getElementById('avatar-grid');
  if (!grid) { setTimeout(generateNewAvatars, 100); return; }
  var html = '';
  avatars.forEach(function(avatar) {
    var safeUrl = sanitize(avatar.url).replace(/'/g, '&#39;').replace(/"/g, '&quot;');
    html += '<div style="text-align:center;cursor:pointer;padding:8px;border:2px solid #e2e8f0;border-radius:12px;transition:all 0.2s;" ';
    html += 'onmouseover="this.style.borderColor=\'#7c1d4e\';this.style.transform=\'scale(1.05)\'" ';
    html += 'onmouseout="this.style.borderColor=\'#e2e8f0\';this.style.transform=\'scale(1)\'" ';
    html += 'onclick="selectGeneratedAvatar(\'' + safeUrl + '\')">';
    html += '<img src="' + safeUrl + '" style="width:60px;height:60px;border-radius:50%;margin-bottom:4px;" ';
    html += 'onerror="this.src=\'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiNlMmU4ZjAiLz48L3N2Zz4=\'">';
    html += '<div style="font-size:10px;color:#94a3b8;">' + t('avatarUseGenerated') + '</div>';
    html += '</div>';
  });
  grid.innerHTML = html;
}

function selectGeneratedAvatar(avatarUrl) {
  var avatarInput = document.getElementById('profile-avatar-url');
  if (avatarInput) avatarInput.value = avatarUrl;
  updateAvatarPreview(avatarUrl);
  var avatarElement = document.getElementById('header-avatar');
  if (avatarElement) { avatarElement.src = avatarUrl; avatarElement.style.display = 'block'; avatarElement.onerror = function() { this.style.display = 'none'; }; }

  var displayName = document.getElementById('profile-display-name') ? document.getElementById('profile-display-name').value.trim() : '';
  var myProfile = profiles.find(function(p) { return p.email === currentUserEmail; });

  if (myProfile) {
    grist.docApi.applyUserActions([['UpdateRecord', PROFILES_TABLE, myProfile.id, { Display_Name: displayName, Avatar_URL: avatarUrl }]])
      .then(function() { myProfile.avatarUrl = avatarUrl; showToast('Avatar enregistré !', 'success'); })
      .catch(function() { showToast('Avatar sélectionné — cliquez Enregistrer pour sauvegarder', 'info'); });
  } else {
    grist.docApi.applyUserActions([['AddRecord', PROFILES_TABLE, null, { User_Email: currentUserEmail, Display_Name: displayName, Avatar_URL: avatarUrl }]])
      .then(function(result) { profiles.push({ id: result.rowIds[0], email: currentUserEmail, displayName: displayName, avatarUrl: avatarUrl }); showToast('Avatar enregistré !', 'success'); })
      .catch(function() { showToast('Avatar sélectionné — cliquez Enregistrer pour sauvegarder', 'info'); });
  }
}

window.generateNewAvatars = generateNewAvatars;
window.selectGeneratedAvatar = selectGeneratedAvatar;
window.changeAvatarStyle = changeAvatarStyle;
window.switchTab = switchTab;

async function saveProfile() {
  var displayName = document.getElementById('profile-display-name').value.trim();
  var avatarUrl = document.getElementById('profile-avatar-url').value.trim();
  try {
    var myProfile = profiles.find(function(p) { return p.email === currentUserEmail; });
    if (myProfile) {
      await grist.docApi.applyUserActions([['UpdateRecord', PROFILES_TABLE, myProfile.id, { Display_Name: displayName, Avatar_URL: avatarUrl }]]);
      myProfile.displayName = displayName;
      myProfile.avatarUrl = avatarUrl;
    } else {
      var result = await grist.docApi.applyUserActions([['AddRecord', PROFILES_TABLE, null, { User_Email: currentUserEmail, Display_Name: displayName, Avatar_URL: avatarUrl }]]);
      profiles.push({ id: result.rowIds[0], email: currentUserEmail, displayName: displayName, avatarUrl: avatarUrl });
    }
    showToast(t('profileSaved'), 'success');
    renderProfile();
    renderLeaderboard();
    updateHeaderUserInfo();
  } catch (e) { showToast('Erreur: ' + e.message, 'error'); }
}

// =============================================================================
// RENDER: MY STATS
// =============================================================================

function renderMyStats() {
  var container = document.getElementById('mystats-content');
  var myTotal = 0, myExact = 0, myGood = 0, myCount = predictions.length;
  predictions.forEach(function(p) { myTotal += (p.pts || 0); if (p.pts === 3) myExact++; if (p.pts === 1) myGood++; });
  var matchesWithResult = matches.filter(function(m) { return m.s1 >= 0 && m.s2 >= 0; }).length;
  var rate = matchesWithResult > 0 ? Math.round(((myExact * 3 + myGood) / (matchesWithResult * 3)) * 100) : 0;

  var html = '<div class="stats-cards">';
  html += '<div class="stat-card"><div class="stat-value">' + myTotal + '</div><div class="stat-label">' + t('myPoints') + '</div></div>';
  html += '<div class="stat-card"><div class="stat-value">' + myCount + '</div><div class="stat-label">' + t('myPronos') + '</div></div>';
  html += '<div class="stat-card"><div class="stat-value">' + myExact + '</div><div class="stat-label">' + t('myExact') + '</div></div>';
  html += '<div class="stat-card"><div class="stat-value">' + rate + '%</div><div class="stat-label">' + t('myRate') + '</div></div>';
  html += '</div>';

  if (predictions.length === 0) {
    html += '<div style="text-align:center;color:#94a3b8;padding:40px;">' + t('noPronosYet') + '</div>';
  } else {
    html += '<div style="display:flex;flex-direction:column;gap:8px;">';
    predictions.forEach(function(pred) {
      var m = matches.find(function(mm) { return mm.num === pred.matchNum; });
      if (!m) return;
      var team1 = getTeam(m.t1); var team2 = getTeam(m.t2);
      var hasResult = m.s1 >= 0 && m.s2 >= 0;
      html += '<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:white;border-radius:10px;border:1px solid #e2e8f0;font-size:13px;">';
      if (team1.flag) html += '<img style="width:24px;height:16px;border-radius:2px;" src="' + flagUrl(team1.flag) + '">';
      html += '<span style="font-weight:600;">' + teamName(m.t1) + '</span>';
      html += '<span style="font-weight:800;">' + pred.ps1 + ' - ' + pred.ps2 + '</span>';
      html += '<span style="font-weight:600;">' + teamName(m.t2) + '</span>';
      if (team2.flag) html += '<img style="width:24px;height:16px;border-radius:2px;" src="' + flagUrl(team2.flag) + '">';
      if (hasResult) {
        var cls = pred.pts === 3 ? 'result-exact' : (pred.pts === 1 ? 'result-good' : 'result-wrong');
        html += '<span class="match-result ' + cls + '" style="margin-left:auto;">+' + pred.pts + '</span>';
      } else {
        html += '<span class="match-result result-pending" style="margin-left:auto;">' + t('pending') + '</span>';
      }
      html += '</div>';
    });
    html += '</div>';
  }
  container.innerHTML = html;
}

// =============================================================================
// RENDER: ADMIN (owner only)
// =============================================================================

function renderAdmin() {
  var container = document.getElementById('admin-content');
  if (!isOwner) {
    container.innerHTML = '<div style="text-align:center;padding:40px;color:#94a3b8;"><div style="font-size:40px;margin-bottom:12px;">🔒</div>' + t('adminOnly') + '</div>';
    return;
  }

  var html = '<h2 style="margin-bottom:16px;">' + t('adminTitle') + '</h2>';
  html += '<div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;">';
  html += '<button class="btn-prono" onclick="fetchMatchResults()" style="flex:1;min-width:200px;">🔄 ' + t('refreshResults') + '</button>';
  html += '<button class="btn-prono" onclick="recalculateAllPoints()" style="flex:1;min-width:200px;">' + t('recalculate') + '</button>';
  html += '</div>';

  html += '<div style="background:white;border-radius:12px;padding:16px;margin-bottom:16px;border:1px solid #e2e8f0;">';
  html += '<h3 style="margin-bottom:12px;">🎯 ' + t('validateBonus') + '</h3>';
  html += '<div style="display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end;">';
  html += '<div style="flex:1;min-width:150px;">';
  html += '<label style="font-size:11px;font-weight:600;color:#64748b;">' + t('realWinner') + '</label>';
  html += '<select id="admin-winner" style="width:100%;padding:8px;border:1px solid #e2e8f0;border-radius:8px;font-size:13px;">';
  html += '<option value="">--</option>';
  TEAM_DATA.forEach(function(team) {
    html += '<option value="' + team.code + '">' + (currentLang === 'fr' ? team.name_fr : team.name_en) + '</option>';
  });
  html += '</select></div>';
  html += '<div style="flex:1;min-width:150px;">';
  html += '<label style="font-size:11px;font-weight:600;color:#64748b;">' + t('realTopScorer') + '</label>';
  html += '<input type="text" id="admin-scorer" placeholder="Ex: Mbappé" style="width:100%;padding:8px;border:1px solid #e2e8f0;border-radius:8px;font-size:13px;">';
  if (topScorers.length > 0) {
    html += '<div style="font-size:10px;color:#94a3b8;margin-top:4px;">Top actuel : <strong>' + sanitize(topScorers[0].name) + '</strong> (' + topScorers[0].goals + ' ' + t('goals') + ')</div>';
  }
  html += '</div>';
  html += '<button class="admin-save-btn" onclick="validateBonusPoints()" style="padding:8px 20px;">' + t('validateBonus') + '</button>';
  html += '</div></div>';

  matches.forEach(function(m) {
    if (m.t1 === 'TBD' && m.t2 === 'TBD') return;
    var team1 = getTeam(m.t1); var team2 = getTeam(m.t2);
    var cs1 = m.s1 >= 0 ? m.s1 : '';
    var cs2 = m.s2 >= 0 ? m.s2 : '';
    html += '<div class="admin-match">';
    html += '<span style="font-size:11px;color:#94a3b8;width:30px;">#' + m.num + '</span>';
    html += '<div class="admin-teams">';
    if (team1.flag) html += '<img class="admin-flag" src="' + flagUrl(team1.flag) + '">';
    html += '<span>' + teamName(m.t1) + '</span></div>';
    html += '<input type="number" class="admin-score-input" id="admin-s1-' + m.num + '" value="' + cs1 + '" min="0">';
    html += '<span style="font-weight:800;color:#94a3b8;">-</span>';
    html += '<input type="number" class="admin-score-input" id="admin-s2-' + m.num + '" value="' + cs2 + '" min="0">';
    html += '<div class="admin-teams" style="justify-content:flex-end;">';
    html += '<span>' + teamName(m.t2) + '</span>';
    if (team2.flag) html += '<img class="admin-flag" src="' + flagUrl(team2.flag) + '">';
    html += '</div>';
    html += '<button class="admin-save-btn" onclick="saveResult(' + m.id + ',' + m.num + ')">' + t('adminSave') + '</button>';
    html += '</div>';
  });
  container.innerHTML = html;
}

async function saveResult(matchId, matchNum) {
  var s1 = parseInt(document.getElementById('admin-s1-' + matchNum).value);
  var s2 = parseInt(document.getElementById('admin-s2-' + matchNum).value);
  if (isNaN(s1) || isNaN(s2)) return;
  try {
    await grist.docApi.applyUserActions([['UpdateRecord', MATCHES_TABLE, matchId, { Score1: s1, Score2: s2, Locked: true }]]);
    var m = matches.find(function(mm) { return mm.id === matchId; });
    if (m) { m.s1 = s1; m.s2 = s2; m.locked = true; }
    await recalculatePointsForMatch(matchNum, s1, s2);
    showToast(t('adminSave') + ' ✓', 'success');
  } catch (e) { showToast('Error: ' + e.message, 'error'); }
}

function calcPoints(predS1, predS2, realS1, realS2) {
  if (predS1 === realS1 && predS2 === realS2) return 3;
  var predResult = predS1 > predS2 ? 1 : (predS1 < predS2 ? -1 : 0);
  var realResult = realS1 > realS2 ? 1 : (realS1 < realS2 ? -1 : 0);
  if (predResult === realResult) return 1;
  return 0;
}

async function recalculatePointsForMatch(matchNum, s1, s2) {
  var preds = allPredictions.filter(function(p) { return p.matchNum === matchNum; });
  if (preds.length === 0) return;
  var actions = [];
  preds.forEach(function(p) {
    var pts = calcPoints(p.ps1, p.ps2, s1, s2);
    p.pts = pts;
    actions.push(['UpdateRecord', PREDICTIONS_TABLE, p.id, { Points: pts }]);
  });
  try { await grist.docApi.applyUserActions(actions); } catch (e) { console.error(e); }
}

async function recalculateAllPoints() {
  var actions = [];
  allPredictions.forEach(function(p) {
    var m = matches.find(function(mm) { return mm.num === p.matchNum; });
    if (m && m.s1 >= 0 && m.s2 >= 0) {
      var pts = calcPoints(p.ps1, p.ps2, m.s1, m.s2);
      if (pts !== p.pts) { p.pts = pts; actions.push(['UpdateRecord', PREDICTIONS_TABLE, p.id, { Points: pts }]); }
    }
  });
  if (actions.length > 0) {
    try { await grist.docApi.applyUserActions(actions); } catch (e) { console.error(e); }
  }
  predictions = allPredictions.filter(function(p) { return (p.email || '').toLowerCase().trim() === (currentUserEmail || '').toLowerCase().trim(); });
  showToast(t('recalcDone'), 'success');
}

async function validateBonusPoints() {
  var winnerCode = document.getElementById('admin-winner').value;
  var scorerName = document.getElementById('admin-scorer').value.trim().toLowerCase();
  if (!winnerCode && !scorerName) { showToast(currentLang === 'fr' ? 'Remplis au moins un champ' : 'Fill at least one field', 'error'); return; }
  var actions = [];
  bonusData.forEach(function(b) {
    var pts = 0;
    if (winnerCode && b.winner === winnerCode) pts += 5;
    if (scorerName && (b.scorer || '').toLowerCase().trim() === scorerName) pts += 3;
    if (pts !== (b.pts || 0)) { b.pts = pts; actions.push(['UpdateRecord', BONUS_TABLE, b.id, { Points: pts }]); }
  });
  if (actions.length > 0) {
    try { await grist.docApi.applyUserActions(actions); } catch (e) { console.error(e); }
  }
  showToast(t('bonusValidated'), 'success');
  renderCurrentTab();
}

// =============================================================================
// ACL SECURITY
// =============================================================================

var PRONO_ACL_RULES = [
  { tableId: 'Prono_Teams',       ownerPerms: '+CRUDS', editorPerms: '+R-CUD' },
  { tableId: 'Prono_Matches',     ownerPerms: '+CRUDS', editorPerms: '+R-CUD' },
  { tableId: 'Prono_Predictions', ownerPerms: '+CRUDS', editorPerms: '+R-CUD' },
  { tableId: 'Prono_Bonus',       ownerPerms: '+CRUDS', editorPerms: '+RCUD' },
  { tableId: 'Prono_UserInfo',    ownerPerms: '+CRUDS', editorPerms: '+RCUD' }
];

async function applySecurityRules() {
  try {
    var resourcesData = await grist.docApi.fetchTable('_grist_ACLResources');
    var rulesData = await grist.docApi.fetchTable('_grist_ACLRules');
    var existingTables = await grist.docApi.listTables();
    var actions = [];
    var tempId = -1000;

    for (var r = 0; r < PRONO_ACL_RULES.length; r++) {
      var rule = PRONO_ACL_RULES[r];
      if (existingTables.indexOf(rule.tableId) === -1) continue;
      var alreadyHasRules = false;
      for (var ri = 0; ri < rulesData.id.length; ri++) {
        if (rulesData.memo && rulesData.memo[ri] && rulesData.memo[ri].indexOf('PronoSPIc') !== -1) {
          var resId = rulesData.resource[ri];
          for (var rsi = 0; rsi < resourcesData.id.length; rsi++) {
            if (resourcesData.id[rsi] === resId && resourcesData.tableId[rsi] === rule.tableId) { alreadyHasRules = true; break; }
          }
        }
        if (alreadyHasRules) break;
      }
      if (alreadyHasRules) continue;
      var tempResourceId = tempId--;
      actions.push(['AddRecord', '_grist_ACLResources', tempResourceId, { tableId: rule.tableId, colIds: '*' }]);
      actions.push(['AddRecord', '_grist_ACLRules', null, { resource: tempResourceId, aclFormula: 'user.Access in [OWNER]', permissionsText: rule.ownerPerms, memo: 'PronoSPIc - Owner' }]);
      actions.push(['AddRecord', '_grist_ACLRules', null, { resource: tempResourceId, aclFormula: '', permissionsText: rule.editorPerms, memo: 'PronoSPIc - Default' }]);
    }
    if (actions.length > 0) { await grist.docApi.applyUserActions(actions); showToast(currentLang === 'fr' ? 'Sécurité activée' : 'Security enabled', 'success'); }
  } catch (e) { console.warn('[PronoSPIc] ACL apply skipped:', e.message); }
}

// =============================================================================
// ROLE DETECTION
// =============================================================================

async function detectRole() {
  try {
    var tables = await grist.docApi.listTables();
    if (tables.indexOf(USERINFO_TABLE) !== -1) {
      try {
        var existingData = await grist.docApi.fetchTable(USERINFO_TABLE);
        var rowIds = (existingData && existingData.id) ? existingData.id : [];
        var actions = [];
        for (var r = 0; r < rowIds.length; r++) actions.push(['RemoveRecord', USERINFO_TABLE, rowIds[r]]);
        actions.push(['AddRecord', USERINFO_TABLE, null, {}]);
        await grist.docApi.applyUserActions(actions);
      } catch (e) { /* read-only */ }

      var tokenInfo = await grist.docApi.getAccessToken({ readOnly: true });
      var resp = await fetch(tokenInfo.baseUrl + '/tables/' + USERINFO_TABLE + '/records?auth=' + tokenInfo.token);
      if (resp.ok) {
        var data = await resp.json();
        if (data.records && data.records.length > 0) currentUserEmail = data.records[0].fields.UserEmail || '';
      }
    }
  } catch (e) { /* ignore */ }

  try {
    await grist.docApi.applyUserActions([['ModifyColumn', USERINFO_TABLE, 'UserEmail', { isFormula: false, formula: 'user.Email', recalcWhen: 2, recalcDeps: null }]]);
    isOwner = true;
  } catch (e) { isOwner = false; }

  var adminBtn = document.querySelector('[data-tab="admin"]');
  if (adminBtn) adminBtn.style.display = isOwner ? '' : 'none';
}

// =============================================================================
// API: MATCH RESULTS
// =============================================================================

var WORLD_CUP_API_URL = 'https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json';

var TEAM_NAME_TO_CODE = {
  'Mexico': 'MEX', 'South Korea': 'KOR', 'Korea Republic': 'KOR', 'South Africa': 'RSA',
  'Czech Republic': 'CZE', 'Czechia': 'CZE',
  'Canada': 'CAN', 'Bosnia & Herzegovina': 'BIH', 'Bosnia-Herzegovina': 'BIH', 'Qatar': 'QAT', 'Switzerland': 'SUI',
  'Brazil': 'BRA', 'Morocco': 'MAR', 'Haiti': 'HAI', 'Scotland': 'SCO',
  'USA': 'USA', 'United States': 'USA', 'Paraguay': 'PAR', 'Australia': 'AUS', 'Turkey': 'TUR', 'Türkiye': 'TUR',
  'Germany': 'GER', 'Curaçao': 'CUW', "Ivory Coast": 'CIV', "Côte d'Ivoire": 'CIV', 'Ecuador': 'ECU',
  'Netherlands': 'NED', 'Japan': 'JPN', 'Sweden': 'SWE', 'Tunisia': 'TUN',
  'Belgium': 'BEL', 'Egypt': 'EGY', 'Iran': 'IRN', 'IR Iran': 'IRN', 'New Zealand': 'NZL',
  'Spain': 'ESP', 'Cape Verde': 'CPV', 'Saudi Arabia': 'KSA', 'Uruguay': 'URU',
  'France': 'FRA', 'Senegal': 'SEN', 'Norway': 'NOR', 'Iraq': 'IRQ',
  'Argentina': 'ARG', 'Algeria': 'ALG', 'Austria': 'AUT', 'Jordan': 'JOR',
  'Portugal': 'POR', 'DR Congo': 'COD', 'Congo DR': 'COD', 'Uzbekistan': 'UZB', 'Colombia': 'COL',
  'England': 'ENG', 'Croatia': 'CRO', 'Ghana': 'GHA', 'Panama': 'PAN'
};

async function fetchMatchResults() {
  try {
    showToast(t('refreshing'), 'info');
    var response = await fetch(WORLD_CUP_API_URL);
    if (!response.ok) throw new Error('HTTP ' + response.status);
    var data = await response.json();
    var updatedMatches = [];

    for (var ai = 0; ai < data.matches.length; ai++) {
      var apiMatch = data.matches[ai];
      var apiT1Name = apiMatch.team1 || '';
      var apiT2Name = apiMatch.team2 || '';
      var apiCode1 = TEAM_NAME_TO_CODE[apiT1Name] || apiT1Name;
      var apiCode2 = TEAM_NAME_TO_CODE[apiT2Name] || apiT2Name;

      var localMatch = matches.find(function(m) {
        return (m.t1 === apiCode1 && m.t2 === apiCode2) || (m.t1 === apiCode2 && m.t2 === apiCode1);
      });

      if (localMatch && apiMatch.score && apiMatch.score.ft) {
        var apiScore1 = apiMatch.score.ft[0];
        var apiScore2 = apiMatch.score.ft[1];
        // If API has teams in reverse order, swap scores
        if (localMatch.t1 === apiCode2 && localMatch.t2 === apiCode1) {
          var tmp = apiScore1; apiScore1 = apiScore2; apiScore2 = tmp;
        }
        if (localMatch.s1 !== apiScore1 || localMatch.s2 !== apiScore2) {
          updatedMatches.push({ id: localMatch.id, num: localMatch.num, newScore1: apiScore1, newScore2: apiScore2 });
        }
      }
    }

    // Extract top scorers
    var scorerMap = {};
    var allGoals = [];
    if (data.rounds) {
      data.rounds.forEach(function(round) {
        (round.matches || []).forEach(function(rm) { allGoals = allGoals.concat(rm.goals || []); });
      });
    }
    if (data.matches) {
      data.matches.forEach(function(m) { allGoals = allGoals.concat(m.goals || []); });
    }
    allGoals.forEach(function(g) {
      var name = g.name || g.player || '';
      if (name) {
        if (!scorerMap[name]) scorerMap[name] = { name: name, team: g.team || '', goals: 0 };
        scorerMap[name].goals++;
      }
    });
    topScorers = Object.values(scorerMap).sort(function(a, b) { return b.goals - a.goals; });

    if (updatedMatches.length === 0) {
      showToast(currentLang === 'fr' ? 'Données à jour' : 'Data up to date', 'info');
      renderCurrentTab();
      return;
    }

    var updateActions = updatedMatches.map(function(um) {
      return ['UpdateRecord', MATCHES_TABLE, um.id, { Score1: um.newScore1, Score2: um.newScore2, Locked: true }];
    });
    await grist.docApi.applyUserActions(updateActions);
    updatedMatches.forEach(function(um) {
      var lm = matches.find(function(mm) { return mm.id === um.id; });
      if (lm) { lm.s1 = um.newScore1; lm.s2 = um.newScore2; lm.locked = true; }
    });
    for (var ui = 0; ui < updatedMatches.length; ui++) {
      await recalculatePointsForMatch(updatedMatches[ui].num, updatedMatches[ui].newScore1, updatedMatches[ui].newScore2);
    }
    renderCurrentTab();
    showToast(updatedMatches.length + (currentLang === 'fr' ? ' résultat(s) mis à jour ✓' : ' result(s) updated ✓'), 'success');
  } catch (error) {
    console.error('fetchMatchResults error:', error);
    showToast('Erreur: ' + error.message, 'error');
  }
}

// =============================================================================
// INIT
// =============================================================================

if (!isInsideGrist()) {
  document.getElementById('not-in-grist').classList.add('show');
  document.getElementById('main-app').style.display = 'none';
} else {
  (async function() {
    await grist.ready({ requiredAccess: 'full' });
    await detectRole();
    await ensureTables();
    if (isOwner) { await seedTeams(); await seedMatches(); await backfillKickoffUtc(); await applySecurityRules(); }
    await loadAllData();
    if (isOwner) { await autoLockStartedMatches(); }
    renderCurrentTab();
    setTimeout(updateHeaderUserInfo, 100);
  })();
}

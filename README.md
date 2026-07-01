# 📬 Boîte du Syndicat — Application Web

Une application web complète pour permettre aux adhérents d'un syndicat local d'envoyer des messages anonymes ou signés au bureau syndical. Incluant : bannière défilante d'actualités, carrousel de documents, suivi des messages en temps réel, et notifications par email 100% gratuit.

**🔗 Déploiement** : Vercel (gratuit, sans limite de temps)  
**🗄️ Base de données** : Google Sheets  
**📧 Notifications** : Apps Script + Gmail (gratuit)

---

## 🚀 Démarrage rapide

### 1. Cloner et configurer le projet

```bash
# Cloner le repo
git clone https://github.com/VOTRE_USERNAME/syndicat-messages-app.git
cd syndicat-messages-app

# Installer les dépendances
npm install

# Créer le fichier .env local
cp .env.example .env.local
```

### 2. Configurer Google Sheets

#### A) Créer un compte de service Google

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet (ou utilisez un existant)
3. Activez l'API Google Sheets :
   - Menu > APIs & Services > Library
   - Cherchez "Google Sheets API"
   - Cliquez sur "Activer"
4. Créez un compte de service :
   - APIs & Services > Credentials
   - Cliquez sur "Créer des identifiants" > Service Account
   - Remplissez le formulaire, cliquez "Créer"
   - Sur la page suivante, cliquez "Créer une clé" > JSON
   - Un fichier JSON sera téléchargé

#### B) Partager le Google Sheet avec le compte de service

1. Copiez l'email du compte de service (format : `xxx@xxx.iam.gserviceaccount.com`) depuis le JSON téléchargé
2. Ouvrez votre Google Sheet
3. Cliquez sur "Partager" en haut à droite
4. Collez l'email du compte de service, donnez l'accès "Éditeur"
5. Envoyez

#### C) Configurer les variables d'environnement

1. Ouvrez le fichier JSON téléchargé avec un éditeur de texte
2. **Copiez TOUT le contenu JSON** (sans sauts de ligne)
3. Ouvrez `.env.local` et remplissez :

```env
GOOGLE_SHEET_ID=1-5aee7zMGkIbIn9P3PkozWCZvHgj9kdFAAe5CCyYJ7s

GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"xxx",...}
```

⚠️ **IMPORTANT** : La clé doit être sur UNE SEULE LIGNE, sans sauts.

### 3. Préparer le Google Sheet

Voir le document **GOOGLE_SHEET_CONFIG.md** ou exécutez le script Apps Script fourni pour configurer automatiquement tous les onglets.

### 4. Configurer les notifications par email (Apps Script)

1. Ouvrez votre Google Sheet
2. Extensions > Apps Script
3. Collez le code du fichier **email-notification.gs** (voir ci-dessous)
4. Exécutez la fonction `setupEmailTrigger()`
5. Autorisez l'accès

L'Apps Script vérifiera automatiquement chaque nouvelle ligne dans l'onglet "Messages" et envoie un email au bureau.

---

## 📧 Configuration des emails (Google Apps Script)

Créez un nouveau fichier dans Apps Script avec ce contenu :

```javascript
// Adresse email qui recevra les notifications
const NOTIFICATION_EMAIL = "bureau@syndicat.local";

function onEdit(e) {
  const sheet = e.source.getSheetByName("Messages");
  if (!sheet || e.range.getSheet() !== sheet) return;

  const editedRow = e.range.getRow();
  if (editedRow === 1) return; // En-têtes

  const values = sheet.getRange(editedRow, 1, 1, 8).getValues()[0];
  
  if (!values[0]) return; // Code de suivi vide
  
  // Vérifier que ce n'est pas un edit du statut (colonne H)
  if (e.range.getColumn() !== 8) {
    sendNotification(values);
  }
}

function sendNotification(values) {
  const [code, time, subject, message, name, email, verif, status] = values;
  
  if (!code) return;

  const emailBody = `
📬 Nouveau message reçu !

Code de suivi: ${code}
Sujet: ${subject}
Signature: ${name || "Anonyme"} ${email ? "(" + email + ")" : ""}
Statut: ${verif || ""}
Reçu: ${time || ""}

Message:
${message}

---
Répondez sur: https://votre-app.vercel.app/
`;

  GmailApp.sendEmail(NOTIFICATION_EMAIL, `[SYNDICAT] ${subject}`, emailBody);
}
```

⚠️ Remplacez `bureau@syndicat.local` par l'email où vous voulez recevoir les notifications.

---

## 🏗️ Architecture

### Frontend (React)
- `src/App.jsx` : Formulaire principal + orchestration
- `src/components/Banner.jsx` : Bannière défilante (actualités)
- `src/components/Carousel.jsx` : Carrousel de documents
- `src/components/Presentation.jsx` : Vidéo/audio de présentation
- `src/components/TrackingSection.jsx` : Section suivi

### Backend (Vercel Serverless)
- `/api/send-message.js` : Reçoit les messages, écrit dans Google Sheets
- `/api/get-news.js` : Récupère les actualités
- `/api/get-documents.js` : Récupère les documents
- `/api/get-presentation.js` : Récupère vidéo/audio
- `/api/check-status.js` : Vérifie le statut d'un message

### Base de données (Google Sheets)
- `Messages` : Enregistre tous les messages avec code de suivi et statut
- `Membres autorisés` : Liste des emails d'adhérents (pour vérification)
- `Actualités` : Annonces affichées en bannière défilante
- `Documents` : PDF/images du carrousel
- `Présentation` : Vidéo/audio de présentation

---

## 🧪 Tester localement

```bash
# Démarrer le serveur de développement
npm start

# L'app s'ouvre sur http://localhost:3000
```

Pour tester les APIs localement, vous avez besoin d'un serveur Vercel local (mode avancé).

---

## 🚀 Déployer sur Vercel

### 1. Créer un compte Vercel

Allez sur [vercel.com](https://vercel.com) et connectez-vous avec GitHub.

### 2. Importer le projet

1. Cliquez sur "New Project"
2. Sélectionnez "Import Git Repository"
3. Entrez l'URL de votre repo GitHub
4. Cliquez "Import"

### 3. Configurer les variables d'environnement

1. Allez dans Settings > Environment Variables
2. Ajoutez :
   - **GOOGLE_SHEET_ID** : `1-5aee7zMGkIbIn9P3PkozWCZvHgj9kdFAAe5CCyYJ7s`
   - **GOOGLE_SERVICE_ACCOUNT_KEY** : Collez le JSON complet (une seule ligne)
3. Sauvegardez

### 4. Déployer

1. Cliquez "Deploy"
2. Attendez 2-3 minutes
3. Votre app est en ligne ! 🎉

**URL** : `https://YOUR_PROJECT_NAME.vercel.app`

---

## 📋 Structure du projet

```
syndicat-messages-app/
├── src/
│   ├── App.jsx              # Composant principal
│   ├── App.css              # Styles globaux
│   ├── index.js             # Point d'entrée React
│   └── components/
│       ├── Banner.jsx
│       ├── Carousel.jsx
│       ├── Presentation.jsx
│       └── TrackingSection.jsx
├── api/
│   ├── send-message.js
│   ├── get-news.js
│   ├── get-documents.js
│   ├── get-presentation.js
│   └── check-status.js
├── public/
│   └── index.html
├── package.json
├── vercel.json
├── .env.example
├── .gitignore
└── README.md
```

---

## 🎨 Personnalisation

### Couleurs
Modifiez `:root` dans `src/App.css` :

```css
:root {
  --color-primary: #1F3864;      /* Bleu foncé */
  --color-secondary: #2E75B6;    /* Bleu */
  --color-accent: #ED7D31;       /* Orange */
  --color-success: #375623;      /* Vert */
  --color-danger: #C00000;       /* Rouge */
}
```

### Textes
Modifiez les textes directement dans les composants (`.jsx`).

### Google Sheet ID
Si vous utilisez un autre Sheet, mettez à jour la variable d'environnement `GOOGLE_SHEET_ID`.

---

## 🔐 Sécurité

- ✅ Les clés Google ne sont jamais exposées (stockées en variables Vercel)
- ✅ Les APIs sont serverless (pas de serveur à maintenir)
- ✅ CORS n'est pas un problème (APIs Vercel)
- ✅ Les emails ne sont jamais affichés publiquement (sauf si "Vérifié")

### Avant de rendre public
1. Configurez les emails correctement
2. Testez les notifications
3. Configurez les droits d'accès Google Sheets (compte de service = lecture/écriture seulement sur Messages/Actualités)

---

## 📞 Support

### Erreur : "Impossible de charger les actualités"
→ Vérifiez que l'onglet "Actualités" existe et a des données

### Erreur : "Erreur lors de l'enregistrement du message"
→ Vérifiez que les variables d'environnement sont configurées correctement dans Vercel

### Les emails ne sont pas reçus
→ Vérifiez le code Apps Script, testez en ouvrant manuellement le Sheet

### Code de suivi introuvable
→ Attendez quelques secondes après l'envoi (délai de synchronisation Google Sheets)

---

## 📄 Licence

MIT — Libre d'usage

---

## 🎯 Checklist pré-lancement

- [ ] Google Sheet configuré avec 5 onglets
- [ ] Compte de service créé et partagé
- [ ] Variables d'environnement Vercel configurées
- [ ] Apps Script configuré pour les emails
- [ ] Liste des membres remplie
- [ ] Au moins une actualité ajoutée
- [ ] Au moins une vidéo/audio de présentation
- [ ] Tested localement (`npm start`)
- [ ] Déployé sur Vercel
- [ ] Lien partagé aux adhérents

---

**Prêt ? Lancez l'app ! 🚀**

/**
 * Google Apps Script pour envoyer des emails de notification
 * Quand un nouveau message est ajouté dans l'onglet "Messages"
 * 
 * À CONFIGURER :
 * 1. Ouvrez le Google Sheet
 * 2. Extensions > Apps Script
 * 3. Collez ce code
 * 4. Remplacez NOTIFICATION_EMAIL par votre adresse
 * 5. Exécutez setupEmailTrigger()
 * 6. Autorisez l'accès
 */

// ⚙️ CONFIGURATION — À MODIFIER
const NOTIFICATION_EMAIL = "bureau@syndicat.local"; // Email où recevoir les notifications

// ===== DÉCLENCHE AUTOMATIQUEMENT =====
function onEdit(e) {
  const sheet = e.source.getSheetByName("Messages");
  if (!sheet || e.range.getSheet() !== sheet) return;

  const editedRow = e.range.getRow();
  if (editedRow === 1) return; // Ignore les en-têtes

  // Lire la ligne complète
  const values = sheet.getRange(editedRow, 1, 1, 8).getValues()[0];
  
  // Si la colonne "Code suivi" (A) est vide, ne pas traiter
  if (!values[0] || values[0].toString().trim() === "") return;
  
  // Ne pas renvoyer d'email si c'est juste une modification du statut (col H)
  if (e.range.getColumn() === 8) return;
  
  // Envoyer notification
  sendNotification(values);
}

function sendNotification(values) {
  // Destructurer les colonnes
  const [code, time, subject, message, name, email, verif, status] = values;
  
  // Vérification finale
  if (!code) return;

  // Construire l'email
  const emailBody = `
┌─────────────────────────────────┐
│  📬 NOUVEAU MESSAGE REÇU        │
└─────────────────────────────────┘

🔍 CODE DE SUIVI
${code}

📌 SUJET
${subject}

👤 SIGNATURE
${name || "[ ANONYME ]"} ${email ? "(" + email + ")" : ""}

✓ VÉRIFICATION
${verif || "?"}

⏰ REÇU LE
${time || "?"}

─────────────────────────────────

📝 MESSAGE

${message}

─────────────────────────────────

🔗 Suivre l'avancement
Bureau : https://votre-app.vercel.app/
Adhérent : Partagez le code ${code}

`;

  // Envoyer
  try {
    GmailApp.sendEmail(
      NOTIFICATION_EMAIL,
      `[SYNDICAT] ${subject} (${code})`,
      emailBody,
      {
        name: "Boîte du Syndicat",
      }
    );
    
    Logger.log(`✅ Email envoyé pour ${code}`);
  } catch (err) {
    Logger.log(`❌ Erreur envoi email : ${err}`);
  }
}

// ===== FONCTION D'INITIALISATION (À EXÉCUTER MANUELLEMENT) =====
function setupEmailTrigger() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const scriptId = ScriptApp.getScriptId();
  
  // Supprimer les anciens triggers
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    ScriptApp.deleteTrigger(trigger);
  });
  
  // Créer un nouveau trigger onEdit
  ScriptApp.newTrigger("onEdit")
    .forSpreadsheet(ss)
    .onEdit()
    .create();
  
  SpreadsheetApp.getUi().alert(
    "✅ Trigger configuré ! Les emails seront envoyés automatiquement.\n\n" +
    "⚙️ Configuration : vérifiez que NOTIFICATION_EMAIL = " + NOTIFICATION_EMAIL
  );
}

// ===== TEST : Envoyer un email de test =====
function sendTestEmail() {
  const testValues = [
    "20260701-9999",                           // Code
    "2026-07-01 14:30:45",                     // Horodatage
    "Ceci est un message de test",             // Sujet
    "C'est juste pour vérifier que les emails fonctionnent correctement.", // Message
    "Test User",                               // Nom
    "test@example.fr",                         // Email
    "Vérifié",                                 // Vérification
    "Reçu"                                     // Statut
  ];
  
  sendNotification(testValues);
  SpreadsheetApp.getUi().alert("✅ Email de test envoyé à " + NOTIFICATION_EMAIL);
}

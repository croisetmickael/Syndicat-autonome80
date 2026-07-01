import { google } from "googleapis";

const sheets = google.sheets("v4");

async function getAuthClient() {
  const serviceAccountKey = JSON.parse(
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "{}"
  );

  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccountKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return auth.getClient();
}

async function getMembers() {
  try {
    const auth = await getAuthClient();
    const response = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Membres autorisés!A2:B",
    });

    const members = {};
    const rows = response.data.values || [];
    rows.forEach((row) => {
      if (row[0]) {
        members[row[0].toLowerCase()] = row[1] || "";
      }
    });

    return members;
  } catch (err) {
    console.error("Erreur lecture membres :", err);
    return {};
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { subject, message, isAnonymous, name, email, ticketNumber } =
    req.body;

  // Validation
  if (!subject || !message || !ticketNumber) {
    return res.status(400).json({ error: "Données manquantes" });
  }

  if (!isAnonymous && (!name || !email)) {
    return res.status(400).json({ error: "Nom et email requis" });
  }

  try {
    // Vérifier si l'email existe dans la liste des membres
    let verificationStatus = "Anonyme";
    if (!isAnonymous) {
      const members = await getMembers();
      if (members[email.toLowerCase()]) {
        verificationStatus = "Vérifié";
      } else {
        verificationStatus = "Non vérifié";
      }
    }

    // Préparer les données pour Google Sheets
    const auth = await getAuthClient();
    const now = new Date();
    const timestamp = now.toISOString().replace("T", " ").slice(0, 19);

    const values = [
      [
        ticketNumber,
        timestamp,
        subject,
        message,
        isAnonymous ? "" : name,
        isAnonymous ? "" : email,
        verificationStatus,
        "Reçu",
      ],
    ];

    // Écrire dans Google Sheets
    await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Messages!A:H",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      resource: { values },
    });

    return res.status(200).json({
      success: true,
      ticket: ticketNumber,
      message: "Message reçu avec succès",
    });
  } catch (err) {
    console.error("Erreur envoi message :", err);
    return res.status(500).json({
      error: "Erreur lors de l'enregistrement du message",
    });
  }
}

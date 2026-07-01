import { google } from "googleapis";

const sheets = google.sheets("v4");

async function getAuthClient() {
  const serviceAccountKey = JSON.parse(
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "{}"
  );

  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccountKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  return auth.getClient();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  const { code } = req.body;

  if (!code || !code.trim()) {
    return res.status(400).json({ error: "Code de suivi manquant" });
  }

  try {
    const auth = await getAuthClient();
    const response = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Messages!A2:H",
    });

    const rows = response.data.values || [];

    // Chercher la ligne avec le code de suivi
    for (const row of rows) {
      if (row[0] && row[0].toString().trim() === code.trim()) {
        // row[0] = code, row[1] = horodatage, row[7] = statut traitement
        return res.status(200).json({
          success: true,
          found: true,
          status: row[7] || "Reçu",
          date: row[1] ? row[1].slice(0, 10) : "",
        });
      }
    }

    // Code non trouvé
    return res.status(404).json({
      success: false,
      found: false,
    });
  } catch (err) {
    console.error("Erreur vérification statut :", err);
    return res.status(500).json({
      error: "Impossible de vérifier le statut",
    });
  }
}

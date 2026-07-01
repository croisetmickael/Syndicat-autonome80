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
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const auth = await getAuthClient();
    const response = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Documents!A2:C",
    });

    const documents = [];
    const rows = response.data.values || [];

    rows.forEach((row) => {
      if (row[0] && row[1] && row[2]) {
        // row[0] = titre, row[1] = lien, row[2] = type
        documents.push({
          titre: row[0],
          lien: row[1],
          type: row[2],
        });
      }
    });

    return res.status(200).json({
      success: true,
      documents,
    });
  } catch (err) {
    console.error("Erreur lecture documents :", err);
    return res.status(500).json({
      error: "Impossible de charger les documents",
      documents: [],
    });
  }
}

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
      range: "Présentation!A2:C2",
    });

    const rows = response.data.values || [];
    let presentation = null;

    if (rows.length > 0 && rows[0][0] && rows[0][1] && rows[0][2]) {
      // row[0] = type, row[1] = titre, row[2] = lien
      presentation = {
        type: rows[0][0],
        titre: rows[0][1],
        lien: rows[0][2],
      };
    }

    return res.status(200).json({
      success: true,
      presentation,
    });
  } catch (err) {
    console.error("Erreur lecture présentation :", err);
    return res.status(500).json({
      error: "Impossible de charger la présentation",
      presentation: null,
    });
  }
}

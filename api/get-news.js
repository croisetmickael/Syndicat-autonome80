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
      range: "Actualités!A2:B",
    });

    const news = [];
    const rows = response.data.values || [];

    rows.forEach((row) => {
      if (row[1]) {
        // row[0] = date, row[1] = texte
        news.push({
          date: row[0] || "",
          texte: row[1],
        });
      }
    });

    // Limiter à 10 actualités
    const limited = news.slice(0, 10);

    return res.status(200).json({
      success: true,
      news: limited,
    });
  } catch (err) {
    console.error("Erreur lecture actualités :", err);
    return res.status(500).json({
      error: "Impossible de charger les actualités",
      news: [],
    });
  }
}

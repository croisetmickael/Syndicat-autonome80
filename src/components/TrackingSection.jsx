import React, { useState } from "react";

export default function TrackingSection() {
  const [trackCode, setTrackCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleCheck() {
    if (!trackCode.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/check-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: trackCode.trim() }),
      });

      if (!res.ok) {
        setResult({
          found: false,
          message: "Aucun message trouvé avec ce code.",
        });
        return;
      }

      const data = await res.json();
      setResult({
        found: true,
        status: data.status,
        date: data.date,
      });
    } catch (err) {
      setResult({
        found: false,
        message: "Erreur lors de la vérification.",
      });
    } finally {
      setLoading(false);
    }
  }

  const statusEmoji = {
    Reçu: "📥",
    "En cours de traitement": "⚙️",
    Traité: "✅",
  };

  return (
    <div className="tracking-section">
      <h2 className="tracking-title">🔍 Suivi de votre message</h2>

      <div className="tracking-input-group">
        <input
          type="text"
          placeholder='Entrez votre code de suivi (ex: 20260701-1234)'
          value={trackCode}
          onChange={(e) => setTrackCode(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleCheck();
          }}
        />
        <button onClick={handleCheck} disabled={loading}>
          {loading ? "Vérification..." : "Vérifier"}
        </button>
      </div>

      {result && (
        <div
          className={`tracking-result ${result.found ? "found" : "not-found"}`}
        >
          <div className="tracking-result-label">Statut</div>
          {result.found ? (
            <>
              <div className="tracking-result-status">
                {statusEmoji[result.status] || "❓"} {result.status}
              </div>
              {result.date && (
                <p style={{ fontSize: "12px", color: "#666", marginTop: "8px" }}>
                  Reçu le {result.date}
                </p>
              )}
            </>
          ) : (
            <p style={{ color: "#c00000", marginBottom: 0 }}>
              {result.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

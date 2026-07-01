import React, { useState, useEffect } from "react";

export default function Presentation() {
  const [presentation, setPres] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPresentation();
  }, []);

  async function fetchPresentation() {
    try {
      const res = await fetch("/api/get-presentation");
      if (!res.ok) throw new Error("Impossible de charger la présentation");
      const data = await res.json();
      if (data.presentation) {
        setPres(data.presentation);
      }
    } catch (err) {
      console.error("Erreur présentation :", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading || !presentation) {
    return null;
  }

  const isVideo = presentation.type === "Vidéo";
  const isAudio = presentation.type === "Audio";
  const isYouTube = isVideo && presentation.lien.includes("youtube.com");

  return (
    <div className="presentation-section">
      <h2 className="presentation-title">🎬 {presentation.titre}</h2>
      <div className="presentation-content">
        {isYouTube && (
          <iframe
            width="100%"
            height="315"
            src={presentation.lien.replace(
              "watch?v=",
              "embed/"
            )}
            title={presentation.titre}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        {isVideo && !isYouTube && (
          <video width="100%" height="auto" controls>
            <source src={presentation.lien} type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo.
          </video>
        )}
        {isAudio && (
          <audio controls style={{ width: "100%", maxWidth: "400px" }}>
            <source src={presentation.lien} type="audio/mpeg" />
            Votre navigateur ne supporte pas l'audio.
          </audio>
        )}
      </div>
    </div>
  );
}

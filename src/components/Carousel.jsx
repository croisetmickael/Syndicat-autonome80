import React, { useState, useEffect } from "react";

export default function Carousel() {
  const [documents, setDocuments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  async function fetchDocuments() {
    try {
      const res = await fetch("/api/get-documents");
      if (!res.ok) throw new Error("Impossible de charger les documents");
      const data = await res.json();
      setDocuments(data.documents || []);
    } catch (err) {
      console.error("Erreur carrousel :", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading || documents.length === 0) {
    return null;
  }

  function goNext() {
    setCurrentIndex((prev) => (prev + 1) % documents.length);
  }

  function goPrev() {
    setCurrentIndex((prev) => (prev - 1 + documents.length) % documents.length);
  }

  function goToSlide(index) {
    setCurrentIndex(index);
  }

  const handleSwipe = (e) => {
    const touch = e.touches[0];
    const startX = touch.clientX;

    const handleTouchEnd = (e2) => {
      const endX = e2.changedTouches[0].clientX;
      if (startX - endX > 50) goNext();
      if (endX - startX > 50) goPrev();
    };

    document.addEventListener("touchend", handleTouchEnd, { once: true });
  };

  const doc = documents[currentIndex];
  const isImage = doc.type === "Image";
  const isPDF = doc.type === "PDF";

  return (
    <div className="carousel-section" onTouchStart={handleSwipe}>
      <h2 className="carousel-title">📚 Documents & Communication</h2>
      <div className="carousel">
        <div className="carousel-track">
          <div className="carousel-item">
            <h3 style={{ margin: "0 0 10px 0", color: "#1F3864" }}>
              {doc.titre}
            </h3>
            {isImage && <img src={doc.lien} alt={doc.titre} />}
            {isPDF && <div style={{ fontSize: 48, marginBottom: 15 }}>📄</div>}
            <a href={doc.lien} target="_blank" rel="noopener noreferrer">
              {isPDF ? "Ouvrir le PDF" : "Voir l'image"}
            </a>
          </div>
        </div>

        {documents.length > 1 && (
          <>
            <button
              className="carousel-btn prev"
              onClick={goPrev}
              aria-label="Précédent"
            >
              ◀
            </button>
            <button
              className="carousel-btn next"
              onClick={goNext}
              aria-label="Suivant"
            >
              ▶
            </button>
          </>
        )}

        {documents.length > 1 && (
          <div className="carousel-dots">
            {documents.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot ${i === currentIndex ? "active" : ""}`}
                onClick={() => goToSlide(i)}
                aria-label={`Aller au document ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

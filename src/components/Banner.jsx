import React, { useState, useEffect } from "react";

export default function Banner() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    try {
      const res = await fetch("/api/get-news");
      if (!res.ok) throw new Error("Impossible de charger les actualités");
      const data = await res.json();
      setNews(data.news || []);
    } catch (err) {
      console.error("Erreur bannière :", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading || news.length === 0) {
    return null;
  }

  const newsText = news.map((item) => item.texte).join(" • ");

  return (
    <div className="banner">
      <div className="banner-marquee">{newsText}</div>
    </div>
  );
}

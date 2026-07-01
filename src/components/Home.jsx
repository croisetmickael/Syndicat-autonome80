import React from "react";
import "./Home.css";

export default function Home({ onGoToSignaling }) {
  return (
    <div className="home-page">
      {/* Header */}
      <header className="home-header">
        <div className="header-container">
          <div className="logo">🚒 Syndicat Autonome SPP</div>
          <nav>
            <ul>
              <li><a href="#accueil">Accueil</a></li>
              <li><a href="#valeurs">À propos</a></li>
              <li><a href="#actions">Actions</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
          <button className="cta-btn" onClick={onGoToSignaling}>
            Adhérer
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="accueil">
        <h1>Pour la Défense de vos Droits</h1>
        <p>Une voix forte et indépendante au service des sapeurs-pompiers</p>
        <div className="hero-buttons">
          <button onClick={onGoToSignaling} className="btn btn-primary">
            Accéder à la Boîte
          </button>
          <a href="#valeurs" className="btn btn-secondary">
            En Savoir Plus
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Nos Engagements</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">⚖️</div>
              <h3>Défense Juridique</h3>
              <p>Accompagnement et représentation dans tous les différends professionnels et contentieux du travail.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Solidarité Syndicale</h3>
              <p>Entraide mutuelle entre membres et actions collectives pour améliorer les conditions de travail.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🗣️</div>
              <h3>Négociation</h3>
              <p>Participation active aux négociations d'entreprise pour de meilleures conventions collectives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="valeurs">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Qui Sommes-Nous ?</h2>
              <p>
                La Fédération Autonome des Sapeurs-Pompiers Professionnels (FA/SPP-PATS) est une organisation indépendante dédiée à la représentation et à la défense des droits des sapeurs-pompiers professionnels en France.
              </p>
              <p>
                Fondée sur les principes d'autonomie, de transparence et de démocratie interne, nous travaillons sans relâche pour garantir des conditions de travail justes et équitables.
              </p>
              <p>
                Notre force réside dans l'engagement de nos adhérents et notre capacité à adapter nos actions aux réalités locales.
              </p>
              <button onClick={onGoToSignaling} className="btn btn-primary" style={{ marginTop: "1rem" }}>
                Rejoignez-Nous
              </button>
            </div>
            <div className="about-image">
              🚒
            </div>
          </div>
        </div>
      </section>

      {/* Actions Section */}
      <section className="features" style={{ background: "white" }} id="actions">
        <div className="container">
          <h2 className="section-title">Nos Actions Récentes</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📢</div>
              <h3>Campagne de Sensibilisation</h3>
              <p>Mobilisation pour améliorer la santé et sécurité au travail dans les SDIS.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Formations & Ateliers</h3>
              <p>Sessions d'information régulières sur les droits des travailleurs et les recours disponibles.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>Partenariats Régionaux</h3>
              <p>Collaboration avec d'autres organisations pour une action syndicale plus efficace.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <h2 className="section-title" style={{ color: "white" }}>
            Nous Contacter
          </h2>
          <div className="contact-grid">
            <div className="contact-item">
              <h3>📍 Adresse</h3>
              <p>
                France<br />
                Sapeurs-Pompiers Professionnels
              </p>
            </div>
            <div className="contact-item">
              <h3>📞 Téléphone</h3>
              <p>
                <a href="tel:+33300000000">+33 3 00 00 00 00</a>
              </p>
              <p>
                Du lundi au vendredi<br />
                9h-17h
              </p>
            </div>
            <div className="contact-item">
              <h3>📧 Email</h3>
              <p>
                <a href="mailto:contact@syndicat-autonome-spp.fr">
                  contact@syndicat-autonome-spp.fr
                </a>
              </p>
              <p>Réponse sous 24h</p>
            </div>
          </div>

          <div style={{ marginTop: "3rem", maxWidth: "500px", marginLeft: "auto", marginRight: "auto" }}>
            <h3 style={{ marginBottom: "1.5rem" }}>Accédez à la Boîte de Signalement</h3>
            <p style={{ marginBottom: "1.5rem", textAlign: "center" }}>
              Transmettez vos messages au bureau syndical de manière sécurisée et confidentielle.
            </p>
            <button
              onClick={onGoToSignaling}
              className="btn btn-primary"
              style={{ width: "100%", padding: "1rem" }}
            >
              Aller à la Boîte de Signalement
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>
          &copy; 2024 Syndicat Autonome SPP. Tous droits réservés. |{" "}
          <a href="#" style={{ color: "#64b5f6" }}>
            Politique de Confidentialité
          </a>
        </p>
      </footer>
    </div>
  );
}

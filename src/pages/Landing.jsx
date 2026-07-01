import React from "react";
import "../styles/Landing.css";

export default function Landing({ onGoToApp }) {
  return (
    <div className="landing">
      {/* Header */}
      <header className="landing-header">
        <div className="landing-header-container">
          <div className="landing-logo">🚒 Syndicat Autonome SPP</div>
          <nav className="landing-nav">
            <ul>
              <li><a href="#accueil">Accueil</a></li>
              <li><a href="#valeurs">À propos</a></li>
              <li><a href="#actions">Actions</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
          <button className="landing-cta-btn" onClick={onGoToApp}>
            Boîte de Signalement
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="landing-hero" id="accueil">
        <h1>Pour la Défense de vos Droits</h1>
        <p>Une voix forte et indépendante au service des sapeurs-pompiers professionnels</p>
        <div className="landing-hero-buttons">
          <button onClick={onGoToApp} className="landing-btn landing-btn-primary">
            Envoyer un Message
          </button>
          <a href="#valeurs" className="landing-btn landing-btn-secondary">
            En Savoir Plus
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-features">
        <div className="landing-container">
          <h2 className="landing-section-title">Nos Engagements</h2>
          <div className="landing-features-grid">
            <div className="landing-feature-card">
              <div className="landing-feature-icon">⚖️</div>
              <h3>Défense Juridique</h3>
              <p>Accompagnement et représentation dans tous les différends professionnels et contentieux du travail.</p>
            </div>
            <div className="landing-feature-card">
              <div className="landing-feature-icon">🤝</div>
              <h3>Solidarité Syndicale</h3>
              <p>Entraide mutuelle entre membres et actions collectives pour améliorer les conditions de travail.</p>
            </div>
            <div className="landing-feature-card">
              <div className="landing-feature-icon">🗣️</div>
              <h3>Négociation</h3>
              <p>Participation active aux négociations d'entreprise pour de meilleures conventions collectives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="landing-about" id="valeurs">
        <div className="landing-container">
          <div className="landing-about-content">
            <div className="landing-about-text">
              <h2>Qui Sommes-Nous ?</h2>
              <p>Le Syndicat Autonome des Sapeurs-Pompiers Professionnels (SPP) est une organisation indépendante et apolitique dédiée à la représentation et à la défense des droits des sapeurs-pompiers.</p>
              <p>Première force syndicale des SDIS de France, nous regroupons plus de 6 000 adhérents aux valeurs autonomes depuis plus de 20 ans.</p>
              <p>Fondée sur les principes d'autonomie, de transparence et de démocratie interne, nous travaillons sans relâche pour garantir des conditions de travail justes et équitables.</p>
              <button onClick={onGoToApp} className="landing-btn landing-btn-primary" style={{ marginTop: "1rem" }}>
                Rejoignez-Nous
              </button>
            </div>
            <div className="landing-about-image">
              🚒
            </div>
          </div>
        </div>
      </section>

      {/* Actions Section */}
      <section className="landing-actions" id="actions">
        <div className="landing-container">
          <h2 className="landing-section-title">Nos Actions Récentes</h2>
          <div className="landing-features-grid">
            <div className="landing-feature-card">
              <div className="landing-feature-icon">📢</div>
              <h3>Campagne de Sensibilisation</h3>
              <p>Mobilisation pour améliorer la santé et sécurité au travail dans les services de secours.</p>
            </div>
            <div className="landing-feature-card">
              <div className="landing-feature-icon">📚</div>
              <h3>Formations & Ateliers</h3>
              <p>Sessions d'information régulières sur les droits des travailleurs et les recours disponibles.</p>
            </div>
            <div className="landing-feature-card">
              <div className="landing-feature-icon">🌍</div>
              <h3>Partenariats Régionaux</h3>
              <p>Collaboration avec d'autres organisations pour une action syndicale plus efficace.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="landing-contact" id="contact">
        <div className="landing-container">
          <h2 className="landing-section-title" style={{ color: "white" }}>
            Nous Contacter
          </h2>
          <div className="landing-contact-grid">
            <div className="landing-contact-item">
              <h3>📍 Adresse</h3>
              <p>France<br/>Représentation nationale</p>
            </div>
            <div className="landing-contact-item">
              <h3>📞 Téléphone</h3>
              <p>Du lundi au vendredi<br/>9h-17h</p>
            </div>
            <div className="landing-contact-item">
              <h3>📧 Email</h3>
              <p><a href="mailto:contact@spp-autonome.fr">contact@spp-autonome.fr</a></p>
              <p>Réponse sous 24h</p>
            </div>
          </div>

          <div className="landing-contact-form-wrapper">
            <h3 style={{ marginBottom: "1.5rem" }}>Envoyez-nous un Message</h3>
            <button 
              onClick={onGoToApp}
              className="landing-btn landing-btn-primary"
              style={{ width: "100%" }}
            >
              Accéder à la Boîte de Signalement
            </button>
            <p style={{ textAlign: "center", marginTop: "1rem", opacity: 0.8 }}>
              Transmettez vos messages au bureau syndical de manière sécurisée et confidentielle
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>&copy; 2024 Syndicat Autonome SPP. Tous droits réservés. | Autonome • Indépendant • Apolitique</p>
      </footer>
    </div>
  );
}

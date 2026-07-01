import React, { useState } from "react";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import Presentation from "./components/Presentation";
import TrackingSection from "./components/TrackingSection";

function makeTicketNumber() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const stamp = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `${stamp}-${rand}`;
}

export default function App() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [ticket, setTicket] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const canSubmit =
    subject.trim().length > 0 &&
    message.trim().length > 0 &&
    (isAnonymous || (name.trim().length > 0 && email.trim().length > 0));

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit || status === "sending") return;
    setStatus("sending");
    setErrorMsg("");

    const ticketNumber = makeTicketNumber();

    try {
      const res = await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: subject.trim(),
          message: message.trim(),
          isAnonymous,
          name: isAnonymous ? "" : name.trim(),
          email: isAnonymous ? "" : email.trim(),
          ticketNumber,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Échec de l'envoi.");
      }

      setTicket(ticketNumber);
      setStatus("sent");
    } catch (err) {
      setErrorMsg(err.message || "Une erreur est survenue.");
      setStatus("error");
    }
  }

  function resetForm() {
    setSubject("");
    setMessage("");
    setName("");
    setEmail("");
    setIsAnonymous(false);
    setStatus("idle");
    setTicket(null);
    setErrorMsg("");
  }

  return (
    <div className="page">
      <Banner />

      <header className="masthead">
        <span className="masthead-eyebrow">🚒 Syndicat Autonome SPP</span>
        <h1 className="masthead-title">Boîte de Signalement</h1>
        <p className="masthead-sub">
          Transmettez vos messages au bureau syndical de manière sécurisée et confidentielle.
        </p>
      </header>

      <Carousel />
      <Presentation />

      {status === "sent" ? (
        <div className="stub-wrap">
          <div className="stub">
            <div className="stub-top">
              <span className="stub-label">Accusé de dépôt</span>
              <span className="stub-stamp">Reçu ✓</span>
            </div>
            <div className="stub-number">N° {ticket}</div>
            <div className="stub-line" />
            <p className="stub-text">
              Votre message a bien été transmis au bureau syndical.
              {isAnonymous ? " Il a été envoyé en anonyme." : ""}
            </p>
            <p className="stub-text" style={{ fontSize: "12px", color: "#666" }}>
              Conservez ce code pour suivre votre message dans la section
              "Suivi" ci-dessous.
            </p>
            <button className="btn btn-ghost" onClick={resetForm}>
              Envoyer un autre message
            </button>
          </div>
        </div>
      ) : (
        <form className="card" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="subject">Sujet</label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Ex : Problème d'organisation, question sur..."
              maxLength={120}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Décrivez votre message ici..."
              rows={7}
              required
            />
          </div>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
            />
            <span>Envoyer ce message en anonyme</span>
          </label>

          {!isAnonymous && (
            <div className="signature-block">
              <div className="field">
                <label htmlFor="name">Nom</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Votre nom"
                  required={!isAnonymous}
                />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@exemple.fr"
                  required={!isAnonymous}
                />
              </div>
              <p className="hint">
                Doit correspondre à un email de la liste des adhérents.
              </p>
            </div>
          )}

          {status === "error" && <p className="error-text">{errorMsg}</p>}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={!canSubmit || status === "sending"}
          >
            {status === "sending" ? "Envoi en cours..." : "Envoyer le message"}
          </button>
        </form>
      )}

      <TrackingSection />
    </div>
  );
}

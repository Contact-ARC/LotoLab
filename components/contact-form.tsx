"use client";

import { useState } from "react";
import { RoundArrow } from "@/components/round-arrow";
import { href, type Lang } from "@/lib/i18n";

const copy = {
  es: {
    thanks: "¡Gracias! Hemos recibido tu mensaje y te responderemos pronto.",
    name: "Nombre",
    email: "Email",
    message: "¿Qué tienes en mente?",
    type: "Tipo de conversación",
    types: { Proyecto: "Proyecto", "Colaboración": "Colaboración", "Una idea": "Una idea" },
    accept: "He leído y acepto la",
    policy: "política de privacidad",
    controller: "Responsable:",
    purpose: "Finalidad:",
    purposeText: "atender tu consulta y mantener la comunicación contigo.",
    basis: "Legitimación:",
    basisText: "tu consentimiento y la aplicación de medidas precontractuales.",
    recipients: "Destinatarios:",
    recipientsText: "no se cederán datos a terceros, salvo obligación legal.",
    rights: "Derechos:",
    rightsText: "acceso, rectificación, supresión y demás derechos, en estudio@thelotolab.es.",
    more: "Más información en la",
    sending: "Enviando…",
    submit: "Empezamos",
    error: "No se pudo enviar. Inténtalo de nuevo o escríbenos a estudio@thelotolab.es.",
    rate: "Demasiados envíos seguidos. Espera unos minutos e inténtalo de nuevo.",
  },
  en: {
    thanks: "Thank you! We've received your message and will get back to you soon.",
    name: "Name",
    email: "Email",
    message: "What do you have in mind?",
    type: "Type of conversation",
    types: { Proyecto: "Project", "Colaboración": "Collaboration", "Una idea": "An idea" },
    accept: "I have read and accept the",
    policy: "privacy policy",
    controller: "Data controller:",
    purpose: "Purpose:",
    purposeText: "to answer your enquiry and keep in touch with you about it.",
    basis: "Legal basis:",
    basisText: "your consent and steps taken at your request prior to entering into a contract.",
    recipients: "Recipients:",
    recipientsText: "your data will not be disclosed to third parties unless required by law.",
    rights: "Rights:",
    rightsText: "access, rectification, erasure and your other rights, at estudio@thelotolab.es.",
    more: "More information in the",
    sending: "Sending…",
    submit: "Let's begin",
    error: "Your message couldn't be sent. Please try again or write to us at estudio@thelotolab.es.",
    rate: "Too many messages in a row. Please wait a few minutes and try again.",
  },
} as const;

// The values stay in Spanish because contact.php validates them; only the labels change.
const typeValues = ["Proyecto", "Colaboración", "Una idea"] as const;

type Status = "idle" | "sending" | "ok" | "error" | "rate";

export function ContactForm({ lang = "es" }: { lang?: Lang }) {
  const [status, setStatus] = useState<Status>("idle");
  const t = copy[lang];
  const policyHref = href("privacy", lang);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    try {
      const res = await fetch("/contact.php", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      const json = await res.json().catch(() => ({ success: false }));
      if (res.ok && json.success) {
        setStatus("ok");
        form.reset();
      } else if (res.status === 429) {
        setStatus("rate");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="contact-form contact-form-success" role="status">
        <p>{t.thanks}</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
      <input type="hidden" name="idioma" value={lang} />
      <label>
        <span>{t.name}</span>
        <input name="nombre" type="text" autoComplete="name" maxLength={100} required />
      </label>
      <label>
        <span>{t.email}</span>
        <input name="email" type="email" autoComplete="email" maxLength={150} required />
      </label>
      <label className="contact-message">
        <span>{t.message}</span>
        <textarea name="mensaje" rows={3} maxLength={5000} required />
      </label>
      <label className="contact-select">
        <span>{t.type}</span>
        <select name="tipo" defaultValue="Proyecto">
          {typeValues.map((value) => (
            <option key={value} value={value}>{t.types[value]}</option>
          ))}
        </select>
      </label>
      <div className="contact-consent">
        <label className="contact-consent-check">
          <input type="checkbox" name="privacidad" value="1" required />
          <span>
            {t.accept}{" "}
            <a href={policyHref} target="_blank" rel="noopener">{t.policy}</a>.
          </span>
        </label>
        <p className="contact-consent-info">
          <strong>{t.controller}</strong> The Loto Lab S.L.{" "}
          <strong>{t.purpose}</strong> {t.purposeText}{" "}
          <strong>{t.basis}</strong> {t.basisText}{" "}
          <strong>{t.recipients}</strong> {t.recipientsText}{" "}
          <strong>{t.rights}</strong> {t.rightsText}{" "}
          {t.more} <a href={policyHref}>{t.policy}</a>.
        </p>
      </div>
      <button className="contact-submit" type="submit" disabled={status === "sending"}>
        <span>{status === "sending" ? t.sending : t.submit}</span>
        <RoundArrow className="contact-submit-arrow" />
      </button>
      {status === "error" && (
        <p className="contact-form-error" role="alert">
          {t.error}
        </p>
      )}
      {status === "rate" && (
        <p className="contact-form-error" role="alert">
          {t.rate}
        </p>
      )}
    </form>
  );
}

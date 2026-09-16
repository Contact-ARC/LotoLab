"use client";

import { useState } from "react";
import { RoundArrow } from "@/components/round-arrow";

type Status = "idle" | "sending" | "ok" | "error" | "rate";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

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
        <p>¡Gracias! Hemos recibido tu mensaje y te responderemos pronto.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
      <label>
        <span>Nombre</span>
        <input name="nombre" type="text" autoComplete="name" maxLength={100} required />
      </label>
      <label>
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" maxLength={150} required />
      </label>
      <label className="contact-message">
        <span>¿Qué tienes en mente?</span>
        <textarea name="mensaje" rows={3} maxLength={5000} required />
      </label>
      <label className="contact-select">
        <span>Tipo de conversación</span>
        <select name="tipo" defaultValue="Proyecto">
          <option>Proyecto</option>
          <option>Colaboración</option>
          <option>Una idea</option>
        </select>
      </label>
      <button className="contact-submit" type="submit" disabled={status === "sending"}>
        <span>{status === "sending" ? "Enviando…" : "Empezamos"}</span>
        <RoundArrow className="contact-submit-arrow" />
      </button>
      {status === "error" && (
        <p className="contact-form-error" role="alert">
          No se pudo enviar. Inténtalo de nuevo o escríbenos a estudio@thelotolab.es.
        </p>
      )}
      {status === "rate" && (
        <p className="contact-form-error" role="alert">
          Demasiados envíos seguidos. Espera unos minutos e inténtalo de nuevo.
        </p>
      )}
    </form>
  );
}

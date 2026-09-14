import type { Metadata } from "next";
import { RoundArrow } from "@/components/round-arrow";
import { SecondaryHeader } from "@/components/secondary-header";

export const metadata: Metadata = {
  title: "Contacto — The Loto Lab",
  description: "Cuéntanos qué tienes entre manos. Hablemos de tu próximo proyecto.",
};

export default function ContactPage() {
  return (
    <main className="contact-page">
      <SecondaryHeader current="contacto" negative />

      <section className="contact-intro contact-reveal" aria-labelledby="contact-title">
        <h1 id="contact-title">Cuéntanos qué tienes entre manos.</h1>
        <div className="contact-intro-copy">
          <p>Una idea, un local, una reforma, una intuición o algo que todavía no sabes cómo llamar. Empecemos por ahí.</p>
        </div>
      </section>

      <section className="contact-content contact-reveal" aria-label="Formulario y datos de contacto">
        <form className="contact-form" action="mailto:estudio@thelotolab.es" method="post" encType="text/plain">
          <label>
            <span>Nombre</span>
            <input name="nombre" type="text" autoComplete="name" required />
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label className="contact-message">
            <span>¿Qué tienes en mente?</span>
            <textarea name="mensaje" rows={3} required />
          </label>
          <label className="contact-select">
            <span>Tipo de conversación</span>
            <select name="tipo" defaultValue="Proyecto">
              <option>Proyecto</option>
              <option>Colaboración</option>
              <option>Una idea</option>
            </select>
          </label>
          <button className="contact-submit" type="submit">
            <span>Empezamos</span>
            <RoundArrow className="contact-submit-arrow" />
          </button>
        </form>

        <aside className="contact-details">
          <div>
            <span>Escríbenos</span>
            <a href="mailto:estudio@thelotolab.es">estudio@thelotolab.es</a>
          </div>
          <div>
            <span>Llámanos</span>
            <a href="tel:+34637718591">+34 637 718 591</a>
            <a href="tel:+34650922945">+34 650 922 945</a>
          </div>
          <address>
            <span>Estudio</span>
            <p>Av. Leonardo da Vinci 2A<br />Getafe · Madrid · España</p>
            <small>40.2905° N · 3.7030° W</small>
          </address>
          <nav className="contact-social" aria-label="Redes sociales próximamente">
            <a href="https://www.instagram.com/thelotolab?igsi=Nno3OGcyaW50aG83&amp;utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram de The Loto Lab">
              <img src="/recursos/instagram.svg" alt="" />
            </a>
            <a href="#" aria-disabled="true" tabIndex={-1} aria-label="LinkedIn, próximamente">
              <img src="/recursos/linkedin.svg" alt="" />
            </a>
          </nav>
        </aside>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { SecondaryHeader } from "@/components/secondary-header";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Cuéntanos qué tienes entre manos. Hablemos de tu próximo proyecto con The Loto Lab.",
  alternates: { canonical: "/contacto" },
};

export default function ContactPage() {
  return (
    <main className="contact-page">
      <SecondaryHeader current="contacto" negative />

      <section className="contact-intro contact-reveal" aria-labelledby="contact-title">
        <h1 id="contact-title">Cuéntanos qué tienes entre manos</h1>
        <div className="contact-intro-copy">
          <p>Una idea, un local, una reforma, una intuición o algo que todavía no sabes cómo llamar. Empecemos por ahí.</p>
        </div>
      </section>

      <section className="contact-content contact-reveal" aria-label="Formulario y datos de contacto">
        <ContactForm />

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

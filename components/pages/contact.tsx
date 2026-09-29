import { ContactForm } from "@/components/contact-form";
import { SecondaryHeader } from "@/components/secondary-header";
import type { Lang } from "@/lib/i18n";

const copy = {
  es: {
    title: "Cuéntanos qué tienes entre manos",
    intro: "Una idea, un local, una reforma, una intuición o algo que todavía no sabes cómo llamar. Empecemos por ahí.",
    section: "Formulario y datos de contacto",
    write: "Escríbenos",
    call: "Llámanos",
    studio: "Estudio",
    country: "España",
    social: "Redes sociales",
    instagram: "Instagram de The Loto Lab",
    linkedin: "LinkedIn, próximamente",
  },
  en: {
    title: "Tell us what you have in mind",
    intro: "An idea, a venue, a refurbishment, a hunch or something you don't yet know what to call. Let's start there.",
    section: "Contact form and details",
    write: "Write to us",
    call: "Call us",
    studio: "Studio",
    country: "Spain",
    social: "Social media",
    instagram: "The Loto Lab on Instagram",
    linkedin: "LinkedIn, coming soon",
  },
} as const;

export function ContactPage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <main className="contact-page">
      <SecondaryHeader lang={lang} page="contact" negative />

      <section className="contact-intro contact-reveal" aria-labelledby="contact-title">
        <h1 id="contact-title">{t.title}</h1>
        <div className="contact-intro-copy">
          <p>{t.intro}</p>
        </div>
      </section>

      <section className="contact-content contact-reveal" aria-label={t.section}>
        <ContactForm lang={lang} />

        <aside className="contact-details">
          <div>
            <span>{t.write}</span>
            <a href="mailto:estudio@thelotolab.es">estudio@thelotolab.es</a>
          </div>
          <div>
            <span>{t.call}</span>
            <a href="tel:+34637718591">+34 637 718 591</a>
            <a href="tel:+34650922945">+34 650 922 945</a>
          </div>
          <address>
            <span>{t.studio}</span>
            <p>Av. Leonardo da Vinci 2A<br />Getafe · Madrid · {t.country}</p>
            <small>40.2905° N · 3.7030° W</small>
          </address>
          <nav className="contact-social" aria-label={t.social}>
            <a href="https://www.instagram.com/thelotolab?igsi=Nno3OGcyaW50aG83&amp;utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label={t.instagram}>
              <img src="/recursos/instagram.svg" alt="" />
            </a>
            <a href="#" aria-disabled="true" tabIndex={-1} aria-label={t.linkedin}>
              <img src="/recursos/linkedin.svg" alt="" />
            </a>
          </nav>
        </aside>
      </section>
    </main>
  );
}

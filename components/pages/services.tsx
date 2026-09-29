"use client";

import { useEffect } from "react";
import { RoundArrow } from "@/components/round-arrow";
import { SecondaryHeader } from "@/components/secondary-header";
import { href, type Lang } from "@/lib/i18n";

type Family = { number: string; title: string; services: [string, string][] };

const families: Record<Lang, Family[]> = {
  es: [
    {
      number: "01",
      title: "Imaginamos",
      services: [
        ["Concepto", "Convertimos una idea inicial en una dirección clara para el proyecto: qué debe transmitir, cómo debe sentirse y qué experiencia queremos construir."],
        ["Estrategia espacial", "Analizamos programa, recorridos, usos y oportunidades para encontrar una organización coherente, eficiente y con personalidad."],
        ["Identidad", "Trabajamos materiales, atmósfera, lenguaje visual y decisiones espaciales para que cada proyecto tenga carácter propio y sea reconocible."],
        ["Dirección creativa", "Definimos el hilo conductor del proyecto para que arquitectura, interiorismo, mobiliario, iluminación y gráfica hablen el mismo idioma."],
      ],
    },
    {
      number: "02",
      title: "Proyectamos",
      services: [
        ["Arquitectura", "Desarrollamos proyectos de arquitectura desde las primeras decisiones hasta la definición técnica necesaria para construir."],
        ["Interiorismo", "Diseñamos espacios donde distribución, materiales, iluminación y detalle trabajan juntos para crear una experiencia completa."],
        ["Diseño de detalle", "Resolvemos encuentros, elementos singulares, mobiliario a medida y soluciones específicas que elevan el conjunto."],
        ["Proyecto técnico", "Transformamos el concepto en documentación precisa, coordinada y construible, adaptada a cada escala y tipo de intervención."],
      ],
    },
    {
      number: "03",
      title: "Hacemos posible",
      services: [
        ["Licencias y trámites", "Gestionamos y desarrollamos la documentación necesaria para licencias, actividad, implantaciones y otros procedimientos administrativos."],
        ["CEE · ITE · Informes", "Realizamos certificados energéticos, ITE y otros documentos técnicos necesarios para edificios, locales y actuaciones concretas."],
        ["Estructuras y viabilidad", "Estudiamos soluciones técnicas, cálculos estructurales y condicionantes previos para comprobar que cada propuesta pueda ejecutarse con criterio."],
        ["Seguridad y coordinación", "Asumimos trabajos de coordinación de seguridad y salud y otras funciones técnicas vinculadas al desarrollo y ejecución de obra."],
      ],
    },
    {
      number: "04",
      title: "Construimos",
      services: [
        ["Dirección de obra", "Acompañamos la ejecución para que lo proyectado llegue a obra con fidelidad, control y criterio."],
        ["Seguimiento", "Supervisamos avances, decisiones, incidencias y ajustes para mantener el proyecto alineado durante todo el proceso."],
        ["Coordinación de industriales", "Ordenamos oficios, proveedores y equipos para que arquitectura, instalaciones y acabados funcionen como un único sistema."],
        ["Puesta en marcha", "Cuidamos la recta final: remates, revisiones, ajustes y entrega para que el espacio llegue completo y listo para funcionar."],
      ],
    },
  ],
  en: [
    {
      number: "01",
      title: "We imagine",
      services: [
        ["Concept", "We turn an initial idea into a clear direction for the project: what it should convey, how it should feel and what experience we want to build."],
        ["Spatial strategy", "We analyse the brief, circulation, uses and opportunities to find a layout that is coherent, efficient and full of personality."],
        ["Identity", "We work with materials, atmosphere, visual language and spatial decisions so that every project has a character of its own and is instantly recognisable."],
        ["Creative direction", "We define the common thread of the project so that architecture, interiors, furniture, lighting and graphics all speak the same language."],
      ],
    },
    {
      number: "02",
      title: "We design",
      services: [
        ["Architecture", "We develop architecture projects from the very first decisions to the technical definition needed to build them."],
        ["Interior design", "We design spaces where layout, materials, lighting and detail work together to create a complete experience."],
        ["Detail design", "We resolve junctions, singular elements, bespoke furniture and specific solutions that elevate the whole."],
        ["Technical design", "We turn the concept into precise, coordinated and buildable documentation, adapted to every scale and type of intervention."],
      ],
    },
    {
      number: "03",
      title: "We make it happen",
      services: [
        ["Permits and procedures", "We prepare and manage the documentation required for building and activity permits, fit-outs and other administrative procedures."],
        ["EPC · ITE · Reports", "We produce energy performance certificates, building inspection reports (ITE) and other technical documents for buildings, premises and specific works."],
        ["Structures and feasibility", "We study technical solutions, structural calculations and early constraints to make sure every proposal can be built with sound judgement."],
        ["Safety and coordination", "We take on health and safety coordination and other technical roles linked to the development and execution of the works."],
      ],
    },
    {
      number: "04",
      title: "We build",
      services: [
        ["Site management", "We accompany construction so that what was designed reaches the site with fidelity, control and judgement."],
        ["Monitoring", "We oversee progress, decisions, issues and adjustments to keep the project on track throughout the whole process."],
        ["Trade coordination", "We organise trades, suppliers and teams so that architecture, building services and finishes work as a single system."],
        ["Handover", "We take care of the final stretch: finishing touches, reviews, adjustments and handover, so the space is delivered complete and ready to open."],
      ],
    },
  ],
};

const copy = {
  es: {
    kicker: "Servicios",
    title: "De la primera intuición al espacio construido",
    intro: "Trabajamos en proyectos por toda España, adaptándonos a cada contexto, escala y fase del proceso.",
    familiesNav: "Familias de servicios",
    cta: "¿Qué tienes entre manos?",
  },
  en: {
    kicker: "Services",
    title: "From the first intuition to the built space",
    intro: "We work on projects all over Spain, adapting to every context, scale and stage of the process.",
    familiesNav: "Service groups",
    cta: "What do you have in mind?",
  },
} as const;

export function ServicesPage({ lang }: { lang: Lang }) {
  const t = copy[lang];

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-service-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const scrollToFamily = (num: string) => {
    const el = document.getElementById(`familia-${num}`);
    if (!el) return;
    const header = document.querySelector(".site-header");
    const offset = (header ? header.getBoundingClientRect().height : 90) + 16;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <main className="services-page">
      <SecondaryHeader lang={lang} page="services" />

      <header className="services-intro" data-service-reveal>
        <span>{t.kicker}</span>
        <h1>{t.title}</h1>
        <p>{t.intro}</p>
      </header>

      <nav className="services-family-nav" aria-label={t.familiesNav} data-service-reveal>
        <span className="services-family-line" aria-hidden="true" />
        {families[lang].map((family) => (
          <a
            key={family.number}
            role="button"
            tabIndex={0}
            style={{ cursor: "pointer" }}
            onClick={() => scrollToFamily(family.number)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); scrollToFamily(family.number); } }}
          >
            <span>{family.number}</span>
            <strong>{family.title}</strong>
          </a>
        ))}
      </nav>

      <div className="services-families">
        {families[lang].map((family) => (
          <section className="service-family" id={`familia-${family.number}`} key={family.number} data-service-reveal>
            <header>
              <span>{family.number}</span>
              <h2>{family.title}</h2>
            </header>
            <div className="service-items">
              {family.services.map(([title, description]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="services-contact-cta" data-service-reveal>
        <a href={href("contact", lang)}>
          <span className="services-cta-copy">{t.cta}</span>
          <RoundArrow className="services-cta-arrow" />
        </a>
      </section>
    </main>
  );
}

"use client";

import { useEffect } from "react";
import { RoundArrow } from "@/components/round-arrow";
import { SecondaryHeader } from "@/components/secondary-header";

const families = [
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
];

export default function ServicesPage() {
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
      <SecondaryHeader current="servicios" />

      <header className="services-intro" data-service-reveal>
        <span>Servicios</span>
        <h1>De la primera intuición al espacio construido.</h1>
        <p>Trabajamos en proyectos por toda España, adaptándonos a cada contexto, escala y fase del proceso.</p>
      </header>

      <nav className="services-family-nav" aria-label="Familias de servicios" data-service-reveal>
        <span className="services-family-line" aria-hidden="true" />
        {families.map((family) => (
          
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
        {families.map((family) => (
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
        <a href="/contacto">
          <span className="services-cta-copy">¿Qué tienes entre manos?</span>
          <RoundArrow className="services-cta-arrow" />
        </a>
      </section>
    </main>
  );
}

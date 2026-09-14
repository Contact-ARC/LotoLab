"use client";

import { useEffect } from "react";
import { RoundArrow } from "@/components/round-arrow";
import { SecondaryHeader } from "@/components/secondary-header";

const people = [
  {
    number: "01",
    shortName: "Andrea",
    name: "Andrea Torres Íñiguez",
    profession: "Arquitecta y artista",
    className: "is-andrea",
    paragraphs: [
      "Arquitecta y graduada en Bellas Artes, combina sensibilidad estética, rigor técnico y una especial atención a la materialidad y al detalle.",
      "Ha trabajado en estudios como A-cero y en proyectos de arquitectura corporativa, residencial de alta gama, construcción y dirección de obra, coordinando equipos y procesos desde el proyecto hasta la ejecución.",
      "Su mirada entiende la arquitectura desde lo tangible: materiales, acabados, proporciones y pequeños gestos capaces de convertir un espacio bien resuelto en un lugar con identidad.",
      "Su experiencia incluye también colaboraciones en proyectos sociales y educativos en Kenia, incorporando una dimensión humana a su forma de entender la arquitectura.",
    ],
  },
  {
    number: "02",
    shortName: "Jesús",
    name: "Jesús López de los Mozos",
    profession: "Arquitecto y diseñador industrial",
    className: "is-jesus",
    paragraphs: [
      "Formado en arquitectura, diseño industrial y fabricación digital, combina una mirada creativa y estratégica con una fuerte base técnica.",
      "Su trayectoria cruza diseño, arquitectura, docencia y eficiencia energética, con experiencia en universidades como UDIT, UEM e IED y en labores de coordinación académica.",
      "Le interesa especialmente conectar ideas aparentemente alejadas, traducir problemas complejos en soluciones claras y construir una visión global del proyecto donde concepto, técnica y experiencia funcionen como una sola cosa.",
    ],
  },
];

export default function StudioPage() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-studio-reveal]");
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

  return (
    <main className="studio-page">
      <SecondaryHeader current="estudio" />

      <header className="studio-intro" data-studio-reveal>
        <span>Estudio</span>
        <h1>Las personas detrás del estudio.</h1>
        <div className="studio-intro-copy">
          <p>The Loto Lab nace de la unión entre arquitectura, diseño y arte. Un estudio donde técnica y creatividad conviven para dar forma a espacios con identidad, intención y carácter.</p>
          <p>Detrás están Jesús López de los Mozos y Andrea Torres Íñiguez, dos perfiles complementarios que entienden la arquitectura no solo como construcción, sino como una herramienta capaz de transformar la forma en que las personas viven, trabajan y se relacionan con los espacios.</p>
        </div>
      </header>

      <div className="studio-people">
        {people.map((person) => (
          <section className={`studio-person ${person.className}`} key={person.number}>
            {/* Sustituir este placeholder por la fotografía de la persona manteniendo la clase studio-portrait. */}
            <div className="studio-portrait" role="img" aria-label={`Fotografía de ${person.name}, pendiente`} data-studio-reveal>
              <span>Fotografía pendiente</span>
            </div>
            <div className="studio-person-copy" data-studio-reveal>
              <span className="studio-person-number">{person.number} · {person.shortName}</span>
              <h2>{person.name}</h2>
              <p className="studio-profession">{person.profession}</p>
              <div className="studio-bio">
                {person.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="studio-closing" data-studio-reveal>
        <p>Dos miradas.<br />Un mismo proyecto.</p>
        <a href="/contacto">
          <span>¿Qué tienes entre manos?</span>
          <RoundArrow className="studio-cta-arrow" />
        </a>
      </section>
    </main>
  );
}

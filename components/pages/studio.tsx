"use client";

import { useEffect } from "react";
import { RoundArrow } from "@/components/round-arrow";
import { SecondaryHeader } from "@/components/secondary-header";
import { href, type Lang } from "@/lib/i18n";

const people = [
  {
    number: "01",
    shortName: "Andrea",
    name: "Andrea Torres Íñiguez",
    className: "is-andrea",
    image: "/andrea.webp",
    profession: { es: "Arquitecta y artista", en: "Architect and artist" },
    paragraphs: {
      es: [
        "Arquitecta y graduada en Bellas Artes, combina sensibilidad estética, rigor técnico y una especial atención a la materialidad y al detalle.",
        "Ha trabajado en estudios como A-cero y en proyectos de arquitectura corporativa, residencial de alta gama, construcción y dirección de obra, coordinando equipos y procesos desde el proyecto hasta la ejecución.",
        "Su mirada entiende la arquitectura desde lo tangible: materiales, acabados, proporciones y pequeños gestos capaces de convertir un espacio bien resuelto en un lugar con identidad.",
        "Su experiencia incluye también colaboraciones en proyectos sociales y educativos en Kenia, incorporando una dimensión humana a su forma de entender la arquitectura.",
      ],
      en: [
        "An architect with a degree in Fine Arts, she combines aesthetic sensitivity, technical rigour and a particular attention to materiality and detail.",
        "She has worked at studios such as A-cero and on corporate architecture, high-end residential, construction and site management projects, coordinating teams and processes from design through to execution.",
        "She approaches architecture through the tangible: materials, finishes, proportions and the small gestures that turn a well-resolved space into a place with identity.",
        "Her experience also includes social and educational projects in Kenya, which bring a human dimension to the way she understands architecture.",
      ],
    },
  },
  {
    number: "02",
    shortName: "Jesús",
    name: "Jesús López de los Mozos",
    className: "is-jesus",
    image: "/jesus.webp",
    profession: { es: "Arquitecto y diseñador industrial", en: "Architect and industrial designer" },
    paragraphs: {
      es: [
        "Formado en arquitectura, diseño industrial y fabricación digital, combina una mirada creativa y estratégica con una fuerte base técnica.",
        "Su trayectoria cruza diseño, arquitectura, docencia y eficiencia energética, con experiencia en universidades como UDIT, UEM e IED y en labores de coordinación académica.",
        "Le interesa especialmente conectar ideas aparentemente alejadas, traducir problemas complejos en soluciones claras y construir una visión global del proyecto donde concepto, técnica y experiencia funcionen como una sola cosa.",
      ],
      en: [
        "Trained in architecture, industrial design and digital fabrication, he combines a creative, strategic outlook with a strong technical foundation.",
        "His career spans design, architecture, teaching and energy efficiency, with experience at universities such as UDIT, UEM and IED and in academic coordination roles.",
        "He is especially interested in connecting seemingly distant ideas, turning complex problems into clear solutions and building an overall vision of the project in which concept, technique and experience work as one.",
      ],
    },
  },
];

const copy = {
  es: {
    kicker: "Estudio",
    title: "Las personas detrás del estudio",
    intro: [
      "The Loto Lab nace de la unión entre arquitectura, diseño y arte. Un estudio donde técnica y creatividad conviven para dar forma a espacios con identidad, intención y carácter.",
      "Detrás están Jesús López de los Mozos y Andrea Torres Íñiguez, dos perfiles complementarios que entienden la arquitectura no solo como construcción, sino como una herramienta capaz de transformar la forma en que las personas viven, trabajan y se relacionan con los espacios.",
    ],
    photoOf: (name: string) => `Fotografía de ${name}`,
    closing: ["Dos miradas,", "Un mismo proyecto"],
    cta: "¿Qué tienes entre manos?",
  },
  en: {
    kicker: "Studio",
    title: "The people behind the studio",
    intro: [
      "The Loto Lab was born from the meeting of architecture, design and art. A studio where technique and creativity come together to shape spaces with identity, intention and character.",
      "Behind it are Jesús López de los Mozos and Andrea Torres Íñiguez, two complementary profiles who see architecture not only as construction, but as a tool capable of transforming the way people live, work and relate to spaces.",
    ],
    photoOf: (name: string) => `Photograph of ${name}`,
    closing: ["Two perspectives,", "One single project"],
    cta: "What do you have in mind?",
  },
};

export function StudioPage({ lang }: { lang: Lang }) {
  const t = copy[lang];

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
      <SecondaryHeader lang={lang} page="studio" />

      <header className="studio-intro" data-studio-reveal>
        <span>{t.kicker}</span>
        <h1>{t.title}</h1>
        <div className="studio-intro-copy">
          {t.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </header>

      <div className="studio-people">
        {people.map((person) => (
          <section className={`studio-person ${person.className}`} key={person.number}>
            {/* Fotografía de la persona; mantiene la clase studio-portrait. */}
            <div className="studio-portrait" data-studio-reveal>
              <img src={person.image} alt={t.photoOf(person.name)} loading="lazy" />
            </div>
            <div className="studio-person-copy" data-studio-reveal>
              <span className="studio-person-number">{person.number} · {person.shortName}</span>
              <h2>{person.name}</h2>
              <p className="studio-profession">{person.profession[lang]}</p>
              <div className="studio-bio">
                {person.paragraphs[lang].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="studio-closing" data-studio-reveal>
        <p>{t.closing[0]}<br />{t.closing[1]}</p>
        <a href={href("contact", lang)}>
          <span>{t.cta}</span>
          <RoundArrow className="studio-cta-arrow" />
        </a>
      </section>
    </main>
  );
}

"use client";

import { useState } from "react";
import { RoundArrow } from "@/components/round-arrow";
import { ProjectGallery, type GalleryProject } from "@/components/project-gallery";
import { SecondaryHeader } from "@/components/secondary-header";
import type { Lang } from "@/lib/i18n";

const slug = (file: string) =>
  file.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const asset = (folder: string, file: string) => `/projects-web/${folder}/${slug(file)}.webp`;

type Localized = Pick<GalleryProject, "place" | "year" | "discipline" | "description" | "alt">;
type SourceProject = Omit<GalleryProject, keyof Localized> & Record<Lang, Localized>;

const sourceProjects: SourceProject[] = [
  {
    key: "beher",
    number: "01",
    name: "Beher Valladolid",
    area: "148 m²",
    images: ["main pro.jpg", "_C5A1922.jpg", "_C5A1925.jpg", "_C5A1945.jpg", "_C5A1967.jpg", "_C5A1969.jpg", "Detail4.jpg", "Detail5.jpg", "76aff14277ac7c53a601cd946f3309d40d64766690da63b84008fec29e8c88d5.png", "aca9b12f1e3f7e66c914ee068bc002b8a8461a13f83f8781beabf37af8d716b9.png"].map((file) => asset("beher", file)),
    es: {
      place: "Plaza de la Libertad · Valladolid",
      year: "2025",
      discipline: "Hostelería · Arquitectura interior",
      description: "En el centro histórico de Valladolid, junto a la Catedral, el proyecto transforma un local en bruto en un espacio que integra restaurante, barra y charcutería. La propuesta construye una identidad reconocible mediante el equilibrio entre el rojo corporativo, el acero y la madera. Como gesto diferencial, una gran barra circular de acero y pavés retroiluminado organiza el conjunto y concentra la actividad, mientras la exposición del producto y la cocina al fuego refuerzan el vínculo con la tradición gastronómica. El resultado es un interior contemporáneo, funcional y con carácter, donde la arquitectura cede el protagonismo a la luz, que termina adueñándose del exterior.",
      alt: "Interior del proyecto Beher Valladolid",
    },
    en: {
      place: "Plaza de la Libertad · Valladolid",
      year: "2025",
      discipline: "Hospitality · Interior architecture",
      description: "In Valladolid's historic centre, next to the Cathedral, the project transforms a bare shell into a space that brings together a restaurant, a bar and a charcuterie counter. The design builds a recognisable identity through a balance of corporate red, steel and wood. As its signature gesture, a large circular bar in steel and backlit glass block organises the whole and concentrates the activity, while the display of produce and the open-fire kitchen strengthen the link with gastronomic tradition. The result is a contemporary, functional interior with character, where the architecture gives the spotlight to light, which ends up taking over the exterior.",
      alt: "Interior of the Beher Valladolid project",
    },
  },
  {
    key: "plasencia",
    number: "02",
    name: "Más Cosas Plasencia",
    area: "76 m²",
    images: ["main pro .png", "_C5A9814 pro .jpg", "_C5A9825 pro.jpg", "_C5A9839 pro.jpg", "_C5A9847 pro.jpg"].map((file) => asset("plasencia", file)),
    es: {
      place: "Estación ADIF · Plasencia",
      year: "—",
      discipline: "Hostelería · Interiorismo",
      description: "Se presenta un pequeño quiosco para la marca Más Cosas en la estación de Plasencia. Un pequeño córner concebido casi como un objeto arquitectónico dentro de la estación. La estructura naranja enmarca el espacio, concentra la identidad de la marca y lo convierte en un punto cálido y visible, mientras la transparencia y la escala contenida permiten que siga formando parte natural del entorno ferroviario.",
      alt: "Quiosco Más Cosas en la estación de Plasencia",
    },
    en: {
      place: "ADIF station · Plasencia",
      year: "—",
      discipline: "Hospitality · Interior design",
      description: "A small kiosk for the Más Cosas brand at Plasencia station. A compact corner conceived almost as an architectural object within the station. The orange structure frames the space, concentrates the brand's identity and turns it into a warm, visible focal point, while its transparency and restrained scale let it remain a natural part of the railway setting.",
      alt: "Más Cosas kiosk at Plasencia station",
    },
  },
  {
    key: "bottega",
    number: "03",
    name: "Bottega T4",
    area: "47 m²",
    images: ["_C5A3604 pro.jpg", "bottega-corner-dorado-retocado-alta.jpg", "bottega-frontal-vitrina-retocada-alta.jpg", "bottega-barajas-frontal-vertical-8k-web.jpg", "bottega-barajas-detalle-rotulo-8k-web.jpg", "bottega-gold-producto-retocada-alta.jpg", "bottega-barajas-instagram-feed-4x5.jpg"].map((file) => asset("bottega", file)),
    es: {
      place: "Aeropuerto Adolfo Suárez · Madrid",
      year: "2024",
      discipline: "Retail aeroportuario · Interiorismo",
      description: "En medio del flujo incesante de la T4, el corner de Bottega emerge como un lingote de oro suspendido: una pieza compacta, luminosa e inconfundible desde la distancia. El nogal y el negro conforman una base elegante y serena, mientras el techo dorado amplifica la luz y multiplica los reflejos de las botellas. En torno al pilar central, transformado en una gran vitrina vertical, el espacio se abre al ritmo del aeropuerto para ofrecer una pausa brillante y sofisticada: un lugar donde detener el viaje y disfrutar del instante.",
      alt: "Corner dorado del proyecto Bottega T4",
    },
    en: {
      place: "Adolfo Suárez Airport · Madrid",
      year: "2024",
      discipline: "Airport retail · Interior design",
      description: "Amid the relentless flow of T4, the Bottega corner emerges like a suspended gold ingot: a compact, luminous piece, unmistakable from a distance. Walnut and black form an elegant, serene base, while the gold ceiling amplifies the light and multiplies the reflections of the bottles. Around the central pillar, transformed into a large vertical display case, the space opens up to the rhythm of the airport to offer a bright, sophisticated pause: a place to put the journey on hold and enjoy the moment.",
      alt: "Gold corner of the Bottega T4 project",
    },
  },
  {
    key: "caceres",
    number: "04",
    name: "Más Cosas Cáceres",
    area: "187 m²",
    images: ["main pro.jpg", "_C5A0013 pro.jpg", "_C5A9896 pro.jpg", "_C5A9902 pro.jpg", "_C5A9922 pro.jpg", "_C5A9923 pro.jpg", "_C5A9945 pro.jpg", "_C5A9951 pro.jpg", "_C5A9962 pro.jpg", "_C5A9984 pro.jpg", "_C5A9992 pro.jpg", "_C5A9999 pro.jpg"].map((file) => asset("caceres", file)),
    es: {
      place: "Estación ADIF · Cáceres",
      year: "—",
      discipline: "Hostelería · Interiorismo",
      description: "Un espacio luminoso, directo y renovado donde el naranja corporativo articula la arquitectura a través de los detalles y genera una barra continua de Krion, limpia y reconocible dentro de la estación. Un proyecto funcional y muy gráfico, pensado para integrarse en el ritmo cotidiano del viajero sin perder identidad.",
      alt: "Cafetería Más Cosas en la estación de Cáceres",
    },
    en: {
      place: "ADIF station · Cáceres",
      year: "—",
      discipline: "Hospitality · Interior design",
      description: "A bright, direct and renewed space where the corporate orange shapes the architecture through its details and creates a continuous Krion bar, clean and recognisable within the station. A functional and highly graphic project, designed to fit into the everyday rhythm of travellers without losing its identity.",
      alt: "Más Cosas café at Cáceres station",
    },
  },
  {
    key: "burgos",
    number: "05",
    name: "Más Cosas Burgos",
    area: "283 m²",
    images: ["main pro.jpg", "_C5A2237.jpg", "_C5A2260.jpg", "_C5A2276.jpg", "_C5A2294 pro.jpg", "_C5A2297.pro.jpg", "_C5A2301 pro.jpg"].map((file) => asset("burgos", file)),
    es: {
      place: "Estación Rosa Manzano · Burgos",
      year: "2025",
      discipline: "Hostelería · Espacio de espera",
      description: "Una estación es, casi siempre, un lugar entre lugares. En Burgos quisimos que la espera tuviera algo de hogar. Con un presupuesto mínimo y un único color, el naranja se extiende por el gran espacio vacío, dibujando arcos, rincones y pequeñas escenas donde sentarse, comer o simplemente dejar pasar el tiempo. Una intervención sencilla que intenta ofrecer algo esencial: un poco de calidez y dignidad antes de continuar el viaje.",
      alt: "Espacio naranja Más Cosas en Burgos",
    },
    en: {
      place: "Rosa Manzano station · Burgos",
      year: "2025",
      discipline: "Hospitality · Waiting area",
      description: "A station is almost always a place between places. In Burgos we wanted waiting to feel a little like home. With a minimal budget and a single colour, orange spreads across the large empty space, drawing arches, corners and small scenes in which to sit, eat or simply let time pass. A simple intervention that tries to offer something essential: a little warmth and dignity before continuing the journey.",
      alt: "Orange Más Cosas space in Burgos",
    },
  },
  {
    key: "merida",
    number: "06",
    name: "Más Cosas Mérida",
    area: "150 m²",
    images: ["main pro.jpg", "_C5A0016 pro.jpg", "_C5A0019.jpg", "_C5A0020.jpg", "_C5A0048.jpg", "_C5A0058.jpg", "_C5A0062 pro.jpg"].map((file) => asset("merida", file)),
    es: {
      place: "Estación ADIF · Mérida",
      year: "—",
      discipline: "Hostelería · Interiorismo",
      description: "Se renueva el interiorismo de la cafetería. La palillería, la iluminación lineal y los planos naranjas construyen una atmósfera cálida y contemporánea, aportando profundidad y ritmo a un espacio concebido como una pequeña pausa dentro del tránsito de la estación. Todo un juego de grafismo, color y texturas corporativas.",
      alt: "Interior de Más Cosas Mérida",
    },
    en: {
      place: "ADIF station · Mérida",
      year: "—",
      discipline: "Hospitality · Interior design",
      description: "A renewal of the café's interior. Timber slats, linear lighting and orange planes build a warm, contemporary atmosphere, adding depth and rhythm to a space conceived as a small pause within the bustle of the station. A play of graphics, colour and corporate textures.",
      alt: "Interior of Más Cosas Mérida",
    },
  },
  {
    key: "foodtruck",
    number: "07",
    name: "Taxi Driver Barajas",
    area: "150 m²",
    images: ["main pro.jpg", "_C5A6407 pro.jpg", "_C5A6428 pro.jpg", "_C5A6433 pro.jpg", "_C5A6489 pro.jpg", "_C5A6511 pro.jpg"].map((file) => asset("foodtruck", file)),
    es: {
      place: "Bolsa de taxis · Madrid-Barajas",
      year: "2025",
      discipline: "Arquitectura efímera · Hostelería",
      description: "No queríamos diseñar un food truck. Queríamos construir un lugar extraño y cercano en mitad del asfalto. Una pequeña arquitectura envuelta por una segunda piel que se separa, se pliega y se extiende hasta convertirse en bancada, umbral y refugio. Bajo esa envolvente metálica aparece un interior rojo, cálido y casi doméstico. Una pausa inesperada dentro del movimiento continuo de los taxis.",
      alt: "Taxi Driver en la bolsa de taxis de Barajas",
    },
    en: {
      place: "Taxi rank · Madrid-Barajas",
      year: "2025",
      discipline: "Ephemeral architecture · Hospitality",
      description: "We didn't want to design a food truck. We wanted to build a strange yet familiar place in the middle of the tarmac. A small piece of architecture wrapped in a second skin that separates, folds and extends until it becomes bench, threshold and shelter. Beneath that metal envelope lies a red, warm, almost domestic interior. An unexpected pause within the constant movement of the taxis.",
      alt: "Taxi Driver at the Barajas taxi rank",
    },
  },
  {
    key: "palencia",
    number: "08",
    name: "Más Cosas Palencia",
    area: "175 m²",
    images: ["main pro.jpg", "_C5A2088 pro.jpg", "_C5A2095 pro.jpg", "_C5A2096.jpg", "_C5A2100.jpg", "_C5A2115.jpg", "_C5A2156 pro.jpg", "_C5A2188 pro.jpg", "_C5A2195 pro.jpg", "_C5A2202.jpg", "_C5A2206 pro.jpg"].map((file) => asset("palencia", file)),
    es: {
      place: "Estación ADIF · Palencia",
      year: "—",
      discipline: "Hostelería · Interiorismo",
      description: "Una intervención contemporánea dentro de un edificio ferroviario histórico con carácter propio. El proyecto busca dialogar con la arquitectura existente desde el contraste: una pieza nueva, tectónica y reconocible, donde el naranja de Más Cosas introduce energía sin competir con la memoria del edificio original.",
      alt: "Más Cosas en la estación histórica de Palencia",
    },
    en: {
      place: "ADIF station · Palencia",
      year: "—",
      discipline: "Hospitality · Interior design",
      description: "A contemporary intervention within a historic railway building with a strong character of its own. The project enters into dialogue with the existing architecture through contrast: a new, tectonic and recognisable piece, where the Más Cosas orange brings energy without competing with the memory of the original building.",
      alt: "Más Cosas in the historic Palencia station",
    },
  },
  {
    key: "san-fernando",
    number: "09",
    name: "La Bodeguita de Beher",
    area: "226 m²",
    images: ["main-pro.jpg", "16.jpg", "17.jpg", "18.jpg", "19.jpg", "20.jpg", "21.jpg"].map((file) => asset("san-fernando", file)),
    es: {
      place: "CC Bahía Sur · San Fernando",
      year: "—",
      discipline: "Hostelería · Arquitectura interior",
      description: "Una reinterpretación contemporánea de la tasca tradicional, llevada al borde de la bahía. Madera, barricas, jamones, tonos terrosos y vegetación construyen una atmósfera cálida que traslada un pequeño fragmento de la dehesa al sur, reinterpretando sus códigos desde una mirada más ligera y actual.",
      alt: "La Bodeguita de Beher en San Fernando",
    },
    en: {
      place: "Bahía Sur shopping centre · San Fernando",
      year: "—",
      discipline: "Hospitality · Interior architecture",
      description: "A contemporary reinterpretation of the traditional Spanish tavern, brought to the edge of the bay. Wood, barrels, hams, earthy tones and greenery create a warm atmosphere that carries a small fragment of the dehesa down to the south, reinterpreting its codes from a lighter, more current perspective.",
      alt: "La Bodeguita de Beher in San Fernando",
    },
  },
  {
    key: "penicilino",
    number: "10",
    name: "Bar Penicilino",
    area: "193 m²",
    images: [asset("penicilino", "main pro.jpg")],
    es: {
      place: "Plaza de Portugalete · Valladolid",
      year: "En proceso",
      discipline: "Hostelería · Arquitectura interior",
      description: "Frente a la Catedral de Valladolid, El Penicilino recupera uno de los lugares más queridos de la ciudad. Un proyecto que parte de sus más de 150 años de historia, de su vino dulce, sus zapatillas y su condición de punto de encuentro, para reinterpretar su esencia sin convertirla en nostalgia congelada. Desde una mirada contemporánea, respetando la memoria, los rituales y el carácter popular que hicieron del Penicilino mucho más que un bar.",
      alt: "Proyecto en proceso del Bar Penicilino",
    },
    en: {
      place: "Plaza de Portugalete · Valladolid",
      year: "In progress",
      discipline: "Hospitality · Interior architecture",
      description: "Opposite Valladolid Cathedral, El Penicilino revives one of the city's best-loved places. The project starts from more than 150 years of history — its sweet wine, its zapatillas and its role as a meeting point — to reinterpret its essence without freezing it into nostalgia. A contemporary perspective that respects the memory, the rituals and the popular character that made the Penicilino much more than a bar.",
      alt: "Bar Penicilino project in progress",
    },
  },
  {
    key: "santa-gloria",
    number: "11",
    name: "Santa Gloria",
    area: "82 m²",
    images: [asset("santa-gloria", "main pro.jpg")],
    es: {
      place: "Aeropuerto de Santiago de Compostela",
      year: "En proceso",
      discipline: "Hostelería · Interiorismo",
      description: "Una intervención desarrollada en colaboración y en diálogo directo con el universo de marca de Santa Gloria. El proyecto traslada su lenguaje de materiales, color y detalle al contexto aeroportuario, buscando un equilibrio entre funcionalidad, calidez y elegancia, con una imagen cuidada y reconocible incluso en un entorno de tránsito constante.",
      alt: "Proyecto Santa Gloria en el aeropuerto de Santiago",
    },
    en: {
      place: "Santiago de Compostela Airport",
      year: "In progress",
      discipline: "Hospitality · Interior design",
      description: "A project developed in collaboration and in direct dialogue with the Santa Gloria brand universe. It carries the brand's language of materials, colour and detail into the airport context, seeking a balance between functionality, warmth and elegance, with a refined and recognisable image even in a setting of constant transit.",
      alt: "Santa Gloria project at Santiago airport",
    },
  },
];

const projectOrder = ["beher", "plasencia", "penicilino", "foodtruck", "caceres", "san-fernando", "merida", "bottega", "santa-gloria", "burgos", "palencia"];
const projectGroups = [
  ["beher", "plasencia"],
  ["penicilino", "foodtruck"],
  ["caceres", "san-fernando"],
  ["merida", "bottega"],
  ["santa-gloria", "burgos", "palencia"],
];

const catalogFor = (lang: Lang): Record<string, GalleryProject> =>
  Object.fromEntries(
    projectOrder.map((key, index) => {
      const { es, en, ...common } = sourceProjects.find((project) => project.key === key)!;
      const localized = lang === "en" ? en : es;
      return [key, { ...common, ...localized, number: String(index + 1).padStart(2, "0") }];
    }),
  );

const catalogs: Record<Lang, Record<string, GalleryProject>> = { es: catalogFor("es"), en: catalogFor("en") };

const copy = {
  es: { kicker: "Archivo", title: "Proyectos", intro: "Espacios construidos desde la identidad, el contexto y el detalle", grid: "Todos los proyectos" },
  en: { kicker: "Archive", title: "Projects", intro: "Spaces built from identity, context and detail", grid: "All projects" },
} as const;

export function ProjectsPage({ lang }: { lang: Lang }) {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const t = copy[lang];
  const projectCatalog = catalogs[lang];

  return (
    <main className="archive-page">
      <SecondaryHeader lang={lang} page="projects" />

      <header className="archive-heading">
        <span>{t.kicker}</span>
        <h1>{t.title}</h1>
        <p>{t.intro}</p>
      </header>

      <section className="archive-grid" aria-label={t.grid}>
        {projectGroups.map((group, groupIndex) => (
          <div className={`archive-group archive-group-${groupIndex + 1}`} key={group.join("-")}>
            {group.map((key) => {
              const project = projectCatalog[key];
              return (
                <article className={`project-entry archive-project-card archive-project-${project.key}`} key={project.key}>
                  <button className="project-visual archive-project-visual" type="button" onClick={() => setActiveProject(project.key)}>
                    <img src={project.images[0]} alt={project.alt} />
                    <RoundArrow className="project-arrow" />
                  </button>
                  <div className="archive-project-meta">
                    <div><span>{project.number}</span><h2>{project.name}</h2></div>
                    <p>{project.discipline}<br />{project.place}<br />{project.year !== "—" ? `${project.year} · ` : ""}{project.area}</p>
                  </div>
                </article>
              );
            })}
          </div>
        ))}
      </section>

      <ProjectGallery lang={lang} activeProject={activeProject} projects={projectCatalog} onClose={() => setActiveProject(null)} />
    </main>
  );
}

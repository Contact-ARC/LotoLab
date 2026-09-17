"use client";

import { useState } from "react";
import { RoundArrow } from "@/components/round-arrow";
import { ProjectGallery, type GalleryProject } from "@/components/project-gallery";
import { SecondaryHeader } from "@/components/secondary-header";

const slug = (file: string) =>
  file.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const asset = (folder: string, file: string) => `/projects-web/${folder}/${slug(file)}.webp`;

const sourceProjects: GalleryProject[] = [
  {
    key: "beher",
    number: "01",
    name: "Beher Valladolid",
    place: "Plaza de la Libertad · Valladolid",
    year: "2025",
    area: "148 m²",
    discipline: "Hostelería · Arquitectura interior",
    description: "En el centro histórico de Valladolid, junto a la Catedral, el proyecto transforma un local en bruto en un espacio que integra restaurante, barra y charcutería. La propuesta construye una identidad reconocible mediante el equilibrio entre el rojo corporativo, el acero y la madera. Como gesto diferencial, una gran barra circular de acero y pavés retroiluminado organiza el conjunto y concentra la actividad, mientras la exposición del producto y la cocina al fuego refuerzan el vínculo con la tradición gastronómica. El resultado es un interior contemporáneo, funcional y con carácter, donde la arquitectura cede el protagonismo a la luz, que termina adueñándose del exterior.",
    images: ["main pro.jpg", "_C5A1922.jpg", "_C5A1925.jpg", "_C5A1945.jpg", "_C5A1967.jpg", "_C5A1969.jpg", "Detail4.jpg", "Detail5.jpg", "76aff14277ac7c53a601cd946f3309d40d64766690da63b84008fec29e8c88d5.png", "aca9b12f1e3f7e66c914ee068bc002b8a8461a13f83f8781beabf37af8d716b9.png"].map((file) => asset("beher", file)),
    alt: "Interior del proyecto Beher Valladolid",
  },
  {
    key: "plasencia",
    number: "02",
    name: "Más Cosas Plasencia",
    place: "Estación ADIF · Plasencia",
    year: "—",
    area: "76 m²",
    discipline: "Hostelería · Interiorismo",
    description: "Se presenta un pequeño quiosco para la marca Más Cosas en la estación de Plasencia. Un pequeño córner concebido casi como un objeto arquitectónico dentro de la estación. La estructura naranja enmarca el espacio, concentra la identidad de la marca y lo convierte en un punto cálido y visible, mientras la transparencia y la escala contenida permiten que siga formando parte natural del entorno ferroviario.",
    images: ["main pro .png", "_C5A9814 pro .jpg", "_C5A9825 pro.jpg", "_C5A9839 pro.jpg", "_C5A9847 pro.jpg"].map((file) => asset("plasencia", file)),
    alt: "Quiosco Más Cosas en la estación de Plasencia",
  },
  {
    key: "bottega",
    number: "03",
    name: "Bottega T4",
    place: "Aeropuerto Adolfo Suárez · Madrid",
    year: "2024",
    area: "47 m²",
    discipline: "Retail aeroportuario · Interiorismo",
    description: "En medio del flujo incesante de la T4, el corner de Bottega emerge como un lingote de oro suspendido: una pieza compacta, luminosa e inconfundible desde la distancia. El nogal y el negro conforman una base elegante y serena, mientras el techo dorado amplifica la luz y multiplica los reflejos de las botellas. En torno al pilar central, transformado en una gran vitrina vertical, el espacio se abre al ritmo del aeropuerto para ofrecer una pausa brillante y sofisticada: un lugar donde detener el viaje y disfrutar del instante.",
    images: ["_C5A3604 pro.jpg", "bottega-corner-dorado-retocado-alta.jpg", "bottega-frontal-vitrina-retocada-alta.jpg", "bottega-barajas-frontal-vertical-8k-web.jpg", "bottega-barajas-detalle-rotulo-8k-web.jpg", "bottega-gold-producto-retocada-alta.jpg", "bottega-barajas-instagram-feed-4x5.jpg"].map((file) => asset("bottega", file)),
    alt: "Corner dorado del proyecto Bottega T4",
  },
  {
    key: "caceres",
    number: "04",
    name: "Más Cosas Cáceres",
    place: "Estación ADIF · Cáceres",
    year: "—",
    area: "187 m²",
    discipline: "Hostelería · Interiorismo",
    description: "Un espacio luminoso, directo y renovado donde el naranja corporativo articula la arquitectura a través de los detalles y genera una barra continua de Krion, limpia y reconocible dentro de la estación. Un proyecto funcional y muy gráfico, pensado para integrarse en el ritmo cotidiano del viajero sin perder identidad.",
    images: ["main pro.jpg", "_C5A0013 pro.jpg", "_C5A9896 pro.jpg", "_C5A9902 pro.jpg", "_C5A9922 pro.jpg", "_C5A9923 pro.jpg", "_C5A9945 pro.jpg", "_C5A9951 pro.jpg", "_C5A9962 pro.jpg", "_C5A9984 pro.jpg", "_C5A9992 pro.jpg", "_C5A9999 pro.jpg"].map((file) => asset("caceres", file)),
    alt: "Cafetería Más Cosas en la estación de Cáceres",
  },
  {
    key: "burgos",
    number: "05",
    name: "Más Cosas Burgos",
    place: "Estación Rosa Manzano · Burgos",
    year: "2025",
    area: "283 m²",
    discipline: "Hostelería · Espacio de espera",
    description: "Una estación es, casi siempre, un lugar entre lugares. En Burgos quisimos que la espera tuviera algo de hogar. Con un presupuesto mínimo y un único color, el naranja se extiende por el gran espacio vacío, dibujando arcos, rincones y pequeñas escenas donde sentarse, comer o simplemente dejar pasar el tiempo. Una intervención sencilla que intenta ofrecer algo esencial: un poco de calidez y dignidad antes de continuar el viaje.",
    images: ["main pro.jpg", "_C5A2237.jpg", "_C5A2260.jpg", "_C5A2276.jpg", "_C5A2294 pro.jpg", "_C5A2297.pro.jpg", "_C5A2301 pro.jpg"].map((file) => asset("burgos", file)),
    alt: "Espacio naranja Más Cosas en Burgos",
  },
  {
    key: "merida",
    number: "06",
    name: "Más Cosas Mérida",
    place: "Estación ADIF · Mérida",
    year: "—",
    area: "150 m²",
    discipline: "Hostelería · Interiorismo",
    description: "Se renueva el interiorismo de la cafetería. La palillería, la iluminación lineal y los planos naranjas construyen una atmósfera cálida y contemporánea, aportando profundidad y ritmo a un espacio concebido como una pequeña pausa dentro del tránsito de la estación. Todo un juego de grafismo, color y texturas corporativas.",
    images: ["main pro.jpg", "_C5A0016 pro.jpg", "_C5A0019.jpg", "_C5A0020.jpg", "_C5A0048.jpg", "_C5A0058.jpg", "_C5A0062 pro.jpg"].map((file) => asset("merida", file)),
    alt: "Interior de Más Cosas Mérida",
  },
  {
    key: "foodtruck",
    number: "07",
    name: "Taxi Driver Barajas",
    place: "Bolsa de taxis · Madrid-Barajas",
    year: "2025",
    area: "150 m²",
    discipline: "Arquitectura efímera · Hostelería",
    description: "No queríamos diseñar un food truck. Queríamos construir un lugar extraño y cercano en mitad del asfalto. Una pequeña arquitectura envuelta por una segunda piel que se separa, se pliega y se extiende hasta convertirse en bancada, umbral y refugio. Bajo esa envolvente metálica aparece un interior rojo, cálido y casi doméstico. Una pausa inesperada dentro del movimiento continuo de los taxis.",
    images: ["main pro.jpg", "_C5A6407 pro.jpg", "_C5A6428 pro.jpg", "_C5A6433 pro.jpg", "_C5A6489 pro.jpg", "_C5A6511 pro.jpg"].map((file) => asset("foodtruck", file)),
    alt: "Taxi Driver en la bolsa de taxis de Barajas",
  },
  {
    key: "palencia",
    number: "08",
    name: "Más Cosas Palencia",
    place: "Estación ADIF · Palencia",
    year: "—",
    area: "175 m²",
    discipline: "Hostelería · Interiorismo",
    description: "Una intervención contemporánea dentro de un edificio ferroviario histórico con carácter propio. El proyecto busca dialogar con la arquitectura existente desde el contraste: una pieza nueva, tectónica y reconocible, donde el naranja de Más Cosas introduce energía sin competir con la memoria del edificio original.",
    images: ["main pro.jpg", "_C5A2088 pro.jpg", "_C5A2095 pro.jpg", "_C5A2096.jpg", "_C5A2100.jpg", "_C5A2115.jpg", "_C5A2156 pro.jpg", "_C5A2188 pro.jpg", "_C5A2195 pro.jpg", "_C5A2202.jpg", "_C5A2206 pro.jpg"].map((file) => asset("palencia", file)),
    alt: "Más Cosas en la estación histórica de Palencia",
  },
  {
    key: "san-fernando",
    number: "09",
    name: "La Bodeguita de Beher",
    place: "CC Bahía Sur · San Fernando",
    year: "—",
    area: "226 m²",
    discipline: "Hostelería · Arquitectura interior",
    description: "Una reinterpretación contemporánea de la tasca tradicional, llevada al borde de la bahía. Madera, barricas, jamones, tonos terrosos y vegetación construyen una atmósfera cálida que traslada un pequeño fragmento de la dehesa al sur, reinterpretando sus códigos desde una mirada más ligera y actual.",
    images: ["main-pro.jpg", "16.jpg", "17.jpg", "18.jpg", "19.jpg", "20.jpg", "21.jpg"].map((file) => asset("san-fernando", file)),
    alt: "La Bodeguita de Beher en San Fernando",
  },
  {
    key: "penicilino",
    number: "10",
    name: "Bar Penicilino",
    place: "Plaza de Portugalete · Valladolid",
    year: "En proceso",
    area: "193 m²",
    discipline: "Hostelería · Arquitectura interior",
    description: "Frente a la Catedral de Valladolid, El Penicilino recupera uno de los lugares más queridos de la ciudad. Un proyecto que parte de sus más de 150 años de historia, de su vino dulce, sus zapatillas y su condición de punto de encuentro, para reinterpretar su esencia sin convertirla en nostalgia congelada. Desde una mirada contemporánea, respetando la memoria, los rituales y el carácter popular que hicieron del Penicilino mucho más que un bar.",
    images: [asset("penicilino", "main pro.jpg")],
    alt: "Proyecto en proceso del Bar Penicilino",
  },
  {
    key: "santa-gloria",
    number: "11",
    name: "Santa Gloria",
    place: "Aeropuerto de Santiago de Compostela",
    year: "En proceso",
    area: "82 m²",
    discipline: "Hostelería · Interiorismo",
    description: "Una intervención desarrollada en colaboración y en diálogo directo con el universo de marca de SantaGloria. El proyecto traslada su lenguaje de materiales, color y detalle al contexto aeroportuario, buscando un equilibrio entre funcionalidad, calidez y elegancia, con una imagen cuidada y reconocible incluso en un entorno de tránsito constante.",
    images: [asset("santa-gloria", "main pro.jpg")],
    alt: "Proyecto Santa Gloria en el aeropuerto de Santiago",
  },
];

const projectOrder = ["beher", "plasencia", "penicilino", "foodtruck", "caceres", "san-fernando", "merida", "bottega", "santa-gloria", "burgos", "palencia"];
const projects = projectOrder.map((key, index) => ({
  ...sourceProjects.find((project) => project.key === key)!,
  number: String(index + 1).padStart(2, "0"),
}));
const projectCatalog = Object.fromEntries(projects.map((project) => [project.key, project]));
const projectGroups = [
  ["beher", "plasencia"],
  ["penicilino", "foodtruck"],
  ["caceres", "san-fernando"],
  ["merida", "bottega"],
  ["santa-gloria", "burgos", "palencia"],
];

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  return (
    <main className="archive-page">
      <SecondaryHeader current="proyectos" />

      <header className="archive-heading">
        <span>Archivo</span>
        <h1>Proyectos</h1>
        <p>Espacios construidos desde la identidad, el contexto y el detalle</p>
      </header>

      <section className="archive-grid" aria-label="Todos los proyectos">
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

      <ProjectGallery activeProject={activeProject} projects={projectCatalog} onClose={() => setActiveProject(null)} />
    </main>
  );
}

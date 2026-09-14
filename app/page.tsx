"use client";

import { useEffect, useRef, useState } from "react";
import { RoundArrow } from "@/components/round-arrow";
import { ProjectGallery } from "@/components/project-gallery";

type SpringPiece = {
  element: SVGGraphicsElement;
  startAt: number;
  axis: "x" | "y";
  position: number;
  velocity: number;
  stiffness: number;
  damping: number;
  rotation: number;
  cx: number;
  cy: number;
};

const DURATION = 3.55;

type ProjectKey = "beher" | "bottega" | "burgos" | "foodtruck";

type Project = {
  key: ProjectKey;
  number: string;
  name: string;
  place: string;
  year: string;
  area: string;
  discipline: string;
  description: string;
  images: string[];
  alt: string;
  className: string;
};

const projectCatalog: Record<ProjectKey, Project> = {
  beher: {
    key: "beher",
    number: "01",
    name: "Beher Valladolid",
    place: "Valladolid",
    year: "2025",
    area: "148 m²",
    discipline: "Hostelería · Arquitectura interior",
    description: "En el centro histórico de Valladolid, junto a la Catedral, el proyecto transforma un local en bruto en un espacio que integra restaurante, barra y charcutería. La propuesta construye una identidad reconocible mediante el equilibrio entre el rojo corporativo, el acero y la madera. Como gesto diferencial, una gran barra circular de acero y pavés retroiluminado organiza el conjunto y concentra la actividad, mientras la exposición del producto y la cocina al fuego refuerzan el vínculo con la tradición gastronómica. El resultado es un interior contemporáneo, funcional y con carácter, donde la arquitectura cede el protagonismo a la luz, que termina adueñándose del exterior.",
    images: [
      "/projects-v2/beher/01-main.webp",
      "/projects-v2/beher/02-c5a1922.webp",
      "/projects-v2/beher/03-c5a1925.webp",
      "/projects-v2/beher/04-c5a1945.webp",
      "/projects-v2/beher/05-c5a1967.webp",
      "/projects-v2/beher/06-c5a1969.webp",
      "/projects-v2/beher/07-detail4.webp",
      "/projects-v2/beher/08-detail5.webp",
      "/projects-v2/beher/09-study.webp",
      "/projects-v2/beher/10-study.webp",
    ],
    alt: "Interior del proyecto Beher Valladolid",
    className: "project-beher",
  },
  bottega: {
    key: "bottega",
    number: "02",
    name: "Bottega T4",
    place: "Aeropuerto Adolfo Suárez · Madrid",
    year: "2024",
    area: "47 m²",
    discipline: "Retail aeroportuario · Interiorismo",
    description: "En medio del flujo incesante de la T4, el corner de Bottega emerge como un lingote de oro suspendido: una pieza compacta, luminosa e inconfundible desde la distancia. El nogal y el negro conforman una base elegante y serena, mientras el techo dorado amplifica la luz y multiplica los reflejos de las botellas. En torno al pilar central, transformado en una gran vitrina vertical, el espacio se abre al ritmo del aeropuerto para ofrecer una pausa brillante y sofisticada: un lugar donde detener el viaje y disfrutar del instante.",
    images: [
      "/projects-v2/bottega/01-main.webp",
      "/projects-v2/bottega/02-corner.webp",
      "/projects-v2/bottega/03-frontal.webp",
      "/projects-v2/bottega/04-vitrina.webp",
      "/projects-v2/bottega/05-rotulo.webp",
      "/projects-v2/bottega/06-producto.webp",
      "/projects-v2/bottega/07-vertical.webp",
    ],
    alt: "Corner dorado del proyecto Bottega Barajas",
    className: "project-bottega",
  },
  burgos: {
    key: "burgos",
    number: "03",
    name: "Más Cosas Burgos",
    place: "Estación Rosa Manzano · Burgos",
    year: "2025",
    area: "283 m²",
    discipline: "Hospitality · Espacio de espera",
    description: "Una estación es, casi siempre, un lugar entre lugares. En Burgos quisimos que la espera tuviera algo de hogar. Con un presupuesto mínimo y un único color, el naranja se extiende por el gran espacio vacío, dibujando arcos, rincones y pequeñas escenas donde sentarse, comer o simplemente dejar pasar el tiempo. Una intervención sencilla que intenta ofrecer algo esencial: un poco de calidez y dignidad antes de continuar el viaje.",
    images: [
      "/projects-v2/burgos/01-main.webp",
      "/projects-v2/burgos/02-c5a2294.webp",
      "/projects-v2/burgos/03-c5a2297.webp",
      "/projects-v2/burgos/04-c5a2301.webp",
      "/projects-v2/burgos/05-c5a2237.webp",
      "/projects-v2/burgos/06-c5a2276.webp",
      "/projects-v2/burgos/07-c5a2260.webp",
    ],
    alt: "Espacio naranja del proyecto de la estación de Burgos",
    className: "project-burgos",
  },
  foodtruck: {
    key: "foodtruck",
    number: "04",
    name: "Taxi Driver Barajas",
    place: "Bolsa de taxis · Madrid-Barajas",
    year: "2025",
    area: "150,00 m²",
    discipline: "Arquitectura efímera · Hospitality",
    description: "No queríamos diseñar un food truck. Queríamos construir un lugar extraño y cercano en mitad del asfalto. Una pequeña arquitectura envuelta por una segunda piel que se separa, se pliega y se extiende hasta convertirse en bancada, umbral y refugio. Bajo esa envolvente metálica aparece un interior rojo, cálido y casi doméstico. Una pausa inesperada dentro del movimiento continuo de los taxis.",
    images: [
      "/projects-v2/foodtruck/01-main.webp",
      "/projects-v2/foodtruck/02-c5a6407.webp",
      "/projects-v2/foodtruck/03-c5a6428.webp",
      "/projects-v2/foodtruck/04-c5a6433.webp",
      "/projects-v2/foodtruck/05-c5a6489.webp",
      "/projects-v2/foodtruck/06-c5a6511.webp",
    ],
    alt: "Foodtruck rojo Taxi Driver",
    className: "project-foodtruck",
  },
};

function LoadTestFour() {
  const lRef = useRef<SVGPathElement>(null);
  const firstORef = useRef<SVGCircleElement>(null);
  const tRef = useRef<SVGPathElement>(null);
  const lastORef = useRef<SVGCircleElement>(null);
  const wordmarkRef = useRef<HTMLImageElement>(null);
  const shadowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const l = lRef.current;
    const firstO = firstORef.current;
    const t = tRef.current;
    const lastO = lastORef.current;
    if (!l || !firstO || !t || !lastO) return;

    const pieces = [l, firstO, t, lastO];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      pieces.forEach((piece) => {
        piece.style.opacity = "1";
        piece.setAttribute("transform", "");
      });
      wordmarkRef.current?.classList.add("is-visible");
      return;
    }

    const springs: SpringPiece[] = [
      {
        element: l,
        startAt: 0,
        axis: "x",
        position: -185,
        velocity: 30,
        stiffness: 48,
        damping: 11.8,
        rotation: -2.4,
        cx: 33.1,
        cy: 94.6,
      },
      {
        element: t,
        startAt: 0.48,
        axis: "y",
        position: 185,
        velocity: -18,
        stiffness: 42,
        damping: 10.6,
        rotation: 1.8,
        cx: 213.86,
        cy: 100.04,
      },
    ];

    let firstOY = -225;
    let firstOVelocity = 0;
    let bounceCount = 0;
    let firstOSettled = false;
    let squash = 0;
    const firstOStart = 0.16;
    const gravity = 930;
    const lastOStart = 1.02;
    const contactX = -6.75;
    let animationFrame = 0;
    let previous = performance.now();
    const started = previous;

    const renderSpring = (piece: SpringPiece) => {
      const x = piece.axis === "x" ? piece.position : 0;
      const y = piece.axis === "y" ? piece.position : 0;
      const distanceRatio = Math.min(1, Math.abs(piece.position) / 185);
      const angle = piece.rotation * distanceRatio;
      piece.element.setAttribute(
        "transform",
        `translate(${x.toFixed(3)} ${y.toFixed(3)}) rotate(${angle.toFixed(3)} ${piece.cx} ${piece.cy})`,
      );
    };

    const easeInOutSine = (value: number) =>
      -(Math.cos(Math.PI * value) - 1) / 2;

    const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

    const renderLastO = (physicsTime: number) => {
      const localTime = physicsTime - lastOStart;
      if (localTime < 0) {
        lastO.style.opacity = "0";
        return;
      }

      lastO.style.opacity = "1";
      let x = 0;

      if (localTime < 1.32) {
        const progress = easeInOutSine(localTime / 1.32);
        x = 205 + (contactX - 205) * progress;
      } else if (localTime < 1.58) {
        const progress = easeOutCubic((localTime - 1.32) / 0.26);
        x = contactX + (2.4 - contactX) * progress;
      } else if (localTime < 1.88) {
        const progress = easeInOutSine((localTime - 1.58) / 0.3);
        x = 2.4 * (1 - progress);
      }

      lastO.setAttribute("transform", `translate(${x.toFixed(3)} 0)`);
    };

    const animate = (now: number) => {
      const time = (now - started) / 1000;
      const frameDelta = Math.min((now - previous) / 1000, 0.35);
      const steps = Math.max(1, Math.ceil(frameDelta / (1 / 120)));
      const dt = frameDelta / steps;
      previous = now;
      let impact = 0;

      for (let step = 0; step < steps; step += 1) {
        const physicsTime = time - frameDelta + dt * (step + 1);

        springs.forEach((piece) => {
          if (physicsTime < piece.startAt) {
            piece.element.style.opacity = "0";
            return;
          }

          piece.element.style.opacity = "1";
          const acceleration =
            -piece.position * piece.stiffness - piece.velocity * piece.damping;
          piece.velocity += acceleration * dt;
          piece.position += piece.velocity * dt;

          if (Math.abs(piece.position) < 0.025 && Math.abs(piece.velocity) < 0.08) {
            piece.position = 0;
            piece.velocity = 0;
          }
          renderSpring(piece);
        });

        renderLastO(physicsTime);

        if (physicsTime < firstOStart) {
          firstO.style.opacity = "0";
        } else {
          firstO.style.opacity = "1";
          if (!firstOSettled) {
            firstOVelocity += gravity * dt;
            firstOY += firstOVelocity * dt;
          }

          if (!firstOSettled && firstOY >= 0) {
            impact = Math.max(impact, Math.abs(firstOVelocity));
            firstOY = 0;
            const restitution = bounceCount === 0 ? 0.36 : 0.25;
            if (Math.abs(firstOVelocity) > 28 && bounceCount < 2) {
              firstOVelocity = -firstOVelocity * restitution;
              bounceCount += 1;
              squash = bounceCount === 1 ? 0.065 : 0.038;
            } else {
              firstOVelocity = 0;
              firstOSettled = true;
              squash = 0;
            }
          }

          squash *= Math.exp(-15 * dt);
          const stretchX = 1 + squash * 0.55;
          const stretchY = 1 - squash;
          firstO.setAttribute(
            "transform",
            `translate(123.4 94.61) translate(0 ${firstOY.toFixed(3)}) scale(${stretchX.toFixed(4)} ${stretchY.toFixed(4)}) translate(-123.4 -94.61)`,
          );
        }
      }

      if (shadowRef.current) {
        const entrance = Math.min(1, Math.max(0, (time - 0.5) / 0.7));
        const pulse = Math.min(0.045, impact / 14500);
        shadowRef.current.style.opacity = String(entrance * 0.035 + pulse);
        shadowRef.current.style.transform = `scaleX(${0.78 + entrance * 0.18 + Math.min(0.08, impact / 9000)})`;
      }

      if (time >= 2.92) wordmarkRef.current?.classList.add("is-visible");

      if (time < DURATION) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        pieces.forEach((piece) => {
          piece.style.opacity = "1";
          piece.setAttribute("transform", "");
        });
        wordmarkRef.current?.classList.add("is-visible");
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="wordmark-stage" aria-label="Animación del logotipo The Loto Lab">
      <div className="wordmark-art">
        <svg className="moving-pieces" viewBox="0 0 354.73 191" aria-hidden="true">
          <path
            ref={lRef}
            className="logo-piece"
            d="M46.91 44.03H0v53.06c0 27.51 21.07 48.1 45.92 48.1h20.3v-35.4H46.91V44.03Z"
          />
          <circle ref={firstORef} className="logo-piece" cx="123.4" cy="94.61" r="50.58" />
          <path
            ref={tRef}
            className="logo-piece"
            d="M180.75 87.57h12.47v61.77h41.29V87.57h12.47V50.74h-66.22v36.83Z"
          />
          <circle ref={lastORef} className="logo-piece" cx="304.15" cy="98.76" r="50.58" />
        </svg>

        <img
          ref={wordmarkRef}
          className="complete-wordmark"
          src="/brand/logo-horizontal.svg"
          alt="The Loto Lab"
        />
        <span ref={shadowRef} className="impact-shadow" aria-hidden="true" />
      </div>
    </div>
  );
}

type AnimatedPath = {
  element: SVGPathElement;
  length: number;
  start: number;
  end: number;
  lastFraction: number;
};

function ScaleStory({ onOpenProject }: { onOpenProject: (project: ProjectKey) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const drawingRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const drawing = drawingRef.current;
    const video = videoRef.current;
    if (!section || !stage || !drawing || !video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const mobile = window.innerWidth <= 700;
      stage.style.setProperty("--empty-opacity", "0");
      stage.style.setProperty("--final-opacity", "1");
      stage.style.setProperty("--line-opacity", "0");
      stage.style.setProperty("--frame-scale", mobile ? "0.86" : "0.66");
      stage.style.setProperty("--frame-x", mobile ? "0vw" : "-15vw");
      stage.style.setProperty("--frame-y", mobile ? "-9vh" : "1.5vh");
      stage.style.setProperty("--frame-radius", "0px");
      stage.style.setProperty("--mask-radius", "80vmax");
      stage.style.setProperty("--handoff-opacity", "1");
      stage.classList.add("is-project-ready");
      return;
    }

    let frame = 0;
    let paths: AnimatedPath[] = [];
    let lastDrawingProgress = 0;
    let videoDuration = 8;
    const videoStartTime = 1.1;
    const controller = new AbortController();

    const smoothstep = (from: number, to: number, value: number) => {
      const normalized = Math.min(1, Math.max(0, (value - from) / (to - from)));
      return normalized * normalized * (3 - 2 * normalized);
    };

    let lineOpacity = 1;

    const renderDrawing = (drawingProgress: number) => {
      if (!paths.length) return;
      paths.forEach((path) => {
        const raw = Math.min(1, Math.max(0, (drawingProgress - path.start) / (path.end - path.start)));
        const fraction = raw * raw * (3 - 2 * raw);
        if (Math.abs(fraction - path.lastFraction) >= 0.002 || fraction === 0 || fraction === 1) {
          path.lastFraction = fraction;
          path.element.style.strokeDashoffset = String(path.length * (1 - fraction));
        }
        path.element.style.opacity = String(lineOpacity);
      });
    };

    const prepareDrawing = async () => {
      const response = await fetch("/beher-outline.svg", { signal: controller.signal });
      if (!response.ok) throw new Error("No se pudo cargar el dibujo vectorial");
      const source = new DOMParser().parseFromString(await response.text(), "image/svg+xml");
      source.querySelectorAll("script, foreignObject, image, use").forEach((element) => element.remove());
      source.querySelectorAll("*").forEach((element) => {
        Array.from(element.attributes).forEach((attribute) => {
          if (attribute.name.toLowerCase().startsWith("on")) element.removeAttribute(attribute.name);
        });
      });

      const imported = document.importNode(source.documentElement, true) as unknown as SVGSVGElement;
      imported.removeAttribute("id");
      imported.classList.add("drawing-svg");
      imported.setAttribute("width", "100%");
      imported.setAttribute("height", "100%");
      imported.setAttribute("preserveAspectRatio", "xMidYMid slice");
      imported.setAttribute("aria-hidden", "true");
      drawing.replaceChildren(imported);

      const measured = Array.from(imported.querySelectorAll("path"))
        .map((element, index) => {
          const length = Math.max(0.1, element.getTotalLength());
          const bounds = element.getBBox();
          const x = (bounds.x + bounds.width / 2) / 1672.15;
          const y = (bounds.y + bounds.height / 2) / 930.51;
          const span = Math.max(bounds.width / 1672.15, bounds.height / 930.51);
          const priority = span > 0.42 ? 0 : y > 0.48 ? 1 : y < 0.34 ? 2 : 3;
          return { element, length, priority, x, y, index };
        })
        .filter(({ length }) => length > 0.75)
        .sort((a, b) =>
          a.priority - b.priority ||
          b.length - a.length ||
          Math.abs(a.x - 0.5) - Math.abs(b.x - 0.5) ||
          a.y - b.y ||
          a.index - b.index
        );

      paths = measured.map(({ element, length }, index) => {
        element.style.fill = "none";
        element.style.stroke = "#ed4525";
        element.style.strokeWidth = "1.65";
        element.style.strokeLinecap = "round";
        element.style.strokeLinejoin = "round";
        element.style.strokeDasharray = String(length);
        element.style.strokeDashoffset = String(length);
        element.setAttribute("vector-effect", "non-scaling-stroke");
        const rank = measured.length <= 1 ? 0 : index / (measured.length - 1);
        const start = rank * 0.78;
        const duration = 0.16 + Math.min(0.12, Math.sqrt(length) / 175);
        return { element, length, start, end: Math.min(1, start + duration), lastFraction: -1 };
      });
      drawing.setAttribute("aria-busy", "false");
      renderDrawing(lastDrawingProgress);
    };

    const update = () => {
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight);
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / distance));
      const drawingProgress = smoothstep(0.03, 0.45, progress);
      const frameProgress = smoothstep(0.015, 0.8, progress);
      const handoffProgress = smoothstep(0.835, 0.99, progress);
      const videoProgress = smoothstep(0.025, 0.975, progress);
      const mobile = window.innerWidth <= 700;
      const expandedScale = (mobile ? 0.86 : 0.64) + frameProgress * (mobile ? 0.14 : 0.36);
      const frameScale = expandedScale * (1 - handoffProgress * (mobile ? 0.14 : 0.34));
      const emptyIn = smoothstep(0.02, 0.2, progress);
      const finalOpacity = smoothstep(0.5, 0.91, progress);
      lineOpacity = 1 - smoothstep(0.69, 0.91, progress);
      lastDrawingProgress = drawingProgress;
      stage.style.setProperty("--drawing-progress", drawingProgress.toFixed(4));
      stage.style.setProperty("--frame-scale", frameScale.toFixed(4));
      stage.style.setProperty("--frame-x", `${(handoffProgress * (mobile ? 0 : -15)).toFixed(3)}vw`);
      stage.style.setProperty("--frame-y", `${(handoffProgress * (mobile ? -9 : 1.5)).toFixed(3)}vh`);
      stage.style.setProperty("--frame-radius", `${((1 - frameProgress) * 34).toFixed(2)}px`);
      stage.style.setProperty("--mask-radius", `${(28 + frameProgress * 47).toFixed(3)}vmax`);
      stage.style.setProperty("--empty-opacity", (emptyIn * (1 - finalOpacity)).toFixed(4));
      stage.style.setProperty("--final-opacity", finalOpacity.toFixed(4));
      stage.style.setProperty("--line-opacity", lineOpacity.toFixed(4));
      stage.style.setProperty("--image-scale", (1.075 - frameProgress * 0.075).toFixed(4));
      stage.style.setProperty("--handoff-opacity", handoffProgress.toFixed(4));
      stage.classList.toggle("is-project-ready", progress > 0.965);
      const targetTime = videoStartTime + videoProgress * Math.max(0, videoDuration - videoStartTime - 1 / 30);
      if (video.readyState >= 1 && Math.abs(video.currentTime - targetTime) > 1 / 60) {
        video.currentTime = targetTime;
      }
      renderDrawing(drawingProgress);
      frame = 0;
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    const syncVideoDuration = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) videoDuration = video.duration;
      video.pause();
      requestUpdate();
    };
    video.addEventListener("loadedmetadata", syncVideoDuration);
    video.addEventListener("durationchange", syncVideoDuration);
    const prepareFallback = () => {
      video.style.display = "none";
      drawing.setAttribute("aria-busy", "true");
      prepareDrawing().catch((error: unknown) => {
        if ((error as { name?: string }).name !== "AbortError") console.error("No se pudo cargar el trazado", error);
      });
    };
    drawing.setAttribute("aria-busy", "false");
    video.addEventListener("error", prepareFallback);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      controller.abort();
      if (frame) cancelAnimationFrame(frame);
      video.removeEventListener("loadedmetadata", syncVideoDuration);
      video.removeEventListener("durationchange", syncVideoDuration);
      video.removeEventListener("error", prepareFallback);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section ref={sectionRef} className="scale-story" id="proyectos" aria-label="Proyecto destacado">
      <div ref={stageRef} className="scale-stage">
        <div className="story-frame">
          <img
            className="story-photo story-photo-empty"
            src="/beher-valladolid-empty.webp"
            alt=""
            aria-hidden="true"
          />
          <img
            className="story-photo story-photo-final"
            src="/beher-valladolid-main.webp"
            alt="Barra curva iluminada en rojo del proyecto Beher Valladolid de The Loto Lab"
          />
          <div
            ref={drawingRef}
            className="drawing-vector"
            role="img"
            aria-label="El proyecto se construye con líneas antes de adquirir luz y materia"
          />
          <div className="drawing-grain" aria-hidden="true" />
          <video
            ref={videoRef}
            className="story-video"
            muted
            playsInline
            preload="auto"
            poster="/dibujo-a-realidad-poster.webp"
            aria-hidden="true"
            tabIndex={-1}
          >
            <source
              src="/dibujo-a-realidad-mobile.mp4"
              type="video/mp4"
              media="(max-width: 700px)"
            />
            <source src="/dibujo-a-realidad.mp4" type="video/mp4" />
          </video>
          <button
            className="story-project-trigger"
            type="button"
            onClick={() => onOpenProject("beher")}
            aria-label="Abrir galería de Beher Valladolid"
          >
            <RoundArrow className="story-open-mark" />
          </button>
        </div>
        <p className="drawing-caption">Beher · Valladolid</p>
        <div className="handoff-copy" aria-hidden="true">
          <span>01 / 04</span>
          <p>Proyectos seleccionados</p>
          <h2>Beher<br />Valladolid</h2>
          <small>Hostelería · Arquitectura interior</small>
          <small className="handoff-facts">2025 · Valladolid · 148 m²</small>
        </div>
      </div>
    </section>
  );
}

const selectedProjects = [projectCatalog.bottega, projectCatalog.burgos, projectCatalog.foodtruck];

const processStages = [
  { number: "01", title: "Imaginamos", terms: "concepto · estrategia · identidad espacial" },
  { number: "02", title: "Proyectamos", terms: "arquitectura · interiorismo · detalle" },
  { number: "03", title: "Hacemos posible", terms: "licencias · normativa · coordinación" },
  { number: "04", title: "Construimos", terms: "obra · dirección · seguimiento" },
] as const;

const clientLogos = Array.from(
  { length: 12 },
  (_, index) => `/clients/Aena_Logo_New-${String(index + 1).padStart(2, "0")}.svg`,
);

function SelectedProjects({ onOpenProject }: { onOpenProject: (project: ProjectKey) => void }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = Array.from(section.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12%", threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="selected-projects" id="seleccionados" aria-labelledby="selected-title">
      <header className="selected-heading" data-reveal>
        <h2 id="selected-title">Continuar explorando</h2>
        <span>02 — 04</span>
      </header>

      <div className="projects-layout">
        {selectedProjects.map((project) => (
          <article className={`project-entry ${project.className}`} data-reveal key={project.name}>
            <button className="project-visual" type="button" onClick={() => onOpenProject(project.key)}>
              <img src={project.images[0]} alt={project.alt} loading="lazy" />
              <RoundArrow className="project-arrow" />
            </button>
            <div className="project-meta">
              <div>
                <span>{project.number}</span>
                <h3>{project.name}</h3>
              </div>
              <div>
                <p>{project.discipline}</p>
                <p className="project-facts">{project.year} · {project.place} · {project.area}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <footer className="projects-foot" data-reveal>
        <p>Espacios que nacen del contexto y terminan formando parte de la memoria.</p>
        <a href="/proyectos">Explorar proyectos <b aria-hidden="true">→</b></a>
      </footer>
    </section>
  );
}

function WhatWeDo() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(0);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      section.style.setProperty("--process-progress", "1");
      setRevealed(processStages.length);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(rect.height - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.5 - rect.top) / travel));
      section.style.setProperty("--process-progress", progress.toFixed(4));
      const nextRevealed = processStages.reduce(
        (count, _, index) => count + (progress >= index / (processStages.length - 0.45) ? 1 : 0),
        0,
      );
      setRevealed((current) => (current === nextRevealed ? current : nextRevealed));
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section ref={sectionRef} className="what-we-do" id="servicios" aria-labelledby="process-title">
      <div className="process-sticky">
        <header className="process-heading">
          <span>03</span>
          <h2 id="process-title">Qué hacemos</h2>
          <p>De la primera intuición al espacio construido.</p>
        </header>

        <div className="process-diagram">
          <div className="process-track" aria-hidden="true"><span /></div>
          <ol className={active === null ? "" : "has-active"}>
            {processStages.map((stage, index) => (
              <li
                className={`${index < revealed ? "is-revealed" : ""} ${active === index ? "is-active" : ""}`}
                key={stage.number}
              >
                <button
                  type="button"
                  aria-expanded={active === index}
                  onClick={() => setActive((current) => {
                    if (window.matchMedia("(hover: hover)").matches) return index;
                    return current === index ? null : index;
                  })}
                  onMouseEnter={() => setActive(index)}
                  onMouseLeave={() => setActive(null)}
                >
                  <span className="process-dot" aria-hidden="true" />
                  <span className="process-number">{stage.number}</span>
                  <strong>{stage.title}</strong>
                  <span className="process-extra">
                    <span className="process-plus" aria-hidden="true">+</span>
                    <span className="process-terms">{stage.terms}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Clients() {
  return (
    <section className="clients" aria-label="Clientes">
      <div className="clients-heading">
        <span>Confían en nosotros</span>
      </div>
      <div className="clients-marquee">
        <div className="clients-runner">
          {[0, 1].map((copy) => (
            <div className="clients-set" aria-hidden={copy === 1} key={copy}>
              {clientLogos.map((logo, index) => (
                <img src={logo} alt={copy === 0 ? `Cliente ${index + 1}` : ""} key={`${copy}-${logo}`} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <section className="contact-cta" id="contacto" aria-label="Contacto">
      <a href="/contacto">
        <span className="contact-cta-copy">¿Qué historia vamos a contar?</span>
        <RoundArrow className="cta-arrow" />
      </a>
    </section>
  );
}

function ServicesExplore() {
  return (
    <div className="services-explore">
      <a href="/servicios">Explorar servicios <span aria-hidden="true">→</span></a>
    </div>
  );
}

type IntroPhase = "playing" | "handoff" | "flying" | "ready";

export default function Home() {
  const [cycle, setCycle] = useState(0);
  const [phase, setPhase] = useState<IntroPhase>("playing");
  const [activeProject, setActiveProject] = useState<ProjectKey | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("ready");
      return;
    }

    setPhase("playing");
    const handoff = window.setTimeout(() => setPhase("handoff"), 3550);
    const flight = window.setTimeout(() => setPhase("flying"), 3650);
    const ready = window.setTimeout(() => setPhase("ready"), 4550);

    return () => {
      window.clearTimeout(handoff);
      window.clearTimeout(flight);
      window.clearTimeout(ready);
    };
  }, [cycle]);

  useEffect(() => {
    document.documentElement.style.overflow = phase === "ready" ? "" : "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [phase]);

  const replay = () => {
    setPhase("playing");
    setCycle((value) => value + 1);
  };

  return (
    <main className={`site-shell phase-${phase}`} id="inicio">
      <a href="/" className="home-logo-link" aria-label="Volver al inicio">
        <img className="flight-logo" src="/brand/logo-horizontal.svg" alt="The Loto Lab" />
      </a>

      <header className="site-header">
        <nav className="site-nav" aria-label="Navegación principal">
          <a href="/proyectos">Proyectos</a>
          <a href="/estudio">Estudio</a>
          <a href="/servicios">Servicios</a>
          <a href="/contacto">Contacto</a>
          <span className="mobile-menu-label">Menú</span>
        </nav>
      </header>

      <section className="opening" aria-label="Presentación de The Loto Lab">
        <header className="intro-meta" aria-label="Información de la escena">
          <span>The Loto Lab</span>
          <span>Ensayo de cargas · 04</span>
        </header>

        <section className="intro-scene" key={cycle}>
          <LoadTestFour />
        </section>

        <footer className="intro-controls">
          <p>Cuatro direcciones. Un equilibrio.</p>
          <button type="button" onClick={replay}>
            Repetir ensayo
            <span aria-hidden="true">↻</span>
          </button>
        </footer>

        <div className="opening-content">
          <p className="opening-kicker">Arquitectura · Interiorismo · Diseño</p>
          <h1>Creamos espacios que cuentan historias.</h1>
          <div className="opening-foot">
            <p>Imaginamos y construimos lugares con identidad.</p>
            <a href="/proyectos">
              Explorar proyectos
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </section>

      <ScaleStory onOpenProject={setActiveProject} />
      <SelectedProjects onOpenProject={setActiveProject} />
      <WhatWeDo />
      <ServicesExplore />
      <ContactCTA />
      <Clients />
      <ProjectGallery activeProject={activeProject} projects={projectCatalog} onClose={() => setActiveProject(null)} />
    </main>
  );
}

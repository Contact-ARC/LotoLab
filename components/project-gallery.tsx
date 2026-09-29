"use client";

import { useEffect, useState } from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { Dialog, DialogClose, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { Lang } from "@/lib/i18n";

const copy = {
  es: { image: (n: number, total: number) => `imagen ${n} de ${total}`, closeLabel: "Cerrar galería", close: "Cerrar ×", prev: "Imagen anterior", next: "Imagen siguiente", resume: "Reanudar secuencia", pause: "Pausar secuencia" },
  en: { image: (n: number, total: number) => `image ${n} of ${total}`, closeLabel: "Close gallery", close: "Close ×", prev: "Previous image", next: "Next image", resume: "Resume slideshow", pause: "Pause slideshow" },
};

export type GalleryProject = {
  key: string;
  number: string;
  name: string;
  place: string;
  year: string;
  area: string;
  discipline: string;
  description: string;
  images: string[];
  alt: string;
};

export function ProjectGallery({
  lang = "es",
  activeProject,
  projects,
  onClose,
}: {
  lang?: Lang;
  activeProject: string | null;
  projects: Record<string, GalleryProject>;
  onClose: () => void;
}) {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const project = activeProject ? projects[activeProject] : null;
  const t = copy[lang];

  useEffect(() => {
    setSlide(0);
    setPaused(false);
    setDetailsOpen(false);
  }, [activeProject]);

  useEffect(() => {
    if (!project || paused || project.images.length <= 1) return;
    const interval = window.setInterval(() => {
      setSlide((current) => (current + 1) % project.images.length);
    }, 4400);
    return () => window.clearInterval(interval);
  }, [project, paused]);

  const move = (direction: number) => {
    if (!project) return;
    setSlide((current) => (current + direction + project.images.length) % project.images.length);
  };

  const hasMultipleImages = Boolean(project && project.images.length > 1);

  return (
    <Dialog open={Boolean(project)} onOpenChange={(open) => { if (!open) onClose(); }}>
      {project && (
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="project-overlay" />
          <DialogPrimitive.Content className="project-dialog">
            <article className="project-sheet">
              <div className="gallery-stage">
                <img
                  key={`${project.key}-${slide}`}
                  className="gallery-image"
                  src={project.images[slide]}
                  alt={`${project.name}, ${t.image(slide + 1, project.images.length)}`}
                />
                <DialogClose className="gallery-close" aria-label={t.closeLabel}>{t.close}</DialogClose>
                {hasMultipleImages && <button type="button" className="gallery-nav gallery-prev" onClick={() => move(-1)} aria-label={t.prev}>←</button>}
                {hasMultipleImages && <button type="button" className="gallery-nav gallery-next" onClick={() => move(1)} aria-label={t.next}>→</button>}
              </div>

              <div className="gallery-copy">
                <div className="gallery-identity">
                  <span>{project.number} / {String(Object.keys(projects).length).padStart(2, "0")}</span>
                  <DialogTitle>{project.name}</DialogTitle>
                  <p className="gallery-facts">{project.discipline}</p>
                  <p className="gallery-facts">{project.year !== "—" ? `${project.year} · ` : ""}{project.place} · {project.area}</p>
                </div>
                <div className="gallery-story">
                  <div className={`gallery-description ${detailsOpen ? "is-expanded" : ""}`}>
                    <DialogDescription id={`project-description-${project.key}`}>{project.description}</DialogDescription>
                    <button
                      className="gallery-info"
                      type="button"
                      aria-expanded={detailsOpen}
                      aria-controls={`project-description-${project.key}`}
                      onClick={() => setDetailsOpen((value) => !value)}
                    >
                      {detailsOpen ? "− Info" : "+ Info"}
                    </button>
                  </div>
                  <div className="gallery-status">
                    {hasMultipleImages && <button type="button" onClick={() => setPaused((value) => !value)}>{paused ? t.resume : t.pause}</button>}
                    <span>{String(slide + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}</span>
                  </div>
                </div>
              </div>
            </article>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      )}
    </Dialog>
  );
}

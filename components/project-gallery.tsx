"use client";

import { useEffect, useState } from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { Dialog, DialogClose, DialogDescription, DialogTitle } from "@/components/ui/dialog";

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
  activeProject,
  projects,
  onClose,
}: {
  activeProject: string | null;
  projects: Record<string, GalleryProject>;
  onClose: () => void;
}) {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const project = activeProject ? projects[activeProject] : null;

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
                  alt={`${project.name}, imagen ${slide + 1} de ${project.images.length}`}
                />
                <DialogClose className="gallery-close" aria-label="Cerrar galería">Cerrar ×</DialogClose>
                {hasMultipleImages && <button type="button" className="gallery-nav gallery-prev" onClick={() => move(-1)} aria-label="Imagen anterior">←</button>}
                {hasMultipleImages && <button type="button" className="gallery-nav gallery-next" onClick={() => move(1)} aria-label="Imagen siguiente">→</button>}
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
                    {hasMultipleImages && <button type="button" onClick={() => setPaused((value) => !value)}>{paused ? "Reanudar secuencia" : "Pausar secuencia"}</button>}
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

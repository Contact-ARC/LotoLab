import type { Metadata } from "next";
import { ProjectsPage } from "@/components/pages/projects";
import { pageMetadata } from "@/lib/site-meta";

export const metadata: Metadata = pageMetadata("projects", "es", {"title": "Proyectos", "description": "Proyectos seleccionados de The Loto Lab: hostelería, retail aeroportuario y arquitectura efímera en Madrid, Valladolid y Burgos."});

export default function Page() {
  return <ProjectsPage lang="es" />;
}

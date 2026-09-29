import type { Metadata } from "next";
import { StudioPage } from "@/components/pages/studio";
import { pageMetadata } from "@/lib/site-meta";

export const metadata: Metadata = pageMetadata("studio", "es", {"title": "Estudio", "description": "El estudio The Loto Lab: arquitectura e interiorismo con identidad, del concepto y la estrategia a la dirección de obra."});

export default function Page() {
  return <StudioPage lang="es" />;
}

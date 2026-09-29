import type { Metadata } from "next";
import { HomePage } from "@/components/pages/home";
import { pageMetadata } from "@/lib/site-meta";

export const metadata: Metadata = pageMetadata("home", "es", {"description": "The Loto Lab es un estudio de arquitectura e interiorismo en Madrid. Imaginamos y construimos espacios con identidad: hostelería, retail y arquitectura efímera."});

export default function Page() {
  return <HomePage lang="es" />;
}

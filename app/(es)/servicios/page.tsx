import type { Metadata } from "next";
import { ServicesPage } from "@/components/pages/services";
import { pageMetadata } from "@/lib/site-meta";

export const metadata: Metadata = pageMetadata("services", "es", {"title": "Servicios", "description": "Qué hacemos en The Loto Lab: concepto e identidad espacial, arquitectura, interiorismo, licencias, normativa, obra y dirección."});

export default function Page() {
  return <ServicesPage lang="es" />;
}

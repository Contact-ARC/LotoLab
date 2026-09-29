import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/contact";
import { pageMetadata } from "@/lib/site-meta";

export const metadata: Metadata = pageMetadata("contact", "es", {"title": "Contacto", "description": "Cuéntanos qué tienes entre manos. Hablemos de tu próximo proyecto con The Loto Lab."});

export default function Page() {
  return <ContactPage lang="es" />;
}

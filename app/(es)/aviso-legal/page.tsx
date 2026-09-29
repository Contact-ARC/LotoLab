import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/legal";
import { pageMetadata } from "@/lib/site-meta";

export const metadata: Metadata = pageMetadata("legal", "es", {"title": "Aviso legal", "description": "Aviso legal y condiciones de uso de thelotolab.es, sitio web de The Loto Lab S.L."});

export default function Page() {
  return <LegalPage lang="es" />;
}

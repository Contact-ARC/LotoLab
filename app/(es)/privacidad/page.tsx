import type { Metadata } from "next";
import { PrivacyPage } from "@/components/pages/privacy";
import { pageMetadata } from "@/lib/site-meta";

export const metadata: Metadata = pageMetadata("privacy", "es", {"title": "Política de privacidad", "description": "Cómo trata The Loto Lab S.L. los datos personales que nos facilitas a través de thelotolab.es."});

export default function Page() {
  return <PrivacyPage lang="es" />;
}

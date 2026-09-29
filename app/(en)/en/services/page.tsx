import type { Metadata } from "next";
import { ServicesPage } from "@/components/pages/services";
import { pageMetadata } from "@/lib/site-meta";

export const metadata: Metadata = pageMetadata("services", "en", {"title": "Services", "description": "What The Loto Lab does: concept and spatial identity, architecture, interior design, permits, regulations, construction and site management."});

export default function Page() {
  return <ServicesPage lang="en" />;
}

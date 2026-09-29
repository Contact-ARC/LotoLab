import type { Metadata } from "next";
import { StudioPage } from "@/components/pages/studio";
import { pageMetadata } from "@/lib/site-meta";

export const metadata: Metadata = pageMetadata("studio", "en", {"title": "Studio", "description": "The Loto Lab studio: architecture and interior design with identity, from concept and strategy to site management."});

export default function Page() {
  return <StudioPage lang="en" />;
}

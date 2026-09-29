import type { Metadata } from "next";
import { HomePage } from "@/components/pages/home";
import { pageMetadata } from "@/lib/site-meta";

export const metadata: Metadata = pageMetadata("home", "en", {"description": "The Loto Lab is an architecture and interior design studio in Madrid. We imagine and build spaces with identity: hospitality, retail and ephemeral architecture."});

export default function Page() {
  return <HomePage lang="en" />;
}

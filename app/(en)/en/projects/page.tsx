import type { Metadata } from "next";
import { ProjectsPage } from "@/components/pages/projects";
import { pageMetadata } from "@/lib/site-meta";

export const metadata: Metadata = pageMetadata("projects", "en", {"title": "Projects", "description": "Selected projects by The Loto Lab: hospitality, airport retail and ephemeral architecture in Madrid, Valladolid and Burgos."});

export default function Page() {
  return <ProjectsPage lang="en" />;
}

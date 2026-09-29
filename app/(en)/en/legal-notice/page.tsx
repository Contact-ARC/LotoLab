import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/legal";
import { pageMetadata } from "@/lib/site-meta";

export const metadata: Metadata = pageMetadata("legal", "en", {"title": "Legal notice", "description": "Legal notice and terms of use of thelotolab.es, the website of The Loto Lab S.L."});

export default function Page() {
  return <LegalPage lang="en" />;
}

import type { Metadata } from "next";
import { PrivacyPage } from "@/components/pages/privacy";
import { pageMetadata } from "@/lib/site-meta";

export const metadata: Metadata = pageMetadata("privacy", "en", {"title": "Privacy policy", "description": "How The Loto Lab S.L. processes the personal data you provide through thelotolab.es."});

export default function Page() {
  return <PrivacyPage lang="en" />;
}

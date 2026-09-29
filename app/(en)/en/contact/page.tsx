import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/contact";
import { pageMetadata } from "@/lib/site-meta";

export const metadata: Metadata = pageMetadata("contact", "en", {"title": "Contact", "description": "Tell us what you have in mind. Let's talk about your next project with The Loto Lab."});

export default function Page() {
  return <ContactPage lang="en" />;
}

import type { Metadata } from "next";
import "../globals.css";
import { SiteDocument } from "@/components/site-document";
import { rootMetadata } from "@/lib/site-meta";

export const metadata: Metadata = rootMetadata("en");

export default function EnglishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteDocument lang="en">{children}</SiteDocument>;
}

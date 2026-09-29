import type { Metadata } from "next";
import "../globals.css";
import { SiteDocument } from "@/components/site-document";
import { rootMetadata } from "@/lib/site-meta";

export const metadata: Metadata = rootMetadata("es");

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteDocument lang="es">{children}</SiteDocument>;
}

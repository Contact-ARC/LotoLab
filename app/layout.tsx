import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://thelotolab.es"),
  title: {
    default: "The Loto Lab — Arquitectura, Interiorismo y Diseño en Madrid",
    template: "%s · The Loto Lab",
  },
  description:
    "The Loto Lab es un estudio de arquitectura e interiorismo en Madrid. Imaginamos y construimos espacios con identidad: hostelería, retail y arquitectura efímera.",
  applicationName: "The Loto Lab",
  keywords: ["The Loto Lab", "Loto Lab", "arquitectura", "interiorismo", "diseño", "Madrid"],
  alternates: { canonical: "/" },
  icons: {
    icon: "/brand/isologo.svg",
    shortcut: "/brand/isologo.svg",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://thelotolab.es",
    siteName: "The Loto Lab",
    title: "The Loto Lab — Arquitectura, Interiorismo y Diseño",
    description:
      "Creamos espacios que cuentan historias. Estudio de arquitectura e interiorismo en Madrid.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "The Loto Lab" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Loto Lab — Arquitectura, Interiorismo y Diseño",
    description: "Estudio de arquitectura e interiorismo en Madrid.",
    images: ["/og.png"],
  },
  verification: { google: "ryCA3nYo1b-GXpiHfZ24RF4iBDu3yQXWYZcif6bnhD4" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

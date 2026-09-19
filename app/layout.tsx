import type { Metadata } from "next";
import "./globals.css";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["ProfessionalService", "GeneralContractor"],
      "@id": "https://thelotolab.es/#studio",
      name: "The Loto Lab",
      alternateName: ["LotoLab", "Loto Lab"],
      legalName: "THE LOTO LAB SL",
      description:
        "The Loto Lab (THE LOTO LAB SL) es un estudio de arquitectura e interiorismo en Getafe, Madrid. Proyectamos y construimos espacios con identidad —hostelería, retail y arquitectura efímera— además de reformas y rehabilitación de todo tipo de edificaciones.",
      url: "https://thelotolab.es",
      logo: "https://thelotolab.es/brand/logo-horizontal.svg",
      image: "https://thelotolab.es/og.png",
      email: "estudio@thelotolab.es",
      telephone: "+34637718591",
      vatID: "ESB70622832",
      taxID: "B70622832",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. de Leonardo da Vinci 2A, Parque Empresarial",
        addressLocality: "Getafe",
        addressRegion: "Madrid",
        postalCode: "28906",
        addressCountry: "ES",
      },
      geo: { "@type": "GeoCoordinates", latitude: 40.2905, longitude: -3.703 },
      areaServed: [
        { "@type": "City", name: "Madrid" },
        { "@type": "Country", name: "España" },
      ],
      knowsAbout: [
        "Arquitectura",
        "Interiorismo",
        "Diseño de interiores",
        "Reformas",
        "Rehabilitación",
        "Espacios de hostelería",
        "Retail",
        "Arquitectura efímera",
      ],
      sameAs: ["https://www.instagram.com/thelotolab"],
    },
    {
      "@type": "WebSite",
      "@id": "https://thelotolab.es/#website",
      url: "https://thelotolab.es",
      name: "The Loto Lab",
      alternateName: ["LotoLab", "Loto Lab"],
      inLanguage: "es-ES",
      publisher: { "@id": "https://thelotolab.es/#studio" },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://thelotolab.es"),
  title: {
    default: "The Loto Lab — Arquitectura, Interiorismo y Diseño en Madrid",
    template: "%s · The Loto Lab",
  },
  description:
    "The Loto Lab es un estudio de arquitectura e interiorismo en Madrid. Imaginamos y construimos espacios con identidad: hostelería, retail y arquitectura efímera.",
  applicationName: "The Loto Lab",
  keywords: ["The Loto Lab", "LotoLab", "Loto Lab", "arquitectura", "interiorismo", "diseño", "reformas", "Madrid", "Getafe"],
  alternates: { canonical: "/" },
  icons: { icon: "/brand/isologo.svg", shortcut: "/brand/isologo.svg" },
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
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
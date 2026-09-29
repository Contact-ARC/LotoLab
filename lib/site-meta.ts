import type { Metadata } from "next";
import { routes, type Lang, type PageKey } from "@/lib/i18n";

const copy = {
  es: {
    defaultTitle: "The Loto Lab — Arquitectura, Interiorismo y Diseño en Madrid",
    description:
      "The Loto Lab es un estudio de arquitectura e interiorismo en Madrid. Imaginamos y construimos espacios con identidad: hostelería, retail y arquitectura efímera.",
    keywords: ["The Loto Lab", "LotoLab", "Loto Lab", "arquitectura", "interiorismo", "diseño", "reformas", "Madrid", "Getafe"],
    ogTitle: "The Loto Lab — Arquitectura, Interiorismo y Diseño",
    ogDescription: "Creamos espacios que cuentan historias. Estudio de arquitectura e interiorismo en Madrid.",
    twitterDescription: "Estudio de arquitectura e interiorismo en Madrid.",
    locale: "es_ES",
    alternateLocale: "en_GB",
    jsonLdDescription:
      "The Loto Lab (THE LOTO LAB SL) es un estudio de arquitectura e interiorismo en Getafe, Madrid. Proyectamos y construimos espacios con identidad —hostelería, retail y arquitectura efímera— además de reformas y rehabilitación de todo tipo de edificaciones.",
    knowsAbout: ["Arquitectura", "Interiorismo", "Diseño de interiores", "Reformas", "Rehabilitación", "Espacios de hostelería", "Retail", "Arquitectura efímera"],
    country: "España",
    inLanguage: "es-ES",
  },
  en: {
    defaultTitle: "The Loto Lab — Architecture, Interior Design and Design in Madrid",
    description:
      "The Loto Lab is an architecture and interior design studio in Madrid. We imagine and build spaces with identity: hospitality, retail and ephemeral architecture.",
    keywords: ["The Loto Lab", "LotoLab", "Loto Lab", "architecture", "interior design", "design", "refurbishment", "Madrid", "Spain"],
    ogTitle: "The Loto Lab — Architecture, Interior Design and Design",
    ogDescription: "We create spaces that tell stories. Architecture and interior design studio in Madrid.",
    twitterDescription: "Architecture and interior design studio in Madrid.",
    locale: "en_GB",
    alternateLocale: "es_ES",
    jsonLdDescription:
      "The Loto Lab (THE LOTO LAB SL) is an architecture and interior design studio in Getafe, Madrid. We design and build spaces with identity —hospitality, retail and ephemeral architecture— as well as refurbishment and renovation of all kinds of buildings.",
    knowsAbout: ["Architecture", "Interior design", "Refurbishment", "Renovation", "Hospitality spaces", "Retail", "Ephemeral architecture"],
    country: "Spain",
    inLanguage: "en-GB",
  },
} as const;

export function rootMetadata(lang: Lang): Metadata {
  const t = copy[lang];
  return {
    metadataBase: new URL("https://thelotolab.es"),
    title: { default: t.defaultTitle, template: "%s · The Loto Lab" },
    description: t.description,
    applicationName: "The Loto Lab",
    keywords: [...t.keywords],
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      ],
      shortcut: "/favicon.ico",
      apple: "/apple-icon.png",
    },
    openGraph: {
      type: "website",
      locale: t.locale,
      alternateLocale: [t.alternateLocale],
      url: `https://thelotolab.es${routes.home[lang] === "/" ? "" : routes.home[lang]}`,
      siteName: "The Loto Lab",
      title: t.ogTitle,
      description: t.ogDescription,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "The Loto Lab" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.ogTitle,
      description: t.twitterDescription,
      images: ["/og.png"],
    },
    verification: { google: "ryCA3nYo1b-GXpiHfZ24RF4iBDu3yQXWYZcif6bnhD4" },
  };
}

/** Per-page title/description plus canonical and hreflang links to the other language. */
export function pageMetadata(page: PageKey, lang: Lang, meta: { title?: string; description: string }): Metadata {
  return {
    ...(meta.title ? { title: meta.title } : {}),
    description: meta.description,
    alternates: {
      canonical: routes[page][lang],
      languages: { es: routes[page].es, en: routes[page].en, "x-default": routes[page].es },
    },
  };
}

export function jsonLd(lang: Lang) {
  const t = copy[lang];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ProfessionalService", "GeneralContractor"],
        "@id": "https://thelotolab.es/#studio",
        name: "The Loto Lab",
        alternateName: ["LotoLab", "Loto Lab"],
        legalName: "THE LOTO LAB SL",
        description: t.jsonLdDescription,
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
          { "@type": "Country", name: t.country },
        ],
        knowsAbout: [...t.knowsAbout],
        sameAs: ["https://www.instagram.com/thelotolab"],
      },
      {
        "@type": "WebSite",
        "@id": lang === "en" ? "https://thelotolab.es/en#website" : "https://thelotolab.es/#website",
        url: `https://thelotolab.es${lang === "en" ? "/en" : ""}`,
        name: "The Loto Lab",
        alternateName: ["LotoLab", "Loto Lab"],
        inLanguage: t.inLanguage,
        publisher: { "@id": "https://thelotolab.es/#studio" },
      },
    ],
  };
}

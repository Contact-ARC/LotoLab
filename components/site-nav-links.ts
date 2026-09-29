import type { Lang, PageKey } from "@/lib/i18n";

export const navPages: PageKey[] = ["projects", "studio", "services", "contact"];

export const navLabels: Record<Lang, Record<"projects" | "studio" | "services" | "contact", string>> = {
  es: { projects: "Proyectos", studio: "Estudio", services: "Servicios", contact: "Contacto" },
  en: { projects: "Projects", studio: "Studio", services: "Services", contact: "Contact" },
};

export const navCopy = {
  es: { mainNav: "Navegación principal", backHome: "Volver a The Loto Lab", backToStart: "Volver al inicio" },
  en: { mainNav: "Main navigation", backHome: "Back to The Loto Lab", backToStart: "Back to the start" },
} as const;

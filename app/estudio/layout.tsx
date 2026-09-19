import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Estudio",
  description:
    "El estudio The Loto Lab: arquitectura e interiorismo con identidad, del concepto y la estrategia a la dirección de obra.",
  alternates: { canonical: "/estudio" },
};

export default function EstudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Proyectos seleccionados de The Loto Lab: hostelería, retail aeroportuario y arquitectura efímera en Madrid, Valladolid y Burgos.",
  alternates: { canonical: "/proyectos" },
};

export default function ProyectosLayout({ children }: { children: React.ReactNode }) {
  return children;
}

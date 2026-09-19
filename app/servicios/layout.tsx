import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Qué hacemos en The Loto Lab: concepto e identidad espacial, arquitectura, interiorismo, licencias, normativa, obra y dirección.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Loto Lab — Ensayo de cargas",
  description: "Prototipo de identidad en movimiento para The Loto Lab.",
  icons: {
    icon: "/brand/isologo.svg",
    shortcut: "/brand/isologo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "/proyectos", label: "Proyectos" },
  { href: "/estudio", label: "Estudio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/contacto", label: "Contacto" },
];

export function MobileMenu({ negative = false }: { negative?: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
      >
        Menú
      </button>
      <div
        id="mobile-menu"
        className={`mobile-menu ${negative ? "is-negative" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        hidden={!open}
      >
        <button
          type="button"
          className="mobile-menu-close"
          onClick={() => setOpen(false)}
          aria-label="Cerrar menú"
        >
          Cerrar
        </button>
        <nav className="mobile-menu-nav" aria-label="Navegación principal">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}

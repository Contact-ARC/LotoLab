"use client";

import { useEffect, useState } from "react";
import { LangToggle } from "@/components/lang-toggle";
import { navCopy, navLabels, navPages } from "@/components/site-nav-links";
import { href, type Lang, type PageKey } from "@/lib/i18n";

const copy = {
  es: { open: "Menú", dialog: "Menú de navegación", close: "Cerrar", closeLabel: "Cerrar menú" },
  en: { open: "Menu", dialog: "Navigation menu", close: "Close", closeLabel: "Close menu" },
} as const;

export function MobileMenu({ lang, page, negative = false }: { lang: Lang; page: PageKey; negative?: boolean }) {
  const [open, setOpen] = useState(false);
  const t = copy[lang];

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
        {t.open}
      </button>
      <div
        id="mobile-menu"
        className={`mobile-menu ${negative ? "is-negative" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={t.dialog}
        hidden={!open}
      >
        <button
          type="button"
          className="mobile-menu-close"
          onClick={() => setOpen(false)}
          aria-label={t.closeLabel}
        >
          {t.close}
        </button>
        <nav className="mobile-menu-nav" aria-label={navCopy[lang].mainNav}>
          {navPages.map((key) => (
            <a key={key} href={href(key, lang)} onClick={() => setOpen(false)}>
              {navLabels[lang][key as keyof (typeof navLabels)["es"]]}
            </a>
          ))}
        </nav>
        <LangToggle lang={lang} page={page} className="lang-toggle-menu" />
      </div>
    </>
  );
}

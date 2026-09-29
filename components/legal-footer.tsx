import { href, type Lang } from "@/lib/i18n";

const copy = {
  es: { nav: "Información legal", legal: "Aviso legal", privacy: "Política de privacidad" },
  en: { nav: "Legal information", legal: "Legal notice", privacy: "Privacy policy" },
} as const;

export function LegalFooter({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <footer className="legal-footer">
      <nav aria-label={t.nav}>
        <a href={href("legal", lang)}>{t.legal}</a>
        <a href={href("privacy", lang)}>{t.privacy}</a>
      </nav>
      <span>© {new Date().getFullYear()} The Loto Lab S.L.</span>
    </footer>
  );
}

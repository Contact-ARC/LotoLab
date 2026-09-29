import { ArcMark } from "@/components/arc-mark";
import { href, type Lang } from "@/lib/i18n";

const copy = {
  es: {
    nav: "Información legal",
    legal: "Aviso legal",
    privacy: "Política de privacidad",
    credit: "Web por",
    creditLabel: "Web diseñada y desarrollada por ARC (se abre en una pestaña nueva)",
  },
  en: {
    nav: "Legal information",
    legal: "Legal notice",
    privacy: "Privacy policy",
    credit: "Site by",
    creditLabel: "Website designed and built by ARC (opens in a new tab)",
  },
} as const;

export function LegalFooter({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <footer className="legal-footer">
      <nav aria-label={t.nav}>
        <a href={href("legal", lang)}>{t.legal}</a>
        <a href={href("privacy", lang)}>{t.privacy}</a>
      </nav>
      <div className="legal-footer-meta">
        <span className="legal-footer-copy">© {new Date().getFullYear()} The Loto Lab S.L.</span>
        <a className="arc-credit" href="https://arc-suite.com" target="_blank" rel="noopener" aria-label={t.creditLabel}>
          <span className="arc-credit-label">{t.credit}</span>
          <ArcMark className="arc-credit-mark" />
          <span className="arc-credit-name">ARC</span>
        </a>
      </div>
    </footer>
  );
}

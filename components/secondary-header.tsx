import { LangToggle } from "@/components/lang-toggle";
import { MobileMenu } from "@/components/mobile-menu";
import { navCopy, navLabels, navPages } from "@/components/site-nav-links";
import { href, type Lang, type PageKey } from "@/lib/i18n";

type SecondaryHeaderProps = {
  lang: Lang;
  page: PageKey;
  negative?: boolean;
};

export function SecondaryHeader({ lang, page, negative = false }: SecondaryHeaderProps) {
  return (
    <>
      <a href={href("home", lang)} className="secondary-logo-link" aria-label={navCopy[lang].backHome}>
        <img
          className={`flight-logo secondary-flight-logo ${negative ? "is-negative" : ""}`}
          src="/brand/logo-horizontal.svg"
          alt="The Loto Lab"
        />
      </a>
      <header className={`site-header secondary-site-header ${negative ? "is-negative" : ""}`}>
        <nav className="site-nav" aria-label={navCopy[lang].mainNav}>
          {navPages.map((key) => (
            <a key={key} href={href(key, lang)} aria-current={page === key ? "page" : undefined}>
              {navLabels[lang][key as keyof (typeof navLabels)["es"]]}
            </a>
          ))}
          <LangToggle lang={lang} page={page} />
          <MobileMenu lang={lang} page={page} negative={negative} />
        </nav>
      </header>
    </>
  );
}

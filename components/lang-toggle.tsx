"use client";

import { href, LANG_STORAGE_KEY, LANG_SWITCH_KEY, type Lang, type PageKey } from "@/lib/i18n";

const options: { lang: Lang; label: string; name: string }[] = [
  { lang: "es", label: "ES", name: "Español" },
  { lang: "en", label: "EN", name: "English" },
];

/** ES / EN switch. Links to the same page in the other language and remembers the choice. */
export function LangToggle({ lang, page, className = "" }: { lang: Lang; page: PageKey; className?: string }) {
  const remember = (target: Lang) => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, target);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      sessionStorage.setItem(
        LANG_SWITCH_KEY,
        JSON.stringify({ path: href(page, target), ratio: max > 0 ? window.scrollY / max : 0 }),
      );
    } catch {
      /* storage blocked: the link still works, the choice just isn't remembered */
    }
  };

  return (
    <span className={`lang-toggle ${className}`} role="group" aria-label={lang === "es" ? "Idioma" : "Language"}>
      {options.map((option, index) => (
        <span className="lang-toggle-item" key={option.lang}>
          {index > 0 && <span className="lang-toggle-sep" aria-hidden="true">/</span>}
          {option.lang === lang ? (
            <span className="lang-toggle-current" aria-current="true" lang={option.lang} title={option.name}>
              {option.label}
            </span>
          ) : (
            <a
              href={href(page, option.lang)}
              hrefLang={option.lang}
              lang={option.lang}
              aria-label={option.name}
              onClick={() => remember(option.lang)}
            >
              {option.label}
            </a>
          )}
        </span>
      ))}
    </span>
  );
}

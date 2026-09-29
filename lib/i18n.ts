export type Lang = "es" | "en";

export type PageKey = "home" | "projects" | "studio" | "services" | "contact" | "privacy" | "legal";

/** URL of every page in each language. Spanish is the default and keeps the original URLs. */
export const routes: Record<PageKey, Record<Lang, string>> = {
  home: { es: "/", en: "/en" },
  projects: { es: "/proyectos", en: "/en/projects" },
  studio: { es: "/estudio", en: "/en/studio" },
  services: { es: "/servicios", en: "/en/services" },
  contact: { es: "/contacto", en: "/en/contact" },
  privacy: { es: "/privacidad", en: "/en/privacy" },
  legal: { es: "/aviso-legal", en: "/en/legal-notice" },
};

export const href = (page: PageKey, lang: Lang) => routes[page][lang];

/** localStorage key holding the visitor's chosen language ("es" | "en"). */
export const LANG_STORAGE_KEY = "lotolab-lang";
/** sessionStorage key used to keep the scroll position when switching language. */
export const LANG_SWITCH_KEY = "lotolab-lang-switch";

export const normalizePath = (path: string) => (path.length > 1 ? path.replace(/\/+$/, "") : path) || "/";

/** True when the current page was opened by tapping the language toggle (used to skip the home intro). */
export function arrivedFromLangSwitch(): boolean {
  try {
    const raw = sessionStorage.getItem(LANG_SWITCH_KEY);
    if (!raw) return false;
    const { path } = JSON.parse(raw) as { path?: string };
    return normalizePath(path ?? "") === normalizePath(window.location.pathname);
  } catch {
    return false;
  }
}

/**
 * Runs before the page paints (inlined in <head>). If the visitor chose English earlier
 * and lands on a Spanish URL, send them to the English version of the same page.
 */
export const langRedirectScript = `(function(){try{
var m=${JSON.stringify(Object.fromEntries(Object.values(routes).map((r) => [r.es, r.en])))};
var p=location.pathname.replace(/\\/+$/,"")||"/";
if(localStorage.getItem("${LANG_STORAGE_KEY}")==="en"&&m[p]){location.replace(m[p]+location.search+location.hash);}
}catch(e){}})();`;

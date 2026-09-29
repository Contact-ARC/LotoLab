import { LegalFooter } from "@/components/legal-footer";
import { LangMemory } from "@/components/lang-memory";
import { langRedirectScript, type Lang } from "@/lib/i18n";
import { jsonLd } from "@/lib/site-meta";

/** Shared <html> shell for the Spanish and English root layouts. */
export function SiteDocument({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={lang}>
      <head>
        {lang === "es" && <script dangerouslySetInnerHTML={{ __html: langRedirectScript }} />}
      </head>
      <body>
        {children}
        <LegalFooter lang={lang} />
        <LangMemory />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(lang)) }}
        />
      </body>
    </html>
  );
}

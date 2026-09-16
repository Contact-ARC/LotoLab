import { MobileMenu } from "@/components/mobile-menu";

type SecondaryHeaderProps = {
  current?: "proyectos" | "estudio" | "servicios" | "contacto";
  negative?: boolean;
};

export function SecondaryHeader({ current, negative = false }: SecondaryHeaderProps) {
  return (
    <>
      <a href="/" className="secondary-logo-link" aria-label="Volver a The Loto Lab">
        <img
          className={`flight-logo secondary-flight-logo ${negative ? "is-negative" : ""}`}
          src="/brand/logo-horizontal.svg"
          alt="The Loto Lab"
        />
      </a>
      <header className={`site-header secondary-site-header ${negative ? "is-negative" : ""}`}>
        <nav className="site-nav" aria-label="Navegación principal">
          <a href="/proyectos" aria-current={current === "proyectos" ? "page" : undefined}>Proyectos</a>
          <a href="/estudio" aria-current={current === "estudio" ? "page" : undefined}>Estudio</a>
          <a href="/servicios" aria-current={current === "servicios" ? "page" : undefined}>Servicios</a>
          <a href="/contacto" aria-current={current === "contacto" ? "page" : undefined}>Contacto</a>
          <MobileMenu negative={negative} />
        </nav>
      </header>
    </>
  );
}

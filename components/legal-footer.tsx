export function LegalFooter() {
  return (
    <footer className="legal-footer">
      <nav aria-label="Información legal">
        <a href="/aviso-legal">Aviso legal</a>
        <a href="/privacidad">Política de privacidad</a>
      </nav>
      <span>© {new Date().getFullYear()} The Loto Lab S.L.</span>
    </footer>
  );
}

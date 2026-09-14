export function RoundArrow({ className = "" }: { className?: string }) {
  return <span className={`round-arrow ${className}`.trim()} aria-hidden="true">↗</span>;
}

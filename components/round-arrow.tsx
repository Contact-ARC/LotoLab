export function RoundArrow({ className = "" }: { className?: string }) {
  return (
    <span className={`round-arrow ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" focusable="false">
        <path d="M7 17 17 7" />
        <path d="M8 7h9v9" />
      </svg>
    </span>
  );
}

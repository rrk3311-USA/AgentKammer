interface TopHatIconProps {
  className?: string;
}

export function TopHatIcon({ className = "h-4 w-4" }: TopHatIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 14h12v2H6v-2zm1-8c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v6H7V6zm-2 10h14v4H5v-4z" />
    </svg>
  );
}

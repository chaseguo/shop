interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { text: "text-base", gap: "gap-0" },
  md: { text: "text-xl",   gap: "gap-0" },
  lg: { text: "text-3xl",  gap: "gap-0" },
};

export function Logo({ className = "", size = "md" }: LogoProps) {
  const { text } = sizeMap[size];
  return (
    <span className={`inline-flex items-baseline font-extrabold tracking-tight ${text} ${className}`}>
      <span style={{ color: "#d44000" }}>BULL</span>
      <span style={{ color: "#3652d9" }}>GEO</span>
    </span>
  );
}

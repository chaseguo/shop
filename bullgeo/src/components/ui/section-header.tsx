import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  center = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(center && "text-center", className)}>
      {eyebrow && (
        <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary mb-3">
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}

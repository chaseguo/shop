import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  changeUp?: boolean;
  icon?: LucideIcon;
  iconColor?: string;
  className?: string;
  children?: React.ReactNode;
}

export function StatCard({
  label,
  value,
  change,
  changeUp,
  icon: Icon,
  iconColor = "text-primary",
  className,
  children,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "card-lift relative overflow-hidden rounded-2xl border bg-card p-5 shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        {Icon && (
          <div className={cn("rounded-xl bg-primary/8 p-2", iconColor)}>
            <Icon className="h-4 w-4" />
          </div>
        )}
        {change && (
          <span
            className={cn(
              "text-xs font-semibold px-1.5 py-0.5 rounded-full",
              changeUp
                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
                : "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400"
            )}
          >
            {change}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold tracking-tight text-foreground">{value}</div>
      <div className="mt-0.5 text-sm text-muted-foreground">{label}</div>
      {children}
    </div>
  );
}

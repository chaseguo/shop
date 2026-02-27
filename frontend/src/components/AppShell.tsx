"use client";

import { useSidebar } from "@/contexts/sidebar-context";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();
  return (
    <div
      className={cn(
        "flex flex-col flex-1 min-w-0 overflow-hidden transition-[margin] duration-300 ease-in-out",
        collapsed ? "ml-16" : "ml-60"
      )}
    >
      {children}
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  LayoutDashboard, Radar, AlertTriangle, FileText,
  BookOpen, Share2, Settings, TrendingUp,
} from "lucide-react";

const navItems = [
  { label: "总览",              href: "/dashboard",    icon: LayoutDashboard },
  { label: "Detect · 可见度雷达", href: "/detect",       icon: Radar },
  { label: "Diagnose · 负面诊断", href: "/diagnose",     icon: AlertTriangle },
  { label: "Assets · 内容资产",   href: "/assets",       icon: FileText },
  { label: "Wiki · 证据库",       href: "/wiki",         icon: BookOpen },
  { label: "Distribution · 分发", href: "/distribution", icon: Share2 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={0}>
      <aside className="fixed left-0 top-0 h-screen w-60 flex flex-col z-40 bg-sidebar border-r border-sidebar-border">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2.5 px-5 border-b border-sidebar-border flex-shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary shadow-sm shadow-primary/30 flex-shrink-0">
            <TrendingUp className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <div className="font-bold text-sm text-sidebar-foreground leading-tight">BullGEO</div>
            <div className="text-[10px] text-muted-foreground leading-tight mt-0.5">LLM 推荐优化平台</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-2 mb-2">
            核心模块
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                    )}
                  >
                    <Icon className={cn(
                      "h-4 w-4 flex-shrink-0 transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground group-hover:text-sidebar-foreground"
                    )} />
                    <span className="flex-1 truncate leading-tight">{item.label}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="hidden">{item.label}</TooltipContent>
              </Tooltip>
            );
          })}

          <div className="pt-4 mt-4 border-t border-sidebar-border">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-2 mb-2">
              系统
            </div>
            <Link
              href="/settings"
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
                pathname === "/settings"
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <Settings className={cn(
                "h-4 w-4 flex-shrink-0 transition-colors",
                pathname === "/settings" ? "text-primary" : "text-muted-foreground group-hover:text-sidebar-foreground"
              )} />
              <span className="flex-1">设置</span>
            </Link>
          </div>
        </nav>

        {/* User */}
        <div className="px-3 pb-4">
          <div className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 hover:bg-sidebar-accent cursor-pointer transition-colors">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold flex-shrink-0">
              G
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-sidebar-foreground truncate">增长负责人</div>
              <div className="text-[10px] text-muted-foreground truncate">bullgeo.com</div>
            </div>
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}

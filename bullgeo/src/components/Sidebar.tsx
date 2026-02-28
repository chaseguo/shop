"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  Radar,
  AlertTriangle,
  FileText,
  BookOpen,
  Share2,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useSidebar } from "@/contexts/sidebar-context";

const navItems = [
  { label: "总览",        tooltip: "可见度总览",          href: "/dashboard",    icon: LayoutDashboard },
  { label: "可见度雷达",  tooltip: "Detect · 可见度雷达", href: "/detect",       icon: Radar },
  { label: "负面诊断",    tooltip: "Diagnose · 负面诊断", href: "/diagnose",     icon: AlertTriangle },
  { label: "内容资产",    tooltip: "Assets · 内容资产",   href: "/assets",       icon: FileText },
  { label: "证据库",      tooltip: "Evidence Wiki",       href: "/wiki",         icon: BookOpen },
  { label: "渠道分发",    tooltip: "Distribution · 分发", href: "/distribution", icon: Share2 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggle } = useSidebar();

  return (
    <TooltipProvider delayDuration={100}>
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen flex flex-col z-40 bg-sidebar border-r border-sidebar-border transition-[width] duration-300 ease-in-out overflow-hidden",
          collapsed ? "w-16" : "w-60"
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            "flex h-16 items-center border-b border-sidebar-border flex-shrink-0 overflow-hidden",
            collapsed ? "justify-center px-0" : "px-4"
          )}
        >
          {collapsed ? (
            <img
              src="/brand/bullgeo-icon.svg"
              alt="BullGEO"
              className="h-8 w-8 rounded-xl object-cover flex-shrink-0"
            />
          ) : (
            <img
              src="/brand/bullgeo-logo.svg"
              alt="BullGEO"
              className="h-9 w-auto object-contain"
            />
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-4 space-y-0.5">
          {!collapsed && (
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-2 mb-2 whitespace-nowrap">
              核心模块
            </div>
          )}

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
                      "group flex items-center rounded-xl transition-all duration-150",
                      collapsed
                        ? "justify-center h-10 w-10 mx-auto"
                        : "gap-3 px-3 py-2.5",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 flex-shrink-0 transition-colors",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-sidebar-foreground"
                      )}
                    />
                    <span
                      className={cn(
                        "flex-1 text-sm font-medium truncate leading-tight whitespace-nowrap transition-all duration-300",
                        collapsed ? "w-0 opacity-0 overflow-hidden" : "w-auto opacity-100"
                      )}
                    >
                      {item.label}
                    </span>
                    {isActive && !collapsed && (
                      <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    )}
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">{item.tooltip}</TooltipContent>
                )}
              </Tooltip>
            );
          })}

          {/* System section */}
          <div className="pt-4 mt-4 border-t border-sidebar-border">
            {!collapsed && (
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-2 mb-2 whitespace-nowrap">
                系统
              </div>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/settings"
                  className={cn(
                    "group flex items-center rounded-xl transition-all duration-150",
                    collapsed
                      ? "justify-center h-10 w-10 mx-auto"
                      : "gap-3 px-3 py-2.5",
                    pathname === "/settings"
                      ? "bg-primary/10 text-primary"
                      : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                  )}
                >
                  <Settings
                    className={cn(
                      "h-4 w-4 flex-shrink-0",
                      pathname === "/settings"
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-sidebar-foreground"
                    )}
                  />
                  <span
                    className={cn(
                      "flex-1 text-sm font-medium whitespace-nowrap transition-all duration-300",
                      collapsed ? "w-0 opacity-0 overflow-hidden" : "w-auto opacity-100"
                    )}
                  >
                    设置
                  </span>
                </Link>
              </TooltipTrigger>
              {collapsed && <TooltipContent side="right">系统设置</TooltipContent>}
            </Tooltip>
          </div>
        </nav>

        {/* Footer: toggle + user */}
        <div className={cn("px-2 pb-4 space-y-1", collapsed && "flex flex-col items-center")}>
          {/* Collapse toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={toggle}
                className={cn(
                  "flex items-center rounded-xl text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors",
                  collapsed
                    ? "justify-center h-10 w-10"
                    : "w-full h-9 gap-2 px-3"
                )}
              >
                {collapsed ? (
                  <PanelLeftOpen className="h-4 w-4 flex-shrink-0" />
                ) : (
                  <>
                    <PanelLeftClose className="h-4 w-4 flex-shrink-0" />
                    <span className="text-xs font-medium flex-1 text-left whitespace-nowrap">收起侧边栏</span>
                  </>
                )}
              </button>
            </TooltipTrigger>
            {collapsed && <TooltipContent side="right">展开侧边栏</TooltipContent>}
          </Tooltip>

          {/* User */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "flex items-center gap-2.5 rounded-xl hover:bg-sidebar-accent cursor-pointer transition-colors",
                  collapsed ? "justify-center h-10 w-10" : "px-3 py-2.5"
                )}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold flex-shrink-0">
                  G
                </div>
                <div
                  className={cn(
                    "flex-1 min-w-0 transition-all duration-300",
                    collapsed ? "w-0 opacity-0 overflow-hidden" : "w-auto opacity-100"
                  )}
                >
                  <div className="text-xs font-medium text-sidebar-foreground truncate whitespace-nowrap">增长负责人</div>
                  <div className="text-[10px] text-muted-foreground truncate whitespace-nowrap">bullgeo.com</div>
                </div>
              </div>
            </TooltipTrigger>
            {collapsed && <TooltipContent side="right">增长负责人</TooltipContent>}
          </Tooltip>
        </div>
      </aside>
    </TooltipProvider>
  );
}

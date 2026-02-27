"use client";

import { usePathname } from "next/navigation";
import { Search, Bell, RefreshCw, PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useSidebar } from "@/contexts/sidebar-context";

const pageMeta: Record<string, { title: string; desc: string }> = {
  "/dashboard":    { title: "可见度与口碑总览",         desc: "LLM 推荐竞争力指数（LRCI）实时监测" },
  "/detect":       { title: "可见度雷达",               desc: "多模型抽样任务管理与报告" },
  "/diagnose":     { title: "负面诊断",                 desc: "负面主题聚类分析与任务单生成" },
  "/assets":       { title: "内容资产",                 desc: "结构化内容生产与合规审批管理" },
  "/wiki":         { title: "Evidence Wiki",            desc: "可引用证据条目检索与管理" },
  "/distribution": { title: "渠道分发",                 desc: "多平台发布记录与效果追踪" },
  "/settings":     { title: "系统设置",                 desc: "模型配置、角色权限、审计日志" },
};

export default function TopBar() {
  const pathname = usePathname();
  const { collapsed, toggle } = useSidebar();
  const page = pageMeta[pathname] ?? { title: "BullGEO", desc: "" };

  return (
    <header className="flex h-14 items-center gap-3 px-5 border-b border-border/60 bg-background/90 backdrop-blur-sm flex-shrink-0">
      {/* Sidebar toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-xl text-muted-foreground hover:text-foreground flex-shrink-0"
        onClick={toggle}
      >
        {collapsed
          ? <PanelLeftOpen className="h-4 w-4" />
          : <PanelLeftClose className="h-4 w-4" />
        }
      </Button>

      {/* Page title */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <h1 className="text-sm font-semibold text-foreground leading-tight truncate">{page.title}</h1>
          {page.desc && (
            <span className="text-xs text-muted-foreground hidden lg:block truncate">{page.desc}</span>
          )}
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="搜索品牌、主题..."
            className="pl-8 h-8 w-44 text-xs rounded-xl bg-muted/50 border-transparent focus-visible:bg-background focus-visible:border-border"
          />
        </div>

        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl text-muted-foreground hover:text-foreground">
          <RefreshCw className="h-3.5 w-3.5" />
        </Button>

        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl text-muted-foreground hover:text-foreground relative">
          <Bell className="h-3.5 w-3.5" />
          <Badge className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 p-0 text-[9px] flex items-center justify-center rounded-full">
            3
          </Badge>
        </Button>

        <ThemeToggle />
      </div>
    </header>
  );
}

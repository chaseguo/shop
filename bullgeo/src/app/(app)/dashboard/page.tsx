"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
  TrendingUp, Eye, AlertCircle, FileText,
  ChevronRight, Zap, CheckCircle2, Clock, Timer,
  ArrowUpRight, ArrowDownRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import { cn } from "@/lib/utils";

const LRCIGauge   = dynamic(() => import("@/components/charts/LRCIGauge"),   { ssr: false });
const TrendLine   = dynamic(() => import("@/components/charts/TrendLine"),   { ssr: false });
const BrandBar    = dynamic(() => import("@/components/charts/BrandBar"),    { ssr: false });
const TopicBubble = dynamic(() => import("@/components/charts/TopicBubble"), { ssr: false });
const ModelRadar  = dynamic(() => import("@/components/charts/ModelRadar"),  { ssr: false });

const gen = (base: number, len = 30) =>
  Array.from({ length: len }, (_, i) => ({
    date: `02/${String(i + 1).padStart(2, "0")}`,
    value: Math.round(base + Math.sin(i * 0.5) * 4 + Math.random() * 2.5),
  }));

const kpis = [
  {
    label: "LRCI 指数",   value: "47.2", change: "+3.1",  changeUp: true,
    iconColor: "text-blue-500 bg-blue-500/8",
    icon: TrendingUp, trend: gen(45), trendColor: "#3b82f6",
  },
  {
    label: "推荐率",       value: "35%",  change: "+2%",   changeUp: true,
    iconColor: "text-emerald-500 bg-emerald-500/8",
    icon: Eye, trend: gen(33), trendColor: "#10b981",
  },
  {
    label: "负面占比",     value: "18%",  change: "−1.5%", changeUp: false,
    iconColor: "text-red-500 bg-red-500/8",
    icon: AlertCircle, trend: gen(20).map(d => ({ ...d, value: Math.max(12, d.value) })), trendColor: "#ef4444",
  },
  {
    label: "可引用条目",   value: "142",  change: "+12",   changeUp: true,
    iconColor: "text-violet-500 bg-violet-500/8",
    icon: FileText, trend: gen(130), trendColor: "#8b5cf6",
  },
];

const brandData = [
  { name: "奇富借条", value: 40, color: "#10b981" },
  { name: "洋钱罐",   value: 28, color: "#3b82f6" },
  { name: "核心客户",   value: 18, color: "#8b5cf6" },
  { name: "马上消费", value: 8,  color: "#f59e0b" },
  { name: "其他",     value: 6,  color: "#94a3b8" },
];

const tasks = [
  { id: "T-041", title: '补充【提前还款是否收费】FAQ',    priority: "high",   status: "待处理", model: "Kimi" },
  { id: "T-040", title: '更新【日利率计算方式】条款解释', priority: "high",   status: "审核中", model: "豆包" },
  { id: "T-039", title: "新增白领场景化说明",             priority: "medium", status: "已完成", model: "DeepSeek" },
  { id: "T-038", title: '澄清【核心客户品牌归属】说明',     priority: "medium", status: "已完成", model: "Kimi" },
];

const priorityColors: Record<string, string> = {
  high: "bg-red-500",
  medium: "bg-amber-500",
  low: "bg-slate-400",
};

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline"; icon: React.ReactNode }> = {
  "待处理": { label: "待处理", variant: "outline",   icon: <Clock className="h-3 w-3" /> },
  "审核中": { label: "审核中", variant: "secondary", icon: <Timer className="h-3 w-3" /> },
  "已完成": { label: "已完成", variant: "default",   icon: <CheckCircle2 className="h-3 w-3" /> },
};

export default function DashboardPage() {
  return (
    <div className="space-y-5">
      {/* Alert banner */}
      <div className="flex items-center justify-between rounded-2xl border border-blue-200 bg-blue-50 dark:border-blue-900/60 dark:bg-blue-950/30 px-5 py-3">
        <div className="flex items-center gap-2.5 text-sm text-blue-700 dark:text-blue-300">
          <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse flex-shrink-0" />
          最近抽样：2026-02-24 · 豆包+Kimi+DeepSeek 各 30 轮 · 基线对比 2026-02-01
        </div>
        <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400 h-7 rounded-lg text-xs flex-shrink-0" asChild>
          <Link href="/detect">查看 <ChevronRight className="h-3 w-3 ml-0.5" /></Link>
        </Button>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          const [iconText, iconBg] = k.iconColor.split(" ");
          return (
            <StatCard
              key={k.label}
              label={`${k.label} · 较上周`}
              value={k.value}
              change={k.change}
              changeUp={k.changeUp}
              icon={Icon}
              iconColor={`${iconBg} ${iconText}`}
            >
              <div className="mt-2">
                <TrendLine data={k.trend} color={k.trendColor} height={44} />
              </div>
            </StatCard>
          );
        })}
      </div>

      {/* Row 2: LRCI + Brand + Radar */}
      <div className="grid grid-cols-12 gap-4">
        {/* LRCI gauge */}
        <div className="col-span-12 lg:col-span-3 rounded-2xl border bg-card p-5 shadow-sm">
          <div className="text-sm font-semibold text-foreground">LRCI 综合指数</div>
          <div className="text-xs text-muted-foreground mt-0.5 mb-1">核心客户 · 本期 47.2 / 均值 58.0</div>
          <LRCIGauge value={47} />
          <div className="space-y-1.5 mt-1">
            {[
              { label: "推荐率 × 0.35",    val: "35%",  up: true },
              { label: "Top1 占比 × 0.25", val: "18%",  up: true },
              { label: "正向提及 × 0.20",  val: "42%",  up: true },
              { label: "负面提及 × 0.20",  val: "18%",  up: false },
            ].map(r => (
              <div key={r.label} className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">{r.label}</span>
                <span className={cn("font-semibold flex items-center gap-0.5", r.up ? "text-emerald-600 dark:text-emerald-400" : "text-red-500")}>
                  {r.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {r.val}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Brand bar */}
        <div className="col-span-12 lg:col-span-4 rounded-2xl border bg-card p-5 shadow-sm">
          <div className="flex items-baseline justify-between mb-1">
            <div className="text-sm font-semibold text-foreground">品牌推荐率排行</div>
            <span className="text-xs text-muted-foreground">豆包 · 2026-02 n=90</span>
          </div>
          <BrandBar data={brandData} height={208} />
        </div>

        {/* Radar */}
        <div className="col-span-12 lg:col-span-5 rounded-2xl border bg-card p-5 shadow-sm">
          <div className="flex items-baseline justify-between mb-0.5">
            <div className="text-sm font-semibold text-foreground">竞争力雷达对比</div>
            <span className="text-xs text-muted-foreground">三模型综合 · 五维</span>
          </div>
          <div className="text-xs text-muted-foreground mb-1">核心客户 vs 奇富借条 vs 洋钱罐</div>
          <ModelRadar height={224} />
        </div>
      </div>

      {/* Row 3: Bubble + Tasks */}
      <div className="grid grid-cols-12 gap-4">
        {/* Bubble */}
        <div className="col-span-12 lg:col-span-6 rounded-2xl border bg-card p-5 shadow-sm">
          <div className="flex items-baseline justify-between mb-1">
            <div className="text-sm font-semibold text-foreground">负面主题分布</div>
            <Button variant="ghost" size="sm" className="h-6 text-xs rounded-lg" asChild>
              <Link href="/diagnose">详细诊断 <ChevronRight className="h-3 w-3 ml-0.5" /></Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mb-2">气泡大小 = 严重度 · X轴 = 影响分 · Y轴 = 提及次数</p>
          <TopicBubble height={220} />
        </div>

        {/* Tasks */}
        <div className="col-span-12 lg:col-span-6 rounded-2xl border bg-card p-5 shadow-sm">
          <div className="flex items-baseline justify-between mb-3">
            <div className="text-sm font-semibold text-foreground">近期任务单</div>
            <Button variant="ghost" size="sm" className="h-6 text-xs rounded-lg" asChild>
              <Link href="/diagnose">全部 <ChevronRight className="h-3 w-3 ml-0.5" /></Link>
            </Button>
          </div>
          <div className="space-y-2">
            {tasks.map((t) => {
              const s = statusConfig[t.status];
              return (
                <div
                  key={t.id}
                  className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/30 px-3 py-2.5 hover:border-border transition-colors"
                >
                  <span className={cn("h-5 w-1 rounded-full flex-shrink-0", priorityColors[t.priority])} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-foreground truncate">{t.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{t.id} · {t.model}</div>
                  </div>
                  <Badge variant={s.variant} className="flex items-center gap-1 text-xs flex-shrink-0">
                    {s.icon}{s.label}
                  </Badge>
                </div>
              );
            })}
          </div>

          {/* Progress */}
          <div className="mt-4 pt-4 border-t border-border/60">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>本周完成进度</span>
              <span className="font-semibold text-foreground">8 / 16</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-primary to-cyan-500" style={{ width: "50%" }} />
            </div>
            <div className="flex gap-4 mt-2.5">
              {[
                { l: "已完成", v: 8,  c: "text-emerald-600 dark:text-emerald-400" },
                { l: "进行中", v: 3,  c: "text-blue-500" },
                { l: "待处理", v: 5,  c: "text-amber-500" },
              ].map(s => (
                <div key={s.l} className="flex items-center gap-1.5 text-xs">
                  <span className={cn("font-bold text-sm", s.c)}>{s.v}</span>
                  <span className="text-muted-foreground">{s.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Insight */}
          <div className="mt-3 flex gap-2 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/20 p-3">
            <Zap className="h-3.5 w-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
              <strong>本期洞察：</strong>Kimi 对核心客户利率描述存在误差（偏高约 3%），建议优先澄清。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

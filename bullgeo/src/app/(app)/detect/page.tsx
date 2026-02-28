"use client";

import { useState } from "react";
import { Plus, Play, CheckCircle2, Clock, Filter, Zap, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const TrendLine = dynamic(() => import("@/components/charts/TrendLine"), { ssr: false });
const BrandBar  = dynamic(() => import("@/components/charts/BrandBar"),  { ssr: false });

const jobs = [
  { id: "J-0128", model: "豆包",    template: "对比型推荐（预算5K）", rounds: 30, status: "completed", startedAt: "02-24 09:00", rec_rate: 35 },
  { id: "J-0127", model: "Kimi",    template: "建议型（白领人群）",   rounds: 30, status: "completed", startedAt: "02-24 09:00", rec_rate: 28 },
  { id: "J-0126", model: "DeepSeek",template: "风险型（利率敏感）",   rounds: 30, status: "running",   startedAt: "02-24 10:00", rec_rate: null },
  { id: "J-0125", model: "豆包",    template: "预算型（5K以下）",     rounds: 20, status: "completed", startedAt: "02-17 09:00", rec_rate: 32 },
  { id: "J-0124", model: "Kimi",    template: "对比型推荐（预算5K）", rounds: 30, status: "failed",    startedAt: "02-17 09:00", rec_rate: null },
];

const templates = [
  { id: "T-001", name: "对比型推荐（预算5K）",  category: "对比型", desc: "用户询问 5000 元额度内最佳信贷 App 推荐", params: "budget=5000" },
  { id: "T-002", name: "建议型（白领人群）",     category: "建议型", desc: "白领用户寻求短期资金周转建议",           params: "user=white_collar" },
  { id: "T-003", name: "风险型（利率敏感）",     category: "风险型", desc: "利率敏感用户询问低息借贷产品",           params: "sensitivity=rate" },
  { id: "T-004", name: "预算型（5K以下）",       category: "预算型", desc: "小额借贷场景推荐",                      params: "budget=5000" },
  { id: "T-005", name: "个体经营者场景",         category: "场景型", desc: "个体工商户流动资金需求",                 params: "user=self_employed" },
];

const gen = (base: number) =>
  Array.from({ length: 20 }, (_, i) => ({
    date: `02/${String(i + 1).padStart(2, "0")}`,
    value: Math.round(base + Math.sin(i * 0.4) * 3 + Math.random() * 2),
  }));

const modelBadge: Record<string, string> = {
  "豆包":    "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "Kimi":   "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "DeepSeek":"bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

const statusMap: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
  completed: { label: "已完成", cls: "text-emerald-600 dark:text-emerald-400", icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
  running:   { label: "运行中", cls: "text-blue-500",   icon: <div className="h-3.5 w-3.5 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" /> },
  failed:    { label: "失败",   cls: "text-red-500",    icon: <div className="h-3.5 w-3.5 rounded-full bg-red-400" /> },
};

export default function DetectPage() {
  const [tab, setTab] = useState<"jobs" | "templates" | "reports">("jobs");
  const [showNew, setShowNew] = useState(false);

  return (
    <div className="space-y-5">
      {/* Tabs + action */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 p-1 rounded-xl bg-muted border border-border">
          {(["jobs", "templates", "reports"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
                tab === t
                  ? "bg-background text-foreground shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t === "jobs" ? "抽样任务" : t === "templates" ? "问法模板" : "可见度报告"}
            </button>
          ))}
        </div>
        <Button size="sm" className="rounded-xl" onClick={() => setShowNew(true)}>
          <Plus className="h-3.5 w-3.5 mr-1.5" /> 新建任务
        </Button>
      </div>

      {/* ── Tab: Jobs ── */}
      {tab === "jobs" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "总任务数", value: "128", sub: "本月 28",      color: "text-blue-500" },
              { label: "成功率",   value: "96.1%", sub: "↑ 较上月",  color: "text-emerald-500" },
              { label: "平均耗时", value: "32min", sub: "3 模型并发", color: "text-amber-500" },
              { label: "样本总量", value: "3,840", sub: "条回答原文", color: "text-violet-500" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border bg-card p-4 shadow-sm">
                <div className="text-xs text-muted-foreground mb-1">{s.label}</div>
                <div className={cn("text-2xl font-bold", s.color)}>{s.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-border/60">
              <span className="text-sm font-semibold text-foreground">抽样任务列表</span>
              <Button variant="ghost" size="sm" className="rounded-xl h-7 text-xs">
                <Filter className="h-3 w-3 mr-1" /> 筛选
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/60 bg-muted/30">
                    {["任务 ID", "模型", "问法模板", "轮次", "推荐率", "状态", "开始时间", ""].map((h) => (
                      <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {jobs.map((job) => {
                    const s = statusMap[job.status];
                    return (
                      <tr key={job.id} className="hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-3 text-xs font-mono text-primary">{job.id}</td>
                        <td className="px-4 py-3">
                          <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", modelBadge[job.model])}>
                            {job.model}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-foreground">{job.template}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{job.rounds}</td>
                        <td className="px-4 py-3">
                          {job.rec_rate != null
                            ? <span className="text-sm font-bold text-foreground">{job.rec_rate}%</span>
                            : <span className="text-muted-foreground">—</span>}
                        </td>
                        <td className="px-4 py-3">
                          <span className={cn("flex items-center gap-1.5 text-xs font-medium", s.cls)}>
                            {s.icon}{s.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{job.startedAt}</td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="sm" className="h-7 text-xs rounded-lg">
                            查看 <ChevronRight className="h-3 w-3 ml-0.5" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Templates ── */}
      {tab === "templates" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((tpl) => (
            <div key={tpl.id} className="card-lift rounded-2xl border bg-card p-5 shadow-sm hover:border-primary/30">
              <div className="flex items-start justify-between mb-3">
                <Badge variant="secondary" className="text-xs">{tpl.category}</Badge>
                <span className="text-xs font-mono text-muted-foreground">{tpl.id}</span>
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-2">{tpl.name}</h3>
              <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{tpl.desc}</p>
              <div className="font-mono text-xs text-muted-foreground bg-muted/50 rounded-lg px-2.5 py-1.5 mb-4">{tpl.params}</div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 rounded-xl h-8 text-xs">
                  <Play className="h-3 w-3 mr-1" /> 执行
                </Button>
                <Button variant="outline" size="sm" className="rounded-xl h-8 text-xs px-3">编辑</Button>
              </div>
            </div>
          ))}
          <button className="card-lift rounded-2xl border-2 border-dashed border-border hover:border-primary/40 flex flex-col items-center justify-center gap-2 p-8 text-muted-foreground hover:text-foreground transition-colors min-h-[200px]">
            <Plus className="h-6 w-6" />
            <span className="text-sm font-medium">新建模板</span>
          </button>
        </div>
      )}

      {/* ── Tab: Reports ── */}
      {tab === "reports" && (
        <div className="space-y-5">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { model: "豆包",     base: 35, color: "#3b82f6" },
              { model: "Kimi",    base: 28, color: "#10b981" },
              { model: "DeepSeek",base: 22, color: "#f59e0b" },
            ].map(({ model, base, color }) => (
              <div key={model} className="card-lift rounded-2xl border bg-card p-4 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: color }} />
                    <span className="text-sm font-semibold text-foreground">{model}</span>
                  </div>
                  <span className="text-xl font-bold" style={{ color }}>{base}%</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">度小满推荐率 · 2026-02</p>
                <TrendLine data={gen(base)} color={color} height={72} />
              </div>
            ))}
          </div>

          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <div className="flex items-baseline justify-between mb-4">
              <div>
                <div className="text-sm font-semibold text-foreground">品牌推荐率对比</div>
                <div className="text-xs text-muted-foreground mt-0.5">豆包 · 金融信贷 App</div>
              </div>
              <div className="flex gap-2">
                {["对比型", "建议型", "风险型"].map(t => (
                  <Button key={t} variant="outline" size="sm" className="h-7 text-xs rounded-xl">{t}</Button>
                ))}
              </div>
            </div>
            <BrandBar
              data={[
                { name: "奇富借条", value: 40, color: "#10b981" },
                { name: "洋钱罐",   value: 28, color: "#3b82f6" },
                { name: "度小满",   value: 18, color: "#8b5cf6" },
                { name: "马上消费", value: 8,  color: "#f59e0b" },
                { name: "360金融",  value: 4,  color: "#94a3b8" },
              ]}
              height={200}
            />
          </div>

          <div className="flex gap-2.5 rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/20 p-4">
            <Zap className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed space-y-1">
              <p className="font-semibold">本期诊断摘要</p>
              <p>• 度小满在豆包的推荐率（35%）低于行业均值约 12pp，主因：奇富借条可引用内容质量更高</p>
              <p>• DeepSeek 风险型问法对度小满负面提及率上升至 22%，较上月 +4%</p>
              <p>• Kimi 对度小满利率的描述存在<span className="text-red-500 dark:text-red-400 font-medium">误差（APR 偏高约 3%）</span>，需优先澄清</p>
            </div>
          </div>
        </div>
      )}

      {/* New job modal */}
      {showNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowNew(false)}>
          <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-base font-semibold text-foreground mb-5">新建抽样任务</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">选择模型</label>
                <div className="flex gap-2">
                  {["豆包", "Kimi", "DeepSeek"].map(m => (
                    <button key={m} className="flex-1 py-2 rounded-xl border border-border text-sm text-foreground hover:border-primary hover:bg-primary/5 transition-colors">{m}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">问法模板</label>
                <select className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring">
                  {templates.map(t => <option key={t.id}>{t.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">执行轮次</label>
                <input type="number" defaultValue={30} className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setShowNew(false)}>取消</Button>
              <Button className="flex-1 rounded-xl">
                <Play className="h-3.5 w-3.5 mr-1.5" /> 立即执行
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

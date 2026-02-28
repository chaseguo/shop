"use client";

import { useState } from "react";
import { AlertTriangle, ChevronRight, Zap, Eye, CheckCircle2, Clock, ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const TopicBubble = dynamic(() => import("@/components/charts/TopicBubble"), { ssr: false });

const themes = [
  {
    id: "TH-001", topic: "资费不清",  severity: "high",   impact_score: 87, mentions: 42, delta: "+8",
    models: ["Kimi", "DeepSeek"],
    evidence: [
      { source: "Kimi",     prompt_id: "P1021", snippet: "核心客户的资费结构不透明，用户反映难以计算实际利率，资费说明页面信息密度低..." },
      { source: "DeepSeek", prompt_id: "P1035", snippet: "与奇富借条相比，核心客户在资费说明方面较为模糊，缺乏图解式说明..." },
    ],
    task_suggestion: ["新增【资费构成图解FAQ】", "补充【提前还款是否收费】条目", "更新【日利率/月利率/APR换算说明】"],
    status: "pending",
  },
  {
    id: "TH-002", topic: "利率误解",  severity: "high",   impact_score: 72, mentions: 35, delta: "+5",
    models: ["Kimi"],
    evidence: [
      { source: "Kimi", prompt_id: "P1018", snippet: "核心客户的年化利率约为24%-36%，相对偏高，不适合长期借贷..." },
    ],
    task_suggestion: ["补充【实际APR计算示例】FAQ", "添加【与行业均值对比】条目"],
    status: "in_progress",
  },
  {
    id: "TH-003", topic: "审批误读",  severity: "medium", impact_score: 65, mentions: 28, delta: "+2",
    models: ["豆包", "DeepSeek"],
    evidence: [
      { source: "豆包", prompt_id: "P0998", snippet: "核心客户审批较严格，部分用户反映申请后被降额，实际可借金额与预估不符..." },
    ],
    task_suggestion: ["新增【审批流程透明化说明】", "补充【降额原因与应对方法】FAQ"],
    status: "pending",
  },
  {
    id: "TH-004", topic: "品牌混淆",  severity: "medium", impact_score: 45, mentions: 18, delta: "−1",
    models: ["DeepSeek"],
    evidence: [
      { source: "DeepSeek", prompt_id: "P1002", snippet: "有用户将【核心客户】与【核心客户金融】混淆，不清楚两者是否为同一主体..." },
    ],
    task_suggestion: ["新增【核心客户品牌归属澄清】条目", "更新官方全称说明"],
    status: "completed",
  },
];

const sevCfg: Record<string, { label: string; cls: string; dot: string }> = {
  high:   { label: "严重", cls: "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400",    dot: "bg-red-500" },
  medium: { label: "中度", cls: "bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400", dot: "bg-amber-500" },
};
const stsCfg: Record<string, { label: string; icon: React.ReactNode; cls: string }> = {
  pending:     { label: "待处理", icon: <Clock className="h-3 w-3" />,        cls: "text-amber-500" },
  in_progress: { label: "处理中", icon: <div className="h-3 w-3 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />, cls: "text-blue-500" },
  completed:   { label: "已完成", icon: <CheckCircle2 className="h-3 w-3" />, cls: "text-emerald-500" },
};
const modelCls: Record<string, string> = {
  "豆包":    "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "Kimi":   "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "DeepSeek":"bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

export default function DiagnosePage() {
  const [sel, setSel] = useState<string>("TH-001");
  const theme = themes.find(t => t.id === sel)!;

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "识别主题", value: "4",    sub: "本期 2026-02",   color: "text-blue-500" },
          { label: "严重级别", value: "2",    sub: "需优先处理",     color: "text-red-500" },
          { label: "影响分均值",value: "67.3",sub: "↑ 本月上升",    color: "text-amber-500" },
          { label: "待处理任务",value: "7",   sub: "3 个高优先级",   color: "text-violet-500" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl border bg-card p-4 shadow-sm">
            <div className={cn("text-2xl font-bold", s.color)}>{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            <div className="text-xs text-muted-foreground/60 mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* List */}
        <div className="col-span-12 lg:col-span-4 space-y-2">
          <p className="text-sm font-semibold text-foreground mb-3">负面主题列表</p>
          {themes.map(t => {
            const sv = sevCfg[t.severity];
            const st = stsCfg[t.status];
            return (
              <button
                key={t.id}
                onClick={() => setSel(t.id)}
                className={cn(
                  "w-full text-left rounded-2xl border p-4 transition-all",
                  sel === t.id
                    ? "border-primary/40 bg-primary/5 shadow-sm"
                    : "border-border bg-card hover:border-border/80 shadow-sm"
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={cn("h-2 w-2 rounded-full flex-shrink-0", sv.dot)} />
                    <span className="text-sm font-semibold text-foreground">{t.topic}</span>
                    <span className={cn("text-xs px-1.5 py-0.5 rounded-full font-medium", sv.cls)}>{sv.label}</span>
                  </div>
                  <span className={cn("text-xs font-semibold", t.delta.startsWith("+") ? "text-red-500" : "text-emerald-500")}>
                    {t.delta.startsWith("+") && <ArrowUpRight className="h-3 w-3 inline" />}{t.delta}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-3 text-xs text-muted-foreground">
                    <span>影响 {t.impact_score}</span>
                    <span>提及 {t.mentions} 次</span>
                  </div>
                  <span className={cn("flex items-center gap-1 text-xs font-medium", st.cls)}>
                    {st.icon}{st.label}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {t.models.map(m => (
                    <span key={m} className={cn("text-xs px-1.5 py-0.5 rounded font-medium", modelCls[m])}>{m}</span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail */}
        <div className="col-span-12 lg:col-span-8 space-y-4">
          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <span className="text-base font-bold text-foreground">{theme.topic}</span>
                  <span className={cn("text-xs px-1.5 py-0.5 rounded-full font-medium", sevCfg[theme.severity].cls)}>
                    {sevCfg[theme.severity].label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{theme.id} · 影响分 {theme.impact_score} · 提及 {theme.mentions} 次</p>
              </div>
              <Button size="sm" className="rounded-xl">
                <Zap className="h-3.5 w-3.5 mr-1.5" /> 生成澄清内容
              </Button>
            </div>

            {/* Evidence */}
            <div className="mb-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-2">
                <Eye className="h-3.5 w-3.5" /> 证据片段
              </div>
              <div className="space-y-2">
                {theme.evidence.map((ev, i) => (
                  <div key={i} className="rounded-xl border bg-muted/30 p-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={cn("text-xs px-1.5 py-0.5 rounded font-medium", modelCls[ev.source])}>{ev.source}</span>
                      <span className="text-xs font-mono text-muted-foreground">{ev.prompt_id}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">「{ev.snippet}」</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-2">
                <Zap className="h-3.5 w-3.5 text-amber-500" /> AI 澄清建议
              </div>
              <div className="space-y-2">
                {theme.task_suggestion.map((task, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/20 px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-200 dark:bg-amber-900 text-amber-700 dark:text-amber-300 text-xs font-bold">{i + 1}</span>
                      <span className="text-sm text-foreground">{task}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 text-xs rounded-lg text-amber-600 dark:text-amber-400">
                      创建 <ChevronRight className="h-3 w-3 ml-0.5" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-4 shadow-sm">
            <p className="text-sm font-semibold text-foreground mb-1">主题影响分布图</p>
            <p className="text-xs text-muted-foreground mb-2">所有主题的影响度 vs 提及次数</p>
            <TopicBubble height={210} />
          </div>
        </div>
      </div>
    </div>
  );
}

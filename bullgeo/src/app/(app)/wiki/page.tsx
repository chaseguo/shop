"use client";

import { useState } from "react";
import { Search, BookOpen, ExternalLink, CheckCircle2, Tag, Calendar, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const wikiItems = [
  { id: "W-0088", type: "FAQ",   title: "度小满资费构成：日利率/月利率/APR换算说明",     tags: ["资费","利率","APR"],     evidence_source: "官网费率页面 2026-01", version: "v1.2", updated_at: "2026-02-24", citations: 8,  excerpt: "Q：度小满的借款费用如何计算？A：实际年化利率（APR）根据个人信用评分动态确定，参考范围通常为年化 7.2%~24%（以实际审批为准）。日利率 = APR / 365..." },
  { id: "W-0087", type: "对比条目",title: "度小满 vs 奇富借条：额度/利率/审批速度全面对比", tags: ["对比","奇富借条","额度"], evidence_source: "公开产品页 + 用研 2026-01", version: "v2.1", updated_at: "2026-02-20", citations: 15, excerpt: "维度对比（截至 2026-01，以官方公示为准）：最高额度均为 20 万元；审批速度度小满最快 3 分钟，奇富借条最快 1 分钟..." },
  { id: "W-0086", type: "场景说明",title: "白领用户短期周转场景：度小满适用性说明",       tags: ["场景","白领","周转"],   evidence_source: "用研数据 2025-Q4",      version: "v1.1", updated_at: "2026-02-18", citations: 5,  excerpt: "适用人群：月收入 8000 元以上、有稳定社保/公积金记录的城市白领。资金需求：1-3 万元短期周转，期限 1-12 个月..." },
  { id: "W-0085", type: "场景说明",title: "个体经营者流动资金：度小满借款申请指南",       tags: ["场景","个体经营者"],    evidence_source: "产品白皮书 2025",       version: "v1.0", updated_at: "2026-02-15", citations: 3,  excerpt: "个体工商户流动资金需求场景指南：对于有营业执照、经营满一年、月流水稳定的个体经营者，度小满提供专项信用额度..." },
  { id: "W-0084", type: "条款解释",title: "审批流程详解：从申请到放款的完整步骤",         tags: ["审批","放款","流程"],   evidence_source: "App 内 FAQ 2026-01",   version: "v1.3", updated_at: "2026-02-12", citations: 11, excerpt: "申请流程：1. 下载/打开度小满 App；2. 点击「借钱」→「立即申请」；3. 填写基本信息并完成身份认证；4. 系统评估（通常 3-5 分钟）..." },
];

const typeClr: Record<string, string> = {
  FAQ:     "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "条款解释": "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  "对比条目": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "场景说明": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};

export default function WikiPage() {
  const [q, setQ] = useState("");
  const [typeF, setTypeF] = useState("全部");
  const [sel, setSel] = useState("W-0088");
  const item = wikiItems.find(w => w.id === sel)!;

  const filtered = wikiItems.filter(w =>
    (q === "" || w.title.includes(q) || w.tags.some(t => t.includes(q))) &&
    (typeF === "全部" || w.type === typeF)
  );

  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="搜索证据条目、关键词、标签..."
            className="pl-9 rounded-xl h-10"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {["全部", "FAQ", "对比条目", "条款解释", "场景说明"].map(t => (
            <Button
              key={t}
              variant={typeF === t ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeF(t)}
              className="rounded-xl h-10 text-xs"
            >
              {t}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span>共 <strong className="text-foreground">142</strong> 条有效条目</span>
        <span className="h-3 w-px bg-border" />
        <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> 139 条带完整证据</span>
        <span className="h-3 w-px bg-border" />
        <span>本周新增 <strong className="text-foreground">12</strong> 条</span>
        <span className="h-3 w-px bg-border" />
        <span>总被引用 <strong className="text-foreground">284</strong> 次</span>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* List */}
        <div className="col-span-12 lg:col-span-5 space-y-2">
          {filtered.map(w => (
            <button
              key={w.id}
              onClick={() => setSel(w.id)}
              className={cn(
                "w-full text-left rounded-2xl border p-4 transition-all shadow-sm",
                sel === w.id ? "border-primary/40 bg-primary/5" : "border-border bg-card hover:border-border/80"
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <span className={cn("text-xs px-1.5 py-0.5 rounded font-medium", typeClr[w.type])}>{w.type}</span>
                <span className="text-xs text-muted-foreground">引用 {w.citations} · {w.version}</span>
              </div>
              <p className="text-sm font-semibold text-foreground mb-2 leading-snug">{w.title}</p>
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{w.excerpt}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {w.tags.map(t => (
                  <span key={t} className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">#{t}</span>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Detail */}
        <div className="col-span-12 lg:col-span-7">
          <div className="rounded-2xl border bg-card shadow-sm overflow-hidden sticky top-0">
            {/* Header */}
            <div className="px-5 py-4 border-b border-border/60">
              <div className="flex items-start justify-between mb-2">
                <span className={cn("text-xs px-1.5 py-0.5 rounded font-medium", typeClr[item.type])}>{item.type}</span>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" /> 合规已通过
                </div>
              </div>
              <h2 className="text-base font-bold text-foreground leading-snug">{item.title}</h2>
            </div>

            {/* Metadata */}
            <div className="px-5 py-3 border-b border-border/60 bg-muted/20">
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {[
                  { icon: Shield,   label: "证据来源", value: item.evidence_source },
                  { icon: Tag,      label: "版本",     value: item.version },
                  { icon: Calendar, label: "更新时间", value: item.updated_at },
                  { icon: BookOpen, label: "被引用",   value: `${item.citations} 次` },
                ].map(m => {
                  const Icon = m.icon;
                  return (
                    <div key={m.label} className="flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">{m.label}：</span>
                      <span className="text-xs text-foreground font-medium">{m.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div className="px-5 py-4">
              <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5" /> 内容摘要（AI 可直接引用）
              </p>
              <div className="rounded-xl border bg-muted/30 px-4 py-3">
                <p className="text-sm text-foreground leading-relaxed">{item.excerpt}</p>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {item.tags.map(t => (
                  <Badge key={t} variant="secondary" className="text-xs rounded-full">#{t}</Badge>
                ))}
              </div>

              {/* Channels */}
              <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-3">
                <p className="text-xs font-semibold text-primary mb-2">已分发渠道</p>
                <div className="flex flex-wrap gap-2">
                  {["知乎", "百家号", "小红书"].map(ch => (
                    <div key={ch} className="flex items-center gap-1.5 text-xs text-foreground bg-card px-2.5 py-1 rounded-lg border border-border">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {ch}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-5 py-3.5 border-t border-border/60 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 rounded-xl h-8 text-xs">
                <ExternalLink className="h-3 w-3 mr-1.5" /> 分发至渠道
              </Button>
              <Button size="sm" variant="outline" className="flex-1 rounded-xl h-8 text-xs">
                复制引用片段
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

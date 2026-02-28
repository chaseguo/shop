"use client";

import { useState } from "react";
import { Share2, CheckCircle2, Clock, XCircle, ExternalLink, TrendingUp, BarChart2 } from "lucide-react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const TrendLine = dynamic(() => import("@/components/charts/TrendLine"), { ssr: false });

const records = [
  { id: "D-0412", asset_title: "核心客户资费构成：APR换算说明", asset_id: "W-0088", channel: "知乎",   post_url: "#", publish_status: "published", indexed_status: "indexed",     published_at: "2026-02-22", views: 1842, engagement: 234, cited_estimate: "高" },
  { id: "D-0411", asset_title: "核心客户 vs 奇富借条：全面对比", asset_id: "W-0087", channel: "百家号", post_url: "#", publish_status: "published", indexed_status: "indexed",     published_at: "2026-02-20", views: 3205, engagement: 421, cited_estimate: "高" },
  { id: "D-0410", asset_title: "白领用户短期周转场景说明",     asset_id: "W-0086", channel: "小红书", post_url: "#", publish_status: "published", indexed_status: "indexed",     published_at: "2026-02-18", views: 892,  engagement: 156, cited_estimate: "中" },
  { id: "D-0409", asset_title: "审批流程详解：从申请到放款",   asset_id: "W-0084", channel: "知乎",   post_url: null, publish_status: "pending", indexed_status: "not_indexed", published_at: null,          views: null, engagement: null, cited_estimate: null },
  { id: "D-0408", asset_title: "学生用户申请须知与风险提示",   asset_id: "W-0083", channel: "百家号", post_url: "#", publish_status: "published", indexed_status: "failed",      published_at: "2026-02-10", views: 445,  engagement: 78,  cited_estimate: "低" },
];

const chClr: Record<string, string> = { "知乎": "bg-blue-500/10 text-blue-600 dark:text-blue-400", "百家号": "bg-amber-500/10 text-amber-600 dark:text-amber-400", "小红书": "bg-rose-500/10 text-rose-500 dark:text-rose-400" };
const chHex: Record<string, string> = { "知乎": "#3b82f6", "百家号": "#f59e0b", "小红书": "#f43f5e" };
const pubCfg: Record<string, { icon: React.ReactNode; cls: string }> = {
  published: { icon: <CheckCircle2 className="h-3.5 w-3.5" />, cls: "text-emerald-600 dark:text-emerald-400" },
  pending:   { icon: <Clock className="h-3.5 w-3.5" />,        cls: "text-amber-500" },
  failed:    { icon: <XCircle className="h-3.5 w-3.5" />,      cls: "text-red-500" },
};
const idxClr: Record<string, string> = { indexed: "text-emerald-600 dark:text-emerald-400", not_indexed: "text-muted-foreground", failed: "text-red-500" };
const idxLbl: Record<string, string> = { indexed: "已收录", not_indexed: "未收录", failed: "收录失败" };

const gen = (base: number) =>
  Array.from({ length: 14 }, (_, i) => ({
    date: `02/${String(i + 10).padStart(2, "0")}`,
    value: Math.round(base + Math.sin(i * 0.6) * 200 + Math.random() * 100),
  }));

export default function DistributionPage() {
  const [ch, setCh] = useState("全部");
  const filtered = ch === "全部" ? records : records.filter(r => r.channel === ch);
  const totalViews = records.reduce((s, r) => s + (r.views ?? 0), 0);
  const totalEng   = records.reduce((s, r) => s + (r.engagement ?? 0), 0);
  const idxCount   = records.filter(r => r.indexed_status === "indexed").length;

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "总发布记录", value: String(records.length), icon: Share2,       color: "text-blue-500" },
          { label: "累计曝光量", value: totalViews.toLocaleString(), icon: TrendingUp, color: "text-emerald-500" },
          { label: "互动量",     value: totalEng.toLocaleString(),   icon: BarChart2,  color: "text-amber-500" },
          { label: "收录率",     value: `${Math.round(idxCount / records.length * 100)}%`, icon: CheckCircle2, color: "text-violet-500" },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl border bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Icon className={cn("h-4 w-4", s.color)} />
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
              <div className={cn("text-2xl font-bold", s.color)}>{s.value}</div>
            </div>
          );
        })}
      </div>

      {/* Channel trends */}
      <div className="grid sm:grid-cols-3 gap-4">
        {(["知乎", "百家号", "小红书"] as const).map(c => {
          const base = c === "百家号" ? 2400 : c === "知乎" ? 1600 : 800;
          return (
            <div key={c} className="card-lift rounded-2xl border bg-card p-4 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: chHex[c] }} />
                  <span className="text-sm font-semibold text-foreground">{c}</span>
                </div>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                  <TrendingUp className="h-3 w-3" /> +12%
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">近 14 日曝光趋势</p>
              <TrendLine data={gen(base)} color={chHex[c]} height={72} />
              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-border/60">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">发布</div>
                  <div className="text-sm font-semibold text-foreground">{records.filter(r => r.channel === c).length} 篇</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">收录率</div>
                  <div className="text-sm font-semibold text-foreground">
                    {Math.round(records.filter(r => r.channel === c && r.indexed_status === "indexed").length /
                      Math.max(1, records.filter(r => r.channel === c).length) * 100)}%
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/60 bg-muted/20">
          <span className="text-sm font-semibold text-foreground">发布记录</span>
          <div className="flex gap-1.5">
            {["全部", "知乎", "百家号", "小红书"].map(c => (
              <Button
                key={c}
                variant={ch === c ? "default" : "outline"}
                size="sm"
                onClick={() => setCh(c)}
                className="h-7 text-xs rounded-xl"
              >
                {c}
              </Button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/60 bg-muted/10">
                {["记录 ID", "内容条目", "渠道", "发布时间", "曝光量", "互动量", "收录状态", "引用估算", ""].map(h => (
                  <th key={h} className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filtered.map(r => {
                const pub = pubCfg[r.publish_status];
                return (
                  <tr key={r.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-primary">{r.id}</td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-foreground max-w-[200px] truncate">{r.asset_title}</p>
                      <p className="text-xs font-mono text-muted-foreground mt-0.5">{r.asset_id}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", chClr[r.channel])}>{r.channel}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{r.published_at ?? "—"}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-foreground">{r.views?.toLocaleString() ?? "—"}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{r.engagement?.toLocaleString() ?? "—"}</td>
                    <td className="px-4 py-3 text-xs font-medium" style={{ color: idxClr[r.indexed_status] }}>{idxLbl[r.indexed_status]}</td>
                    <td className="px-4 py-3">
                      {r.cited_estimate ? (
                        <span className={cn("text-xs font-bold", r.cited_estimate === "高" ? "text-emerald-500" : r.cited_estimate === "中" ? "text-amber-500" : "text-muted-foreground")}>
                          {r.cited_estimate}
                        </span>
                      ) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      {r.post_url ? (
                        <Button variant="ghost" size="sm" className="h-7 text-xs rounded-lg">
                          查看 <ExternalLink className="h-3 w-3 ml-1" />
                        </Button>
                      ) : (
                        <Button size="sm" className="h-7 text-xs rounded-lg">
                          发布 <Share2 className="h-3 w-3 ml-1" />
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

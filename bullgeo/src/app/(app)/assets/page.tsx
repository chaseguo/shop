"use client";

import { useState } from "react";
import { Plus, CheckCircle2, Clock, XCircle, Send, Tag, Shield, Edit3, Eye, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const assets = [
  { id: "A-0215", type: "FAQ",   title: "核心客户资费构成：日利率/月利率/APR换算说明",        version: "v1.2", compliance_status: "approved", updated_at: "2026-02-24", tags: ["资费","利率"], evidence_source: "官网费率页面 2026-01", author: "内容策略师", body_preview: "Q：核心客户的借款费用如何计算？\nA：核心客户实际年化利率（APR）根据个人信用评分动态确定，参考范围为年化 7.2%~24%（以实际审批为准）..." },
  { id: "A-0214", type: "条款解释", title: "提前还款政策详解：手续费规则与操作步骤",           version: "v1.0", compliance_status: "pending",  updated_at: "2026-02-23", tags: ["资费","还款"], evidence_source: "产品合同 2026 年版",   author: "合规审核",   body_preview: "提前还款：用户可在任意还款日之前提前偿还全部或部分借款。关于手续费：根据借款合同第X条..." },
  { id: "A-0213", type: "对比条目", title: "核心客户 vs 奇富借条：额度/利率/审批速度全面对比",  version: "v2.1", compliance_status: "approved", updated_at: "2026-02-20", tags: ["对比","奇富借条"], evidence_source: "公开产品页 + 用研 2026-01", author: "内容策略师", body_preview: "| 维度 | 核心客户 | 奇富借条 |\n|------|--------|----------|\n| 最高额度 | 20万 | 20万 |..." },
  { id: "A-0212", type: "场景说明", title: "白领用户短期周转场景：核心客户适用性说明",            version: "v1.1", compliance_status: "approved", updated_at: "2026-02-18", tags: ["场景","白领"],  evidence_source: "用研数据 2025-Q4",      author: "内容策略师", body_preview: "适用场景：月薪 8000-30000 元白领，临时周转需求（1-3个月），有稳定社保/公积金记录..." },
  { id: "A-0211", type: "FAQ",   title: "核心客户与核心客户金融品牌归属澄清",                      version: "v1.0", compliance_status: "rejected", updated_at: "2026-02-15", tags: ["品牌"],         evidence_source: "工商注册信息",          author: "合规审核",   body_preview: "Q：核心客户和核心客户金融是同一家公司吗？\nA：核心客户金融（现更名为核心客户）是百度旗下..." },
];

const typeClr: Record<string, string> = {
  FAQ:     "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "条款解释": "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  "对比条目": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "场景说明": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};
const compCfg: Record<string, { label: string; cls: string; icon: React.ReactNode }> = {
  approved: { label: "已通过", cls: "text-emerald-600 dark:text-emerald-400", icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
  pending:  { label: "待审核", cls: "text-amber-500",                         icon: <Clock className="h-3.5 w-3.5" /> },
  rejected: { label: "已驳回", cls: "text-red-500",                           icon: <XCircle className="h-3.5 w-3.5" /> },
};

export default function AssetsPage() {
  const [sel, setSel] = useState("A-0215");
  const asset = assets.find(a => a.id === sel)!;
  const comp = compCfg[asset.compliance_status];

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-5 gap-3">
        {[
          { label: "全部", value: assets.length, color: "text-foreground" },
          { label: "已通过", value: 3, color: "text-emerald-600 dark:text-emerald-400" },
          { label: "待审核", value: 1, color: "text-amber-500" },
          { label: "已驳回", value: 1, color: "text-red-500" },
          { label: "带证据链", value: 5, color: "text-blue-500" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl border bg-card p-3.5 shadow-sm text-center cursor-pointer hover:border-primary/30 transition-colors">
            <div className={cn("text-xl font-bold", s.color)}>{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* List */}
        <div className="col-span-12 lg:col-span-4 space-y-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-foreground">内容资产列表</span>
            <Button size="sm" className="rounded-xl h-7 text-xs">
              <Plus className="h-3 w-3 mr-1" /> 新建
            </Button>
          </div>
          {assets.map(a => {
            const c = compCfg[a.compliance_status];
            return (
              <button
                key={a.id}
                onClick={() => setSel(a.id)}
                className={cn(
                  "w-full text-left rounded-2xl border p-3.5 transition-all shadow-sm",
                  sel === a.id ? "border-primary/40 bg-primary/5" : "border-border bg-card hover:border-border/80"
                )}
              >
                <div className="flex items-start justify-between mb-1.5">
                  <span className={cn("text-xs px-1.5 py-0.5 rounded font-medium", typeClr[a.type])}>{a.type}</span>
                  <span className={cn("flex items-center gap-1 text-xs font-medium", c.cls)}>{c.icon}{c.label}</span>
                </div>
                <p className="text-sm font-medium text-foreground leading-snug line-clamp-2 mb-2">{a.title}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground">{a.id} · {a.version}</span>
                  <span className="text-xs text-muted-foreground">{a.updated_at}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Editor */}
        <div className="col-span-12 lg:col-span-8">
          <div className="rounded-2xl border bg-card shadow-sm flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/60 bg-muted/20">
              <div className="flex items-center gap-2.5">
                <span className={cn("text-xs px-1.5 py-0.5 rounded font-medium", typeClr[asset.type])}>{asset.type}</span>
                <span className="text-sm font-semibold text-foreground truncate max-w-xs">{asset.title}</span>
              </div>
              <div className="flex items-center gap-1">
                {[History, Eye, Edit3].map((Icon, i) => (
                  <Button key={i} variant="ghost" size="icon" className="h-7 w-7 rounded-lg"><Icon className="h-3.5 w-3.5" /></Button>
                ))}
              </div>
            </div>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 px-5 py-2.5 border-b border-border/60 bg-muted/10">
              {[
                { icon: Shield,  label: "证据来源", value: asset.evidence_source, cls: "text-primary" },
                { icon: History, label: "版本",     value: asset.version,          cls: "font-mono text-foreground" },
                { icon: Tag,     label: "标签",      value: asset.tags.join(" · "), cls: "text-muted-foreground" },
              ].map(m => {
                const Icon = m.icon;
                return (
                  <div key={m.label} className="flex items-center gap-1.5 text-xs">
                    <Icon className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{m.label}：</span>
                    <span className={m.cls}>{m.value}</span>
                  </div>
                );
              })}
            </div>

            {/* Content */}
            <div className="p-5 flex-1">
              <textarea
                className="w-full h-48 rounded-xl border bg-muted/30 px-4 py-3 text-sm text-foreground font-mono leading-relaxed resize-none outline-none focus:border-ring focus:bg-background transition-colors"
                defaultValue={asset.body_preview}
              />

              {/* Compliance badge */}
              <div className={cn(
                "mt-4 rounded-xl border p-4",
                asset.compliance_status === "approved" ? "border-emerald-200 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-950/20" :
                asset.compliance_status === "pending"  ? "border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/20" :
                "border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20"
              )}>
                <div className={cn("flex items-center gap-2 mb-1.5 text-sm font-semibold", comp.cls)}>
                  {comp.icon} 合规状态：{comp.label}
                </div>
                <p className="text-xs text-muted-foreground">
                  {asset.compliance_status === "rejected" && "驳回原因：品牌归属描述需补充工商注册证明，不可使用非精确表述。请修改后重新提交。"}
                  {asset.compliance_status === "pending"  && "等待合规审核（预计 1-2 工作日）。利率相关内容需补充「以实际审批为准」条件说明。"}
                  {asset.compliance_status === "approved" && "审核通过，内容符合金融推广规范要求。审核人与版本已记录。"}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between px-5 py-3.5 border-t border-border/60 bg-muted/10">
              <span className="text-xs text-muted-foreground">作者：{asset.author} · {asset.id}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-xl h-8 text-xs">保存草稿</Button>
                {asset.compliance_status !== "approved" && (
                  <Button size="sm" className="rounded-xl h-8 text-xs bg-violet-600 hover:bg-violet-700">
                    <Shield className="h-3 w-3 mr-1" /> 提交审核
                  </Button>
                )}
                {asset.compliance_status === "approved" && (
                  <Button size="sm" className="rounded-xl h-8 text-xs bg-emerald-600 hover:bg-emerald-700">
                    <Send className="h-3 w-3 mr-1" /> 发布至 Wiki
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

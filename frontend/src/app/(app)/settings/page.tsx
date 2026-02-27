"use client";

import { useState } from "react";
import { Key, Users, Shield, Activity, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const tabs = ["模型配置", "角色权限", "合规规则", "审计日志"] as const;

const models = [
  { name: "豆包",     provider: "字节跳动", status: "active", endpoint: "https://api.doubao.com/v1",     key: "sk-dou****" },
  { name: "Kimi",   provider: "月之暗面", status: "active", endpoint: "https://api.moonshot.cn/v1",    key: "sk-kimi****" },
  { name: "DeepSeek",provider: "DeepSeek",status: "active", endpoint: "https://api.deepseek.com/v1",   key: "sk-ds****" },
];

const roles = [
  { name: "增长负责人", desc: "查看总览与趋势，判断预算投放方向", perms: ["dashboard", "detect.view", "reports.export"], count: 2 },
  { name: "内容策略师", desc: "生成结构化内容，管理资产", perms: ["assets.edit", "wiki.view", "diagnose.view"], count: 3 },
  { name: "合规审核",   desc: "审核利率、资费、条款描述合规性", perms: ["assets.review", "assets.approve"], count: 1 },
  { name: "运营执行",   desc: "将 Evidence Wiki 条目分发至各渠道", perms: ["wiki.view", "distribution.publish"], count: 2 },
];

const logs = [
  { time: "2026-02-24 09:32", user: "内容策略师 A", action: "发布资产至 Wiki",  target: "A-0215" },
  { time: "2026-02-24 09:15", user: "合规审核 B",   action: "审核通过",          target: "A-0215 v1.2" },
  { time: "2026-02-23 16:40", user: "内容策略师 A", action: "提交审核",          target: "A-0214" },
  { time: "2026-02-23 14:20", user: "运营执行 C",   action: "分发至知乎",        target: "W-0088" },
  { time: "2026-02-22 11:05", user: "增长负责人",   action: "导出周报",          target: "2026-W08 报告" },
  { time: "2026-02-22 10:30", user: "合规审核 B",   action: "驳回",              target: "A-0211 v1.0" },
];

export default function SettingsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("模型配置");

  return (
    <div className="space-y-5 max-w-3xl">
      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl bg-muted border border-border w-fit">
        {tabs.map(t => (
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
            {t}
          </button>
        ))}
      </div>

      {/* Model config */}
      {tab === "模型配置" && (
        <div className="space-y-3">
          {models.map(m => (
            <div key={m.name} className="rounded-2xl border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-sm">{m.name[0]}</div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{m.name}</div>
                    <div className="text-xs text-muted-foreground">{m.provider}</div>
                  </div>
                </div>
                <Badge variant={m.status === "active" ? "default" : "secondary"} className="text-xs">
                  <span className={cn("mr-1.5 h-1.5 w-1.5 rounded-full inline-block", m.status === "active" ? "bg-emerald-400 animate-pulse" : "bg-muted-foreground")} />
                  {m.status === "active" ? "已连接" : "未连接"}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">API Endpoint</label>
                  <Input value={m.endpoint} readOnly className="rounded-xl text-xs font-mono h-9 bg-muted/50" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">API Key</label>
                  <div className="flex gap-2">
                    <Input value={m.key} readOnly className="rounded-xl text-xs font-mono h-9 bg-muted/50 flex-1" />
                    <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl flex-shrink-0">
                      <Key className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button className="w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border hover:border-primary/40 py-4 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Plus className="h-4 w-4" /> 添加模型
          </button>
        </div>
      )}

      {/* RBAC */}
      {tab === "角色权限" && (
        <div className="space-y-3">
          {roles.map(role => (
            <div key={role.name} className="rounded-2xl border bg-card p-4 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold text-foreground">{role.name}</span>
                    <Badge variant="secondary" className="text-xs">{role.count} 人</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{role.desc}</p>
                </div>
                <Button variant="outline" size="sm" className="rounded-xl h-7 text-xs">编辑</Button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {role.perms.map(p => (
                  <Badge key={p} variant="secondary" className="text-xs font-mono">{p}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Compliance */}
      {tab === "合规规则" && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/20 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">金融推广合规要求</span>
            </div>
            <ul className="space-y-2">
              {[
                "所有与利率、费用相关文案必须带条件说明（示例范围、实际以审批为准）",
                '禁止承诺性表达（如【100%通过】【绝对最低利率】）',
                "所有对比内容需保留证据链接与时间戳",
                "内容发布需走审批流，记录审核人和审核版本",
                "敏感词与风险表达建立黑名单拦截",
              ].map((rule, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-amber-700 dark:text-amber-300">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-200 dark:bg-amber-800 text-amber-700 dark:text-amber-300 font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-foreground">敏感词黑名单</span>
              <Button size="sm" variant="outline" className="rounded-xl h-7 text-xs">
                <Plus className="h-3 w-3 mr-1" /> 添加
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {["100%通过", "绝对最低", "无条件审批", "零利率", "免费借款", "保证放款", "秒到账", "无需征信"].map(w => (
                <div key={w} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50">
                  <span className="text-xs text-red-600 dark:text-red-400">{w}</span>
                  <button className="text-red-400 hover:text-red-600 transition-colors">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Audit logs */}
      {tab === "审计日志" && (
        <div className="rounded-2xl border bg-card shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/60 bg-muted/20">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Activity className="h-4 w-4 text-muted-foreground" /> 操作审计日志
            </div>
            <Button variant="outline" size="sm" className="rounded-xl h-7 text-xs">导出</Button>
          </div>
          <div className="divide-y divide-border/40">
            {logs.map((log, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-3 hover:bg-muted/20 transition-colors">
                <span className="text-xs font-mono text-muted-foreground w-36 flex-shrink-0">{log.time}</span>
                <Badge variant="secondary" className="text-xs flex-shrink-0">{log.user}</Badge>
                <span className="text-sm text-foreground flex-1">{log.action}</span>
                <span className="text-xs font-mono text-muted-foreground flex-shrink-0">{log.target}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

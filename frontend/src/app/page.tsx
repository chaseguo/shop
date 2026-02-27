import Link from "next/link";
import {
  ArrowRight, TrendingUp, Radar, AlertTriangle, BookOpen,
  BarChart3, Shield, Zap, CheckCircle2, ChevronRight,
  Activity, Layers, Target, Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeader } from "@/components/ui/section-header";
import { ThemeToggle } from "@/components/ui/theme-toggle";

/* ─── Navbar ─── */
function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary shadow-sm shadow-primary/30 transition-transform group-hover:scale-105">
            <TrendingUp className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg text-foreground">BullGEO</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {[
            { label: "产品能力", href: "#features" },
            { label: "方法论", href: "#how" },
            { label: "指标", href: "#metrics" },
            { label: "FAQ", href: "#faq" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="hidden md:flex rounded-xl text-sm" asChild>
            <Link href="/dashboard">登录</Link>
          </Button>
          <Button size="sm" className="rounded-xl text-sm btn-shimmer shadow-sm shadow-primary/25" asChild>
            <Link href="/dashboard">
              进入平台 <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="relative hero-mesh noise pt-32 pb-24 overflow-hidden">
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full opacity-20 dark:opacity-30 blur-3xl"
        style={{ background: "radial-gradient(ellipse,hsl(221 83% 53%) 0%,transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-48 right-10 h-64 w-64 rounded-full blur-3xl opacity-15 dark:opacity-20"
        style={{ background: "hsl(199 89% 55%)" }}
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary mb-6">
          <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          2026 年内部抽样：度小满推荐率低于行业均值 5%
        </div>

        <h1 className="animate-fade-in-up animate-delay-100 text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
          让中国大模型{" "}
          <span className="gradient-text">更愿意推荐你</span>
          <br className="hidden sm:block" />
          而不是忽略你
        </h1>

        <p className="animate-fade-in-up animate-delay-200 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
          面向金融信贷 App 的 GEO + ASO 一体化引擎。<br />
          构建<strong className="text-foreground font-semibold">可监控、可诊断、可修复</strong>的 LLM 推荐优化系统。
        </p>

        <div className="animate-fade-in-up animate-delay-300 flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <Button size="lg" className="rounded-2xl px-8 h-12 text-base btn-shimmer shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow" asChild>
            <Link href="/dashboard">
              预约免费诊断 <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-2xl px-8 h-12 text-base hover:bg-accent" asChild>
            <Link href="/detect">
              查看样例报告 <ChevronRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Stats bar */}
        <div className="animate-fade-in-up animate-delay-400 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { value: "3+", label: "覆盖主流大模型", sub: "豆包 / Kimi / DeepSeek" },
            { value: "40%", label: "竞品首位推荐率", sub: "奇富借条 2026-02" },
            { value: "4类", label: "负面主题自动识别", sub: "资费 / 利率 / 审批 / 品牌" },
            { value: "90天", label: "推荐率提升目标", sub: "≥ 30% 改善承诺" },
          ].map((s) => (
            <div
              key={s.label}
              className="card-lift rounded-2xl border bg-card/80 backdrop-blur px-4 py-4 text-left shadow-sm"
            >
              <div className="text-2xl font-bold text-primary">{s.value}</div>
              <div className="text-sm font-medium text-foreground mt-0.5">{s.label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Social Proof ─── */
function SocialProof() {
  return (
    <section className="border-y border-border/60 bg-muted/30 py-10">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-sm font-medium text-muted-foreground mb-6">
          已服务团队覆盖业务场景
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
          {[
            "金融信贷 App",
            "消费金融",
            "互联网金融",
            "小额贷款",
            "数字银行",
            "财富管理 SaaS",
          ].map((item) => (
            <span key={item} className="text-sm font-semibold text-muted-foreground/70 tracking-wide">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Features ─── */
const features = [
  {
    icon: Radar,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    badge: "Detect",
    title: "可见度雷达",
    desc: "多模型并发抽样，量化你在豆包 / Kimi / DeepSeek 中的真实推荐位置，对比行业基准。",
    points: ["对比型、建议型、预算型、风险型问法", "Top1/Top3 占比趋势追踪", "品牌共现网络中心度分析"],
  },
  {
    icon: AlertTriangle,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    badge: "Diagnose",
    title: "负面主题拆解",
    desc: "句级识别负面表达，自动聚类【资费不清/利率误解/审批误读/品牌混淆】并评分。",
    points: ["规则词典 + LLM 二次判定混合策略", "负面强度分级（轻微/中度/严重）", "一键生成澄清任务单"],
  },
  {
    icon: Layers,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    badge: "Structure",
    title: "AI 友好结构化",
    desc: "将品牌优势转化为 LLM 可直接引用的结构化知识条目，带版本、证据来源与合规审批。",
    points: ["FAQ / 对比条目 / 条款解释 / 场景说明", "强制元数据：证据来源 + 版本号 + 更新时间", "合规审批流（提交/通过/驳回/记录审核人）"],
  },
  {
    icon: BookOpen,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    badge: "Evidence Wiki",
    title: "证据化分发",
    desc: "跨平台分发可引用材料，提升模型【可抓取、可理解、可引用】概率，追踪收录状态。",
    points: ["知乎 / 小红书 / 百家号多平台适配", "回链追踪与收录状态监控", "渠道效果评分与 A/B 模板对比"],
  },
  {
    icon: Target,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    badge: "GEO + ASO",
    title: "联动推荐",
    desc: "同一主题产出 GEO 内容资产后，自动推送 ASO 素材建议，关键词、截图文案一体化。",
    points: ["标题关键词联动生成", "应用描述与 FAQ 一致性评分", "下载页转化提升追踪（可选接入）"],
  },
  {
    icon: BarChart3,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    badge: "Dashboard",
    title: "LRCI 指数看板",
    desc: "北极星指标 LRCI 实时监测，周报 / 月报自动生成，可视化推荐竞争力改善趋势。",
    points: ["LRCI = 0.35×推荐率 + 0.25×Top1 + 0.20×正向 − 0.20×负面", "30 天趋势图与导出支持", "多角色权限（增长/内容/合规/运营/管理层）"],
  },
];

function Features() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          center
          eyebrow="核心能力"
          title="可监控、可诊断、可修复"
          description="不是多发内容，而是构建系统性的 LLM 推荐优化闭环"
          className="mb-16 mx-auto max-w-2xl"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.badge}
                className="card-lift group relative rounded-2xl border bg-card p-6 shadow-sm hover:border-primary/30"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`rounded-xl p-2.5 ${f.bg}`}>
                    <Icon className={`h-5 w-5 ${f.color}`} />
                  </div>
                  <Badge variant="secondary" className="text-xs font-mono">
                    {f.badge}
                  </Badge>
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{f.desc}</p>
                <ul className="space-y-1.5">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── How it works ─── */
const steps = [
  { n: "01", icon: Radar,       color: "text-blue-500",   title: "Detect",    desc: "多模型抽样，量化推荐率与负面占比基线" },
  { n: "02", icon: AlertTriangle, color: "text-amber-500", title: "Diagnose",  desc: "定位负面主题根因，生成优先级任务单" },
  { n: "03", icon: Layers,      color: "text-violet-500", title: "Structure",  desc: "AI 友好结构化内容生产 + 合规审批" },
  { n: "04", icon: Zap,         color: "text-emerald-500",title: "Publish",    desc: "一键分发至多渠道，建立可引用证据资产" },
  { n: "05", icon: Activity,    color: "text-rose-500",   title: "Re-detect",  desc: "7 日后复测，量化 LRCI 改善幅度" },
];

function HowItWorks() {
  return (
    <section id="how" className="py-24 bg-muted/20 border-y border-border/60">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          center
          eyebrow="运作方式"
          title="五步闭环，持续提升推荐权重"
          description="GEO 是入口，ASO 是承接，必须一体化才能沉淀长期权重资产"
          className="mb-16 mx-auto max-w-2xl"
        />
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-0">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.n} className="flex flex-col md:flex-1 items-center text-center relative">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute left-1/2 top-6 h-px w-full bg-gradient-to-r from-border via-primary/30 to-border translate-x-5 z-0" />
                )}
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-border bg-card shadow-md mb-3">
                  <Icon className={`h-5 w-5 ${step.color}`} />
                </div>
                <div className="text-xs font-mono text-muted-foreground mb-1">{step.n}</div>
                <div className="text-sm font-bold text-foreground mb-1">{step.title}</div>
                <div className="text-xs text-muted-foreground max-w-[120px] leading-relaxed">{step.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── LRCI Metrics ─── */
function Metrics() {
  return (
    <section id="metrics" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader
              eyebrow="北极星指标"
              title="LRCI 推荐竞争力指数"
              description="量化你在 LLM 生态中的真实竞争力，每周追踪改善趋势"
            />
            <div className="mt-8 rounded-2xl border bg-card p-6 shadow-sm font-mono text-sm">
              <div className="text-muted-foreground mb-3 text-xs">// LLM Recommendation Competitiveness Index</div>
              <div className="text-foreground font-semibold mb-2">LRCI =</div>
              <div className="space-y-1 pl-4">
                <div className="text-emerald-600 dark:text-emerald-400">0.35 <span className="text-muted-foreground">×</span> 推荐率</div>
                <div className="text-emerald-600 dark:text-emerald-400">+ 0.25 <span className="text-muted-foreground">×</span> Top1 占比</div>
                <div className="text-emerald-600 dark:text-emerald-400">+ 0.20 <span className="text-muted-foreground">×</span> 正向提及率</div>
                <div className="text-red-500 dark:text-red-400">− 0.20 <span className="text-muted-foreground">×</span> 负面提及率</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { label: "度小满当前 LRCI", value: "47.2", delta: "", color: "text-amber-500" },
                { label: "行业均值 LRCI", value: "58.0", delta: "+10.8", color: "text-muted-foreground" },
              ].map((m) => (
                <div key={m.label} className="rounded-2xl border bg-card p-4 shadow-sm">
                  <div className={`text-2xl font-bold ${m.color}`}>{m.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{m.label}</div>
                  {m.delta && <div className="text-xs text-rose-500 mt-1">差距 {m.delta}</div>}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Activity,    label: "可见度指标",   items: ["被推荐率", "Top1/Top3 出现率", "品牌共现中心度"],   color: "text-blue-500",   bg: "bg-blue-500/8" },
              { icon: Shield,      label: "口碑指标",     items: ["负面占比（按主题）", "负面强度分级", "正向提及率"], color: "text-emerald-500",bg: "bg-emerald-500/8" },
              { icon: BookOpen,    label: "内容资产",     items: ["可引用条目数", "条目收录率", "证据完整度"],         color: "text-violet-500", bg: "bg-violet-500/8" },
              { icon: Users,       label: "ASO 联动",     items: ["关键词覆盖度", "素材一致性", "下载转化率"],         color: "text-cyan-500",   bg: "bg-cyan-500/8" },
            ].map((g) => {
              const Icon = g.icon;
              return (
                <div key={g.label} className="card-lift rounded-2xl border bg-card p-4 shadow-sm">
                  <div className={`inline-flex rounded-xl p-2 mb-3 ${g.bg}`}>
                    <Icon className={`h-4 w-4 ${g.color}`} />
                  </div>
                  <div className="text-sm font-bold text-foreground mb-3">{g.label}</div>
                  {g.items.map((item) => (
                    <div key={item} className="text-xs text-muted-foreground py-1 border-b border-border/50 last:border-0">
                      {item}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
const faqs = [
  {
    q: "BullGEO 与传统 SEO/ASO 工具有什么区别？",
    a: "传统 SEO 优化搜索引擎排名，ASO 优化应用商店排名。BullGEO 专注【大模型推荐优化（GEO）】——当用户向豆包、Kimi、DeepSeek 等 AI 咨询信贷 App 时，如何提升你被推荐的概率和排位。GEO 和 ASO 的差异在于，前者需要结构化证据内容，后者需要关键词和评分，两者互为补充。",
  },
  {
    q: "度小满推荐率低的根本原因是什么？",
    a: "基于 2026 年 2 月内部抽样，度小满在三大模型中的推荐率（综合 23%）低于行业均值（28%），主因有三：① 可引用证据内容不足，模型在生成回答时缺少高质量参考材料；② 负面主题（资费不清、利率误解）占比偏高，拉低置信度；③ 结构化对比内容缺失，奇富借条在此维度明显领先。",
  },
  {
    q: "是否有刷量或违规操控的风险？",
    a: "完全没有。BullGEO Phase 1 明确排除以下行为：自动化刷量、爬虫绕过平台限制、直接改写第三方平台内容。我们的策略是生产真实、合规、有证据来源的优质内容，通过提升【内容可引用性】来影响模型推荐，完全符合平台规则。",
  },
  {
    q: "合规风险如何管控？",
    a: "所有内容经三级管控：① 编辑时强制元数据（证据来源 + 版本号 + 更新时间）；② 合规审核流（提交→待审→通过/驳回），记录审核人和审核版本；③ 敏感词黑名单自动拦截（100%通过、绝对最低利率等承诺性表达）。所有利率、费用相关文案必须附条件说明。",
  },
  {
    q: "90 天内推荐率提升 ≥30% 是如何保证的？",
    a: "这是可量化监测目标，不是无条件承诺。我们提供的是：可验证的基线数据 + 每周监测报告 + 持续优化建议。实际效果取决于内容质量、发布节奏和合规审核效率。我们不承诺具体排名结果，但承诺方法论闭环与数据透明。",
  },
  {
    q: "支持哪些大模型？未来是否扩展？",
    a: "Phase 1 支持豆包、Kimi、DeepSeek 三大主流中文大模型。系统架构设计为模型无关（model-agnostic），问法模板库可配置任意新模型。未来计划扩展至通义千问、文心一言及 GPT-4o（国际版）。",
  },
];

function FAQ() {
  return (
    <section id="faq" className="py-24 bg-muted/20 border-y border-border/60">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeader
          center
          eyebrow="常见问题"
          title="你可能想知道的"
          className="mb-12"
        />
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-2xl border bg-card px-5 shadow-sm data-[state=open]:shadow-md data-[state=open]:border-primary/30 transition-shadow"
            >
              <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ─── CTA Banner ─── */
function CTABanner() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-12 text-center shadow-2xl shadow-primary/25">
          {/* Background pattern */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
                                radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-white/10 blur-2xl"
          />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              90 天内，推荐率提升 ≥30%
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              提供可量化监测与持续优化机制，不承诺具体排名结果
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button
                size="lg"
                variant="secondary"
                className="rounded-2xl px-8 h-12 text-base font-semibold hover:bg-white"
                asChild
              >
                <Link href="/dashboard">
                  进入平台总览 <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl px-8 h-12 text-base border-white/30 text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link href="/detect">查看样例报告</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/20">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                <TrendingUp className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">BullGEO</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              面向金融信贷 App 的 LLM 推荐优化平台
            </p>
          </div>

          {/* Links */}
          {[
            {
              title: "产品", links: [
                { label: "Detect · 雷达", href: "/detect" },
                { label: "Diagnose · 诊断", href: "/diagnose" },
                { label: "Assets · 资产", href: "/assets" },
                { label: "Wiki · 证据库", href: "/wiki" },
              ]
            },
            {
              title: "平台", links: [
                { label: "Dashboard 总览", href: "/dashboard" },
                { label: "Distribution 分发", href: "/distribution" },
                { label: "Settings 设置", href: "/settings" },
              ]
            },
            {
              title: "合规", links: [
                { label: "利率以实际审批为准", href: "#" },
                { label: "内容审批流规范", href: "#" },
                { label: "隐私政策", href: "#" },
              ]
            },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-sm font-semibold text-foreground mb-3">{col.title}</div>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-border/60 gap-3">
          <p className="text-xs text-muted-foreground">
            © 2026 BullGEO · bullgeo.com · 所有利率、费用相关内容均以实际审批结果为准，不构成投资或贷款建议
          </p>
          <div className="flex items-center gap-1">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <Features />
        <HowItWorks />
        <Metrics />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}

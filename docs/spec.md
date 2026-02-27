# BullGEO · 产品规范（永远最新版）

> 此文件是 Cursor AI 开发的唯一参考来源。每次迭代前先更新本文件，再让 Cursor 执行。

## 产品定位

面向金融信贷 App 的 GEO（生成式引擎优化）+ ASO 一体化引擎，帮助产品从"可见"到"可被 LLM 信任并推荐"。

## 技术栈

| 层 | 技术 |
|---|---|
| 前端 | Next.js + TypeScript + Tailwind CSS + shadcn/ui + ECharts |
| 后端 | FastAPI + SQLAlchemy + Alembic |
| 任务队列 | Celery + Redis |
| 数据库 | PostgreSQL 16 |
| 部署 | Docker + Docker Compose |

## 页面路由

| 路径 | 功能模块 | 状态 |
|------|----------|------|
| `/` | 产品落地页 | ✅ 已建 |
| `/dashboard` | 可见度与口碑总览（LRCI 指数）| ✅ 已建 |
| `/detect` | 多模型抽样任务管理 | ✅ 已建 |
| `/diagnose` | 负面主题分析与任务单 | ✅ 已建 |
| `/assets` | 内容资产编辑器（审批流）| ✅ 已建 |
| `/wiki` | Evidence Wiki 证据库 | ✅ 已建 |
| `/distribution` | 渠道分发记录与效果追踪 | ✅ 已建 |
| `/settings` | 模型配置、角色权限、审计日志 | ✅ 已建 |

## 核心指标：LRCI

```
LRCI = 0.35×推荐率 + 0.25×Top1占比 + 0.20×正向提及率 − 0.20×负面提及率
```

## API 模块

| 路由前缀 | 功能 |
|----------|------|
| `/api/v1/detect` | 抽样检测任务 |
| `/api/v1/diagnose` | 负面诊断 |
| `/api/v1/assets` | 内容资产 |
| `/api/v1/wiki` | 证据库 |
| `/api/v1/distribution` | 渠道分发 |

## Cursor 开发提示词模板

```
读取 docs/spec.md 本次变更，仅实现新增模块；
使用 shadcn/ui + Tailwind；
拆分为 components + page；
完成后分模块 commit 并 push，开 PR。
```

## 迭代流程

1. 更新本文件 `docs/spec.md`
2. 更新 `docs/changelog.md` 记录变更
3. `git checkout -b feat/<module>-<date>`
4. 让 Cursor 按 spec 实现
5. PR → merge → `git checkout main && git pull`

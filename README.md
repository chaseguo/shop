# BullGEO · LLM 推荐优化平台

> 面向金融信贷 App 的 GEO + ASO 一体化引擎，从"可见"到"可被信任"

## 项目结构

```
bullgeo/
├── frontend/          # Next.js 前端（TypeScript + Tailwind + ECharts）
├── backend/           # FastAPI 后端（Python）
├── docker-compose.yml # 一键启动所有服务
└── .env.example       # 环境变量模板
```

## 页面路由

| 路径 | 功能 |
|------|------|
| `/` | 产品落地页 |
| `/dashboard` | 可见度与口碑总览（LRCI 指数）|
| `/detect` | 多模型抽样任务管理 |
| `/diagnose` | 负面主题分析与任务单 |
| `/assets` | 内容资产编辑器（审批流）|
| `/wiki` | Evidence Wiki 证据库 |
| `/distribution` | 渠道分发记录与效果追踪 |
| `/settings` | 模型配置、角色权限、审计日志 |

## 快速启动

### 方法一：Docker Compose（推荐）

```bash
cp .env.example .env
# 编辑 .env 填写 API Keys
docker compose up -d
```

访问：
- 前端：http://localhost:3000
- 后端 API：http://localhost:8000/api/docs

### 方法二：本地开发

**后端**
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**前端**
```bash
cd frontend
npm install
npm run dev
```

## 技术栈

- **前端**：Next.js 16 + TypeScript + Tailwind CSS + ECharts
- **后端**：FastAPI + SQLAlchemy + Alembic
- **任务队列**：Celery + Redis
- **数据库**：PostgreSQL 16
- **部署**：Docker + Docker Compose

## API 文档

启动后访问 http://localhost:8000/api/docs 查看完整 Swagger 文档

## 核心指标：LRCI

```
LRCI = 0.35×推荐率 + 0.25×Top1占比 + 0.20×正向提及率 − 0.20×负面提及率
```

## 合规声明

所有利率、费用相关内容均以实际审批结果为准，不构成投资或贷款建议。

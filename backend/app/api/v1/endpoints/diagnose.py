from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from ....core.database import get_db
from ....models.models import NegativeTopic, SamplingResult, SentimentLabel

router = APIRouter()


@router.post("/analyze/{result_id}")
def analyze_result(result_id: int, db: Session = Depends(get_db)):
    """对单条采样结果进行负面主题分析"""
    result = db.query(SamplingResult).filter(SamplingResult.id == result_id).first()
    if not result:
        raise HTTPException(status_code=404, detail="Result not found")

    # Rule-based quick classification
    negative_keywords = {
        "资费不清": ["资费", "费用不透明", "收费", "手续费不明"],
        "利率误解": ["利率高", "年化高", "APR", "利息贵", "利率偏高"],
        "审批误读": ["审批严", "被降额", "拒贷", "审批慢", "额度不足"],
        "品牌混淆": ["度小满金融", "品牌混淆", "不清楚", "搞混"],
    }

    detected = []
    if result.raw_response:
        for topic, keywords in negative_keywords.items():
            for kw in keywords:
                if kw in result.raw_response:
                    snippet_start = max(0, result.raw_response.find(kw) - 30)
                    snippet = result.raw_response[snippet_start:snippet_start + 100]
                    detected.append({
                        "topic": topic,
                        "severity": "high" if topic in ["资费不清", "利率误解"] else "medium",
                        "evidence_snippet": snippet,
                        "keyword_matched": kw,
                    })
                    break

    return {
        "result_id": result_id,
        "topics_detected": detected,
        "total": len(detected),
    }


@router.get("/themes")
def get_themes(
    brand: Optional[str] = "duxiaoman",
    limit: int = 20,
    db: Session = Depends(get_db),
):
    """获取负面主题聚合统计"""
    topics = db.query(NegativeTopic).limit(limit).all()

    theme_stats: dict = {}
    for topic in topics:
        key = topic.topic
        if key not in theme_stats:
            theme_stats[key] = {
                "topic": key,
                "count": 0,
                "severity_max": topic.severity,
                "impact_score_avg": 0,
                "evidence": [],
            }
        theme_stats[key]["count"] += 1
        if topic.evidence_snippet:
            theme_stats[key]["evidence"].append({
                "snippet": topic.evidence_snippet,
                "severity": topic.severity,
            })

    return {
        "brand": brand,
        "themes": list(theme_stats.values()),
    }


@router.get("/task-suggestions/{topic}")
def get_task_suggestions(topic: str):
    """根据负面主题生成澄清任务建议"""
    suggestions_map = {
        "资费不清": [
            "新增"资费构成图解FAQ"",
            "补充"提前还款是否收费"条目",
            "更新"日利率/月利率/APR换算说明"",
        ],
        "利率误解": [
            "补充"实际APR计算示例"FAQ",
            "添加"与行业均值对比"条目",
            "明确"利率范围以审批为准"说明",
        ],
        "审批误读": [
            "新增"审批流程透明化说明"",
            "补充"降额原因与应对方法"FAQ",
        ],
        "品牌混淆": [
            "新增"度小满品牌归属澄清"条目",
            "更新官方全称说明",
        ],
    }

    return {
        "topic": topic,
        "task_suggestions": suggestions_map.get(topic, ["暂无建议，请联系内容策略师"]),
    }

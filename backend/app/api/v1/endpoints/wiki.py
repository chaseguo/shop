from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional
from ....core.database import get_db
from ....models.models import ContentAsset, ComplianceStatusEnum

router = APIRouter()


@router.get("/search")
def search_wiki(
    q: Optional[str] = Query(None, description="搜索关键词"),
    type: Optional[str] = None,
    tag: Optional[str] = None,
    limit: int = 20,
    offset: int = 0,
    db: Session = Depends(get_db),
):
    """搜索 Evidence Wiki 中已通过合规审核的条目"""
    query = db.query(ContentAsset).filter(
        ContentAsset.compliance_status == ComplianceStatusEnum.approved
    )

    if q:
        query = query.filter(
            ContentAsset.title.ilike(f"%{q}%") | ContentAsset.body.ilike(f"%{q}%")
        )
    if type:
        query = query.filter(ContentAsset.type == type)

    total = query.count()
    items = query.order_by(ContentAsset.updated_at.desc()).offset(offset).limit(limit).all()

    return {
        "total": total,
        "query": q,
        "items": [
            {
                "id": item.id,
                "type": item.type,
                "title": item.title,
                "excerpt": item.body[:200] + "..." if len(item.body) > 200 else item.body,
                "tags": item.tags,
                "version": item.version,
                "evidence_source": item.evidence_source,
                "updated_at": item.updated_at,
            }
            for item in items
        ],
    }

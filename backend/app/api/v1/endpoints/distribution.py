from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from pydantic import BaseModel
from datetime import datetime
from ....core.database import get_db
from ....models.models import DistributionRecord, ContentAsset, ComplianceStatusEnum, PublishStatusEnum

router = APIRouter()


class PublishRequest(BaseModel):
    asset_id: int
    channel: str
    post_url: Optional[str] = None


@router.post("/publish")
def publish_to_channel(req: PublishRequest, db: Session = Depends(get_db)):
    asset = db.query(ContentAsset).filter(ContentAsset.id == req.asset_id).first()
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    if asset.compliance_status != ComplianceStatusEnum.approved:
        raise HTTPException(status_code=400, detail="Asset must be approved before distribution")

    record = DistributionRecord(
        asset_id=req.asset_id,
        channel=req.channel,
        post_url=req.post_url,
        publish_status=PublishStatusEnum.published if req.post_url else PublishStatusEnum.pending,
        published_at=datetime.utcnow() if req.post_url else None,
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


@router.get("/records")
def list_records(
    asset_id: Optional[int] = None,
    channel: Optional[str] = None,
    limit: int = 20,
    offset: int = 0,
    db: Session = Depends(get_db),
):
    query = db.query(DistributionRecord)
    if asset_id:
        query = query.filter(DistributionRecord.asset_id == asset_id)
    if channel:
        query = query.filter(DistributionRecord.channel == channel)
    total = query.count()
    items = query.order_by(DistributionRecord.id.desc()).offset(offset).limit(limit).all()
    return {"total": total, "items": items}


@router.get("/stats")
def get_distribution_stats(db: Session = Depends(get_db)):
    """渠道分发效果统计"""
    records = db.query(DistributionRecord).all()

    channel_stats: dict = {}
    for r in records:
        if r.channel not in channel_stats:
            channel_stats[r.channel] = {"channel": r.channel, "total": 0, "indexed": 0, "views": 0, "engagement": 0}
        channel_stats[r.channel]["total"] += 1
        if r.indexed_status == "indexed":
            channel_stats[r.channel]["indexed"] += 1
        channel_stats[r.channel]["views"] += r.views or 0
        channel_stats[r.channel]["engagement"] += r.engagement or 0

    return {"channels": list(channel_stats.values())}

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from pydantic import BaseModel
from ....core.database import get_db
from ....models.models import ContentAsset, ComplianceStatusEnum

router = APIRouter()


class AssetCreate(BaseModel):
    type: str
    title: str
    body: str
    tags: Optional[list[str]] = []
    evidence_source: Optional[str] = None
    author: Optional[str] = None


class AssetUpdate(BaseModel):
    title: Optional[str] = None
    body: Optional[str] = None
    tags: Optional[list[str]] = None
    evidence_source: Optional[str] = None


@router.post("")
def create_asset(asset: AssetCreate, db: Session = Depends(get_db)):
    db_asset = ContentAsset(**asset.model_dump())
    db.add(db_asset)
    db.commit()
    db.refresh(db_asset)
    return db_asset


@router.get("")
def list_assets(
    type: Optional[str] = None,
    compliance_status: Optional[str] = None,
    limit: int = 20,
    offset: int = 0,
    db: Session = Depends(get_db),
):
    query = db.query(ContentAsset)
    if type:
        query = query.filter(ContentAsset.type == type)
    if compliance_status:
        query = query.filter(ContentAsset.compliance_status == compliance_status)
    total = query.count()
    items = query.order_by(ContentAsset.id.desc()).offset(offset).limit(limit).all()
    return {"total": total, "items": items}


@router.get("/{asset_id}")
def get_asset(asset_id: int, db: Session = Depends(get_db)):
    asset = db.query(ContentAsset).filter(ContentAsset.id == asset_id).first()
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    return asset


@router.put("/{asset_id}")
def update_asset(asset_id: int, update: AssetUpdate, db: Session = Depends(get_db)):
    asset = db.query(ContentAsset).filter(ContentAsset.id == asset_id).first()
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    for key, value in update.model_dump(exclude_none=True).items():
        setattr(asset, key, value)
    db.commit()
    db.refresh(asset)
    return asset


@router.post("/{asset_id}/submit-review")
def submit_review(asset_id: int, db: Session = Depends(get_db)):
    asset = db.query(ContentAsset).filter(ContentAsset.id == asset_id).first()
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    asset.compliance_status = ComplianceStatusEnum.pending
    db.commit()
    return {"message": "Submitted for review", "asset_id": asset_id}


@router.post("/{asset_id}/approve")
def approve_asset(asset_id: int, note: Optional[str] = None, db: Session = Depends(get_db)):
    asset = db.query(ContentAsset).filter(ContentAsset.id == asset_id).first()
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    asset.compliance_status = ComplianceStatusEnum.approved
    asset.compliance_note = note
    db.commit()
    return {"message": "Asset approved", "asset_id": asset_id}


@router.post("/{asset_id}/reject")
def reject_asset(asset_id: int, note: str, db: Session = Depends(get_db)):
    asset = db.query(ContentAsset).filter(ContentAsset.id == asset_id).first()
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    asset.compliance_status = ComplianceStatusEnum.rejected
    asset.compliance_note = note
    db.commit()
    return {"message": "Asset rejected", "asset_id": asset_id, "note": note}


@router.post("/{asset_id}/publish")
def publish_asset(asset_id: int, db: Session = Depends(get_db)):
    asset = db.query(ContentAsset).filter(ContentAsset.id == asset_id).first()
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    if asset.compliance_status != ComplianceStatusEnum.approved:
        raise HTTPException(status_code=400, detail="Asset must be approved before publishing")
    return {"message": "Asset queued for wiki publication", "asset_id": asset_id}

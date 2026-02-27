from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from typing import Optional
from datetime import datetime
from ....core.database import get_db
from ....models.models import SamplingJob, SamplingResult, PromptTemplate
from pydantic import BaseModel

router = APIRouter()


class JobCreate(BaseModel):
    model: str
    template_id: int
    rounds: int = 30


class JobResponse(BaseModel):
    id: int
    model: str
    template_id: int
    rounds: int
    status: str
    started_at: Optional[datetime]
    finished_at: Optional[datetime]

    class Config:
        from_attributes = True


@router.post("/jobs", response_model=JobResponse)
def create_job(job: JobCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    template = db.query(PromptTemplate).filter(PromptTemplate.id == job.template_id).first()
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")

    db_job = SamplingJob(
        model=job.model,
        template_id=job.template_id,
        rounds=job.rounds,
        status="pending",
    )
    db.add(db_job)
    db.commit()
    db.refresh(db_job)

    background_tasks.add_task(run_sampling_job, db_job.id)
    return db_job


@router.get("/jobs/{job_id}", response_model=JobResponse)
def get_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(SamplingJob).filter(SamplingJob.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job


@router.get("/jobs")
def list_jobs(
    model: Optional[str] = None,
    status: Optional[str] = None,
    limit: int = 20,
    offset: int = 0,
    db: Session = Depends(get_db),
):
    query = db.query(SamplingJob)
    if model:
        query = query.filter(SamplingJob.model == model)
    if status:
        query = query.filter(SamplingJob.status == status)
    total = query.count()
    jobs = query.order_by(SamplingJob.id.desc()).offset(offset).limit(limit).all()
    return {"total": total, "items": jobs}


@router.get("/reports")
def get_visibility_report(
    from_date: Optional[str] = None,
    to_date: Optional[str] = None,
    model: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """返回可见度报告：推荐率、Top1占比、品牌共现"""
    query = db.query(SamplingResult)
    if model:
        query = query.join(SamplingJob).filter(SamplingJob.model == model)

    results = query.all()

    brand_counts: dict = {}
    top1_counts: dict = {}
    total = len(results)

    for result in results:
        if result.rankings_json:
            brands = result.rankings_json.get("brands", [])
            for i, brand in enumerate(brands):
                brand_counts[brand] = brand_counts.get(brand, 0) + 1
                if i == 0:
                    top1_counts[brand] = top1_counts.get(brand, 0) + 1

    if total == 0:
        return {"total_samples": 0, "brand_recommendation_rates": {}, "top1_rates": {}}

    return {
        "total_samples": total,
        "brand_recommendation_rates": {k: round(v / total * 100, 1) for k, v in brand_counts.items()},
        "top1_rates": {k: round(v / total * 100, 1) for k, v in top1_counts.items()},
    }


@router.get("/templates")
def list_templates(db: Session = Depends(get_db)):
    templates = db.query(PromptTemplate).filter(PromptTemplate.active == True).all()
    return templates


async def run_sampling_job(job_id: int):
    """Background task: execute sampling job against LLM APIs"""
    pass

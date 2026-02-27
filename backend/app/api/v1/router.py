from fastapi import APIRouter
from .endpoints import detect, diagnose, assets, wiki, distribution

api_router = APIRouter()

api_router.include_router(detect.router, prefix="/detect", tags=["Detect · 可见度雷达"])
api_router.include_router(diagnose.router, prefix="/diagnose", tags=["Diagnose · 负面诊断"])
api_router.include_router(assets.router, prefix="/assets", tags=["Assets · 内容资产"])
api_router.include_router(wiki.router, prefix="/wiki", tags=["Wiki · 证据库"])
api_router.include_router(distribution.router, prefix="/distribution", tags=["Distribution · 分发"])

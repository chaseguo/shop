from sqlalchemy import Column, Integer, String, Text, DateTime, Float, Boolean, JSON, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from ..core.database import Base


class ModelEnum(str, enum.Enum):
    doubao = "doubao"
    kimi = "kimi"
    deepseek = "deepseek"


class SentimentEnum(str, enum.Enum):
    positive = "positive"
    negative = "negative"
    neutral = "neutral"


class SeverityEnum(str, enum.Enum):
    low = "low"
    medium = "medium"
    high = "high"


class ComplianceStatusEnum(str, enum.Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"


class PublishStatusEnum(str, enum.Enum):
    pending = "pending"
    published = "published"
    failed = "failed"


class PromptTemplate(Base):
    __tablename__ = "prompt_templates"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    category = Column(String(50))
    content = Column(Text, nullable=False)
    params_schema = Column(JSON)
    active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    jobs = relationship("SamplingJob", back_populates="template")


class SamplingJob(Base):
    __tablename__ = "sampling_jobs"

    id = Column(Integer, primary_key=True, index=True)
    model = Column(Enum(ModelEnum), nullable=False)
    template_id = Column(Integer, ForeignKey("prompt_templates.id"))
    rounds = Column(Integer, default=30)
    status = Column(String(20), default="pending")
    started_at = Column(DateTime(timezone=True))
    finished_at = Column(DateTime(timezone=True))
    error_message = Column(Text)

    template = relationship("PromptTemplate", back_populates="jobs")
    results = relationship("SamplingResult", back_populates="job")


class SamplingResult(Base):
    __tablename__ = "sampling_results"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("sampling_jobs.id"))
    prompt_text = Column(Text, nullable=False)
    raw_response = Column(Text, nullable=False)
    brands_detected = Column(JSON)
    rankings_json = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    job = relationship("SamplingJob", back_populates="results")
    sentiment_labels = relationship("SentimentLabel", back_populates="result")
    negative_topics = relationship("NegativeTopic", back_populates="result")


class SentimentLabel(Base):
    __tablename__ = "sentiment_labels"

    id = Column(Integer, primary_key=True, index=True)
    result_id = Column(Integer, ForeignKey("sampling_results.id"))
    brand = Column(String(100), nullable=False)
    sentiment = Column(Enum(SentimentEnum), nullable=False)
    confidence = Column(Float)

    result = relationship("SamplingResult", back_populates="sentiment_labels")


class NegativeTopic(Base):
    __tablename__ = "negative_topics"

    id = Column(Integer, primary_key=True, index=True)
    result_id = Column(Integer, ForeignKey("sampling_results.id"))
    topic = Column(String(100), nullable=False)
    severity = Column(Enum(SeverityEnum), nullable=False)
    evidence_snippet = Column(Text)
    impact_score = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    result = relationship("SamplingResult", back_populates="negative_topics")


class ContentAsset(Base):
    __tablename__ = "content_assets"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String(50), nullable=False)
    title = Column(String(500), nullable=False)
    body = Column(Text, nullable=False)
    tags = Column(JSON)
    version = Column(String(20), default="v1.0")
    compliance_status = Column(Enum(ComplianceStatusEnum), default=ComplianceStatusEnum.pending)
    compliance_note = Column(Text)
    author = Column(String(100))
    evidence_source = Column(String(500))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    evidence_links = relationship("EvidenceLink", back_populates="asset")
    distribution_records = relationship("DistributionRecord", back_populates="asset")


class EvidenceLink(Base):
    __tablename__ = "evidence_links"

    id = Column(Integer, primary_key=True, index=True)
    asset_id = Column(Integer, ForeignKey("content_assets.id"))
    source_name = Column(String(200))
    source_url = Column(String(1000))
    valid_until = Column(DateTime(timezone=True))

    asset = relationship("ContentAsset", back_populates="evidence_links")


class DistributionRecord(Base):
    __tablename__ = "distribution_records"

    id = Column(Integer, primary_key=True, index=True)
    asset_id = Column(Integer, ForeignKey("content_assets.id"))
    channel = Column(String(50), nullable=False)
    post_url = Column(String(1000))
    publish_status = Column(Enum(PublishStatusEnum), default=PublishStatusEnum.pending)
    indexed_status = Column(String(20), default="not_indexed")
    published_at = Column(DateTime(timezone=True))
    views = Column(Integer, default=0)
    engagement = Column(Integer, default=0)
    cited_estimate = Column(String(10))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    asset = relationship("ContentAsset", back_populates="distribution_records")

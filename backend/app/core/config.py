from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # App
    APP_NAME: str = "BullGEO API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False

    # Security
    SECRET_KEY: str = "bullgeo-secret-key-change-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24

    # Database
    DATABASE_URL: str = "postgresql://bullgeo:bullgeo@db:5432/bullgeo"

    # Redis
    REDIS_URL: str = "redis://redis:6379/0"

    # LLM Models
    DOUBAO_API_KEY: Optional[str] = None
    DOUBAO_ENDPOINT: str = "https://api.doubao.com/v1"

    KIMI_API_KEY: Optional[str] = None
    KIMI_ENDPOINT: str = "https://api.moonshot.cn/v1"

    DEEPSEEK_API_KEY: Optional[str] = None
    DEEPSEEK_ENDPOINT: str = "https://api.deepseek.com/v1"

    # CORS
    CORS_ORIGINS: list[str] = ["http://localhost:3000", "https://bullgeo.com"]

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()

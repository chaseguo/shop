"""数据库初始化脚本：创建表并插入种子数据"""
from app.core.database import engine, Base
from app.models.models import *


def init():
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("Done!")


if __name__ == "__main__":
    init()

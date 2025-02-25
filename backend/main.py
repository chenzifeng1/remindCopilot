from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import todo, user
from .core.database import engine
from .models.base import Base

app = FastAPI(title="提醒小助手")

# CORS设置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 创建数据库表
Base.metadata.create_all(bind=engine)

# 注册路由
app.include_router(todo.router)
app.include_router(user.router)

@app.get("/")
async def root():
    return {"message": "欢迎使用提醒小助手API"} 
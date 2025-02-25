from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TodoBase(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: Optional[datetime] = None

class TodoCreate(TodoBase):
    pass

class TodoUpdate(TodoBase):
    is_completed: Optional[bool] = None

class TodoResponse(TodoBase):
    id: int
    is_completed: bool
    created_at: datetime
    updated_at: datetime
    user_id: int

    class Config:
        orm_mode = True 
from fastapi import APIRouter, Depends, HTTPException
from typing import List
from ..schemas.todo import TodoCreate, TodoResponse, TodoUpdate
from ..core.todo import TodoService
from ..dependencies import get_current_user

router = APIRouter(prefix="/todos", tags=["todos"])

@router.post("/", response_model=TodoResponse)
async def create_todo(
    todo: TodoCreate,
    current_user = Depends(get_current_user),
    todo_service: TodoService = Depends()
):
    return await todo_service.create_todo(todo, current_user.id)

@router.get("/", response_model=List[TodoResponse])
async def get_todos(
    current_user = Depends(get_current_user),
    todo_service: TodoService = Depends()
):
    return await todo_service.get_user_todos(current_user.id)

@router.put("/{todo_id}", response_model=TodoResponse)
async def update_todo(
    todo_id: int,
    todo_update: TodoUpdate,
    current_user = Depends(get_current_user),
    todo_service: TodoService = Depends()
):
    return await todo_service.update_todo(todo_id, todo_update, current_user.id)

@router.delete("/{todo_id}")
async def delete_todo(
    todo_id: int,
    current_user = Depends(get_current_user),
    todo_service: TodoService = Depends()
):
    await todo_service.delete_todo(todo_id, current_user.id)
    return {"message": "Todo deleted successfully"} 
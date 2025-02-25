from fastapi import HTTPException
from sqlalchemy.orm import Session
from ..models.todo import Todo
from ..schemas.todo import TodoCreate, TodoUpdate
from ..dependencies import get_db

class TodoService:
    def __init__(self, db: Session = Depends(get_db)):
        self.db = db
    
    async def create_todo(self, todo: TodoCreate, user_id: int) -> Todo:
        db_todo = Todo(
            **todo.dict(),
            user_id=user_id
        )
        self.db.add(db_todo)
        await self.db.commit()
        await self.db.refresh(db_todo)
        return db_todo
    
    async def get_user_todos(self, user_id: int) -> List[Todo]:
        return await self.db.query(Todo).filter(Todo.user_id == user_id).all()
    
    async def update_todo(self, todo_id: int, todo_update: TodoUpdate, user_id: int) -> Todo:
        todo = await self.db.query(Todo).filter(
            Todo.id == todo_id,
            Todo.user_id == user_id
        ).first()
        
        if not todo:
            raise HTTPException(status_code=404, detail="Todo not found")
            
        for field, value in todo_update.dict(exclude_unset=True).items():
            setattr(todo, field, value)
            
        await self.db.commit()
        await self.db.refresh(todo)
        return todo
        
    async def delete_todo(self, todo_id: int, user_id: int):
        todo = await self.db.query(Todo).filter(
            Todo.id == todo_id,
            Todo.user_id == user_id
        ).first()
        
        if not todo:
            raise HTTPException(status_code=404, detail="Todo not found")
            
        await self.db.delete(todo)
        await self.db.commit() 
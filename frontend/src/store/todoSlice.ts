import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../services/api';
import { Todo } from '../types';

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk<Todo[]>(
  'todos/fetchTodos',
  async () => {
    const response = await api.get<Todo[]>('/todos');
    return response.data;
  }
);

export const addTodo = createAsyncThunk<Todo, Partial<Todo>>(
  'todos/addTodo',
  async (todo) => {
    const response = await api.post<Todo>('/todos', todo);
    return response.data;
  }
);

export const toggleTodo = createAsyncThunk<Todo, number>(
  'todos/toggleTodo',
  async (id) => {
    const response = await api.put<Todo>(`/todos/${id}`);
    return response.data;
  }
);

export const deleteTodo = createAsyncThunk<number, number>(
  'todos/deleteTodo',
  async (id) => {
    await api.delete<void>(`/todos/${id}`);
    return id;
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // 移除重复的 reducers，因为我们使用 extraReducers 处理异步动作
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '加载失败';
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const todo = state.todos.find(t => t.id === action.payload.id);
        if (todo) {
          todo.is_completed = !todo.is_completed;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
      });
  },
});

// 移除这行，因为我们只使用异步 action creators
// export const { toggleTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer; 
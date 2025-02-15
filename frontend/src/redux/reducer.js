import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Load environment variables
const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  },
});

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axiosInstance.get("/");
  return response.data;
});

// 🟢 Add a new task
export const addTodo = createAsyncThunk("todos/addTodo", async (task) => {
  const response = await axiosInstance.post("/", {
    title: task.title,
    description: task.description,
  });
  return response.data;
});

// 🔴 Remove a task
export const removeTodo = createAsyncThunk("todos/removeTodo", async (id) => {
  const response = await axiosInstance.delete(`/${id}`);
  if (response.status === 200) {
    return id;
  }
  throw new Error("Failed to remove the task");
});

// 🟡 Update a task
export const updateTodo = createAsyncThunk("todos/updateTodo", async (task) => {
  try {
    console.log("Updating task:", task);
    const response = await axiosInstance.put(`/${task.id}`, task);
    console.log("Response from API:", response);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to update the task. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error updating task:", error);
    throw new Error(`Failed to update the task. ${error.message || error}`);
  }
});

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        );
      })
      .addCase(removeTodo.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const reducer = todoSlice.reducer;

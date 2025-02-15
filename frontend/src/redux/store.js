import { configureStore } from "@reduxjs/toolkit";
import { reducer as todoReducer } from "./reducer"; // Import the reducer from your addTodoReducer

export const store = configureStore({
  reducer: {
    todos: todoReducer, // The 'todos' slice uses the reducer from reducer.js
  },
});

export default store;

import React, { useState, useEffect } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, removeTodo, updateTodo } from "../redux/reducer";
import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";

const filterOptions = [
  { type: "nonCompleted", label: "Non-Completed", color: "#E74C3C" },
  { type: "completed", label: "Completed", color: "#2ECC71" },
  { type: "all", label: "All", color: "#3498DB" },
];

const DisplayTodos = () => {
  const [sort, setSort] = useState("all"); // Default sorting type
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos()); // Fetch todos on mount
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTodos()); // Refresh tasks when tasks change
  }, [dispatch, todos.length]); // Include 'dispatch' as a dependency

  const filteredTodos = todos.filter((item) => {
    if (sort === "nonCompleted") return !item.completed;
    if (sort === "completed") return item.completed;
    return true; // Show all tasks
  });

  const handleDelete = (id) => {
    dispatch(removeTodo(id));
  };

  const handleUpdate = (task) => {
    const updatedTask = { ...task };
    dispatch(updateTodo(updatedTask));
    handleRefresh();

  };

  const handleRefresh = () => {
    window.location.reload();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="displaytodos">
      {/* Filter Buttons */}
      <div className="buttons">
        {filterOptions.map(({ type, label, color }) => (
          <motion.button
            key={type}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSort(type)}
            style={{
              backgroundColor: sort === type ? color : "#BDC3C7",
              color: sort === type ? "white" : "black",
              border: `2px solid ${color}`,
              padding: "8px 12px",
              margin: "5px",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            {label}
          </motion.button>
        ))}
      </div>

      {/* Task List */}
      <ul style={{ maxHeight: "400px", overflowY: "auto" }}>
        <AnimatePresence>
          {filteredTodos.length > 0 ? (
            filteredTodos.map((item) => (
              <TodoItem
                key={item.id}
                item={item}
                onRemove={handleDelete}
                onUpdate={handleUpdate}
                onClick={handleRefresh}
              />
            ))
          ) : (
            <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              No tasks available.
            </motion.li>
          )}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default DisplayTodos;
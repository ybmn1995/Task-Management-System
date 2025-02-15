import React, { useState, useEffect } from "react";
import { getTasks, addTask, updateTask, deleteTask } from "../api/taskService";
import { motion, AnimatePresence } from "framer-motion";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(
      data.map((task) => ({
        ...task,
        completed: Boolean(task.completed),
      }))
    );
  };

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    await addTask({
      title: newTask,
      description: "",
      completed: 0,
    });
    setNewTask("");
    await fetchTasks();
  };

  const handleUpdateTask = async (id, updates) => {
    await updateTask(id, {
      ...updates  });
    await fetchTasks();
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    await fetchTasks();
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditedTitle(task.title);
    setEditedDescription(task.description || "");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditedTitle("");
    setEditedDescription("");
  };

  const saveEditing = async () => {
    if (!editedTitle.trim()) return;
    await handleUpdateTask(editingId, {
      title: editedTitle,
      description: editedDescription,
      completed: tasks.find((t) => t.id === editingId).completed,
    });
    cancelEditing();
  };

  const toggleCompletion = async (task) => {
    await handleUpdateTask(task.id, {
      ...task,
      completed: !task.completed,
    });
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Task Manager
        </h1>

        {/* Add Task Section */}
        <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200">
          <div className="flex gap-2 flex-col sm:flex-row">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddTask}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
            >
              Add Task
            </button>
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-2 bg-gray-100 p-2 rounded-lg mt-4">
            {["all", "pending", "completed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 text-sm font-medium rounded-md transition ${
                  filter === f
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tasks List */}
        <AnimatePresence>
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center border border-gray-200 hover:border-blue-300 transition">
                  <div className="flex items-center gap-3 flex-1">
                    <button
                      onClick={() => toggleCompletion(task)}
                      className={`w-5 h-5 border-2 rounded-md ${
                        task.completed
                          ? "bg-blue-500 border-blue-500"
                          : "border-gray-400 hover:border-blue-400"
                      }`}
                    >
                      {task.completed && "✔️"}
                    </button>

                    {editingId === task.id ? (
                      <div className="flex flex-col flex-1">
                        <input
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                          className="border p-2 rounded"
                        />
                        <input
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                          placeholder="Add description"
                          className="border p-2 rounded mt-1 text-sm"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col flex-1">
                        <span
                          className={`text-lg ${
                            task.completed ? "line-through text-gray-400" : ""
                          }`}
                        >
                          {task.title}
                        </span>
                        {task.description && (
                          <span className="text-sm text-gray-500">
                            {task.description}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {editingId === task.id ? (
                      <>
                        <button
                          onClick={saveEditing}
                          className="px-4 py-1 bg-green-500 text-white rounded-md"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="px-4 py-1 bg-gray-300 rounded-md"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(task)}
                          className="text-blue-600"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-red-600"
                        >
                          🗑️
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TaskManager;

// src/components/TaskManager.js (Modern UI with Animations & Filters)
import React, { useState, useEffect } from 'react';
import { getTasks, addTask, updateTask, deleteTask } from '../api/taskService';
import { motion } from 'framer-motion';
import { Button, Input, Card } from '/ui';  // ✅ Fix the import path

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    const handleAddTask = async () => {
        if (!newTask.trim()) return;
        await addTask({ title: newTask, description: '' });
        setNewTask('');
        fetchTasks();
    };

    const handleToggleTask = async (task) => {
        await updateTask(task.id, { completed: !task.completed });
        fetchTasks();
    };

    const handleDeleteTask = async (id) => {
        await deleteTask(id);
        fetchTasks();
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true;
    });

    return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-6">🚀 Task Manager</h1>
            <div className="flex gap-2 mb-4">
                <Input
                    type="text"
                    placeholder="Add a new task..."
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="flex-1 p-2 border rounded-lg"
                />
                <Button onClick={handleAddTask} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add</Button>
            </div>
            <div className="flex justify-center space-x-4 mb-4">
                <Button onClick={() => setFilter('all')} className={filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}>All</Button>
                <Button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}>Completed</Button>
                <Button onClick={() => setFilter('pending')} className={filter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-200'}>Pending</Button>
            </div>
            <div className="space-y-4">
                {filteredTasks.map((task) => (
                    <motion.div key={task.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <Card className="p-4 flex justify-between items-center bg-white shadow rounded-lg">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleToggleTask(task)}
                                    className="cursor-pointer"
                                />
                                <span className={task.completed ? "line-through text-gray-500" : "text-black font-medium"}>{task.title}</span>
                            </div>
                            <Button onClick={() => handleDeleteTask(task.id)} className="text-red-500">❌</Button>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default TaskManager;

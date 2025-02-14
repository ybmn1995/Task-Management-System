const Task = require('../models/taskModel');

const getAllTasks = (req, res) => {
  Task.getAll((err, tasks) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(tasks);
  });
};

const createTask = (req, res) => {
  const { title, description } = req.body;
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required and must be a string' });
  }

  Task.create(title, description, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Task added successfully', id: result.id });
  });
};

const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  if (!id || isNaN(id)) return res.status(400).json({ error: 'Invalid task ID' });
  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Completed must be a boolean (true/false)' });
  }

  Task.update(id, title, description, completed, (err, changes) => {
    if (err) return res.status(500).json({ error: err.message });
    if (changes === 0) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task updated successfully' });
  });
};

const deleteTask = (req, res) => {
  const { id } = req.params;

  Task.delete(id, (err, changes) => {
    if (err) return res.status(500).json({ error: err.message });
    if (changes === 0) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  });
};

module.exports = { getAllTasks, createTask, updateTask, deleteTask };

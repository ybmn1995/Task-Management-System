import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch tasks with authentication key
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tasks', {
          headers: {
            'x-api-key': 'xxx',  // 🔹 Ensure API key is correct
            'Accept': 'application/json'
          }
        });
        setTasks(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err.response ? err.response.data : err);
        setError(err.response?.data?.error || 'Failed to fetch tasks');
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(task => (
          <tr key={task.id}>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.completed ? '✅ Completed' : '⏳ Pending'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL; // Fetch from .env
const API_KEY = process.env.REACT_APP_API_KEY; // Fetch API key from .env

const getTasks = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: { 'x-api-key': API_KEY }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

const addTask = async (task) => {
  try {
    const response = await axios.post(API_URL, task, {
      headers: { 'x-api-key': API_KEY }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

const deleteTask = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { 'x-api-key': API_KEY }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

export { getTasks, addTask, deleteTask };
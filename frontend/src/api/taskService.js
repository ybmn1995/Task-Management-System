// src/api/taskService.js (Modern API Service)
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/tasks';
const API_KEY = process.env.REACT_APP_API_KEY || 'my-secure-api-key';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: { 'x-api-key': API_KEY }
});

export const getTasks = async () => {
    const response = await apiClient.get('/');
    return response.data;
};

export const addTask = async (task) => {
    const response = await apiClient.post('/', task);
    return response.data;
};

export const updateTask = async (id, updatedTask) => {
    const response = await apiClient.put(`/${id}`, updatedTask);
    return response.data;
};

export const deleteTask = async (id) => {
    const response = await apiClient.delete(`/${id}`);
    return response.data;
};
import apiClient from './client';

export const getDashboard = () => apiClient.get('/tasks/dashboard');
export const createTask = (projectId, data) => apiClient.post(`/tasks/project/${projectId}`, data);
export const updateTaskStatus = (taskId, status) => apiClient.patch(`/tasks/${taskId}/status`, { status });
export const deleteTask = (taskId) => apiClient.delete(`/tasks/${taskId}`);
export const getTasksByProject = (projectId) => apiClient.get(`/tasks/project/${projectId}`);
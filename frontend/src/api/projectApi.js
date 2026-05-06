import apiClient from './client';

export const getProjects = () => apiClient.get('/projects');
export const getProjectById = (id) => apiClient.get(`/projects/${id}`);
export const getUserByEmail = (email) => apiClient.get(`/users?email=${encodeURIComponent(email)}`);
export const createProject = (data) => apiClient.post('/projects', data);
export const addMember = (projectId, userId) => apiClient.post(`/projects/${projectId}/members`, { userId });
export const deleteProject = (id) => apiClient.delete(`/projects/${id}`);
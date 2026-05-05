import apiClient from './client';

export const signup = (userData) => apiClient.post('/auth/signup', userData);
export const login = (credentials) => apiClient.post('/auth/login', credentials);
export const logout = () => apiClient.post('/auth/logout');
export const getCurrentUser = () => apiClient.get('/auth/me');
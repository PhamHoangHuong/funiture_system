import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await api.post('/auth/refresh', { refresh_token: refreshToken });
        localStorage.setItem('access_token', response.data.access_token);
        originalRequest.headers['Authorization'] = `Bearer ${response.data.access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        // window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export const login = (email: string, password: string) => {
  return api.post('/login', { email, password });
};

export const logout = () => {
  return api.post('/logout');
};

export const refreshToken = () => {
  const refreshToken = localStorage.getItem('refresh_token');
  return api.post('/refresh', { refresh_token: refreshToken });
};

export const getProfile = () => {
  return api.get('/profile');
};

export default api;
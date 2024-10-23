import axios from 'axios';
import { Category } from '../hooks/dataTypes';

const API_URL = 'http://localhost:8000/api/category';



export const categoryService = {
  getAll: async () => {
    const response = await axios.get<{ data: Category[] }>(API_URL);
    return response.data.data;
  },

  getById: async (id: number) => {
    const response = await axios.get<{ data: Category }>(`${API_URL}/${id}`);
    return response.data.data;
  },

  create: async (category: Omit<Category, 'id'>) => {
    const response = await axios.post<{ data: Category }>(API_URL, category);
    return response.data.data;
  },

  update: async (id: number, category: Partial<Category>) => {
    const response = await axios.put<{ data: Category }>(`${API_URL}/${id}`, category);
    return response.data.data;
  },

  delete: async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
  }
};


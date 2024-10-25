import axios from 'axios';
import { Product, SuccessResponse } from '../hooks/dataTypes';

const API_URL = 'http://localhost:8000/api/products';



export const ProductService = {
    getAll: async () => {
        const response = await axios.get<SuccessResponse<Product[]>>(API_URL);
        return response.data.data;
    },

    getById: async (id: number) => {
        const response = await axios.get<{ data: Product }>(`${API_URL}/${id}`);
        return response.data.data;
    },

    create: async (Product: Omit<Product, 'id'>) => {
        const response = await axios.post<{ data: Product }>(API_URL, Product);
        return response.data.data;
    },

    update: async (id: number, Product: Partial<Product>) => {
        const response = await axios.put<{ data: Product }>(`${API_URL}/${id}`, Product);
        return response.data.data;
    },

    delete: async (id: number) => {
        await axios.delete(`${API_URL}/${id}`);
    }
};


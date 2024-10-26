import axios from 'axios';
import { Product, SuccessResponse } from '../hooks/dataTypes';

const API_URL = 'http://localhost:8000/api/products';

// Định nghĩa các phương thức gọi API liên quan đến sản phẩm
export const ProductService = {
    // Lấy tất cả sản phẩm
    getAll: async () => {
        const response = await axios.get<SuccessResponse<Product[]>>(API_URL);
        return response.data.data;
    },

    // Lấy sản phẩm theo ID
    getById: async (id: number) => {
        const response = await axios.get<{ data: Product }>(`${API_URL}/${id}`);
        return response.data.data;
    },

    // Tạo sản phẩm mới
    create: async (productData: Partial<Product>): Promise<Product> => {
        const response = await axios.post<Product>(API_URL, productData);
        return response.data;
    },

    // Cập nhật sản phẩm
    update: async (id: number, product: Partial<Product>) => {
        const response = await axios.put<{ data: Product }>(`${API_URL}/${id}`, product);
        return response.data.data;
    },

    // Xóa sản phẩm
    delete: async (id: number) => {
        await axios.delete(`${API_URL}/${id}`);
    }
};

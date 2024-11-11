import axios from 'axios';
import { Product, SuccessResponse, SourceProduct } from '../hooks/dataTypes';

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
    create: async (formData: FormData): Promise<Product> => {
        const response = await axios.post<SuccessResponse<Product>>(API_URL, formData);
        return response.data.data;
    },

    // Cập nhật sản phẩm
    update: async (id: number, product: Partial<Product>) => {
        const response = await axios.put<SuccessResponse<Product>>(`${API_URL}/${id}`, product);
        return response.data.data;
    },

    // Xóa sản phẩm
    delete: async (id: number) => {
        await axios.delete(`${API_URL}/${id}`);
    },
    

    // Lưu nguồn và số lượng cho sản phẩm
    storeSourceAndQuantity: async (productId: number, sourceProducts: Partial<SourceProduct>[]): Promise<SourceProduct[]> => {
        const response = await axios.post<SuccessResponse<SourceProduct[]>>(`${API_URL}/${productId}/sources`, sourceProducts);
        return response.data.data;
    }
};

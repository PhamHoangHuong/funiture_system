import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductService } from '../services/productService';
import { Product } from '../hooks/dataTypes';

// Định nghĩa kiểu dữ liệu cho context
interface ProductContextType {
    products: Product[];
    loading: boolean;
    error: string | null;
    fetchProducts: () => Promise<void>;
    fetchProductById: (id: number) => Promise<Product | undefined>;
}

// Tạo context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Component Provider để quản lý trạng thái sản phẩm
export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Khởi tạo state
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Hàm để lấy danh sách sản phẩm
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await ProductService.getAll();
            setProducts(data);
            setError(null);
        } catch (err) {
            console.error('Lỗi khi lấy danh sách sản phẩm:', err);
            setError('Có lỗi xảy ra khi lấy danh sách sản phẩm');
        } finally {
            setLoading(false);
        }
    };


    // Lấy sản phẩm theo ID
    const fetchProductById = async (id: number) => {
        try {
            const data = await ProductService.getById(id);
            return data;
        } catch (err) {
            console.error('Lỗi khi lấy sản phẩm theo ID:', err);
        }
    };


    // Gọi fetchProducts khi component được mount
    useEffect(() => {
        fetchProducts();
    }, []);

    // Cung cấp context cho các component con
    return (
        <ProductContext.Provider value={{ products, loading, error, fetchProducts, fetchProductById }}>
            {children}
        </ProductContext.Provider>
    );
};

// Hook tùy chỉnh để sử dụng ProductContext
export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProductContext phải được sử dụng trong ProductProvider');
    }
    return context;
};

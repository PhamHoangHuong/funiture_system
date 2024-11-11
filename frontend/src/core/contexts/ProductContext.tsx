import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ProductService } from '../services/productService';
import { Product } from '../hooks/dataTypes';
import { Variant } from '../hooks/dataTypes';

// Định nghĩa kiểu dữ liệu cho context
interface ProductContextType {
    products: Product[];
    loading: boolean;
    error: string | null;
    fetchProducts: () => Promise<void>;
    fetchProductById: (id: number) => Promise<Product | undefined>;
    createProduct: (formData: FormData) => Promise<Product>;
    updateProduct: (id: number, product: Partial<Product>) => Promise<void>;
    deleteProduct: (id: number) => Promise<void>;
    variants: Variant[];
    updateVariant: (index: number, data: Partial<Variant>) => void;
}

// Tạo context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Component Provider để quản lý trạng thái sản phẩm
export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [variants, setVariants] = useState<Variant[]>([]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await ProductService.getAll();
            setProducts(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Error fetching products');
        } finally {
            setLoading(false);
        }
    };

    const fetchProductById = async (id: number) => {
        try {
            const data = await ProductService.getById(id);
            return data;
        } catch (err) {
            console.error('Error fetching product by ID:', err);
        }
    };

    const createProduct = async (formData: FormData) => {
        try {
            const newProduct = await ProductService.create(formData);
            setProducts(prevProducts => [...prevProducts, newProduct]);
            console.log("Product added", newProduct);
            return newProduct;
        } catch (err) {
            console.error('Error creating product:', err);
            throw err;
        }
    };

    const updateProduct = async (id: number, product: Partial<Product>) => {
        try {
            const updatedProduct = await ProductService.update(id, product);
            setProducts(prevProducts => prevProducts.map(p => p.id === id ? updatedProduct : p));
        } catch (err) {
            console.error('Error updating product:', err);
            throw err;
        }
    };

    const deleteProduct = async (id: number) => {
        try {
            await ProductService.delete(id);
            setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
        } catch (err) {
            console.error('Error deleting product:', err);
            throw err;
        }
    };

    const updateVariant = useCallback((index: number, data: Partial<Variant>) => {
        setVariants(prev => {
            const newVariants = [...prev];
            newVariants[index] = { ...newVariants[index], ...data };
            return newVariants;
        });
    }, []);

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, loading, error, fetchProducts, fetchProductById, createProduct, updateProduct, deleteProduct, variants, updateVariant }}>
            {children}
        </ProductContext.Provider>
    );
};

// Custom hook to use ProductContext
export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
};

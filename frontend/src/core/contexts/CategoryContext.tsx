import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryService } from '../services/categoryService';
import { Category } from '../hooks/dataTypes';
import { useNotification } from './NotificationContext';
import { useTranslation } from 'react-i18next';

interface CategoryContextType {
    categories: Category[];
    loading: boolean;
    error: string | null;
    fetchCategories: () => Promise<void>;
    createCategory: (category: Omit<Category, 'id'>) => Promise<Category>;
    deleteCategory: (id: number) => Promise<void>;
    updateCategory: (id: number, category: Partial<Category>) => Promise<Category>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const { t } = useTranslation();

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await categoryService.getAll();
            setCategories(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching categories:', err);
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            setError(t('common.fetchError', { message: errorMessage }));
            showNotification(t('common.fetchError', { message: errorMessage }), 'error');
        } finally {
            setLoading(false);
        }
    };

    const createCategory = async (category: Omit<Category, 'id'>) => {
        try {
            const newCategory = await categoryService.create(category);
            setCategories((prevCategories) => [...prevCategories, newCategory]);
            showNotification(t('common.createSuccess'), 'success');
            navigate('/admin/categories');
            return newCategory;
        } catch (err) {
            console.error('Error creating category:', err);
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            showNotification(t('common.createError', { message: errorMessage }), 'error');
            throw err;
        }
    };

    const deleteCategory = async (id: number) => {
        try {
            await categoryService.delete(id);
            setCategories((prevCategories) => prevCategories.filter(category => category.id !== id));
            showNotification(t('common.deleteSuccess'), 'success');
        } catch (err) {
            console.error('Error deleting category:', err);
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            showNotification(t('common.deleteError', { message: errorMessage }), 'error');
        }
    };

    const updateCategory = async (id: number, category: Partial<Category>) => {
        try {
            const updatedCategory = await categoryService.update(id, category);
            if (updatedCategory) {
                setCategories((prevCategories) => prevCategories.map(category => category.id === updatedCategory.id ? updatedCategory : category));
                showNotification(t('common.updateSuccess'), 'success');
                navigate('/admin/categories');
            }
            showNotification(t('common.updateSuccess'), 'success');
            return updatedCategory;
        } catch (err) {
            console.error('Error updating category:', err);
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            showNotification(t('common.updateError', { message: errorMessage }), 'error');
            throw err;
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ categories, loading, error, fetchCategories, createCategory, deleteCategory, updateCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategory = () => {
    const context = useContext(CategoryContext);
    if (context === undefined) {
        throw new Error('useCategory must be used within a CategoryProvider');
    }
    return context;
};


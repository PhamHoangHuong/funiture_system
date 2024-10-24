import { AxiosResponse } from 'axios';

// User related types
export interface User {
    id: number;
    email: string;
    name: string;
}

// Category related types
export interface Category {
    id: number;
    name: string;
    slug: string;
    parent_id: number | null;
    image: string | null;
    description: string | null;
    is_menu: boolean;
    status: boolean;
    created_at: string;
    updated_at: string;
}

// Product related types
export interface Product {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    status: string;
    stock: number;
    category?: string;
}

// Table header type
export interface TableHeader {
    key: string;
    label: string;
    sortable: boolean;
}

// Auth context type
export interface AuthContextType {
    user: User | null;
    loading: boolean;
    handleLogin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    handleLogout: () => Promise<void>;
    handleRefreshToken: () => Promise<boolean>;
}


import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartService } from '../services/cartServices';
import { Cart } from '../hooks/dataTypes';

interface CartContextType {
    cart: Cart[];
    loading: boolean;
    error: string | null;
    fetchCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<Cart[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const data = await cartService.getAll();
            setCart(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching cart:', err);
            setError('Error fetching cart');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <CartContext.Provider value={{ cart, loading, error, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};  

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
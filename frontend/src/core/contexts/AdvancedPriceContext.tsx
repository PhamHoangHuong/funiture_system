import React, { createContext, useState, useContext, ReactNode } from 'react';
import { AdvancedPrice, AdvancedPriceContextType } from '../hooks/dataTypes';
import { advancedPriceService } from '../services/advancedPriceService';

const AdvancedPriceContext = createContext<AdvancedPriceContextType | undefined>(undefined);

export const useAdvancedPrice = () => {
    const context = useContext(AdvancedPriceContext);
    if (!context) {
        throw new Error('useAdvancedPrice must be used within an AdvancedPriceProvider');
    }
    return context;
};

export const AdvancedPriceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [advancedPrices, setAdvancedPrices] = useState<AdvancedPrice[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAdvancedPrices = async () => {
        setLoading(true);
        try {
            const data = await advancedPriceService.getAllAdvancedPrices();
            setAdvancedPrices(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch advanced prices');
        } finally {
            setLoading(false);
        }
    };

    const createAdvancedPrice = async (advancedPriceData: Partial<AdvancedPrice>) => {
        try {
            const newAdvancedPrice = await advancedPriceService.createAdvancedPrice(advancedPriceData);
            setAdvancedPrices([...advancedPrices, newAdvancedPrice]);
            return newAdvancedPrice;
        } catch (err) {
            setError('Failed to create advanced price');
            throw err;
        }
    };

    const updateAdvancedPrice = async (id: number, advancedPriceData: Partial<AdvancedPrice>) => {
        try {
            const updatedAdvancedPrice = await advancedPriceService.updateAdvancedPrice(id, advancedPriceData);
            setAdvancedPrices(advancedPrices.map(ap => ap.id === id ? updatedAdvancedPrice : ap));
            return updatedAdvancedPrice;
        } catch (err) {
            setError('Failed to update advanced price');
            throw err;
        }
    };

    const deleteAdvancedPrice = async (id: number) => {
        try {
            await advancedPriceService.deleteAdvancedPrice(id);
            setAdvancedPrices(advancedPrices.filter(ap => ap.id !== id));
        } catch (err) {
            setError('Failed to delete advanced price');
            throw err;
        }
    };

    const value: AdvancedPriceContextType = {
        advancedPrices,
        loading,
        error,
        fetchAdvancedPrices,
        createAdvancedPrice,
        updateAdvancedPrice,
        deleteAdvancedPrice,
    };

    return (
        <AdvancedPriceContext.Provider value={value}>
            {children}
        </AdvancedPriceContext.Provider>
    );
};


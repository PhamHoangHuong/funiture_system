import api from './api';
import { AdvancedPrice } from '../hooks/dataTypes';

export const advancedPriceService = {
    getAllAdvancedPrices: async (): Promise<AdvancedPrice[]> => {
        const response = await api.get('/advanced-prices');
        return response.data;
    },

    getAdvancedPrice: async (id: number): Promise<AdvancedPrice> => {
        const response = await api.get(`/advanced-prices/${id}`);
        return response.data;
    },

    createAdvancedPrice: async (advancedPriceData: Partial<AdvancedPrice>): Promise<AdvancedPrice> => {
        const response = await api.post('/advanced-prices', advancedPriceData);
        return response.data;
    },

    updateAdvancedPrice: async (id: number, advancedPriceData: Partial<AdvancedPrice>): Promise<AdvancedPrice> => {
        const response = await api.put(`/advanced-prices/${id}`, advancedPriceData);
        return response.data;
    },

    deleteAdvancedPrice: async (id: number): Promise<void> => {
        await api.delete(`/advanced-prices/${id}`);
    },
};


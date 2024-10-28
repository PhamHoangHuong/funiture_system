import axios from 'axios';
import { AdvancedPrice } from '../hooks/dataTypes';

const API_URL = 'http://localhost:8000/api/advanced-prices';

export const advancedPriceService = {
    getAllAdvancedPrices: async (): Promise<AdvancedPrice[]> => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    getAdvancedPrice: async (id: number): Promise<AdvancedPrice> => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    },

    createAdvancedPrice: async (advancedPriceData: Partial<AdvancedPrice>): Promise<AdvancedPrice> => {
        const response = await axios.post(API_URL, advancedPriceData);
        return response.data;
    },

    updateAdvancedPrice: async (id: number, advancedPriceData: Partial<AdvancedPrice>): Promise<AdvancedPrice> => {
        const response = await axios.put(`${API_URL}/${id}`, advancedPriceData);
        return response.data;
    },

    deleteAdvancedPrice: async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`);
    },
};


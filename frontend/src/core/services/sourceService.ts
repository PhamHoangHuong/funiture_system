import axios from 'axios';
import { Source, SuccessResponse } from '../hooks/dataTypes';

const API_URL = 'http://localhost:8000/api/sources';

export const SourceService = {
    getAll: async () => {
        const response = await axios.get<SuccessResponse<Source[]>>(API_URL);
        return response.data.data;
    },

    getById: async (id: number) => {
        const response = await axios.get<SuccessResponse<Source>>(`${API_URL}/${id}`);
        return response.data.data;
    },

    create: async (sourceData: Partial<Source>): Promise<Source> => {
        const response = await axios.post<SuccessResponse<Source>>(API_URL, sourceData);
        return response.data.data;
    },

    update: async (id: number, sourceData: Partial<Source>): Promise<Source> => {
        const response = await axios.put<SuccessResponse<Source>>(`${API_URL}/${id}`, sourceData);
        return response.data.data;
    },

    delete: async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`);
    },
};

import axios from 'axios';
import { Attribute, AttributeValue, SuccessResponse } from '../hooks/dataTypes';

const API_URL = 'http://localhost:8000/api';

export const AttributeService = {
    getAllAttributes: async () => {
        const response = await axios.get<SuccessResponse<Attribute[]>>(`${API_URL}/attributes`);
        return response.data.data;
    },

    getAttributeById: async (id: number) => {
        const response = await axios.get<SuccessResponse<Attribute>>(`${API_URL}/attributes/${id}`);
        return response.data.data;
    },

    createAttribute: async (attributeData: Partial<Attribute>): Promise<Attribute> => {
        const response = await axios.post<SuccessResponse<Attribute>>(`${API_URL}/attributes`, attributeData);
        return response.data.data;
    },

    updateAttribute: async (id: number, attributeData: Partial<Attribute>): Promise<Attribute> => {
        const response = await axios.put<SuccessResponse<Attribute>>(`${API_URL}/attributes/${id}`, attributeData);
        return response.data.data;
    },

    deleteAttribute: async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/attributes/${id}`);
    },

    getAllAttributeValues: async () => {
        const response = await axios.get<SuccessResponse<AttributeValue[]>>(`${API_URL}/attribute-values`);
        return response.data.data;
    },

    getAttributeValueById: async (id: number) => {
        const response = await axios.get<SuccessResponse<AttributeValue>>(`${API_URL}/attribute-values/${id}`);
        return response.data.data;
    },

    createAttributeValue: async (attributeValueData: { attribute_id: number; value: string }): Promise<AttributeValue> => {
        const response = await axios.post<SuccessResponse<AttributeValue>>(`${API_URL}/attribute-values`, attributeValueData);
        return response.data.data;
    },

    updateAttributeValue: async (id: number, attributeValueData: Partial<AttributeValue>): Promise<AttributeValue> => {
        const response = await axios.put<SuccessResponse<AttributeValue>>(`${API_URL}/attribute-values/${id}`, attributeValueData);
        return response.data.data;
    },

    deleteAttributeValue: async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/attribute-values/${id}`);
    },
};

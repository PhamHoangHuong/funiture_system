import api from './api';
import { Attribute, AttributeValue } from '../hooks/dataTypes';

export const attributeService = {
    getAllAttributes: async (): Promise<Attribute[]> => {
        const response = await api.get('/attributes');
        return response.data;
    },

    getAttribute: async (id: number): Promise<Attribute> => {
        const response = await api.get(`/attributes/${id}`);
        return response.data;
    },

    createAttribute: async (attributeData: Partial<Attribute>): Promise<Attribute> => {
        const response = await api.post('/attributes', attributeData);
        return response.data;
    },

    updateAttribute: async (id: number, attributeData: Partial<Attribute>): Promise<Attribute> => {
        const response = await api.put(`/attributes/${id}`, attributeData);
        return response.data;
    },

    deleteAttribute: async (id: number): Promise<void> => {
        await api.delete(`/attributes/${id}`);
    },

    getAllAttributeValues: async (): Promise<AttributeValue[]> => {
        const response = await api.get('/attribute-values');
        return response.data;
    },

    getAttributeValue: async (id: number): Promise<AttributeValue> => {
        const response = await api.get(`/attribute-values/${id}`);
        return response.data;
    },

    createAttributeValue: async (attributeValueData: Partial<AttributeValue>): Promise<AttributeValue> => {
        const response = await api.post('/attribute-values', attributeValueData);
        return response.data;
    },

    updateAttributeValue: async (id: number, attributeValueData: Partial<AttributeValue>): Promise<AttributeValue> => {
        const response = await api.put(`/attribute-values/${id}`, attributeValueData);
        return response.data;
    },

    deleteAttributeValue: async (id: number): Promise<void> => {
        await api.delete(`/attribute-values/${id}`);
    },
};

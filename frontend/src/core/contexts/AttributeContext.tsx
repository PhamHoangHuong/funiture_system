import React, { createContext, useContext, useState, useEffect } from 'react';
import { Attribute, AttributeValue, AttributeContextType } from '../hooks/dataTypes';
import { attributeService } from '../services/attributeService';

const AttributeContext = createContext<AttributeContextType | undefined>(undefined);

export const AttributeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [attributes, setAttributes] = useState<Attribute[]>([]);
    const [attributeValues, setAttributeValues] = useState<AttributeValue[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAttributes = async () => {
        try {
            setLoading(true);
            const data = await attributeService.getAllAttributes();
            setAttributes(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching attributes:', err);
            setError('An error occurred while fetching attributes');
        } finally {
            setLoading(false);
        }
    };

    const fetchAttributeValues = async () => {
        try {
            setLoading(true);
            const data = await attributeService.getAllAttributeValues();
            setAttributeValues(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching attribute values:', err);
            setError('An error occurred while fetching attribute values');
        } finally {
            setLoading(false);
        }
    };

    const createAttribute = async (attributeData: Partial<Attribute>) => {
        try {
            const newAttribute = await attributeService.createAttribute(attributeData);
            setAttributes([...attributes, newAttribute]);
            return newAttribute;
        } catch (err) {
            console.error('Error creating attribute:', err);
            throw err;
        }
    };

    const updateAttribute = async (id: number, attributeData: Partial<Attribute>) => {
        try {
            const updatedAttribute = await attributeService.updateAttribute(id, attributeData);
            setAttributes(attributes.map(attr => attr.id === id ? updatedAttribute : attr));
            return updatedAttribute;
        } catch (err) {
            console.error('Error updating attribute:', err);
            throw err;
        }
    };

    const deleteAttribute = async (id: number) => {
        try {
            await attributeService.deleteAttribute(id);
            setAttributes(attributes.filter(attr => attr.id !== id));
        } catch (err) {
            console.error('Error deleting attribute:', err);
            throw err;
        }
    };

    const createAttributeValue = async (attributeValueData: Partial<AttributeValue>) => {
        try {
            const newAttributeValue = await attributeService.createAttributeValue(attributeValueData);
            setAttributeValues([...attributeValues, newAttributeValue]);
            return newAttributeValue;
        } catch (err) {
            console.error('Error creating attribute value:', err);
            throw err;
        }
    };

    const updateAttributeValue = async (id: number, attributeValueData: Partial<AttributeValue>) => {
        try {
            const updatedAttributeValue = await attributeService.updateAttributeValue(id, attributeValueData);
            setAttributeValues(attributeValues.map(attrVal => attrVal.id === id ? updatedAttributeValue : attrVal));
            return updatedAttributeValue;
        } catch (err) {
            console.error('Error updating attribute value:', err);
            throw err;
        }
    };

    const deleteAttributeValue = async (id: number) => {
        try {
            await attributeService.deleteAttributeValue(id);
            setAttributeValues(attributeValues.filter(attrVal => attrVal.id !== id));
        } catch (err) {
            console.error('Error deleting attribute value:', err);
            throw err;
        }
    };

    useEffect(() => {
        fetchAttributes();
        fetchAttributeValues();
    }, []);

    return (
        <AttributeContext.Provider value={{
            attributes,
            attributeValues,
            loading,
            error,
            fetchAttributes,
            fetchAttributeValues,
            createAttribute,
            updateAttribute,
            deleteAttribute,
            createAttributeValue,
            updateAttributeValue,
            deleteAttributeValue
        }}>
            {children}
        </AttributeContext.Provider>
    );
};

export const useAttribute = () => {
    const context = useContext(AttributeContext);
    if (context === undefined) {
        throw new Error('useAttribute must be used within an AttributeProvider');
    }
    return context;
};


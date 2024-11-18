import React, { createContext, useContext, useState, useEffect } from 'react';
import { Attribute, AttributeValue, AttributeContextType } from '../hooks/dataTypes';
import { AttributeService } from '../services/attributeService';
import { useNotification } from './NotificationContext';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const AttributeContext = createContext<AttributeContextType | undefined>(undefined);

export const AttributeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [attributes, setAttributes] = useState<Attribute[]>([]);
    const [attributeValues, setAttributeValues] = useState<AttributeValue[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { showNotification } = useNotification();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const fetchAttributes = async () => {
        try {
            setLoading(true);
            const data = await AttributeService.getAllAttributes();
            setAttributes(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching attributes:', err);
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            setError(t('common.fetchError', { message: errorMessage }));
            showNotification(t('common.fetchError', { message: errorMessage }), 'error');
        } finally {
            setLoading(false);
        }
    };

    const fetchAttributeValues = async () => {
        try {
            setLoading(true);
            const data = await AttributeService.getAllAttributeValues();
            setAttributeValues(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching attribute values:', err);
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            setError(t('common.fetchError', { message: errorMessage }));
            showNotification(t('common.fetchError', { message: errorMessage }), 'error');
        } finally {
            setLoading(false);
        }
    };

    const fetchAttributeValue = async (id: number) => {
        try {
            const data = await AttributeService.getAttributeValueById(id);
            return data;
        } catch (err) {
            console.error('Error fetching attribute value:', err);
            throw err;
        }
    };

    const createAttribute = async (attributeData: Partial<Attribute>) => {
        try {
            const newAttribute = await AttributeService.createAttribute(attributeData);
            setAttributes([...attributes, newAttribute]);
            showNotification(t('common.createSuccess'), 'success');
            navigate('/admin/attributes');
            return newAttribute;
        } catch (err) {
            console.error('Error creating attribute:', err);
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            showNotification(t('common.createError', { message: errorMessage }), 'error');
            throw err;
        }
    };

    const updateAttribute = async (id: number, attributeData: Partial<Attribute>) => {
        try {
            const updatedAttribute = await AttributeService.updateAttribute(id, attributeData);
            setAttributes(attributes.map(attr => attr.id === id ? updatedAttribute : attr));
            showNotification(t('common.updateSuccess'), 'success');
            return updatedAttribute;
        } catch (err) {
            console.error('Error updating attribute:', err);
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            showNotification(t('common.updateError', { message: errorMessage }), 'error');
            throw err;
        }
    };

    const deleteAttribute = async (id: number) => {
        try {
            await AttributeService.deleteAttribute(id);
            setAttributes(attributes.filter(attr => attr.id !== id));
            showNotification(t('common.deleteSuccess'), 'success');
        } catch (err) {
            console.error('Error deleting attribute:', err);
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            showNotification(t('common.deleteError', { message: errorMessage }), 'error');
            throw err;
        }
    };

    const createAttributeValue = async (attributeValueData: Partial<AttributeValue>) => {
        try {
            if (attributeValueData.attribute_id === undefined) {
                throw new Error('attribute_id is required');
            }
            const newAttributeValue = await AttributeService.createAttributeValue(attributeValueData as { attribute_id: number; value: string });
            setAttributeValues([...attributeValues, newAttributeValue]);
            showNotification(t('common.createSuccess'), 'success');
            return newAttributeValue;
        } catch (err) {
            console.error('Error creating attribute value:', err);
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            showNotification(t('common.createError', { message: errorMessage }), 'error');
            throw err;
        }
    };

    const updateAttributeValue = async (id: number, attributeValueData: Partial<AttributeValue>) => {
        try {
            const updatedAttributeValue = await AttributeService.updateAttributeValue(id, attributeValueData);
            setAttributeValues(attributeValues.map(attrVal => attrVal.id === id ? updatedAttributeValue : attrVal));
            showNotification(t('common.updateSuccess'), 'success');
            return updatedAttributeValue;
        } catch (err) {
            console.error('Error updating attribute value:', err);
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            showNotification(t('common.updateError', { message: errorMessage }), 'error');
            throw err;
        }
    };

    const deleteAttributeValue = async (id: number) => {
        try {
            await AttributeService.deleteAttributeValue(id);
            setAttributeValues(attributeValues.filter(attrVal => attrVal.id !== id));
            showNotification(t('common.deleteSuccess'), 'success');
        } catch (err) {
            console.error('Error deleting attribute value:', err);
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            showNotification(t('common.deleteError', { message: errorMessage }), 'error');
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
            fetchAttributeValue,
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


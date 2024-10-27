import React, { createContext, useContext, useState } from 'react';
import { Source, SourceContextType, SourceProduct } from '../hooks/dataTypes';
import { SourceService } from '../services/sourceService';

const SourceContext = createContext<SourceContextType | undefined>(undefined);

export const SourceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [sources, setSources] = useState<Source[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSources = async () => {
        try {
            setLoading(true);
            const data = await SourceService.getAll();
            setSources(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching sources:', err);
            setError('An error occurred while fetching sources');
        } finally {
            setLoading(false);
        }
    };

    const createSource = async (sourceData: Partial<Source>) => {
        try {
            const newSource = await SourceService.create(sourceData);
            setSources([...sources, newSource]);
            return newSource;
        } catch (err) {
            console.error('Error creating source:', err);
            throw err;
        }
    };

    const updateSource = async (id: number, sourceData: Partial<Source>) => {
        try {
            const updatedSource = await SourceService.update(id, sourceData);
            setSources(sources.map(source => source.id === id ? updatedSource : source));
            return updatedSource;
        } catch (err) {
            console.error('Error updating source:', err);
            throw err;
        }
    };

    const deleteSource = async (id: number) => {
        try {
            await SourceService.delete(id);
            setSources(sources.filter(source => source.id !== id));
        } catch (err) {
            console.error('Error deleting source:', err);
            throw err;
        }
    };

    return (
        <SourceContext.Provider value={{ sources, loading, error, fetchSources, createSource, updateSource, deleteSource }}>
            {children}
        </SourceContext.Provider>
    );
};

export const useSource = () => {
    const context = useContext(SourceContext);
    if (context === undefined) {
        throw new Error('useSource must be used within a SourceProvider');
    }
    return context;
};

import { AxiosResponse } from 'axios';

// Table header type
export interface TableHeader {
    key: string;
    label: string;
    sortable: boolean;
}

export interface SuccessResponse<Data> {
    data: Data
}

export interface ErrorResponse<Data> {
    message: string
    data?: Data
}

//  cu phap -? se loai bo key optionnal
export type NoUndefineField<T> = {
    [key in keyof T]-?: NoUndefineField<NonNullable<T[key]>>
}

// User related types
export interface User {
    id: number;
    email: string;
    name: string;
}

// Category related types
export interface Category {
    id: number;
    name: string;
    slug: string;
    parent_id: number | null;
    image: string | null;
    description: string | null;
    is_menu: boolean;
    status: boolean;
    created_at: string;
    updated_at: string;
}

export interface Product {
    id: number
    name: string
    slug: string | null
    description: string | null
    content: string | null
    image: string
    status: number
    weight: number | null
    price: number
    start_new_time: string | null
    end_new_time: string | null
    advanced_price_id: number | null
    parent_id: number | null
    sku: string | null
    stock_quantity: number
    seo_title: string | null
    seo_description: string | null
    video_link: string | null
    category_id: number | null
    sources: SourceProduct[];
    attributes: ProductAttribute[];
    variants: Product[];
    advanced_prices: AdvancedPrice[];
}

// Auth context type
export interface AuthContextType {
    user: User | null;
    loading: boolean;
    handleLogin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    handleLogout: () => Promise<void>;
    handleRefreshToken: () => Promise<boolean>;
}

export interface Attribute {
    id: number;
    name: string;
    description: string | null;
    created_at: string;
    updated_at: string;
    attribute_values: AttributeValue[];
}

export interface AttributeValue {
    id: number;
    attribute_id: number;
    value: string;
    created_at: string;
    updated_at: string;
}

export interface AttributeContextType {
    attributes: Attribute[];
    attributeValues: AttributeValue[];
    loading: boolean;
    error: string | null;
    fetchAttributes: () => Promise<void>;
    fetchAttributeValues: () => Promise<void>;
    createAttribute: (attributeData: Partial<Attribute>) => Promise<Attribute>;
    updateAttribute: (id: number, attributeData: Partial<Attribute>) => Promise<Attribute>;
    deleteAttribute: (id: number) => Promise<void>;
    createAttributeValue: (attributeValueData: Partial<AttributeValue>) => Promise<AttributeValue>;
    updateAttributeValue: (id: number, attributeValueData: Partial<AttributeValue>) => Promise<AttributeValue>;
    deleteAttributeValue: (id: number) => Promise<void>;
}

export interface AdvancedPrice {
    id?: number;
    product_id?: number;
    type: string;
    start_time: string | null;
    end_time: string | null;
    amount: number;
    created_at?: string;
    updated_at?: string;
}

export interface AdvancedPriceContextType {
    advancedPrices: AdvancedPrice[];
    loading: boolean;
    error: string | null;
    fetchAdvancedPrices: () => Promise<void>;
    createAdvancedPrice: (advancedPriceData: Partial<AdvancedPrice>) => Promise<AdvancedPrice>;
    updateAdvancedPrice: (id: number, advancedPriceData: Partial<AdvancedPrice>) => Promise<AdvancedPrice>;
    deleteAdvancedPrice: (id: number) => Promise<void>;
}

export interface ProductAttribute {
    attribute_id: number;
    value_id: number;
}

export interface Source {
    id: number;
    name: string;
    address: string;
    province_id: string | null;
    district_id: string | null;
    ward_id: string | null;
    active: boolean;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface SourceProduct {
    id: number;
    product_id: number;
    source_id: number;
    quantity: number;
    status: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface SourceContextType {
    sources: Source[];
    loading: boolean;
    error: string | null;
    fetchSources: () => Promise<void>;
    createSource: (sourceData: Partial<Source>) => Promise<Source>;
    updateSource: (id: number, sourceData: Partial<Source>) => Promise<Source>;
    deleteSource: (id: number) => Promise<void>;
}

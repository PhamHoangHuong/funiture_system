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
    slug: string | null // nullable nếu không có giá trị
    description: string | null // nullable nếu không có giá trị
    content: string | null // nullable nếu không có giá trị
    image: string // nullable nếu không có giá trị
    status: number // có thể dùng enum nếu cần
    weight: number | null // nullable nếu không có giá trị
    price: number // giữ nguyên kiểu string để phù hợp với định dạng giá
    start_new_time: string | null // nullable nếu không có giá trị
    end_new_time: string | null // nullable nếu không có giá trị
    advanced_price_id: number | null // nullable nếu không có giá trị
    parent_id: number | null // nullable nếu không có giá trị
    sku: string | null // nullable nếu không có giá trị
    stock_quantity: number // số lượng trong kho
    seo_title: string | null // nullable nếu không có giá trị
    seo_description: string | null // nullable nếu không có giá trị
    video_link: string | null // nullable nếu không có giá trị
    category_id: number | null // nullable nếu không có giá trị
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

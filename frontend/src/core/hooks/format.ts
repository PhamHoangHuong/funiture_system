import { format } from 'date-fns';

// format date dd/MM/yyyy
export const formatDate = (date: string) => {
    return format(new Date(date), 'dd/MM/yyyy');
};

// format date dd/MM/yyyy HH:mm:ss
export const formatDateTime = (date: string) => {
    return format(new Date(date), 'dd/MM/yyyy HH:mm:ss');
};

// format data dd/MM/yyyy -> yyyy-MM-dd
export const formatDateYMD = (date: string) => {
    return format(new Date(date), 'yyyy-MM-dd');
};

// format currency VND
export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(value)
};

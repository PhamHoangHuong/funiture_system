import dayjs from 'dayjs';

// Định dạng ngày thành DD/MM/YYYY
export const formatDate = (date: dayjs.Dayjs | string | null): string => {
    return date ? dayjs(date).format('DD/MM/YYYY') : '';
};

// Định dạng ngày và giờ thành DD/MM/YYYY HH:mm:ss
export const formatDateTime = (date: dayjs.Dayjs | string | null): string => {
    return date ? dayjs(date).format('DD/MM/YYYY HH:mm:ss') : '';
};

// Định dạng ngày thành YYYY-MM-DD
export const formatDateYMD = (date: dayjs.Dayjs | string | null): string => {
    return date ? dayjs(date).format('YYYY-MM-DD') : '';
};

// Định dạng số tiền thành VNĐ
export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        currencyDisplay: 'code'
    }).format(value).replace('VND', 'VNĐ');
};

// Tạo slug từ chuỗi
export const generateSlug = (str: string): string => {
    return str
        .toLowerCase() // Chuyển thành chữ thường
        .normalize('NFD') // Chuẩn hóa Unicode
        .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu
        .replace(/đ/g, 'd') // Thay thế đ bằng d
        .replace(/[^a-z0-9\s]/g, '') // Loại bỏ ký tự đặc biệt
        .replace(/\s+/g, '-'); // Thay thế khoảng trắng bằng dấu gạch ngang
};

// map thuộc tính sản phẩm biến thể = name sản phẩm chính + name giá trị thuộc tính
export const mapAttribute = (product: any, attribute: any) => {
    return `${attribute.name}: ${attribute.value}`;
};

// Chuyển đổi chuỗi ngày DD/MM/YYYY thành đối tượng Dayjs
export const parseDateFromDisplay = (dateString: string): dayjs.Dayjs | null => {
    return dateString ? dayjs(dateString, 'DD/MM/YYYY') : null;
};


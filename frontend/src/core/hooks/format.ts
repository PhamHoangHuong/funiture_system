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


// Chuyển đổi chuỗi ngày DD/MM/YYYY thành đối tượng Dayjs
export const parseDateFromDisplay = (dateString: string): dayjs.Dayjs | null => {
    return dateString ? dayjs(dateString, 'DD/MM/YYYY') : null;
};
// Tạo tên biến thể từ tên sản phẩm và giá trị thuộc tính phải theo công thưc trên nha vd mình có 
// công thức: S=a^n
// a: màu sắc, size
// n: số lượng giá trị thuộc tính
//vd: có màu là xanh đỏ vàng và size là: L,XL,XXL
// thì tên biến thể sẽ là: xanhL, đỏL, vàngL, xanhXL, đỏXL, vàngXL, xanhXXL, đỏXXL, vàngXXL
export const generateVariantName = (productName: string, attributeValues: { attribute_id: number, values: string[] }[]) => {
    return attributeValues.map(attr => attr.values.map(value => `${productName} ${value}`)).flat();
};

// Định dạng trạng thái sản phẩm 1: hoạt động, 0: không hoạt động
export const formatStatus = (status: number, t: (key: string) => string): string => {
    return status === 1 ? t("active") : t("inactive");
};

export const formatStatusAdd = (status: any): number => {
    const validStatus = [0, 1];
    const formattedStatus = parseInt(status, 10);

    if (isNaN(formattedStatus) || !validStatus.includes(formattedStatus)) {
        throw new Error("Invalid status value. Status must be 0 or 1.");
    }

    return formattedStatus;
};



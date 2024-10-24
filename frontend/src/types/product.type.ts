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

import { Product, Variant } from './dataTypes';

export const createProductFormData = (product: Product): FormData => {
    const formData = new FormData();

    formData.append('name', product.name || '');
    formData.append('slug', product.slug || '');
    formData.append('description', product.description || '');
    formData.append('content', product.content || '');
    formData.append('status', product.status.toString());
    formData.append('weight', (product.weight ?? 0).toString());
    formData.append('price', (product.price ?? 0).toString());
    formData.append('start_new_time', product.start_new_time || '');
    formData.append('end_new_time', product.end_new_time || '');
    formData.append('sku', product.sku || '');
    formData.append('seo_title', product.seo_title || '');
    formData.append('seo_description', product.seo_description || '');
    formData.append('video_link', product.video_link || '');

    (product.category_ids || []).forEach(id => formData.append('category_ids[]', id.toString()));

    (product.attributes || []).forEach((attr, index) => {
        if (attr.attribute_id && attr.attribute_value_id) {
            formData.append(`attributes[${index}][attribute_id]`, attr.attribute_id.toString());
            formData.append(`attributes[${index}][attribute_value_id]`, attr.attribute_value_id.toString());
        }
    });

    (product.variants || []).forEach((variant: Variant, index) => {
        console.log(`Appending variant ${index}:`, variant);
        formData.append(`variants[${index}][name]`, variant.name || '');
        formData.append(`variants[${index}][slug]`, variant.slug || '');
        formData.append(`variants[${index}][price]`, (variant.price ?? 0).toString());
        formData.append(`variants[${index}][sku]`, variant.sku || '');
        formData.append(`variants[${index}][weight]`, (variant.weight ?? product.weight ?? 0).toString());
        formData.append(`variants[${index}][status]`, variant.status ? '1' : '0');
        formData.append(`variants[${index}][description]`, variant.description || '');
        formData.append(`variants[${index}][content]`, variant.content || '');
        formData.append(`variants[${index}][seo_title]`, variant.seo_title || '');
        formData.append(`variants[${index}][seo_description]`, variant.seo_description || '');
        formData.append(`variants[${index}][video_link]`, variant.video_link || '');
        formData.append(`variants[${index}][start_new_time]`, variant.start_new_time || '');
        formData.append(`variants[${index}][end_new_time]`, variant.end_new_time || '');

        if (variant.attributes && variant.attributes.length > 0) {
            const attr = variant.attributes[0];
            if (attr.attribute_id && attr.attribute_value_id) {
                formData.append(`variants[${index}][attributes][0][attribute_id]`, attr.attribute_id.toString());
                formData.append(`variants[${index}][attributes][0][attribute_value_id]`, attr.attribute_value_id.toString());
            }
        }

        if (variant.image && typeof variant.image === 'object' && variant.image instanceof File) {
            formData.append(`variants[${index}][image]`, variant.image);
        }
    });

    (product.sources || []).forEach((source, index) => {
        formData.append(`sources[${index}][source_id]`, source.source_id.toString());
        formData.append(`sources[${index}][quantity]`, source.quantity.toString());
    });

    (product.advanced_prices || []).forEach((price, index) => {
        formData.append(`advanced_prices[${index}][type]`, price.type || '');
        formData.append(`advanced_prices[${index}][start_time]`, price.start_time || '');
        formData.append(`advanced_prices[${index}][end_time]`, price.end_time || '');
        formData.append(`advanced_prices[${index}][amount]`, (price.amount ?? 0).toString());
    });

    if (product.image && typeof product.image === 'object' && product.image instanceof File) {
        formData.append('image', product.image);
    }

    return formData;
};
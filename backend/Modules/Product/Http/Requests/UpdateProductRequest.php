<?php

namespace Modules\Product\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $productId = $this->route('product');
        return [
            'name' => 'sometimes|required|string|max:255',
            'slug' => [
                'sometimes',
                'string',
                'max:255',
                Rule::unique('products')->ignore($productId),
            ],
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'image' => 'nullable|image',
            'status' => 'boolean',
            'weight' => 'nullable|numeric',
            'price' => 'sometimes|required|numeric|min:0',
            'start_new_time' => 'nullable|date',
            'end_new_time' => 'nullable|date|after:start_new_time',
            'parent_id' => [
                'nullable',
                'exists:products,id',
                Rule::notIn([$productId]),
            ],
            'sku' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('products')->ignore($productId),
            ],
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string',
            'video_link' => 'nullable|string|url',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Tên sản phẩm là bắt buộc.',
            'name.max' => 'Tên sản phẩm không được vượt quá 255 ký tự.',
            'slug.unique' => 'Slug đã tồn tại.',
            'price.required' => 'Giá sản phẩm là bắt buộc.',
            'price.numeric' => 'Giá sản phẩm phải là số.',
            'price.min' => 'Giá sản phẩm không được âm.',
            'end_new_time.after' => 'Thời gian kết thúc phải sau thời gian bắt đầu.',
            'parent_id.not_in' => 'Sản phẩm không thể là biến thể của chính nó.',
            'sku.unique' => 'SKU đã tồn tại.',
            'video_link.url' => 'Đường dẫn video không hợp lệ.',
        ];
    }
}

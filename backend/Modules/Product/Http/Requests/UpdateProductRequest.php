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
        return [
            'name' => 'sometimes|required|string|max:255',
            'slug' => 'sometimes|string|max:255|unique:products,slug,' . $this->route('product'),
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'image' => 'nullable|string',
            'status' => 'boolean',
            'weight' => 'nullable|numeric',
            'price' => 'sometimes|required|numeric',
            'start_new_time' => 'nullable|date',
            'end_new_time' => 'nullable|date',
            'advanced_price_id' => 'nullable|integer',
            'parent_id' => [
                'nullable',
                'integer',
                Rule::exists('products', 'id')->whereNull('parent_id') // sản phẩm biến thể sẽ dựa vào sản phẩm chính (parent_id = null)
            ],
            'sku' => 'nullable|string|max:255',
            'stock_quantity' => 'integer',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string',
            'video_link' => 'nullable|string',
            'attributes' => 'nullable|array',
            'attributes.*.attribute_id' => 'required|exists:attributes,id',
            'attributes.*.value_id' => 'required|exists:attribute_values,id',
        ];
    }
}

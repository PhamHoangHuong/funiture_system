<?php

namespace Modules\Product\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProductRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:products,slug',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'image' => 'nullable|string',
            'status' => 'boolean',
            'weight' => 'nullable|numeric',
            'price' => 'required|numeric',
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
            'category_id' => 'nullable|integer',
            'attributes' => 'nullable|array',
            'attributes.*.attribute_id' => 'required_with:attributes|exists:attributes,id',
            'attributes.*.value_id' => 'required_with:attributes|exists:attribute_values,id',
            'variants' => 'nullable|array',
            'variants.*.name' => 'required_with:variants|string|max:255',
            'variants.*.price' => 'required_with:variants|numeric',
            'variants.*.sku' => 'nullable|string|max:255',
            'variants.*.stock_quantity' => 'integer',
            'variants.*.attributes' => 'nullable|array',
            'variants.*.attributes.*.attribute_id' => 'required_with:variants.*.attributes|exists:attributes,id',
            'variants.*.attributes.*.value_id' => 'required_with:variants.*.attributes|exists:attribute_values,id',
            'sources' => 'nullable|array',
            'sources.*.source_id' => 'required_with:sources|exists:sources,id',
            'sources.*.quantity' => 'required_with:sources|integer|min:0',
            'sources.*.stock' => 'required_with:sources|integer|min:0',
        ];
    }
}
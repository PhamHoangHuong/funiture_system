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
            'slug' => 'nullable|string|max:unique:products,slug',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'image' => 'nullable|string',
            'status' => 'boolean',
            'weight' => 'required|numeric',
            'price' => 'required|numeric',
            'start_new_time' => 'nullable|date',
            'end_new_time' => 'nullable|date',
            'advanced_price_id' => 'nullable|integer',
            'parent_id' => 'nullable|exists:products,id',
            'sku' => 'nullable|string|max:255',
            'stock_quantity' => 'integer',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string',
            'video_link' => 'nullable|string',
            'category_id' => 'nullable|integer',
            'attributes' => 'nullable|array',
            'attributes.*.attribute_id' => 'required|exists:attributes,id',
            'attributes.*.value_id' => 'required|exists:attribute_values,id',
            'variants' => 'nullable|array',
            'variants.*.name' => 'required|string',
            'variants.*.price' => 'required|numeric',
            'variants.*.sku' => 'nullable|string|max:255',
            'variants.*.stock_quantity' => 'integer',
            'variants.*.attributes' => 'array',
            'variants.*.attributes.*.attribute_id' => 'required|exists:attributes,id',
            'variants.*.attributes.*.value_id' => 'required|exists:attribute_values,id',
            'sources' => 'nullable|array',
            'sources.*.source_id' => 'required_with:sources|exists:sources,id',
            'sources.*.quantity' => 'required_with:sources|integer|min:0',
        ];
    }
}

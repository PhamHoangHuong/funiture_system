<?php

namespace Modules\Product\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductAttributeRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'product_id' => 'required|exists:products,id',
            'attribute_id' => 'required|exists:attributes,id',
            'attribute_value_id' => 'required|exists:attribute_values,id',
        ];
    }

    public function messages()
    {
        return [
            'product_id.required' => 'ID sản phẩm là bắt buộc.',
            'product_id.exists' => 'Sản phẩm không tồn tại.',
            'attribute_id.required' => 'ID thuộc tính là bắt buộc.',
            'attribute_id.exists' => 'Thuộc tính không tồn tại.',
            'attribute_value_id.required' => 'ID giá trị thuộc tính là bắt buộc.',
            'attribute_value_id.exists' => 'Giá trị thuộc tính không tồn tại.',
        ];
    }
}

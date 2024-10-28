<?php

namespace Modules\Product\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductAttributeRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'product_id' => 'sometimes|required|exists:products,id',
            'attribute_id' => 'sometimes|required|exists:attributes,id',
            'attribute_value_id' => 'sometimes|required|exists:attribute_values,id',
        ];
    }

    public function messages()
    {
        return [
            'product_id.exists' => 'Sản phẩm không tồn tại.',
            'attribute_id.exists' => 'Thuộc tính không tồn tại.',
            'attribute_value_id.exists' => 'Giá trị thuộc tính không tồn tại.',
        ];
    }
}

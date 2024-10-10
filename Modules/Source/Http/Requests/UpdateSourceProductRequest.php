<?php

namespace Modules\Source\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSourceProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'product_id' => 'required|exists:products,id',
            'source_id' => 'required|exists:sources,id',
            'quantity' => 'required|integer|min:0',
            'stock' => 'required|integer|min:0',
        ];
    }
}

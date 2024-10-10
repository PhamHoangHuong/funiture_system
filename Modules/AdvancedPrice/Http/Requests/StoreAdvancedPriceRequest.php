<?php

namespace Modules\AdvancedPrice\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAdvancedPriceRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'product_id' => 'required|exists:products,id',
            'type' => 'required|string',
            'start_time' => 'nullable|date',
            'end_time' => 'nullable|date',
            'amount' => 'required|numeric',
        ];
    }

    public function messages()
    {
        return [
            'product_id.required' => 'The product field is required.',
            'product_id.exists' => 'The product does not exist.',
            'type.required' => 'The type field is required.',
            'type.string' => 'The type must be a string.',
            'start_time.date' => 'The start time must be a valid date.',
            'end_time.date' => 'The end time must be a valid date.',
            'amount.required' => 'The amount field is required.',
            'amount.numeric' => 'The amount must be a number.',
        ];
    }
}

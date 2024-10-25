<?php

namespace Modules\Source\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSourceRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'sometimes|required|string|max:255',
            'district' => 'sometimes|required|string|max:20',
            'province' => 'sometimes|required|string|max:20',
            'ward' => 'sometimes|required|string|max:20',
            'address' => 'sometimes|required|string|max:255',
            'active' => 'boolean',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'The name field is required.',
            'district.required' => 'The district field is required.',
            'province.required' => 'The province field is required.',
            'ward.required' => 'The ward field is required.',
            'address.required' => 'The address field is required.',
        ];
    }
}
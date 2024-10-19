<?php

namespace Modules\Source\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSourceRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'district' => 'required|string|max:20',
            'province' => 'required|string|max:20',
            'ward' => 'required|string|max:20',
            'address' => 'required|string|max:255',
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

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
            'name' => 'required|string|max:255|unique:sources,name',
            'province_id' => 'required|string|max:20|exists:provinces,code',
            'district_id' => 'required|string|max:20|exists:districts,code',
            'ward_id' => 'required|string|max:20|exists:wards,code',
            'address' => 'required|string|max:255',
            'active' => 'boolean',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'The name field is required.',
            'name.unique' => 'This source name already exists.',
            'province_id.required' => 'The province field is required.',
            'province_id.exists' => 'The selected province is invalid.',
            'district_id.required' => 'The district field is required.',
            'district_id.exists' => 'The selected district is invalid.',
            'ward_id.required' => 'The ward field is required.',
            'ward_id.exists' => 'The selected ward is invalid.',
            'address.required' => 'The address field is required.',
        ];
    }
}

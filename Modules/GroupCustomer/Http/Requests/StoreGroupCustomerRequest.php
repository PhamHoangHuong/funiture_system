<?php

namespace Modules\GroupCustomer\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreGroupCustomerRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'code'=>'required|string|max:255',
            'status'=>'required',
        ];
    }
    public function messages()
    {
        return [
            'name.required' => 'The name field is required.',
            'code.required' => 'The code field is required.',
            'status.required' => 'The status field is required.',
        ];
    }


}

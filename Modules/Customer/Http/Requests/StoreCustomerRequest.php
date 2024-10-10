<?php

namespace Modules\Customer\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCustomerRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'group_id'=>'required|exists:group_customers,id',
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255|email|unique:customers,email',
            'phone' => 'required|string|max:11|unique:customers,phone',
            'point'=>'required|numeric',
            'status'=> 'required',
        ];
    }
    public function messages()
    {
        return [
            'group_id.required' => 'Group name is required.',
            'group_id.exists' => 'Group name is not exist.',
            'name.required' => 'The name field is required.',
            'name.string' => 'The name must be a string.',
            'name.max' => 'The name may not be greater than 255 characters.',
            'email.required' => 'The email field is required.',
            'email.string' => 'The email must be a string.',
            'email.email' => 'The email must be a valid email address.',
            'email.unique' => 'The email has already been taken.',
            'phone.required' => 'The phone field is required.',
            'phone.max' => 'The phone may not be greater than 11 characters.',
            'phone.unique' => 'The phone has already been taken.',
            'point.required' => 'The point field is required.',
            'point.numeric' => 'The point must be a number.',
            'status.required' => 'The status field is required.',
        ];
    }

}

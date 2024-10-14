<?php

namespace Modules\Customer\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CustomerRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'group_id' => 'required|integer',
            'name' => 'nullable|string|max:255',
            'phone' => 'nullable|digits_between:10,15|unique:customers,phone',
            'email' => 'nullable|email|max:255',
            'address' => 'nullable|string|max:255|',
            'status' => 'required|integer',
            'password' => 'required|min:6',
            'email_verified_at' => 'nullable|date',
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }
}

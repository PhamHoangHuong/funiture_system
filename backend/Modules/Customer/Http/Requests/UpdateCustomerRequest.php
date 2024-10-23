<?php

namespace Modules\Customer\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCustomerRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'group_id' => 'required|exists:group_customers,id',
            'name' => 'nullable|string|max:255',
            'email' => 'required|email|unique:customers,email,' . $this->route('customer'),
            'address' => 'nullable|string|max:255',
            'point' => 'nullable|integer|min:0',
            'status' => 'required|integer|in:0,1',
            'password' => 'nullable|string|min:8|confirmed',
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

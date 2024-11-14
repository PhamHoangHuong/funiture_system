<?php

namespace Modules\Category\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'=>'nullable|string',
            'slug'=>'nullable|string|unique:categories,slug,'.$this->route('category'),
            'description'=>'nullable|string',
            'image'=>'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'status'=>'nullable|integer|in:0,1',
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

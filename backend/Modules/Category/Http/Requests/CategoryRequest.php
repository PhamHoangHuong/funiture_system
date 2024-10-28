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
            'name' => 'required|string|max:255|unique:categories,name',
            'slug' => 'required|string|max:20',
            'parent_id' => 'nullable|integer|exists:categories,id',
            'image' => 'nullable|string|max:200',
            'description' => 'nullable|string',
            'is_menu' => 'required|boolean',
            'status' => 'boolean',
            'deleted_at' => 'nullable|date',
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

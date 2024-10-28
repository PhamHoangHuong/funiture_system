<?php

namespace Modules\Attributes\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAttributeRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255|unique:attributes,name',
            'description' => 'nullable|string|max:1000',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Tên thuộc tính là bắt buộc.',
            'name.string' => 'Tên thuộc tính phải là một chuỗi.',
            'name.max' => 'Tên thuộc tính không được vượt quá 255 ký tự.',
            'name.unique' => 'Tên thuộc tính đã tồn tại.',
            'description.string' => 'Mô tả phải là một chuỗi.',
            'description.max' => 'Mô tả không được vượt quá 1000 ký tự.',
        ];
    }
}

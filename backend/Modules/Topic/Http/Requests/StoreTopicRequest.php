<?php

namespace Modules\Topic\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTopicRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'sometime|string|max:255',
            'slug' => 'nullable|string|max:255|unique:topics,slug',
            'parent_id' => [
                'nullable',
                'integer',
                Rule::exists('topics', 'id')->whereNull('parent_id') // chủ đề con sẽ dựa vào chủ đề cha (parent_id = null)
            ],
            'image' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'sort_order' => 'nullable|integer',
            'status' => 'required', // Trạng thái: 1 - Kích hoạt, 0 - Không kích hoạt
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

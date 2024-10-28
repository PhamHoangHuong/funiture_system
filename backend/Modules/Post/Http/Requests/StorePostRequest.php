<?php

namespace Modules\Post\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'topic_id' => 'nullable|exists:topics,id',
            'user_id' => 'nullable|exists:users,id',
            'title' => 'nullable|string|max:255',
            'slug' => 'nullable|string|max:255|unique:posts,slug',
            'type' => 'required|integer|in:1,2,3,4,5,6,7,8,9',
            'content' => 'nullable|string',
            'description' => 'nullable|string|max:500',
            'image' => 'nullable|string|max:255', // hoặc 'nullable|image' nếu bạn muốn kiểm tra file ảnh
            'status' => 'required|integer|in:0,1,2',
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

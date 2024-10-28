<?php

namespace Modules\Post\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePostRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'topic_id' => 'nullable|integer|exists:topics,id',
            'user_id' => 'nullable|integer|exists:users,id',
            'title' => 'sometimes|string|max:255',
            'slug' => [
                'sometimes',
                'string',
                'max:255',
                'unique:posts,slug,' . $this->route('post'), // Ignore the current post's slug
            ],
            'type' => 'sometimes|integer|in:1,2,3,4,5,6,7,8,9',
            'content' => 'sometimes|string',
            'description' => 'sometimes|string',
            'image' => 'sometimes|string|max:255',
            'status' => 'sometimes|integer|in:0,1,2',
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

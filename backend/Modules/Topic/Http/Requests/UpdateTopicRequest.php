<?php

namespace Modules\Topic\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTopicRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $topicId = $this->route('topic'); // Adjust this if your route parameter is named differently

        return [
            'name' => 'sometimes|string|max:255',
            'slug' => [
                'sometimes',
                'string',
                'max:255',
                Rule::unique('topics')->ignore($topicId), // Ignore the current topic's ID
            ],
            'parent_id' => [
                'nullable',
                'integer',
                Rule::exists('topics', 'id')->whereNull('parent_id'), // Ensure parent topic is not a child itself
            ],
            'image' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'sort_order' => 'nullable|integer',
            'status' => 'nullable|in:0,1', // Allow both 0 and 1 for status
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

<?php

namespace Modules\Review\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ReviewRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'product_id' => 'nullable|exists:products,id',
            'customer_id' => 'nullable|exists:customers,id',
            'parent_id' => [
                'nullable',
                'integer',
                Rule::exists('reviews', 'id')->where('parent_id', null),
            ],
            'title' => 'nullable|string',
            'content' => 'nullable|string',
            'rating' => 'nullable|numeric|min:0|max:5',
            'status' => 'nullable|in:0,1,2',
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

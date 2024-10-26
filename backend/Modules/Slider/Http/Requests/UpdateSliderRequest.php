<?php

namespace Modules\Slider\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSliderRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'sometimes|required|string|max:255',
            'type' => 'sometimes|required|string|in:1,2',
            'position' => 'sometimes|required|string|unique:sliders,position',
            'status' => 'sometimes|required|integer|in:0,1',


            'images' => 'sometimes|array',
            'images.*.image' => 'sometimes|string|max:2048',
            'images.*.link' => 'sometimes|nullable|string|max:255',
            'images.*.name' => 'sometimes|nullable|string|max:255',
            'images.*.description' => 'sometimes|nullable|string|max:255',
            'images.*.sort_order' => 'sometimes|nullable|integer',
            'images.*.active' => 'sometimes|nullable|boolean',
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

<?php

namespace Modules\Slider\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSliderRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'type' => 'required|string|in:1,2',
            'position' => 'required|string|unique:sliders',
            'status' => 'required|boolean',
            'images' => 'required|array',
            'images.*.image' => 'required|image|max:2048',
            'images.*.link' => 'required|url',
            'images.*.name' => 'required|string|max:255',
            'images.*.description' => 'nullable|string',
            'images.*.sort_order' => 'required|integer',
            'images.*.active' => 'required|boolean',
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

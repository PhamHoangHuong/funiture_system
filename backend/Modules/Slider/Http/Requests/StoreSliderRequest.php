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
//        dd($this->all());
        return [
            'title' => 'required|string|max:255',
            'type' => 'required|string',
            'position' => 'required|string|unique:sliders',
            'status' => 'nullable|boolean',

            'images' => 'required|array',
            'images.*.image' => 'required|image|max:2048',
            'images.*.link' => 'nullable|url',
            'images.*.name' => 'nullable|string|max:255',
            'images.*.description' => 'nullable|string',
            'images.*.sort_order' => 'nullable|integer',
            'images.*.active' => 'nullable|boolean',
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

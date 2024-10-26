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
            'position' => 'sometimes|required|string|unique:sliders,position,' . $this->route('slider'),
            'status' => 'sometimes|required|boolean',
            'images' => 'sometimes|array',
            'images.*.id' => 'sometimes|exists:slider_images,id',
            'images.*.image' => 'nullable|image|max:2048',
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

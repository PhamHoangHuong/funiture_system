<?php

namespace Modules\Slider\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSliderImageRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'slider_id' => 'required|exists:sliders,id',
            'image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'title' => 'nullable|string|max:255',
            'link' => 'nullable|string',
            'description' => 'nullable|string',
            'sort_order' => 'integer|min:1',
            'status' => 'required|in:0,1',
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

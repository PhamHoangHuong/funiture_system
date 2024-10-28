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
            'image' => 'required|string',
            'link' => 'nullable|url',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'sort_order' => 'integer|min:0',
            'status' => 'required|in:0,1', // 0:inactive, 1:active
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

<?php

namespace Modules\Slider\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSliderRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $sliderId = $this->route('slider');
        return [
            'title' => 'required|string|max:255',
            'type' => 'required|string|in:1,2',
            'position' => [
                'sometimes',
                'string',
                'max:255',
                Rule::unique('sliders')->ignore($sliderId),
            ],
            'link' => 'nullable|string',
            'description' => 'nullable|string',
            'status' => 'required|boolean',
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

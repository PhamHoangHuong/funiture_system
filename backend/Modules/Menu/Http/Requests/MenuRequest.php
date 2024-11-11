<?php

namespace Modules\Menu\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MenuRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'=>'nullable|string|max:255',
            'link'=>'nullable|string|max:255',
            'parent_id'=>[
                'nullable',
                'integer',
                Rule::exists('menu','id')->whereNull('parent_id')
            ],
            'position'=>'nullable|string|in:header,footer,default',
            'sort_order'=>'nullable|integer',
            'status'=>'nullable|integer|in:0,1',
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

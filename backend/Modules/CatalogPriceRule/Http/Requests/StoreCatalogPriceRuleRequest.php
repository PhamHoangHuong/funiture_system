<?php

namespace Modules\CatalogPriceRule\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCatalogPriceRuleRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'required|boolean',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'conditions_serialized' => 'nullable|string',
            'simple_action' => 'required|integer|in:1,2,3,4',
            'discount_amount' => 'required|numeric',
            'priority' => 'required|integer',
            'sort_order' => 'required|integer',
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

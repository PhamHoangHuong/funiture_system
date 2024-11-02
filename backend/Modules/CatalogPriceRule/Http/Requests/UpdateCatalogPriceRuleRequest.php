<?php

namespace Modules\CatalogPriceRule\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCatalogPriceRuleRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'nullable|boolean',
            'start_time' => 'nullable|date',
            'end_time' => 'nullable|date|after:start_time',
            'conditions_serialized' => 'nullable|string',
            'simple_action' => 'nullable|integer|in:1,2,3,4',
            'discount_amount' => 'nullable|numeric',
            'priority' => 'nullable|integer',
            'sort_order' => 'nullable|integer',
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

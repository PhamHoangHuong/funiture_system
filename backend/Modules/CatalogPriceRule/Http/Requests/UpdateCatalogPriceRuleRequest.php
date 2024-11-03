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
            'is_active' => 'nullable|integer|in:0,1',
            'start_time' => 'nullable|date',
            'end_time' => 'nullable|date|after:start_time',
            'group_customer_ids' => 'nullable|string',
            'condition_apply' => 'nullable|integer|in:1,2,3,4',
            'condition_value' => 'nullable|string',
            'discount_amount' => 'nullable|numeric',
            'operator' => 'nullable|integer|in:1,2,3,4,5,6,7,8,9,10,11,12',
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

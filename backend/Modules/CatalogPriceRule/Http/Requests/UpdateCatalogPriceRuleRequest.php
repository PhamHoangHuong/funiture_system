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
            'group_customer_ids' => 'nullable|array',
            'condition_apply' => 'nullable|string|in:all_products,specific_products,categories,attribute_groups',
            'condition_value' => 'nullable|array',
            'discount_amount' => 'nullable|numeric',
            'operator' => 'nullable|integer|in:1,2,3,4,5,6',
            'simple_action' => 'nullable|string|in:by_percent,by_fixed,percent,fixed',
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

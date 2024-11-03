<?php

namespace Modules\CartPriceRule\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCartPriceRuleRequest extends FormRequest
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
            'start_time' => 'nullable|date',
            'end_time' => 'nullable|date|after:start_time',
            'is_active' => 'nullable|boolean',
            'group_customer_ids' => 'nullable|array',
            'condition'=> 'nullable|string',
            'condition_value' => 'nullable|integer|min:0',
            'simple_action' => 'nullable|integer|in:1,2,3,4',
            'coupon' => 'nullable|string|max:100',
            'discount_amount' => 'nullable|numeric|min:0',
            'discount_qty' => 'nullable|integer|min:0',
            'discount_step' => 'nullable|integer|min:1',
            'usage_limit' => 'nullable|integer|min:1',
            'used' => 'nullable|integer|min:0',
            'coupon_type' => 'nullable|integer|in:1,2',
            'sort_order' => 'nullable|integer|min:0',
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

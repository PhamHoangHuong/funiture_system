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
            'start_time' => 'nullable|date_format:Y-m-d H:i:s',
            'end_time' => 'nullable|date_format:Y-m-d H:i:s|after:start_time',
            'is_active' => 'nullable|integer|in:0,1',
            'group_customer_ids' => 'nullable|array',
            'condition_apply' => 'nullable|string|in:subtotal,total_qty,total_weight',
            'condition_value' => 'nullable|integer|min:0',
            'coupon' => 'nullable|string|max:100',
            'discount_amount' => 'nullable|numeric|min:0',
            'discount_qty' => 'nullable|integer|min:0',
            'discount_step' => 'nullable|integer|min:0',
            'usage_limit' => 'nullable|integer|min:1',
            'used' => 'nullable|integer|min:0',
            'coupon_type' => 'nullable|integer|in:1,2',
            'operator' => 'nullable|string|in:less_than,less_than_or_equal,equal,greater_than,greater_than_or_equal',
            'simple_action' => 'nullable|string|in:by_percent,by_fixed,cart_fixed',
            'priority' => 'nullable|integer|min:0',
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

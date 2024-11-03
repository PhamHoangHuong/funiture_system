<?php

namespace Modules\CartPriceRule\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCartPriceRuleRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'is_active' => 'nullable|integer|in:0,1',
            'group_customer_ids' => 'nullable|string',
            'condition_apply' => 'nullable|string',
            'condition_value' => 'nullable|integer|min:0',
            'coupon' => 'nullable|string|max:100',
            'discount_amount' => 'nullable|numeric|min:0',
            'discount_qty' => 'nullable|integer|min:0',
            'discount_step' => 'nullable|integer|min:1',
            'usage_limit' => 'nullable|integer|min:1',
            'used' => 'nullable|integer|min:0',
            'coupon_type' => 'nullable|integer|in:1,2',
            'operator' => 'nullable|integer|in:1,2,3,4,5,6',
            'sort_order' => 'nullable|integer|min:0',
        ];
    }
    public function messages()
    {
        return [
            'end_time.after' => 'Thời gian kết thúc phải sau thời gian bắt đầu.',
        ];
    }
}

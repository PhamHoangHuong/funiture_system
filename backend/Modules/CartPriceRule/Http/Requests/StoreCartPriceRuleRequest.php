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
            'name' => 'nullable|string|max:255',
            'label' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'coupon' => 'nullable|string|max:100',
            'type' => 'nullable|in:1,2', // 1: giảm giá theo phần trăm, 2: giảm giá theo số tiền
            'amount' => 'nullable|integer|min:0',
            'quantity' => 'nullable|integer|min:1',
            'start_time' => 'nullable|date',
            'end_time' => 'nullable|date|after:start_time',
            'priority' => 'nullable|integer|min:0',
            'status' => 'nullable|in:0,1', // 0: không hoạt động, 1: hoạt động
            'applicable_to' => 'nullable|in:all,specific_products,specific_categories',

            'condition.cart_price_rule_id' => 'nullable|exists:cart_price_rules,id',
            'condition.type' => 'nullable|integer', // Nếu có loại điều kiện cụ thể
            'condition.name' => 'nullable|string|max:255',
            'condition.value' => 'nullable|string',
            'condition.operator' => 'nullable|in:greater_than,smaller_than,equal',
            'condition.status' => 'nullable|in:0,1', // 0: không hoạt động, 1: hoạt động
        ];
    }
}

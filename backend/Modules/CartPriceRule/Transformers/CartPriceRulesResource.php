<?php

namespace Modules\CartPriceRule\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;

class CartPriceRulesResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'is_active' => $this->is_active,
            'group_customer_ids' => $this->group_customer_ids,
            'condition_apply' => $this->condition_apply,
            'condition_value' => $this->condition_value,
            'coupon' => $this->coupon,
            'discount_amount' => $this->discount_amount,
            'discount_qty' => $this->discount_qty,
            'discount_step' => $this->discount_step,
            'usage_limit' => $this->usage_limit,
            'used' => $this->used,
            'coupon_type' => $this->coupon_type,
            'operator' => $this->operator,
            'sort_order' => $this->sort_order,
        ];
    }
}

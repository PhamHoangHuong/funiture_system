<?php

namespace Modules\CartPriceRule\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;
class CartPriceRuleConditionResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'name' => $this->name,
            'type' => $this->type,
            'logical_operator' => $this->logical_operator,
            'value' => $this->value,
            'operator' => $this->operator,
            'status' => $this->status,
            'cart_price_rule_id' => $this->cart_price_rule_id,
        ];
    }
}

<?php

namespace Modules\CartPriceRule\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;

class CartPriceRuleResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'name' => $this->name,
            'label' => $this->label,
            'description' => $this->description,
            'coupon' => $this->coupon,
            'type' => $this->type,
            'amount' => $this->amount,
            'quantity' => $this->quantity,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'priority' => $this->priority,
            'status' => $this->status,
            'applicable_to' => $this->applicable_to,

            //Load the condition out:
            'condition' => new CartPriceRuleConditionResource($this->whenLoaded('condition')),
        ];
    }
}

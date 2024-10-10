<?php

namespace Modules\AdvancedPrice\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;

class AdvancedPriceResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'product_id' => $this->product_id,
            'type' => $this->type,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'amount' => $this->amount,
        ];
    }
}

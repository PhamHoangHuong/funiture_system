<?php

namespace Modules\CatalogPriceRule\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;

class CatalogPriceRuleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'is_active' => $this->status,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'conditions_serialized' => $this->conditions_serialized,
            'simple_action' => $this->simple_action,
            'discount_amount' => $this->discount_amount,
            'priority' => $this->priority,
            'sort_order' => $this->sort_order,
        ];
    }
}

<?php

namespace Modules\Source\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;

class SourceProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'product_id' => $this->product_id,
            'source_id' => $this->source_id,
            'quantity' => $this->quantity,
            'status' => $this->status,
        ];
    }
}

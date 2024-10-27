<?php

namespace Modules\Product\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;
use Modules\Attributes\Transformers\AttributeResource;

class ProductAttributeResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'attribute' => new AttributeResource($this->whenLoaded('attribute')),
        ];
    }
}

<?php

namespace Modules\Attributes\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;

class AttributeResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            // 'values' => AttributeValueResource::collection($this->values),
        ];
    }
}

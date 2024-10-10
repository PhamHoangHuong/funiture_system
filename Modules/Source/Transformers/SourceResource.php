<?php

namespace Modules\Source\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;

class SourceResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'district' => $this->district,
            'province' => $this->province,
            'ward' => $this->ward,
            'address' => $this->address,
            'active' => $this->active,
        ];
    }
}

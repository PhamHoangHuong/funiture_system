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
            'province_id' => $this->province_id,
            'district_id' => $this->district_id,
            'ward_id' => $this->ward_id,
            'address' => $this->address,
            'active' => $this->active,
            'province' => $this->province ? $this->province->name : null,
            'district' => $this->district ? $this->district->name : null,
            'ward' => $this->ward ? $this->ward->name : null,
        ];
    }
}

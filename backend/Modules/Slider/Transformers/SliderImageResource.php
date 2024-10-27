<?php

namespace Modules\Slider\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;

class SliderImageResource extends JsonResource
{

    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'slider_id' => $this->slider_id,
            'image_url' => asset($this->image_url),
            'sort_order' => $this->sort_order,
            'status' => $this->status,
        ];
    }
}

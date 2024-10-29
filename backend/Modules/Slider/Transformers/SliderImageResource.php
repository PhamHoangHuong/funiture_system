<?php

namespace Modules\Slider\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;

class SliderImageResource extends JsonResource
{

    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'slider_id' => $this->slider_id,
            'image_url' => asset($this->image_url),
            'title' => $this->title,
            'link' => $this->link,
            'description' => $this->description,
            'sort_order' => $this->sort_order,
            'status' => $this->status,
        ];
    }
}

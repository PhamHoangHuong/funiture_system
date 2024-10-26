<?php

namespace Modules\Slider\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;

class SliderResource extends JsonResource
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
            'title' => $this->title,
            'type' => $this->type,
            'position' => $this->position,
            'status' => $this->status ? 'active' : 'inactive',
            'images' => SliderImageResource::collection($this->whenLoaded('images')),
        ];
    }
}

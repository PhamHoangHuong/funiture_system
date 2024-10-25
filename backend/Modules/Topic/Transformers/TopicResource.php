<?php

namespace Modules\Topic\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;

class TopicResource extends JsonResource
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
            'slug' => $this->slug,
            'parent_id' => $this->parent_id,
            'image' => $this->image,
            'description' => $this->description,
            'sort_order' => $this->sort_order,

            //Quan hệ với chủ đề cha
            'parent' => new TopicResource($this->whenLoaded('parent')),
        ];
    }
}

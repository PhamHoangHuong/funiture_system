<?php

namespace Modules\Category\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
            $resource = [
                'id' => $this->id,
                'name' => $this->name,
                'slug' => $this->slug,
                'parent_id' => $this->parent_id,
                'image' => $this->image,
                'description' => $this->description,
                'is_menu' => $this->is_menu,
                'status' => $this->status,
                'deleted_at' => $this->deleted_at,
                'created_at' => $this->created_at,
                'updated_at' => $this->updated_at,
            ];
            if($this->subCategories){
                $resource['sub_categories'] = CategoryResource::collection($this->whenLoaded('subCategories'));
            }

            return $resource;
    }
}

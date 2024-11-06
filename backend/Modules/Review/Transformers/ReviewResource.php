<?php

namespace Modules\Review\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
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
            'product_id' => $this->product_id,
            'customer_id' => $this->customer_id,
            'parent_id' => $this->parent_id,
            'rating' => $this->rating,
            'title' => $this->title,
            'content' => $this->content,
            'status' => $this->status,
        ];
    }
}

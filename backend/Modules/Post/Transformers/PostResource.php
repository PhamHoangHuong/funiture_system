<?php

namespace Modules\Post\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;
use Modules\Auth\Transformers\UserResource;
use Modules\Topic\Transformers\TopicResource;

class PostResource extends JsonResource
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
            'topic_id' => $this->topic_id,
            'user_id' => $this->user_id,
            'title' => $this->title,
            'slug' => $this->slug,
            'type' => $this->type,
            'content' => $this->content,
            'description' => $this->description,
            'image' => $this->image,
            'status' => $this->status,
            'topic' => new TopicResource($this->whenLoaded('topic')),
            'user' => new UserResource($this->whenLoaded('user')),
        ];
    }
}

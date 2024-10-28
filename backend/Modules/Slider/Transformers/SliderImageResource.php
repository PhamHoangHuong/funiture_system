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
            'image' => asset($this->image), // Trả về đường dẫn đầy đủ tới hình ảnh
            'link' => $this->link,
            'title' => $this->name, // Sửa thành 'name' cho nhất quán
            'description' => $this->description,
            'sort_order' => $this->sort_order,
            'status' => $this->active == 1 ? 'active' : 'inactive', // Đảm bảo tên thuộc tính chính xác
        ];
    }
}

<?php

namespace Modules\Product\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;
use Modules\AdvancedPrice\Transformers\AdvancedPriceResource;
use Modules\Category\Transformers\CategoryResource;
use Modules\Source\Transformers\SourceProductResource;

class ProductResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'content' => $this->content,
            'image' => $this->image,
            'status' => $this->status,
            'weight' => $this->weight,
            'price' => $this->price,
            'start_new_time' => $this->start_new_time,
            'end_new_time' => $this->end_new_time,
            'parent_id' => $this->parent_id,
            'sku' => $this->sku,
            'stock_quantity' => $this->stock_quantity,
            'seo_title' => $this->seo_title,
            'seo_description' => $this->seo_description,
            'video_link' => $this->video_link,

            // Sử dụng `whenLoaded` để load quan hệ và trả về ProductResource
            'parent' => $this->whenLoaded('parent', fn() => new self($this->parent)),

            'variants' => $this->whenLoaded('variants', fn() => $this->variants->map(fn($variant) => new self($variant))),

            // Xử lý productAttributes ngắn gọn hơn với optional()
            'attributes' => $this->whenLoaded('productAttributes', fn() => $this->productAttributes->map(fn($productAttribute) => [
                'id' => $productAttribute->id,
                'attribute_id' => $productAttribute->attribute_id,
                'attribute_name' => optional($productAttribute->attribute)->name,
                'value_id' => $productAttribute->value_id,
                'value' => optional($productAttribute->attributeValue)->value,
            ])),

            // Sử dụng AdvancedPriceResource, CategoryResource, SourceProductResource để tạo danh sách các quan hệ
            'advanced_prices' => AdvancedPriceResource::collection($this->whenLoaded('advancedPrices')),
            'categories' => CategoryResource::collection($this->whenLoaded('categories')),
            'collections' => ProductCollectionResource::collection($this->whenLoaded('collections')),
            'sourceProducts' => SourceProductResource::collection($this->whenLoaded('sourceProducts')),
        ];
    }
}

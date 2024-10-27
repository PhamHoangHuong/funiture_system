<?php

namespace Modules\Product\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;
use Modules\Attributes\Transformers\AttributeValueResource;
use Modules\AdvancedPrice\Transformers\AdvancedPriceResource;
// use Modules\Source\Transformers\SourceProductResource;
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
            'advanced_price_id' => $this->advanced_price_id,
            'parent_id' => $this->parent_id,
            'sku' => $this->sku,
            'stock_quantity' => $this->stock_quantity,
            'seo_title' => $this->seo_title,
            'seo_description' => $this->seo_description,
            'video_link' => $this->video_link,
            'category_id' => $this->category_id,

            // Quan hệ với sản phẩm chính
            'parent' => new ProductResource($this->whenLoaded('parent')), //trả về sản phẩm chính nếu có
            // Quan hệ với sản phẩm phụ (biến thể)
            'variants' => ProductResource::collection($this->whenLoaded('variants')), //trả về danh sách sản phẩm phụ nếu có
            // Attributes
            'attributes' => $this->productAttributes->map(function ($productAttribute) {
                return [
                    'attribute_id' => $productAttribute->attribute_id,
                    'attribute_name' => $productAttribute->attribute->name ?? null,
                    'value_id' => $productAttribute->value_id,
                    'value' => $productAttribute->attributeValue->value ?? null,
                ];
            }),
            // Advanced Prices
            'advanced_prices' => AdvancedPriceResource::collection($this->whenLoaded('advancedPrices')),
            // SourceProduct
            // 'source_products' => SourceProductResource::collection($this->whenLoaded('sourceProducts')),
        ];
    }
}

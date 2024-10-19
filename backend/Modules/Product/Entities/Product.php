<?php

namespace Modules\Product\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\AdvancedPrice\Entities\AdvancedPrice;
use Modules\Attributes\Entities\Attribute;
use Modules\Attributes\Entities\AttributeValue;
use Modules\Source\Entities\Source;
use Modules\Source\Entities\SourceProduct;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'content',
        'image',
        'status',
        'weight',
        'price',
        'start_new_time',
        'end_new_time',
        'advanced_price_id',
        'parent_id',
        'sku',
        'stock_quantity',
        'seo_title',
        'seo_description',
        'video_link',
        'category_id'
    ];

    // Quan hệ với sản phẩm chính
    public function parent()
    {
        return $this->belongsTo(Product::class, 'parent_id');
    }

    // Quan hệ với sản phẩm phụ (biến thể)
    public function variants()
    {
        return $this->hasMany(Product::class, 'parent_id');
    }

    // Quan hệ với AdvancedPrice
    public function advancedPrices()
    {
        return $this->hasMany(AdvancedPrice::class);
    }

    // Quan hệ với Attributes
    public function attributes()
    {
        return $this->belongsToMany(Attribute::class, 'product_attributes');
    }

    // Quan hệ với AttributeValues thông qua bảng product_attributes
    public function attributeValues()
    {
        return $this->belongsToMany(AttributeValue::class, 'product_attributes', 'product_id', 'attribute_id');
    }

    // Quan hệ với Sources
    public function sources()
    {
        return $this->belongsToMany(Source::class, 'source_products');
    }

    // Quan hệ với SourceProducts
    public function sourceProducts()
    {
        return $this->hasMany(SourceProduct::class);
    }

    // Quan hệ với ProductAttributes
    public function productAttributes()
    {
        return $this->hasMany(ProductAttribute::class);
    }
}
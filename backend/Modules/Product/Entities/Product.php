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
use Modules\Category\Entities\Category;

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
        'seo_title',
        'seo_description',
        'video_link'
    ];

    protected $casts = [
        'status' => 'boolean',
        'weight' => 'float',
        'price' => 'decimal:2',
        'start_new_time' => 'datetime',
        'end_new_time' => 'datetime',
    ];

    public function parent()
    {
        return $this->belongsTo(Product::class, 'parent_id');
    }

    public function variants()
    {
        return $this->hasMany(Product::class, 'parent_id');
    }

    public function advancedPrice()
    {
        return $this->belongsTo(AdvancedPrice::class);
    }

    public function attributes()
    {
        return $this->belongsToMany(Attribute::class, 'product_attributes')
            ->withPivot('attribute_value_id')
            ->withTimestamps();
    }

    public function attributeValues()
    {
        return $this->belongsToMany(AttributeValue::class, 'product_attributes', 'product_id', 'attribute_value_id')
            ->withTimestamps();
    }

    public function sources()
    {
        return $this->belongsToMany(Source::class, 'source_products')
            ->withPivot('quantity')
            ->withTimestamps();
    }

    public function sourceProducts()
    {
        return $this->hasMany(SourceProduct::class);
    }

    public function productAttributes()
    {
        return $this->hasMany(ProductAttribute::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'product_categories', 'product_id', 'category_id')
            ->withTimestamps();
    }
}

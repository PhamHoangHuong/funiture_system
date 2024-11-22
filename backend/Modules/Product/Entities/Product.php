<?php

namespace Modules\Product\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\AdvancedPrice\Entities\AdvancedPrice;
use Modules\Attributes\Entities\Attribute;
use Modules\Attributes\Entities\AttributeValue;
use Modules\Collection\Entities\Collection;
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

    public  function  collections()
    {
        return $this->belongsToMany(Collection::class, 'product_collections', 'product_id', 'collection_id')
            ->withTimestamps();
    }

    // Phương thức tính stock cho sản phẩm cha
    public function getStockQuantityAttribute()
    {
        // Tránh tính toán lại quá nhiều lần trong các truy vấn
        // Nếu là sản phẩm con (variant), chỉ tính stock cho sản phẩm con đó
        if ($this->parent_id) {
            return $this->sourceProducts->sum('quantity');
        }

        // Nếu đây là sản phẩm cha, tính stock từ tất cả các biến thể và chính nó
        return $this->sourceProducts->sum('quantity') +
            $this->variants->sum(fn($variant) => $variant->sourceProducts->sum('quantity'));
    }

    // Eager load các quan hệ thường xuyên sử dụng
    public function scopeWithRelations($query)
    {
        return $query->with([
            'variants',
            'advancedPrice',
            'categories',
            'collections',
            'sourceProducts',
            'attributes',
            'productAttributes',
        ]);
    }
}

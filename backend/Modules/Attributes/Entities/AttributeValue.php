<?php

namespace Modules\Attributes\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Product\Entities\ProductAttribute;
use Modules\Product\Entities\Product;

class AttributeValue extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['attribute_id', 'value'];

    // Attribute
    public function attribute()
    {
        return $this->belongsTo(Attribute::class);
    }

    public function productAttributes()
    {
        return $this->hasMany(ProductAttribute::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_attributes', 'attribute_value_id', 'product_id')
            ->withTimestamps();
    }
}

<?php

namespace Modules\Product\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Category\Entities\Category;

class ProductCategory extends Model
{
    use HasFactory;
    protected $guarded=[];
    protected $fillable = [];

// Quan hệ với Product
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

// Quan hệ với Category
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}

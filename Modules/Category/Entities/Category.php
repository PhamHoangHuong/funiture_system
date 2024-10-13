<?php

namespace Modules\Category\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Product\Entities\Product;

class Category extends Model
{
    use HasFactory, SoftDeletes;
    protected $guarded = [];

    //Quan hệ với bảng products thông qua ProductCategory
    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_categories');
    }
}

<?php

namespace Modules\Product\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Collection\Entities\Collection;

class ProductCollection extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'product_id',
        'collection_id',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function collection()
    {
        return $this->belongsTo(Collection::class, 'collection_id');
    }
}

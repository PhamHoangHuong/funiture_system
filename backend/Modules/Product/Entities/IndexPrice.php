<?php

namespace Modules\Product\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class IndexPrice extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'product_id',
        'price'
    ];

    protected $table = 'index_price';

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}

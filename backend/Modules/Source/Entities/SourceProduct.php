<?php

namespace Modules\Source\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Product\Entities\Product;

class SourceProduct extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'product_id',
        'source_id',
        'quantity',
        'status'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function source()
    {
        return $this->belongsTo(Source::class);
    }
}

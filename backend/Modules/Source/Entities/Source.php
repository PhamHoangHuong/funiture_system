<?php

namespace Modules\Source\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Product\Entities\Product;

class Source extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'address',
        'province_id',
        'district_id',
        'ward_id',
        'active'
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    public function province()
    {
        return $this->belongsTo(Province::class, 'province_id', 'code');
    }

    public function district()
    {
        return $this->belongsTo(District::class, 'district_id', 'code');
    }

    public function ward()
    {
        return $this->belongsTo(Ward::class, 'ward_id', 'code');
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'source_products')
            ->withPivot('quantity', 'stock')
            ->withTimestamps();
    }
}

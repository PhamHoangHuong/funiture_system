<?php

namespace Modules\Source\Entities;

use App\Models\District;
use App\Models\Province;
use App\Models\Ward;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Product\Entities\Product;

class Source extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ['name', 'district', 'province', 'ward', 'address', 'active'];


    public function products()
    {
        return $this->belongsToMany(Product::class, 'source_products', 'source_id', 'product_id');
    }

    public function district()
    {
        return $this->belongsTo(District::class, 'district_id', 'code');
    }

    public function province()
    {
        return $this->belongsTo(Province::class, 'province_id', 'code');
    }
    public function ward()
    {
        return $this->belongsTo(Ward::class, 'ward_id', 'code');
    }

}

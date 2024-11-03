<?php

namespace Modules\CatalogPriceRule\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class CatalogPriceRule extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];
    protected $fillable = [
        'name',
        'description',
        'is_active',
        'start_time',
        'end_time',
        'conditions_serialized',
        'simple_action',
        'discount_amount',
        'priority',
        'sort_order',
    ];
    

}

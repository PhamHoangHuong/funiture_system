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
        'group_customer_ids',
        'condition_apply',
        'condition_value',
        'discount_amount',
        'operator',
        'priority',
        'sort_order',
    ];

}

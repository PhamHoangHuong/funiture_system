<?php

namespace Modules\CartPriceRule\Entities;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CartPriceRule extends Model
{
    use HasFactory,softDeletes;

    protected $guarded = [];

    protected $fillable = [
        'name',
        'description',
        'start_time',
        'end_time',
        'is_active',
        'group_customer_ids',
        'condition_apply',
        'condition_value',
        'coupon',
        'discount_amount',
        'discount_qty',
        'discount_step',
        'usage_limit',
        'used',
        'coupon_type',
        'operator',
        'sort_order',
    ];
}

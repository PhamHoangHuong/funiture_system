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
        'conditions_serialized',
        'simple_action',
        'coupon',
        'discount_amount',
        'discount_qty',
        'discount_step',
        'usage_limit',
        'used',
        'coupon_type',
        'sort_order',
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'is_active' => 'boolean',
        'conditions_serialized' => 'array', // Nếu bạn lưu trữ điều kiện dưới dạng JSON hoặc mảng
        'discount_amount' => 'decimal:4',
        'discount_qty' => 'integer',
        'discount_step' => 'integer',
        'usage_limit' => 'integer',
        'used' => 'integer',
        'coupon_type' => 'integer',
        'sort_order' => 'integer',
    ];

}

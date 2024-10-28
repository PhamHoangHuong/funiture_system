<?php

namespace Modules\CartPriceRule\Entities;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartPriceRule extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $fillable = [
        'name',
        'label',
        'description',
        'applicable_to',
        'coupon',
        'type',
        'amount',
        'quantity',
        'start_time',
        'end_time',
        'priority',
        'status',

    ];

    public function condition()
    {
        return $this->hasOne(CartPriceRuleCondition::class);
    }
}

<?php

namespace Modules\CartPriceRule\Entities;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartPriceRuleCondition extends Model
{
    use HasFactory;
    protected $guarded = [];

    protected $fillable = [
        'type',
        'name',
        'value',
        'operator',
        'status',
        'cart_price_rule_id'
    ];

    public function CartPriceRule()
    {
        return $this->belongsTo(CartPriceRule::class);
    }
}

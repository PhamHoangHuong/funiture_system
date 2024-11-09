<?php

namespace Modules\Wishlist\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Customer\Entities\Customer;
use Modules\Product\Entities\Product;

class Wishlist extends Model
{
    use HasFactory;

    protected $fillable = ['customer_id', 'product_id'];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

}

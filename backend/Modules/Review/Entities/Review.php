<?php

namespace Modules\Review\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Customer\Entities\Customer;
use Modules\Product\Entities\Product;

class Review extends Model
{
    use HasFactory;

    protected  $guarded = [];
    protected $fillable = [
        'name',
        'email',
        'title',
        'content',
        'rating',
        'status',
        'product_id',
        'customer_id',
    ];
    

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}

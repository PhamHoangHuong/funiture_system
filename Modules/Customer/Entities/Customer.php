<?php

namespace Modules\Customer\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\GroupCustomer\Entities\GroupCustomer;

class Customer extends Model
{
    use HasFactory,softDeletes;

    /**
     * @var array
     */
    protected $guarded=[];
    /**
     * @var string[]
     */
    protected $fillable = [
        'group_id',
        'name',
        'phone',
        'email',
        'address',
        'point',
        'status',
    ];

    //Quan hệ với các bảng:
    //Quan hệ với bảng Group Customer
    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function GroupCustomer()
    {
        return $this->belongsTo(GroupCustomer::class);
    }
    //Quan hệ với bảng Cart

    //Quan hệ với bảng Review

    //Quan hệ với bảng Order

    //Quan hệ với bảng Wishlist

}

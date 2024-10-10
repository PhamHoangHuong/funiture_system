<?php

namespace Modules\GroupCustomer\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Customer\Entities\Customer;

class GroupCustomer extends Model
{
    use HasFactory,SoftDeletes;

    /**
     * @var array
     */
    protected $guarded=[];
    /**
     * @var string[]
     */
    protected $fillable = ['name','code','status'];

    //Quan hệ với các bảng:
    //Quan hệ với bảng Group Customer
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function Customer()
    {
        return $this->hasMany(Customer::class);
    }
}

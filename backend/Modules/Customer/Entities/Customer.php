<?php

namespace Modules\Customer\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Modules\GroupCustomer\Entities\GroupCustomer;
use Tymon\JWTAuth\Contracts\JWTSubject;
class Customer extends Authenticatable implements JWTSubject
{
    use HasFactory;

    protected $guarded = [];
    protected $table = 'customers';
    protected $fillable = [
        'group_id',
        'name',
        'email',
        'password',
        'phone',
        'address',
        'point',
        'status',
    ];
    protected static function newFactory()
    {
        // return \Modules\Customer\Database\factories\CustomerFactory::new();
    }
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }


    public function group()
    {
        return $this->belongsTo(GroupCustomer::class);
    }
}

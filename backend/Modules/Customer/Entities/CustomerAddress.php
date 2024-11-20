<?php

namespace Modules\Customer\Entities;

use Modules\Source\Entities\Ward;
use Modules\Source\Entities\District;
use Modules\Source\Entities\Province;
use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Modules\GroupCustomer\Entities\GroupCustomer;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class CustomerAddress extends Authenticatable implements JWTSubject
{
    use HasFactory;

    protected $guarded = [];
    protected $table = 'customer_address';
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

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function province()
    {
        return $this->belongsTo(Province::class, 'province_code', 'code');
    }
    public function district()
    {
        return $this->belongsTo(District::class, 'district_code', 'code');
    }
    public function ward()
    {
        return $this->belongsTo(Ward::class, 'ward_code', 'code');
    }

}

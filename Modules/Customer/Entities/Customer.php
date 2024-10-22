<?php

namespace Modules\Customer\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\CanResetPassword ;
use Illuminate\Auth\Passwords\CanResetPassword as TraitResetPassword;
class Customer extends Authenticatable implements JWTSubject,CanResetPassword
{
    use HasFactory,Notifiable,TraitResetPassword ;

    protected $guarded = [];

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
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new \App\Notifications\ResetPasswordNotification($token));
    }
}

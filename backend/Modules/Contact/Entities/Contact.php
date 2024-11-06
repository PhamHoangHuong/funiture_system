<?php

namespace Modules\Contact\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Contact extends Model
{
    use HasFactory, softDeletes;

    protected  $guarded = [];
    protected $fillable = [
        'fullname',
        'email',
        'phone',
        'subject',
        'type',
        'message',
        'status'
    ];
    

}

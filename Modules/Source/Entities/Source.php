<?php

namespace Modules\Source\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Source extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ['name', 'district', 'province', 'ward', 'address', 'active'];
}

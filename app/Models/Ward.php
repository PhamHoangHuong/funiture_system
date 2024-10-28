<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Modules\Product\Entities\Product;

class Ward extends Model
{
    protected $fillable = [];
    protected $table = 'wards';
    protected $primaryKey = 'code';
}

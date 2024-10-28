<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Modules\Product\Entities\Product;

class Province extends Model
{
    protected $fillable = [];
    protected $primaryKey = 'code';
    protected $table = 'provinces';
}

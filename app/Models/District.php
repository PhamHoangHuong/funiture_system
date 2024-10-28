<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Modules\Product\Entities\Product;

class District extends Model
{
    protected $fillable = [];
    protected $table = 'districts';
    protected $primaryKey = 'code';

}

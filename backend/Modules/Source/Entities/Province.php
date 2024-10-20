<?php

namespace Modules\Source\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\Source\Entities\District;
use Modules\Source\Entities\Source;


class Province extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'name_en',
        'full_name',
        'full_name_en',
        'code_name',
        'administrative_unit_id',
        'administrative_region_id'
    ];

    public function districts()
    {
        return $this->hasMany(District::class, 'province_code', 'code');
    }

    public function sources()
    {
        return $this->hasMany(Source::class);
    }
}

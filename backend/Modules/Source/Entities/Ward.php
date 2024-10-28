<?php

namespace Modules\Source\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Ward extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'name_en',
        'full_name',
        'full_name_en',
        'code_name',
        'district_code',
        'administrative_unit_id'
    ];

    public function district()
    {
        return $this->belongsTo(District::class, 'district_code', 'code');
    }

    public function sources()
    {
        return $this->hasMany(Source::class);
    }
}
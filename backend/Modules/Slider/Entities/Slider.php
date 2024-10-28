<?php

namespace Modules\Slider\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Slider extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'type',
        'position',
        'status',
    ];

    protected $casts = [
        'status' => 'boolean',
    ];

    public function images()
    {
        return $this->hasMany(SliderImage::class);
    }
}

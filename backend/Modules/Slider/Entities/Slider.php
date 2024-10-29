<?php

namespace Modules\Slider\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Slider extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];
    protected $fillable = [
        'title',
        'type',
        'position',
        'status',
    ];

    public function images()
    {
        return $this->hasMany(SliderImage::class);
    }
}

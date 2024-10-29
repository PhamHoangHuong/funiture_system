<?php

namespace Modules\Slider\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class SliderImage extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];
    protected $fillable = [
        'slider_id',
        'image_url',
        'title',
        'link',
        'description',
        'sort_order',
        'status',
    ];

    public function slider()
    {
        return $this->belongsTo(Slider::class);
    }
}

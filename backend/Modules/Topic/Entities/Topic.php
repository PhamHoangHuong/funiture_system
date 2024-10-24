<?php

namespace Modules\Topic\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Topic extends Model
{
    use HasFactory,softDeletes;

    protected $guarded=[];
    protected $fillable = [
        'name',
        'slug',
        'parent_id',
        'image',
        'description',
        'sort_order',
        'status',
    ];
    
    public function parent()
    {
        return $this->belongsTo(Topic::class, 'parent_id');
    }
}

<?php

namespace Modules\Post\Entities;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Topic\Entities\Topic;

class Post extends Model
{
    use HasFactory,softDeletes;

    protected $guarded = [];
    protected $fillable = [
        'topic_id',
        'user_id',
        'title',
        'slug',
        'content',
        'description',
        'image',
        'status',
    ];
    
    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

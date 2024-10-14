<?php

namespace Modules\Category\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $guarded = [];

    protected static function newFactory()
    {
        // return \Modules\Category\Database\factories\CategoryFactory::new();
    }
    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function subCategories()
    {
        return $this->children()->with('subCategories');
    }
}

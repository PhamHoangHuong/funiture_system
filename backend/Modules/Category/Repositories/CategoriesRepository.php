<?php

namespace Modules\Category\Repositories;

use Modules\Category\Repositories\CategoriesRepositoryInterface;
use App\Repositories\BaseRepository;
use Modules\Category\Entities\Category;

class CategoriesRepository extends BaseRepository implements CategoriesRepositoryInterface
{
    public function getModel(): string
    {
        return Category::class;
    }
    public function checkExistSlug(mixed $slug, $categoryId=null)
    {
//        dd($slug);
        if($categoryId==null) {
            return $this->model->where('slug', $slug)->exists();
        }else {
            return $this->model->where('slug', $slug)->where('id', '!=', $categoryId)->exists();
        }
    }
    public function updateCategoryProducts($category, array $productIds)
    {
            $category->products()->sync($productIds);
    }
}

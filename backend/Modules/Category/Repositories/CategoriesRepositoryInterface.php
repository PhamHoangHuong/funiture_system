<?php
namespace Modules\Category\Repositories;
use App\Repositories\RepositoryInterface;


interface CategoriesRepositoryInterface extends RepositoryInterface{
    public function checkExistSlug($slug,$categoryId=null);
    public function updateCategoryProducts($category, array $productIds);
}

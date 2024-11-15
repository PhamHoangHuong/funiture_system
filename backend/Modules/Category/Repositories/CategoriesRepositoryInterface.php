<?php
namespace Modules\Category\Repositories;
use App\Repositories\RepositoryInterface;


interface CategoriesRepositoryInterface extends RepositoryInterface{
    public function checkExistSlug($slug);
    public function updateCategoryProducts($category, array $productIds);
}

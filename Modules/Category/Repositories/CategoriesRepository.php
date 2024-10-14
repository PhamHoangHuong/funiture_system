<?php
namespace Modules\Category\Repositories;
use Modules\Category\Repositories\CategoriesRepositoryInterface;
use App\Repositories\BaseRepository;
use Modules\Category\Entities\Category;

class CategoriesRepository extends BaseRepository implements CategoriesRepositoryInterface{
    public function getModel(): string{
        return Category::class;
    }
    public function getCategories(){
        return $this->model->with('subCategories')->whereNull('parent_id');
    }

}

?>

<?php

namespace Modules\Collection\Repositories;

use App\Repositories\BaseRepository;
use Modules\Collection\Entities\Collection;

class CollectionRepository extends  BaseRepository implements CollectionRepositoryInterface
{
    public function getModel(): string
    {
        return Collection::class;
    }
    public function checkExistSlug(mixed $slug, $collectionId=null)
    {
//        dd($slug);
        if($collectionId==null) {
            return $this->model->where('slug', $slug)->exists();
        }else {
            return $this->model->where('slug', $slug)->where('id', '!=', $collectionId)->exists();
        }
    }

    public function updateCollectionProducts($collections, array $productIds)
    {
        $collections->products()->sync($productIds);
    }
}
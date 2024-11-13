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
    public function checkExistSlug(mixed $slug)
    {
        return $this->model->where('slug', $slug)->exists();
    }
}
<?php

namespace Modules\Collection\Repositories;

use App\Repositories\RepositoryInterface;

interface CollectionRepositoryInterface extends  RepositoryInterface
{
    public function checkExistSlug(mixed $slug, $collectionId=null);
    public function updateCollectionProducts($collections, array $productIds);
}
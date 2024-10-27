<?php

namespace Modules\Product\Repositories;

use App\Repositories\RepositoryInterface;

interface ProductRepositoryInterface extends RepositoryInterface
{
    public function findMany(array $ids);
}

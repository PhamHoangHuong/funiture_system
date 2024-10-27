<?php

namespace Modules\Product\Repositories;

use App\Repositories\BaseRepository;
use Modules\Product\Entities\Product;

class ProductRepository extends BaseRepository implements ProductRepositoryInterface
{
    public function getModel(): string
    {
        return Product::class;
    }

    public function findMany(array $ids)
    {
        return $this->model->whereIn('id', $ids)->with('advancedPrices')->get();
    }
}

<?php

namespace Modules\Product\Repositories;

use App\Repositories\BaseRepository;
use Modules\Product\Entities\ProductAttribute;

class ProductAttributeRepository extends BaseRepository implements ProductAttributeRepositoryInterface
{
    public function getModel(): string
    {
        return ProductAttribute::class;
    }

    public function deleteByProductId(int $productId)
    {
        return $this->model->where('product_id', $productId)->delete();
    }
}

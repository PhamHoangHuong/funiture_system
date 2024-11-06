<?php

namespace Modules\Source\Repositories;

use App\Repositories\BaseRepository;
use Modules\Source\Entities\Source;

class SourceRepository extends BaseRepository implements SourceRepositoryInterface
{
    public function getModel(): string
    {
        return Source::class;
    }
    public function getProductSources($productId)
    {
        return $this->model->whereHas('products', function ($query) use ($productId) {
            $query->where('product_id', $productId);
        })->get();
    }

    public function getFullAddressSource($sourceId)
    {
        $source = $this->model->find($sourceId);
        return $source->address . ',' . $source->ward->name . ',' . $source->district->name . ',' . $source->province->name;
    }
}

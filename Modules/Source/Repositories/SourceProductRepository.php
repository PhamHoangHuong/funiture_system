<?php

namespace Modules\Source\Repositories;

use App\Repositories\BaseRepository;
use Modules\Source\Entities\SourceProduct;

class SourceProductRepository extends BaseRepository implements SourceProductRepositoryInterface
{
    public function getModel(): string
    {
        return SourceProduct::class;
    }
}

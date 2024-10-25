<?php

namespace Modules\AdvancedPrice\Repositories;

use Modules\AdvancedPrice\Entities\AdvancedPrice;
use App\Repositories\BaseRepository;

class AdvancedPriceRepository extends BaseRepository implements AdvancedPriceRepositoryInterface
{
    public function getModel(): string
    {
        return AdvancedPrice::class;
    }
}

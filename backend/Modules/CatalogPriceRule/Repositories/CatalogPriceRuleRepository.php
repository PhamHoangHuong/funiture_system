<?php

namespace Modules\CatalogPriceRule\Repositories;

use App\Repositories\BaseRepository;
use Modules\CatalogPriceRule\Entities\CatalogPriceRule;

class CatalogPriceRuleRepository extends  BaseRepository implements  CatalogPriceRuleRepositoryInterface
{
    public function getModel(): string
    {
        return CatalogPriceRule::class;
    }
}
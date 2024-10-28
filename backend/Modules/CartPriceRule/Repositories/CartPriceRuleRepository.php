<?php

namespace Modules\CartPriceRule\Repositories;

use App\Repositories\BaseRepository;
use Modules\CartPriceRule\Entities\CartPriceRule;

class CartPriceRuleRepository extends BaseRepository implements CartPriceRuleRepositoryInterface
{
    public function getModel(): string
    {
        return CartPriceRule::class;
    }

}
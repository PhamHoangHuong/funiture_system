<?php

namespace Modules\CartPriceRule\Repositories;

use App\Repositories\BaseRepository;
use Modules\CartPriceRule\Entities\CartPriceRuleCondition;

class CartPriceRuleConditionRepository extends BaseRepository implements CartPriceRuleConditionRepositoryInterface
{
    public function getModel(): string
    {
        return CartPriceRuleCondition::class;
    }
}
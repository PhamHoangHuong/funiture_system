<?php

namespace Modules\CartPriceRule\Repositories;

use App\Repositories\BaseRepository;
use Modules\CartPriceRule\Entities\CartPriceRule;

class CartPriceRulesRepository extends BaseRepository implements CartPriceRulesRepositoryInterface
{
    public function getModel(): string
    {
        return CartPriceRule::class;
    }
    public function existsByCoupon($coupon, $exceptId = null)
    {
        $query = $this->model->where('coupon', $coupon);
        if($exceptId){
            $query->where('id', '!=', $exceptId);
        }
        return $query->exists();
    }
}
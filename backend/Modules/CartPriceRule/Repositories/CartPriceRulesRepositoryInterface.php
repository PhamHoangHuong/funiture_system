<?php

namespace Modules\CartPriceRule\Repositories;

use App\Repositories\RepositoryInterface;

interface CartPriceRulesRepositoryInterface extends RepositoryInterface
{
        public function  existsByCoupon($coupon, $exceptId = null);
        public function checkRule($rule);
        public function getRuleByCoupon($coupon);
}
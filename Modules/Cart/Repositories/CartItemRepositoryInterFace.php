<?php

namespace Modules\Cart\Repositories;

use App\Repositories\RepositoryInterface;

interface CartItemRepositoryInterFace extends RepositoryInterface
{
    public function updateCartItem($productId, $quantity);
}
<?php

namespace Modules\Cart\Repositories;

use App\Repositories\RepositoryInterface;

interface CartItemRepositoryInterface extends RepositoryInterface
{
    public function updateCartItem($productId, $quantity);
    public function deleteCartItem($productId);
}
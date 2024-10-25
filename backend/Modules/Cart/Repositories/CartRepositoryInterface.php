<?php

namespace Modules\Cart\Repositories;

use App\Repositories\RepositoryInterface;

interface CartRepositoryInterface extends RepositoryInterface
{
    public function getCartByUserId();

    public function updateCart($product_id, $quantity);
}
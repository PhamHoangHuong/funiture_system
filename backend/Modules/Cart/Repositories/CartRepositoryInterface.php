<?php

namespace Modules\Cart\Repositories;

use App\Repositories\RepositoryInterface;

interface CartRepositoryInterface extends RepositoryInterface
{
    public function getCartByUserId();

    public function addToCart($product_id, $quantity);
}
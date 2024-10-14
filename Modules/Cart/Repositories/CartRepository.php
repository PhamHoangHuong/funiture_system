<?php

namespace Modules\Cart\Repositories;

use App\Repositories\BaseRepository;
use Illuminate\Support\Facades\Auth;
use Modules\Cart\Entities\Cart;
use Modules\Cart\Entities\CartItems;

class CartRepository extends BaseRepository implements CartRepositoryInterFace
{
    public function getModel(): string
    {
        return Cart::class;
    }
}
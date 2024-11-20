<?php

namespace Modules\Checkout\Repositories;

use App\Repositories\BaseRepository;
use Illuminate\Support\Facades\Auth;
use Modules\Cart\Entities\Cart;

class CheckoutRepository extends BaseRepository implements CheckoutRepositoryInterface
{
    public function getModel(): string
    {
        return Cart::class;
    }
    
}
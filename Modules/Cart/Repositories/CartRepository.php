<?php

namespace Modules\Cart\Repositories;

use App\Repositories\BaseRepository;
use Modules\Attributes\Repositories\AttributeRepositoryInterface;
use Modules\Cart\Entities\Cart;

class CartRepository extends BaseRepository implements AttributeRepositoryInterface
{
    public function getModel(): string
    {
        return Cart::class;
    }
}
<?php

namespace Modules\Wishlist\Repositories;

use App\Repositories\BaseRepository;
use Modules\Wishlist\Entities\Wishlist;

class WishlistRepository extends BaseRepository implements WishlistRepositoryInterface
{
    public function getModel() : string
    {
        return Wishlist::class;
    }
}
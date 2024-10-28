<?php

namespace Modules\Cart\Repositories;

use App\Repositories\BaseRepository;
use Illuminate\Support\Facades\Auth;
use Modules\Cart\Entities\CartItems;

class CartItemRepository extends BaseRepository implements CartItemRepositoryInterface
{
    public function getModel(): string
    {
        return CartItems::class;
    }

    public function updateCartItem($productId, $quantity){
        $cartItem = $this->model->where('product_id', $productId)
                    ->whereHas('cart', function ($query) {
                        $query->where('user_id', Auth::id());
                    })
                    ->firstOrFail();

        $cartItem->update(['quantity' => $quantity]);
        return $cartItem;
    }

    public function deleteCartItem($productId){
        $cartItem = $this->model->where('product_id', $productId)
            ->whereHas('cart', function ($query) {
                $query->where('user_id', auth('customer')->id());
            })
            ->firstOrFail();

        $delete = $cartItem->delete();
        return $delete ?? false;
    }
}
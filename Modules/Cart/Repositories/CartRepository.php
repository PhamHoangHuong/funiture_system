<?php

namespace Modules\Cart\Repositories;

use App\Repositories\BaseRepository;
use Illuminate\Support\Facades\Auth;
use Modules\Cart\Entities\Cart;
use Modules\Cart\Entities\CartItems;

class CartRepository extends BaseRepository implements CartRepositoryInterface
{
    public function getModel(): string
    {
        return Cart::class;
    }

    public function getCartByUserId(){
        $cart = $this->model->select('user_id', 'id')->where('user_id', Auth::guard('customer')->id())->with('items', function ($query){
            $query->select('cart_id', 'product_id', 'quantity');
        })->first();
        $cart->items->map(function($item){
            $item->product = $item->product()->select('id', 'name', 'price', 'image', 'weight')->first();
            return $item;
        });
        return $cart;
    }

    public function updateCart($product_id, $quantity){
        $cart = $this->model->firstOrCreate([
            'user_id' => auth('customer')->id(),
        ]);

        $cartItem = $cart->items()->updateOrCreate(
            ['product_id' => $product_id],
            ['quantity' => $quantity]
        );

        return $cartItem;
    }

    public function addToCart($product_id, $quantity){
        $cart = $this->model->firstOrCreate([
            'user_id' => auth('customer')->id(),
        ]);

        $cartItem = $cart->items()->where('product_id', $product_id)->first();
        if($cartItem){
            $cartItem->quantity += $quantity;
            $cartItem->save();
        } else {
            $cartItem = $cart->items()->updateOrCreate([
                'product_id' => $product_id,
                'quantity' => $quantity
            ]);
        }

        return $cartItem;
    }

}
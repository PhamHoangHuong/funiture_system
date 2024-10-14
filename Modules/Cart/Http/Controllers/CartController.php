<?php

namespace Modules\Cart\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Modules\Cart\Entities\Cart;
use Modules\Cart\Entities\CartItems;
use Modules\Cart\Http\Requests\CartRequest;
use Modules\Cart\Repositories\CartItemRepositoryInterFace;
use Modules\Product\Entities\Product;
use Modules\Product\Repositories\ProductRepositoryInterface;

/**
 *
 */
class CartController extends Controller
{
    protected $productRepository;
    protected $cartItemRepository;

    public function __construct(
        ProductRepositoryInterface $productRepository,
        CartItemRepositoryInterFace $cartItemRepository,
    )
    {
        $this->productRepository = $productRepository;
        $this->$cartItemRepository = $cartItemRepository;
    }

    /**
     * Display a listing of the resource.
     * @return Renderable
     */
    public function index()
    {
        // Nếu người dùng đã đăng nhập, lấy giỏ hàng từ DB
//        try {
//            if (Auth::check('customer')) {
//                $cart = Cart::where('user_id', Auth::id())->with('items.product')->first();
//                if (!$cart) {
//                    return response()->json(['message' => 'Cart is empty'], 404);
//                }
//                return response()->json($cart);
//            }
//        } catch (\Exception $e) {
//            return response()->json(['error' => $e->getMessage()], 500);
//        }

        // Nếu chưa đăng nhập, lấy giỏ hàng từ session
        $cart = Session::get('cart', []);
        foreach ($cart as $key => $item) {
            $id_product = (int)$item['product_id'];
            $cart[$key]['product'] = $this->getProduct($id_product, ['id', 'name', 'price', 'image']);
        }

        $info_cart = $this->getTotalCart();
        $results = [
            'items' => !empty($cart) ? $cart : 'Cart is empty',
            'info_cart' => $info_cart
        ];

        return response()->json($results, 200);
    }

    public function miniCart(){
        // Nếu người dùng đã đăng nhập, lấy giỏ hàng từ DB
//        try {
//            if (Auth::check('customer')) {
//                $cart = Cart::where('user_id', Auth::id())->with('items.product')->first();
//                if (!$cart) {
//                    return response()->json(['message' => 'Cart is empty'], 404);
//                }
//                return response()->json($cart);
//            }
//        } catch (\Exception $e) {
//            return response()->json(['error' => $e->getMessage()], 500);
//        }

        // Nếu chưa đăng nhập, lấy giỏ hàng từ session
        $cart = Session::get('cart', []);
        $subtotal = 0;
        foreach ($cart as $key => $item) {
            $id_product = (int)$item['product_id'];
            $cart[$key]['product'] = $this->getProduct($id_product, ['id', 'name', 'price', 'image']);
            $subtotal += $cart[$key]['product']->price * $item['quantity'];
        }

        $quantity = $this->getQuantityCart();

        $results = [
            'items' => !empty($cart) ? $cart : 'Cart is empty',
            'quantity' => $quantity,
            'subtotal' => $subtotal
        ];

        return response()->json($results, 200);
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Renderable
     */
    public function store(CartRequest $request)
    {
        $product_id = (int)$request->product_id;
        $quantity = (int)$request->quantity;
//        try {
//            if (Auth::check()) {
//                $cart = Cart::firstOrCreate([
//                    'user_id' => Auth::id(),
//                ]);
//
//                $cartItem = $cart->items()->updateOrCreate(
//                    ['product_id' => $product_id],
//                    ['quantity' => $quantity]
//                );
//                return response()->json($cartItem, 201);
//            }
//        } catch (\Exception $e) {
//            return response()->json(['error' => $e->getMessage()], 500);
//        }

        // Nếu chưa đăng nhập, lưu trữ giỏ hàng trong session
        $cart = $this->getCartSession();

        if (isset($cart[$product_id])) {
            $cart[$product_id]['quantity'] += $quantity;
        } else {
            $cart[$product_id] = [
                'product_id' => $product_id,
                'quantity' => $quantity,
            ];
        }
        $this->putCartSession($cart);
        return response()->json(['message' => 'Product added to cart'], 201);
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Renderable
     */
    public function update(Request $request, $productId)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        // Nếu người dùng đã đăng nhập
//        try {
//            if (Auth::check()) {
//                $cartItem = $this->cartItemRepository->updateCartItem($productId, $validated['quantity']);
//
//                return response()->json($cartItem);
//            }
//        } catch (\Exception $e) {
//            return response()->json(['error' => $e->getMessage()], 500);
//        }

        // Nếu chưa đăng nhập, cập nhật giỏ hàng trong session
        $cart = $this->getCartSession();

        if (isset($cart[$productId])) {
            $cart[$productId]['quantity'] = $validated['quantity'];
            $this->putCartSession($cart);
            return response()->json(['message' => 'Cart updated']);
        }

        return response()->json(['message' => 'Product not found in cart'], 404);
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Renderable
     */
    public function destroy($productId)
    {
        // Nếu người dùng đã đăng nhập
//        try {
//            if (Auth::check()) {
//                $cartItem = CartItems::where('product_id', $productId)
//                    ->whereHas('cart', function ($query) {
//                        $query->where('user_id', Auth::id());
//                    })
//                    ->firstOrFail();
//
//                $cartItem->delete();
//
//                return response()->json(['message' => 'Item removed'], 200);
//            }
//        } catch (\Exception $e) {
//            return response()->json(['error' => $e->getMessage()], 500);
//        }

        // Nếu chưa đăng nhập, xóa sản phẩm trong session
        $cart = $this->getCartSession();

        if (isset($cart[$productId])) {
            unset($cart[$productId]);
            $this->putCartSession($cart);
            return response()->json(['message' => 'Product removed from cart'], 200);
        }

        return response()->json(['message' => 'Product not found in cart'], 404);
    }

    /**
     * @return void
     */
    public function getQuantityCart()
    {
        $cart = $this->getCartSession();
        $quantity = 0;
        foreach ($cart as $item) {
            $quantity += $item['quantity'];
        }
        return $quantity;
    }

    public function getTotalCart()
    {
        $cart = $this->getCartSession();
        $subtotal = 0;
        $total = 0;
        $shipping_fee = 0;
        foreach ($cart as $item) {
            $product = $this->getProduct($item['product_id'], ['id', 'price']);
            $subtotal += $product->price * $item['quantity'];
        }


        $info_cart = [
            'subtotal' => $subtotal,
            'shipping_fee' => $shipping_fee,
            'total' => $subtotal + $shipping_fee
        ];

        $results = [
            'info_cart' => $info_cart,
            'coupon' => []
        ];

        return $results;
    }

    /**
     * @return \Closure|mixed|object|null
     * @throws \Psr\Container\ContainerExceptionInterface
     * @throws \Psr\Container\NotFoundExceptionInterface
     */
    public function getCartSession()
    {
        return session()->get('cart', []);
    }

    /**
     * @param $cart
     * @return void
     */
    public function putCartSession($cart)
    {
        session()->put('cart', $cart);
    }

    public function getProduct($product_id, $columns = ['*'])
    {
        return $this->productRepository->find($product_id, $columns);
    }
}

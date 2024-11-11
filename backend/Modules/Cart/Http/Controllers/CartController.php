<?php

namespace Modules\Cart\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Modules\Cart\Http\Requests\CartRequest;
use Modules\Cart\Repositories\CartItemRepositoryInterface;
use Modules\Cart\Repositories\CartRepositoryInterface;
use Modules\CartPriceRule\Repositories\CartPriceRulesRepositoryInterface;
use Modules\Product\Repositories\ProductRepositoryInterface;
use Modules\Source\Repositories\SourceRepositoryInterface;

/**
 *
 */
class CartController extends Controller
{
    /**
     * @var ProductRepositoryInterface
     */
    protected $productRepository;
    /**
     * @var CartItemRepositoryInterface
     */
    protected $cartItemRepository;
    /**
     * @var CartRepositoryInterface
     */
    protected $cartRepository;
    /**
     * @var SourceRepositoryInterface
     */
    protected $sourceRepository;
    /**
     * @var CartPriceRulesRepositoryInterface
     */
    protected $cartPriceRule;

    /**
     * @param ProductRepositoryInterface $productRepository
     * @param CartItemRepositoryInterface $cartItemRepository
     * @param CartRepositoryInterface $cartRepository
     * @param SourceRepositoryInterface $sourceRepository
     * @param CartPriceRulesRepositoryInterface $cartPriceRule
     */
    public function __construct(
        ProductRepositoryInterface  $productRepository,
        CartItemRepositoryInterface $cartItemRepository,
        CartRepositoryInterface     $cartRepository,
        SourceRepositoryInterface   $sourceRepository,
        CartPriceRulesRepositoryInterface $cartPriceRule
    )
    {
        $this->productRepository = $productRepository;
        $this->cartItemRepository = $cartItemRepository;
        $this->cartRepository = $cartRepository;
        $this->sourceRepository = $sourceRepository;
        $this->cartPriceRule = $cartPriceRule;
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        try {
            if (auth('customer')->check()) {
                $cart = $this->cartRepository->getCartByUserId();
            } else {
                $cart = Session::get('cart', []);
                foreach ($cart as $key => $item) {
                    $id_product = (int)$item['product_id'];
                    $cart[$key]['product'] = $this->getProduct($id_product, ['id', 'name', 'price', 'image', 'weight']);
                }
            }

            return response()->json(['items' => $cart ?: 'Cart is empty'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function miniCart()
    {
        try {
            if (auth('customer')->check()) {
                $cart = $this->cartRepository->getCartByUserId();
                if (!$cart) {
                    return response()->json(['message' => 'Cart is empty'], 404);
                }
            } else {
                $cart = Session::get('cart', []);
                $subtotal = 0;
                foreach ($cart as $key => $item) {
                    $id_product = (int)$item['product_id'];
                    $cart[$key]['product'] = $this->getProduct($id_product, ['id', 'name', 'price', 'image']);
                    $subtotal += $cart[$key]['product']->price * $item['quantity'];
                }
            }

            $quantity = $this->getQuantityCart();

            return response()->json([
                'items' => !empty($cart) ? $cart : 'Cart is empty',
                'total_quantity' => $quantity,
                'subtotal' => $subtotal ?? 0
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * @param CartRequest $request
     * @return Renderable
     */
    public function store(CartRequest $request): Renderable
    {
        $product_id = (int)$request->product_id;
        $quantity = (int)$request->quantity;
        try {
            if (auth('customer')->check()) {
                $cartItem = $this->cartRepository->addToCart($product_id, $quantity);
                return response()->json(['message' => 'Product added to cart'], 201);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

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
     * @param Request $request
     * @param $productId
     * @return Renderable
     */
    public function update(Request $request, $productId): Renderable
    {
        $validated = $request->validate(['quantity' => 'required|integer|min:1']);
        try {
            if (Auth::check()) {
                $cartItem = $this->cartItemRepository->updateCartItem($productId, (int)$validated['quantity']);
                return response()->json($cartItem);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

        $cart = $this->getCartSession();
        if (isset($cart[$productId])) {
            $cart[$productId]['quantity'] = (int)$validated['quantity'];
            $this->putCartSession($cart);
            return response()->json(['message' => 'Cart updated']);
        }

        return response()->json(['message' => 'Product not found in cart'], 404);
    }

    /**
     * @param $productId
     * @return Renderable
     */
    public function destroy($productId): Renderable
    {
        try {
            if (auth('customer')->check()) {
                $delete = $this->cartItemRepository->deleteCartItem($productId);
                return response()->json(['message' => $delete ? 'Item removed' : 'Remove item failed'], $delete ? 200 : 500);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

        $cart = $this->getCartSession();
        if (isset($cart[$productId])) {
            unset($cart[$productId]);
            $this->putCartSession($cart);
            return response()->json(['message' => 'Product removed from cart'], 200);
        }

        return response()->json(['message' => 'Product not found in cart'], 404);
    }

    /**
     * @param Request $request
     * @return Renderable
     */
    public function applyCoupon(Request $request): Renderable
    {
        $validated = $request->validate(['coupon_code' => 'required|string']);
        try {
            $cartPriceRule = $this->cartPriceRule->getRuleByCouponCode($validated['coupon_code']);
            if (!$cartPriceRule) {
                return response()->json(['message' => 'Invalid coupon code'], 404);
            }

            $ruleData = $cartPriceRule->getAttributes();
            $checkRule = $this->checkRule($ruleData);
            if (!$checkRule['check']) {
                return response()->json(['message' => $checkRule['message']], 400);
            }

            Session::put('coupon', [
                'code' => $validated['coupon_code'],
                'discount' => $ruleData['coupon_value'],
                'type' => $ruleData['coupon_type'],
            ]);

            return $this->getTotalCart();
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * @return int
     */
    public function getQuantityCart(): int
    {
        $cart = $this->getCartSession();
        return array_sum(array_column($cart, 'quantity'));
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTotalCart(): \Illuminate\Http\JsonResponse
    {
        $cart = $this->getCartSession();
        $subtotal = array_reduce($cart, function ($carry, $item) {
            $product = $this->getProduct($item['product_id'], ['id', 'price']);
            return $carry + ($product->price * $item['quantity']);
        }, 0);

        $coupon = Session::get('coupon', []);
        $discount = $coupon ? ($coupon['type'] === 1 ? $coupon['discount'] : $subtotal * ($coupon['discount'] / 100)) : 0;
        $total = $subtotal - $discount;

        return response()->json([
            'info_cart' => [
                'subtotal' => $subtotal,
                'discount' => $discount,
                'total' => $total,
            ]
        ], 200);
    }

    /**
     * @return mixed
     */
    public function getCartSession()
    {
        return Session::get('cart', []);
    }

    /**
     * @param $cart
     * @return void
     */
    public function putCartSession($cart)
    {
        Session::put('cart', $cart);
    }

    /**
     * @param $product_id
     * @param $columns
     * @return mixed
     */
    public function getProduct($product_id, $columns = ['*'])
    {
        return $this->productRepository->find($product_id, $columns);
    }
}

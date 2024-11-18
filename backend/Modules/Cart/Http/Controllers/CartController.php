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

    protected $cartPriceRule;

    /**
     * @param ProductRepositoryInterface $productRepository
     * @param CartItemRepositoryInterface $cartItemRepository
     * @param CartRepositoryInterface $cartRepository
     */
    public function __construct(
        ProductRepositoryInterface        $productRepository,
        CartItemRepositoryInterface       $cartItemRepository,
        CartRepositoryInterface           $cartRepository,
        SourceRepositoryInterface         $sourceRepository,
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
     * Display a listing of the resource.
     * @return Renderable
     */
    public function index()
    {
        // Nếu người dùng đã đăng nhập, lấy giỏ hàng từ DB
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

            $results = [
                'items' => !empty($cart) ? $cart : 'Cart is empty',
            ];
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

        return response()->json($results, 200);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function miniCart()
    {
        // Nếu người dùng đã đăng nhập, lấy giỏ hàng từ DB
        try {
            if (auth('customer')->check()) {
                $cart = $this->cartRepository->getCartByUserId()->toArray();

            } else {
                $cart = Session::get('cart', []);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

        // Nếu chưa đăng nhập, lấy giỏ hàng từ session
        $subtotal = 0;
        if(is_array($cart) && !empty($cart)) {
            foreach ($cart['items'] as $key => $item) {
                $subtotal += $item['product']['price'] * $item['quantity'];
            }

            $quantity = $this->getQuantityCart();

            $results = [
                'items' => !empty($cart) ? $cart : 'Cart is empty',
                'quantity' => $quantity,
                'subtotal' => $subtotal
            ];
        } else {
            $results = [
                'items' => 'Cart is empty',
                'quantity' => 0,
                'subtotal' => 0
            ];
        }

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
        try {
            if (auth('customer')->check()) {
                $cartItem = $this->cartRepository->addToCart($product_id, $quantity);
                return response()->json(['message' => 'Product added to cart'], 201);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

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
        try {
            if (Auth::check()) {
                $cartItem = $this->cartItemRepository->updateCartItem($productId, (int)$validated['quantity']);

                return response()->json($cartItem);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

        // Nếu chưa đăng nhập, cập nhật giỏ hàng trong session
        $cart = $this->getCartSession();
        if (isset($cart[$productId])) {
            $cart[$productId]['quantity'] = (int)$validated['quantity'];
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
        try {
            if (auth('customer')->check()) {
                $delete = $this->cartItemRepository->deleteCartItem($productId);
                if ($delete) {
                    $message = 'Item removed';
                    $status = 200;
                } else {
                    $message = 'Remove item failed';
                    $status = 500;
                }
                return response()->json(['message' => $message], $status);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

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
        $cart = auth('customer')->check() ? $this->cartRepository->getCartByUserId()->toArray()['items'] : $this->getCartSession();
        $quantity = 0;
        foreach ($cart as $item) {
            $quantity += $item['quantity'];
        }
        return $quantity;
    }

    /**
     * @return array
     * @throws \Psr\Container\ContainerExceptionInterface
     * @throws \Psr\Container\NotFoundExceptionInterface
     */
    public function getTotalCart()
    {
        $cart = $this->getCartSession();
        $subtotal = 0;
        $weight = 0;
        $quantity = 0;
        foreach ($cart as $item) {
            $product = $this->getProduct($item['product_id'], ['id', 'price']);
            $subtotal += $product->price * $item['quantity'];
            $weight += $product->weight * $item['quantity'];
            $quantity += $item['quantity'];
        }

        $coupon = [];
        foreach ($cartPriceRules as $rule) {
            $dataRule = $rule->getAttributes();
            $check = $this->checkRule($dataRule);
            if ($check['check'] && $dataRule['coupon_type'] == 2) {
                if ($this->checkCondition($dataRule, $subtotal, $weight, $quantity)) {
                    $coupon[] = $dataRule['coupon_value'];

                }
            }
        }


        $info_cart = [
            'subtotal' => $subtotal,
            'total' => $subtotal
        ];

        $results = [
            'info_cart' => $info_cart,
        ];

        return $results;
    }

    public function getListCartPriceRuleApply()
    {
        $cartPriceRules = $this->cartPriceRule->getAll();
        $subtotal = 0;
        $weight = 0;
        $quantity = 0;
        $cart = auth('customer')->check() ? $this->cartRepository->getCartByUserId()['items'] : $this->getCartSession();
        if (!empty($cart)) {
            foreach ($cart as $item) {
                $subtotal += $item['product']['price'] * $item['quantity'];
                $weight += $item['product']['weight'] * $item['quantity'];
                $quantity += $item['quantity'];
            }
            $coupon = [];
            foreach ($cartPriceRules as $rule) {
                $dataRule = $rule->getAttributes();
                $check = $this->checkRule($dataRule);
                if ($check['check'] && $dataRule['coupon_type'] == 2 && $this->checkCondition($dataRule, $subtotal, $weight, $quantity)) {
                    $dataRule['invalid_reason'] = true;
                    $coupon[] = $dataRule;
                } else {
                    $dataRule['invalid_reason'] = false;
                    $coupon[] = $dataRule;
                }
            }
            return response()->json($coupon, 200);
        }
        return response()->json(['message' => 'Cart not found'], 404);
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

    /**
     * @param $product_id
     * @param $columns
     * @return mixed
     */
    public function getProduct($product_id, $columns = ['*'])
    {
        return $this->productRepository->find($product_id, $columns);
    }

    public function checkRule($dataRule)
    {
        $check = true;
        $message = '';
        $groupCustomerIds = json_decode($dataRule['group_customer_ids'], true);
        if ($dataRule['is_active'] !== 1) {
            $check = false;
            $message = __('Mã giảm giá không tồn tại');
        } elseif (!Carbon::now()->between($dataRule['start_time'], $dataRule['end_time'])) {
            $check = false;
            $message = __('Mã giảm giá đã hết hạn');
        } elseif ($dataRule['usage_limit'] <= $dataRule['used']) {
            $check = false;
            $message = __('Mã giảm giá hết lượt sử dụng');
        }
        if (auth('customer')->check()) {
            $customer = auth('customer')->user();
            if (!in_array($customer->group_id, $groupCustomerIds)) {
                $check = false;
                $message = __('Mã giảm giá không áp dụng cho nhóm khách hàng của bạn');
            }
        } else {
            if (!in_array(1, $groupCustomerIds)) {
                $check = false;
                $message = __('Mã giảm giá không áp dụng cho nhóm khách hàng của bạn');
            }
        }
        return [
            'check' => $check,
            'message' => $message
        ];
    }

    public function checkCondition($dataRule, $subTotal, $totalWeight, $quantity)
    {
        switch ($dataRule['condition_apply']) {
            case 'subtotal':
                $condition = $subTotal;
                break;
            case 'total_weight':
                $condition = $totalWeight;
                break;
            case 'total_qty':
                $condition = $quantity;
                break;
            default:
                return false;
        }

        switch ($dataRule['operator']) {
            case 'greater_than':
                return $condition > $dataRule['condition_value'];
            case 'greater_than_or_equal':
                return $condition >= $dataRule['condition_value'];
            case 'equal':
                return $condition == $dataRule['condition_value'];
            case 'less_than':
                return $condition < $dataRule['condition_value'];
            case 'less_than_or_equal':
                return $condition <= $dataRule['condition_value'];
            default:
                return false;
        }
    }

    public function applyVoucher(Request $request){
        $validated = $request->validate([
            'voucher' => 'required|string',
        ]);
        $voucher = $validated['voucher'];
        $cartPriceRules = $this->cartPriceRule->getRuleByCoupon($voucher);

        if($cartPriceRules){
            $checkRule = $this->checkRule($cartPriceRules->getAttributes());
            if($checkRule['check'] && $cartPriceRules->coupon_type == 1){
                $cartPriceRules = $this->cartPriceRule->getAll();
                $subtotal = 0;
                $weight = 0;
                $quantity = 0;
                $cart = auth('customer')->check() ? $this->cartRepository->getCartByUserId()['items'] : $this->getCartSession();
                if (!empty($cart)) {
                    foreach ($cart as $item) {
                        $subtotal += $item['product']['price'] * $item['quantity'];
                        $weight += $item['product']['weight'] * $item['quantity'];
                        $quantity += $item['quantity'];
                    }

                    if($this->checkCondition($cartPriceRules, $subtotal, $weight, $quantity)){
                        return response()->json(['message' => 'Voucher applied'], 200);
                    } else {
                        return response()->json(['message' => 'You are not eligible'], 400);
                    }
                } else {
                    return response()->json(['message' => 'Cart not found'], 404);
                }
            } else {
                return response()->json(['message' => $checkRule['message']], 400);
            }
        } else {
            return response()->json(['message' => 'Voucher not found'], 404);
        }
    }
}

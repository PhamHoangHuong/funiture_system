<?php

namespace Modules\Cart\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Modules\Cart\Http\Requests\CartRequest;
use Modules\Cart\Repositories\CartItemRepositoryInterface;
use Modules\Cart\Repositories\CartRepositoryInterface;
use Modules\Product\Entities\Product;
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
     * @param ProductRepositoryInterface $productRepository
     * @param CartItemRepositoryInterface $cartItemRepository
     * @param CartRepositoryInterface $cartRepository
     */
    public function __construct(
        ProductRepositoryInterface  $productRepository,
        CartItemRepositoryInterface $cartItemRepository,
        CartRepositoryInterface     $cartRepository,
        SourceRepositoryInterface   $sourceRepository
    )
    {
        $this->productRepository = $productRepository;
        $this->cartItemRepository = $cartItemRepository;
        $this->cartRepository = $cartRepository;
        $this->sourceRepository = $sourceRepository;
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
                    $cart[$key]['product'] = $this->getProduct($id_product, ['id', 'name', 'price', 'image']);
                }
            }

            $results = [
                'items' => !empty($cart) ? $cart : 'Cart is empty',
            ];
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

        $arraySource = [];
        foreach ($cart['items'] as $item) {
            $sources = $this->productRepository->getSourceContainProduct($item->product->id);
            $source_info = [];

            foreach ($sources as $source) {
                $source_address = $this->sourceRepository->getFullAddressSource($source);

                $source_info[] = [
                    'source_id' => $source,
                    'source_address' => $source_address
                ];
            }

            $arraySource[] = [
                'product_id' => $item->product->id,
                'sources' => $source_info
            ];
        }
        $customer_location = '21.028511,105.804817';

        foreach ($arraySource as &$product) {
            $nearest_source = null;
            $shortest_distance = PHP_INT_MAX;

            foreach ($product['sources'] as $source) {
                $source_address = $source['source_address'];

                // Lấy tọa độ của nguồn qua hàm getLatLong
                $source_latlong = $this->getLatLong($source_address);
                $customer_latlong = $this->getLatLong($customer_location); // Lấy tọa độ khách hàng (nếu chưa có)

                // Kiểm tra nếu tọa độ của nguồn không rỗng hoặc không có lỗi
                if ($source_latlong && $customer_latlong) {
                    // Tính khoảng cách giữa vị trí khách hàng và vị trí nguồn
                    $distance_value = $this->calculateDistance($customer_latlong, $source_latlong);
                    // So sánh khoảng cách và tìm nguồn gần nhất
                    $distance = $distance_value->rows[0]->elements[0]->distance->value;
                    if ($distance < $shortest_distance) {
                        $shortest_distance = $distance;
                        $nearest_source = $source;
                    }
                }
            }

            // Gán kết quả địa chỉ nguồn gần nhất và khoảng cách ngắn nhất cho sản phẩm
            $product['nearest_source'] = $nearest_source;
            $product['shortest_distance'] = $shortest_distance;
        }
        dd($arraySource);


        return response()->json($results, 200);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function miniCart()
    {
        // Nếu người dùng đã đăng nhập, lấy giỏ hàng từ DB
//        try {
//            if (auth('customer')->check()) {
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
        $cart = $this->getCartSession();
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

    /**
     * @param $product_id
     * @param $columns
     * @return mixed
     */
    public function getProduct($product_id, $columns = ['*'])
    {
        return $this->productRepository->find($product_id, $columns);
    }

    /**
     * @param $address
     * @return \Illuminate\Http\JsonResponse
     */
    public function getLatLong($address)
    {
        $address = urlencode($address);
        $api_key = 'G0n5p9iThoQo4gQ5fgfgVT8aSIv9Do4HbYn2WAQH'; // Thay thế bằng API key của bạn

        $url = "https://rsapi.goong.io/geocode?address=" . $address . "&api_key=" . $api_key;

        try {
            $json = file_get_contents($url);
            $data = json_decode($json);

            if (isset($data->results[0])) {
                $lat = $data->results[0]->geometry->location->lat;
                $lng = $data->results[0]->geometry->location->lng;
                return $lat . ',' . $lng;
            } else {
                return false;
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve data from API: ' . $e->getMessage()], 500);
        }
    }


    /**
     * @param $origins
     * @param $destinations
     * @return \Illuminate\Http\JsonResponse
     */
    public function calculateDistance($origins, $destinations){
        $api_key = 'G0n5p9iThoQo4gQ5fgfgVT8aSIv9Do4HbYn2WAQH';
        $api = "https://rsapi.goong.io/DistanceMatrix?origins=$origins&destinations=$destinations&vehicle=car&api_key=" . $api_key;
        $json = file_get_contents($api);
        $json = json_decode($json);
        return $json;
    }

    /**
     * @param $sourceId
     * @return string
     */
    public function getFullAddressSource($sourceId)
    {
        $address = $this->sourceRepository->getFullAddressSource($sourceId);
        return $address;
    }
}

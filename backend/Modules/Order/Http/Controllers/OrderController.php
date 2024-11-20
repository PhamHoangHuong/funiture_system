<?php

namespace Modules\Order\Http\Controllers;

use Spatie\Geocoder\Geocoder;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Http;
use Modules\Customer\Entities\CustomerAddress;
use Modules\Cart\Repositories\CartRepositoryInterface;
use Modules\Cart\Repositories\CartItemRepositoryInterface;
use Modules\Source\Repositories\SourceRepositoryInterface;
use Modules\Product\Repositories\ProductRepositoryInterface;
use Modules\Customer\Repositories\CustomerRepositoryInterface;
use Modules\CartPriceRule\Repositories\CartPriceRulesRepositoryInterface;

class OrderController extends Controller
{
    protected $customerRepo;
    protected $cartRepository;
    public function __construct(
        ProductRepositoryInterface $productRepository,
        CartItemRepositoryInterface $cartItemRepository,
        CartRepositoryInterface $cartRepository,
        SourceRepositoryInterface $sourceRepository,
        CartPriceRulesRepositoryInterface $cartPriceRule,
        CustomerRepositoryInterface $customerRepo
    ) {
        $this->productRepository = $productRepository;
        $this->cartItemRepository = $cartItemRepository;
        $this->cartRepository = $cartRepository;
        $this->sourceRepository = $sourceRepository;
        $this->cartPriceRule = $cartPriceRule;
        $this->customerRepo = $customerRepo;
    }
    public function checkout()
    {
        if (auth('customer')->check()) {
            $this->checkoutLogin();
        } else {
            $this->checkoutWithoutLogin();
        }
    }
    public function checkoutLogin()
    {
        $user = auth('customer')->user();
        $products = $this->cartRepository->getCartByUserId();
        $addresses = CustomerAddress::where('customer_id', $user->id)->get();
        $totalProduct = 500000;
        $userAdress = $this->customerRepo->getFullAddress($user);
        $userLocation = $this->getCoordinates($userAdress);
        // $this->customerRepo->getFullAddress($user);
        dd($userLocation);
    }

    public function checkoutWithoutLogin()
    {
        dd(2221);
    }

    private function getCoordinates($address)
    {
        dd(env('APP_URL'));
        // $apiKey = env('GOOGLE_MAPS_GEOCODING_API_KEY');
        $geocoder = app('geocoder');
        // dd(env('GOOGLE_MAPS_GEOCODING_API_KEY'));
        $result = $geocoder->getCoordinatesForAddress($address);
        dd($result);
        // Kiểm tra xem kết quả có dữ liệu không
        if ($result && isset($result['lat']) && isset($result['lng'])) {
            $latitude = $result['lat'];
            $longitude = $result['lng'];
            return compact('latitude', 'longitude');
        }

        return null;
    }

    private function NearestSourceDistance()
    {

    }
}

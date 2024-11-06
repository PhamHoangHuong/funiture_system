<?php
namespace Modules\Product\Http\Controllers\Frontend;

class ProductController
{
    public function __construct()
    {
    }

    public function calculatorPrice(){
        $products = $this->productRepository->all();

        foreach ($products as $product) {
            $basePrice = $product->price;

        }

        return 123;
    }
}
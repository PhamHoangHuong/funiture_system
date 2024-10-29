<?php

namespace Modules\Product\Http\Controllers;

use Illuminate\Http\Request;
use Modules\Traits\ResponseTrait;
use Illuminate\Support\Facades\DB;
use Illuminate\Routing\Controller;
use Modules\Traits\ImageUploadTrait;
use Symfony\Component\HttpFoundation\Response;
use Modules\Product\Transformers\ProductResource;
use Modules\Product\Http\Requests\StoreProductRequest;
use Modules\Product\Http\Requests\UpdateProductRequest;
use Modules\Product\Repositories\ProductRepositoryInterface;
use Modules\Source\Repositories\SourceProductRepositoryInterface;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    use ImageUploadTrait, ResponseTrait;

    protected $productRepository, $sourceProductRepository;

    // Khởi tạo controller với các repository cần thiết
    public function __construct(ProductRepositoryInterface $productRepository, SourceProductRepositoryInterface $sourceProductRepository)
    {
        $this->productRepository = $productRepository;
        $this->sourceProductRepository = $sourceProductRepository;
    }

    // Lấy danh sách tất cả sản phẩm
    public function index()
    {
        $products = $this->productRepository->getAll();
        return ProductResource::collection($products);
    }

    // Tạo mới một sản phẩm
    public function store(StoreProductRequest $request)
    {
        Log::info('Store method called');
        DB::beginTransaction();
        try {
            // Chuẩn bị dữ liệu sản phẩm từ request
            $productData = $this->productRepository->prepareProductData($request);
            // Tạo sản phẩm mới
            $product = $this->productRepository->createProduct($productData);
            Log::info('Product created: ' . json_encode($product));

            // Cập nhật thuộc tính và danh mục cho sản phẩm
            $this->productRepository->updateProductAttributes($product, $request->input('attributes', []));
            $this->productRepository->updateProductCategories($product, $request->input('category_ids', []));

            // Tạo các biến thể cho sản phẩm
            $variants = $this->productRepository->createVariants($product, $request->input('attributes', []));

            DB::commit();
            Log::info('Transaction committed');

            return $this->toResponseSuccess('Sản phẩm đã được tạo thành công', new ProductResource($product), Response::HTTP_CREATED);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error in store method: ' . $e->getMessage());
            return $this->handleException($e);
        }
    }

    // Hiển thị thông tin chi tiết của một sản phẩm
    public function show($id)
    {
        try {
            $product = $this->productRepository->find($id);
            return new ProductResource($product);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    // Cập nhật thông tin sản phẩm
    public function update(UpdateProductRequest $request, $id)
    {
        DB::beginTransaction();
        try {
            $productData = $request->validated();
            $product = $this->productRepository->updateProduct($id, $productData);

            $this->productRepository->updateProductAttributes($product, $request->input('attributes', []));
            $this->productRepository->updateProductCategories($product, $request->input('category_ids', []));

            DB::commit();
            return $this->toResponseSuccess('Sản phẩm đã được cập nhật thành công', new ProductResource($product));
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->handleException($e);
        }
    }

    // Xóa một sản phẩm
    public function destroy($id)
    {
        try {
            $this->productRepository->deleteProduct($id);
            return $this->toResponseSuccess('Sản phẩm đã được xóa thành công');
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    // Lưu thông tin cơ bản của sản phẩm
    public function storeBasicInfo(StoreProductRequest $request)
    {
        $product = $this->productRepository->create($request->validated());
        return response()->json(['product_id' => $product->id]);
    }

    // Lưu thuộc tính cho sản phẩm
    public function storeAttributes(Request $request, $productId)
    {
        $product = $this->productRepository->find($productId);
        $attributes = $request->input('attributes', []);

        $product->productAttributes()->delete();
        foreach ($attributes as $attribute) {
            $product->productAttributes()->create([
                'attribute_id' => $attribute['attribute_id'],
                'attribute_value_id' => $attribute['attribute_value_id'],
            ]);
        }

        return $this->toResponseSuccess('Thuộc tính sản phẩm đã được cập nhật thành công');
    }
}

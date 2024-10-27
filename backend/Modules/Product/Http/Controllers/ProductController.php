<?php

namespace Modules\Product\Http\Controllers;

use Illuminate\Support\Str;
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

    public function __construct(ProductRepositoryInterface $productRepository, SourceProductRepositoryInterface $sourceProductRepository)
    {
        $this->productRepository = $productRepository;
        $this->sourceProductRepository = $sourceProductRepository;
    }

    public function index()
    {
        $products = $this->productRepository->getAll();
        return ProductResource::collection($products);
    }

    public function store(StoreProductRequest $request)
    {
        Log::info('Store method called');
        DB::beginTransaction();
        try {
            $productData = $this->prepareProductData($request);
            $product = $this->productRepository->create($productData);
            Log::info('Product created: ' . json_encode($product));
            
            $productAttributes = $this->handleAttributes($request, $product);
            $this->handleProductCategories($request, $product);
            
            DB::commit();
            Log::info('Transaction committed');
            
            // Thêm thông tin về product_attributes vào response
            $productResource = new ProductResource($product);
            $productResource->additional(['product_attributes' => $productAttributes]);
            
            return $this->toResponseSuccess('Sản phẩm đã được tạo thành công', $productResource, Response::HTTP_CREATED);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error in store method: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            return $this->handleException($e);
        }
    }

    public function show($id)
    {
        try {
            $product = $this->productRepository->find($id);
            return new ProductResource($product);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function update(UpdateProductRequest $request, $id)
    {
        DB::beginTransaction();
        try {
            $productData = $this->prepareProductData($request, $id);
            $product = $this->productRepository->find($id);
            $productData['image'] = $this->updateImage($request, 'image', 'product', $product->image);
            $product = $this->productRepository->update($id, $productData);
            $this->handleAttributes($request, $product);
            $this->handleProductCategories($request, $product);
            DB::commit();
            return $this->toResponseSuccess('Sản phẩm đã được cập nhật thành công', new ProductResource($product));
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->handleException($e);
        }
    }

    public function destroy($id)
    {
        try {
            $this->productRepository->delete($id);
            return $this->toResponseSuccess('Sản phẩm đã được xóa thành công');
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    protected function prepareProductData(Request $request, $id = null)
    {
        $productData = $request->validated();
        if ($request->hasFile('image')) {
            $productData['image'] = $this->uploadImage($request, 'image', 'assets/images/product');
        }
        $productData['slug'] = Str::slug($request->name);

        if ($id && $this->productRepository->existsBySlug($productData['slug'], $id)) {
            throw new \Exception('Slug đã tồn tại');
        }

        return $productData;
    }

    protected function handleAttributes(Request $request, $product)
    {
        Log::info('Handling attributes for product: ' . $product->id);
        Log::info('Attributes data: ' . json_encode($request->input('attributes')));
        Log::info('Attributes data type: ' . gettype($request->input('attributes')));

        Log::info('Product class: ' . get_class($product));
        Log::info('productAttributes() method exists: ' . method_exists($product, 'productAttributes'));

        if ($request->has('attributes') && is_array($request->input('attributes'))) {
            Log::info('Attributes found in request');
            DB::beginTransaction();
            try {
                // Bỏ dòng xóa thuộc tính cũ
                // $product->productAttributes()->forceDelete();
                // Log::info('Deleted existing product attributes');

                foreach ($request->attributes as $index => $attribute) {
                    Log::info("Processing attribute {$index}: " . json_encode($attribute));
                    try {
                        $createdAttribute = $product->productAttributes()->create([
                            'attribute_id' => $attribute['attribute_id'],
                            'attribute_value_id' => $attribute['attribute_value_id'],
                        ]);
                        Log::info("Created attribute {$index}: " . json_encode($createdAttribute));
                    } catch (\Exception $e) {
                        Log::error("Error creating attribute {$index}: " . $e->getMessage());
                        Log::error("Error trace: " . $e->getTraceAsString());
                    }
                }
                DB::commit();
                Log::info('All attributes processed successfully');
            } catch (\Exception $e) {
                DB::rollBack();
                Log::error('Error in handleAttributes: ' . $e->getMessage());
                Log::error('Stack trace: ' . $e->getTraceAsString());
            }
        } else {
            Log::info('No valid attributes array found in the request');
        }

        // Kiểm tra sau khi xử lý
        $finalAttributes = $product->productAttributes()->get();
        Log::info('Final attributes for product ' . $product->id . ': ' . json_encode($finalAttributes));

        // Kiểm tra trực tiếp từ database
        $dbAttributes = DB::table('product_attributes')->where('product_id', $product->id)->get();
        Log::info('Attributes from database for product ' . $product->id . ': ' . json_encode($dbAttributes));
    }

    protected function handleProductCategories(Request $request, $product)
    {
        if ($request->has('category_ids')) {
            $categoryIds = $request['category_ids'];
            $product->categories()->sync($categoryIds);
        }
    }

    public function storeBasicInfo(StoreProductRequest $request)
    {
        $product = $this->productRepository->create($request->validated());
        return response()->json(['product_id' => $product->id]);
    }

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

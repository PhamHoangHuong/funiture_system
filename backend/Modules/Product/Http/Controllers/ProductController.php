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
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;

class ProductController extends Controller
{
    use ImageUploadTrait, ResponseTrait;

    protected $productRepository, $sourceProductRepository;

    public function __construct(ProductRepositoryInterface $productRepository, SourceProductRepositoryInterface $sourceProductRepository)
    {
        $this->productRepository = $productRepository;
        $this->sourceProductRepository = $sourceProductRepository;
    }

    public function index(Request $request)
    {
        $params = $request->all();
        $products = $this->productRepository->searchProduct($params);
        return ProductResource::collection($products->load('categories', 'collections', 'sourceProducts', 'productAttributes'));
    }

    public function searchProduct(Request $request)
    {
        $params = $request->all();
        $products = $this->productRepository->searchProduct($params);
        return ProductResource::collection($products->load('categories', 'collections', 'sourceProducts', 'productAttributes'));
    }

    public function store(StoreProductRequest $request)
    {
        Log::info('Store method called');
        DB::beginTransaction();
        try {
            // Prepare product data and create product
            $productData = $this->productRepository->prepareProductData($request);
            $product = $this->productRepository->createProduct($productData);
            Log::info('Product created: ' . json_encode($product));

            // Create variants
            $this->createVariants($request, $product, $productData);

            // Update product attributes, categories, sources, collections
            $this->updateProductAssociations($product, $request);

            DB::commit();
            Log::info('Transaction committed');
            return $this->toResponseSuccess('Sản phẩm đã được tạo thành công', new ProductResource($product), Response::HTTP_CREATED);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error in store method: ' . $e->getMessage());
            return $this->handleException($e);
        }
    }

    private function createVariants(StoreProductRequest $request, $product, $productData)
    {
        foreach ($request->input('variants', []) as $variant) {
            $variantData = $this->prepareVariantData($variant, $product, $productData);

            if (!empty($variantData['attribute_id']) && !empty($variantData['attribute_value_id'])) {
                $variantProduct = $this->productRepository->createProduct($variantData);
                $this->productRepository->updateProductAttributes($variantProduct, $variant['attributes']);
            } else {
                Log::warning('Variant creation skipped due to missing attribute data', $variantData);
            }
        }
    }

    private function prepareVariantData($variant, $product, $productData)
    {
        $variantData = $productData;
        $variantData['parent_id'] = $product->id;
        $variantData['name'] = $variant['name'] ?? $product->name . ' ' . $variant['attribute_value_id'];
        $variantData['slug'] = $variant['slug'] ?? Str::slug($variantData['name']);
        $variantData['price'] = $variant['price'] ?? $product->price;
        $variantData['weight'] = $variant['weight'] ?? $product->weight;
        $variantData['sku'] = $variant['sku'] ?? $product->sku;
        $variantData['attribute_id'] = $variant['attributes'][0]['attribute_id'] ?? null;
        $variantData['attribute_value_id'] = $variant['attributes'][0]['attribute_value_id'] ?? null;
        $variantData['start_new_time'] = $variant['start_new_time'] ?? $product->start_new_time;
        $variantData['end_new_time'] = $variant['end_new_time'] ?? $product->end_new_time;
        $variantData['seo_title'] = $variant['seo_title'] ?? $product->seo_title;
        $variantData['seo_description'] = $variant['seo_description'] ?? $product->seo_description;
        $variantData['video_link'] = $variant['video_link'] ?? $product->video_link;
        $variantData['categories'] = $product->categories->pluck('id');

        if (isset($variant['image']) && $variant['image'] instanceof UploadedFile) {
            $variantData['image'] = $this->uploadImage($request, 'image', 'products');
        }

        return $variantData;
    }

    private function updateProductAssociations($product, $request)
    {
        $this->productRepository->updateProductAttributes($product, $request->input('attributes', []));
        $this->productRepository->updateProductCategories($product, $request->input('category_ids', []));
        $this->productRepository->updateProductSources($product, $request->input('sources', []));
        $this->productRepository->updateProductCollections($product, $request->input('collection_ids', []));
    }

    public function show($id)
    {
        try {
            $product = $this->productRepository->findProduct($id, ['parent', 'variants', 'productAttributes', 'sourceProducts']);
            return new ProductResource($product);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function update(UpdateProductRequest $request, $id)
    {
        DB::beginTransaction();
        try {
            $productData = $request->validated();

            if ($request->hasFile('image')) {
                $productData['image'] = $this->updateImage($request, 'image', 'products', $productData['image'] ?? null);
            }

            $product = $this->productRepository->updateProduct($id, $productData);

            $this->updateProductAssociations($product, $request);

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
            $this->productRepository->deleteProduct($id);
            return $this->toResponseSuccess('Sản phẩm đã được xóa thành công');
        } catch (\Exception $e) {
            return $this->handleException($e);
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

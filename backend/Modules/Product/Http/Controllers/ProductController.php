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
use Modules\Product\Entities\ProductAttribute;
use Modules\Attributes\Entities\AttributeValue;
use Modules\Source\Repositories\SourceProductRepositoryInterface;
use Modules\Source\Repositories\SourceProductRepository;
use Modules\Source\Repositories\SourceRepositoryInterface;

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
        DB::beginTransaction();
        try {
            $productData = $this->prepareProductData($request);
            $product = $this->productRepository->create($productData);
            $this->handleAttributes($request, $product);
            $this->handleProductCategories($request, $product);
            DB::commit();
            return $this->toResponseSuccess('Sản phẩm đã được tạo thành công', new ProductResource($product), Response::HTTP_CREATED);
        } catch (\Exception $e) {
            DB::rollBack();
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
        if ($request->has('attributes')) {
            $product->productAttributes()->delete();
            foreach ($request->attributes as $attribute) {
                $product->productAttributes()->create([
                    'attribute_id' => $attribute['attribute_id'],
                    'attribute_value_id' => $attribute['attribute_value_id'],
                ]);
            }
        }
    }

    protected function handleProductCategories(Request $request, $product)
    {
        if ($request->has('category_ids')) {
            $categoryIds = explode(',', $request['category_ids']);
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

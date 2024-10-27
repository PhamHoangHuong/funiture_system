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
    // Sử dụng các trait
    use ImageUploadTrait, ResponseTrait;

    protected $productRepository, $sourceProductRepository;

    public function __construct(ProductRepositoryInterface $productRepository, SourceProductRepositoryInterface $sourceProductRepository)
    {
        $this->productRepository = $productRepository;
        $this->sourceProductRepository = $sourceProductRepository;
    }

    // Lấy danh sách tất cả sản phẩm
    public function index()
    {
        return ProductResource::collection($this->productRepository->getAll());
    }

    // Tạo mới một sản phẩm
    public function store(StoreProductRequest $request)
    {
        DB::beginTransaction();
        try {
            $productData = $this->prepareProductData($request);
            $product = $this->productRepository->create($productData);

            $this->handleAttributes($request, $product);
            $this->handleProductCategories($request, $product);
            $this->saveProductToSources($request, $product);

            DB::commit();
            return $this->toResponseSuccess(new ProductResource($product), 'Sản phẩm đã được tạo thành công', Response::HTTP_CREATED);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->handleException($e);
        }
    }

    // Hiển thị thông tin chi tiết của một sản phẩm
    public function show($id)
    {
        try {
            $product = $this->productRepository->find($id);
            if (!$product) {
                return $this->toResponseBad('Không tìm thấy sản phẩm', Response::HTTP_NOT_FOUND);
            }
            return $this->toResponseSuccess(new ProductResource($product->load('variants', 'parent', 'categories')));
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    // Cập nhật thông tin sản phẩm
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
            return $this->toResponseSuccess('Sản phẩm đã được cập nhật thành công');
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    // Xóa sản phẩm
    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            $product = $this->productRepository->find($id);
            $product->variants()->delete();
            $product->delete();
            DB::commit();
            return $this->toResponseDeleteSuccess('Sản phẩm đã được xóa thành công');
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    // Phương thức thay đổi trạng thái của sản phẩm
    public function changeStatus($id)
    {
        DB::beginTransaction();
        try {
            $product = $this->productRepository->find($id);
            $product->status = !$product->status;
            $product->save();
            DB::commit();
            return $this->toResponseSuccess(new ProductResource($product->load('variants')), 'Thay đổi trạng thái sản phẩm thành công');
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    // Phương thức hỗ trợ để chuẩn bị dữ liệu sản phẩm
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

    // Phương thức xử lý attributes (xử lý các thuộc tính của sản phẩm)
    protected function handleAttributes(Request $request, $product)
    {
        if ($request->has('attributes')) {
            foreach ($request->attributes as $attribute) {
                ProductAttribute::create([
                    'product_id' => $product->id,
                    'attribute_id' => $attribute['attribute_id'],
                    'value_id' => $attribute['value_id'],
                ]);
            }
        }
    }

    // Phương thức xử lý variants (sản phẩm biến thể)
    protected function handleVariants(Request $request, $product)
    {
        if ($request->has('variants')) {
            foreach ($request->variants as $variantData) {
                $variantData['parent_id'] = $product->id;
                $variantData['slug'] = Str::slug($product->slug . '-' . $variantData['name']);
                $variant = $this->productRepository->create($variantData);
                $this->handleAttributes(new Request(['attributes' => $variantData['attributes']]), $variant);
            }
        }
    }

    // nếu sản phẩm có nguồn cung cấp thì lưu sản phẩm vào nguồn đó
    // ví dụ: sản phẩm có nguồn từ nhà cung cấp A, B, C thì lưu sản phẩm vào các nguồn A, B, C
    // với số lượng và số lượng tồn kho tương ứng với nguồn đó
    // và ngược lại, nếu sản phẩm không có nguồn cung cấp thì không cần lưu vào nguồn
    // và với sản phẩm biến thể thì cũng lưu vào nguồn tương ứng với sản phẩm chính

    protected function saveProductToSources(Request $request, $product)
    {
        if ($request->has('sources')) {
            foreach ($request->sources as $sourceData) {
                $sourceProductData = [
                    'product_id' => $product->id,
                    'source_id' => $sourceData['source_id'],
                    'quantity' => $sourceData['quantity'],
                ];
                $this->sourceProductRepository->create($sourceProductData);
            }
        }
    }

    // Phương thức xử lý để lưu vào bảng product_categories
    protected function handleProductCategories(Request $request, $product)
    {
        $categoryIds = explode(',', $request['category_ids']);

        if ($request->has('category_ids')) {
            // Xóa các danh mục cũ của sản phẩm
            $product->categories()->detach();

            // Thêm các danh mục m��i
            foreach ($categoryIds as $categoryId) {
                $product->categories()->attach($categoryId);
            }
        }
    }

    public function storeBasicInfo(Request $request)
    {
        // Validate and store basic product information
        $product = $this->productRepository->create($request->validated());
        return response()->json(['product_id' => $product->id]);
    }

    public function storeAttributes(Request $request, $productId)
    {
        $product = $this->productRepository->find($productId);
        $this->handleAttributes($request, $product);
        return response()->json(['success' => true]);
    }

    public function storeSourceAndQuantity(Request $request, $productId)
    {
        $product = $this->productRepository->find($productId);
        // Handle source and quantity logic here
        return response()->json(['success' => true]);
    }
}

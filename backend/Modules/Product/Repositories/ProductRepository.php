<?php

namespace Modules\Product\Repositories;

use App\Repositories\BaseRepository;
use Modules\Product\Entities\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Modules\Traits\ImageUploadTrait;
use Modules\Attributes\Entities\AttributeValue;


class ProductRepository extends BaseRepository implements ProductRepositoryInterface
{
    use ImageUploadTrait;

    public function getModel(): string
    {
        return Product::class;
    }

    public function findMany(array $ids)
    {
        return $this->model->whereIn('id', $ids)->with('advancedPrices')->get();
    }

    // kiểm tra xem sản phẩm có nguồn hàng không
    public function getSourceContainProduct($product_id)
    {
        $product = $this->model->find($product_id);
        $sources = $product->sources()
            ->wherePivot('quantity', '>', 0)
            ->wherePivot('status', 1)
            ->get();

        return $sources->pluck('id');
    }

    // cập nhật thuộc tính sản phẩm
    public function updateProductAttributes($product, array $attributes)
    {
        $product->productAttributes()->delete();
        foreach ($attributes as $attribute) {
            $product->productAttributes()->create([
                'attribute_id' => $attribute['attribute_id'],
                'attribute_value_id' => $attribute['attribute_value_id'],
            ]);
        }
    }

    // cập nhật danh mục sản phẩm
    public function updateProductCategories($product, array $categoryIds)
    {
        $product->categories()->sync($categoryIds);
    }

    // tạo sản phẩm
    public function createProduct(array $data)
    {
        return $this->model->create($data);
    }

    // cập nhật sản phẩm
    public function updateProduct($id, array $data)
    {
        $product = $this->model->findOrFail($id);
        $product->update($data);
        return $product;
    }

    // xóa sản phẩm
    public function deleteProduct($id)
    {
        $product = $this->model->findOrFail($id);
        $product->delete();
    }

    // tạo biến thể sản phẩm
    public function createVariants($product, array $attributes)
    {
        $variants = [];
        foreach ($attributes as $attribute) {
            $attributeValueModel = AttributeValue::find($attribute['attribute_value_id']);
            $attributeValue = $attributeValueModel ? $attributeValueModel->value : 'Unknown';

            // Use provided attributes or fallback to product's attributes
            $variantName = $product->name . ' ' . $attributeValue;
            $variantData = [
                'name' => $variantName,
                'slug' => Str::slug($variantName),
                'description' => $attribute['description'] ?? $product->description,
                'content' => $attribute['content'] ?? $product->content,
                'status' => $attribute['status'] ?? $product->status,
                'weight' => $attribute['weight'] ?? $product->weight,
                'price' => $attribute['price'] ?? $product->price,
                'start_new_time' => $attribute['start_new_time'] ?? $product->start_new_time,
                'end_new_time' => $attribute['end_new_time'] ?? $product->end_new_time,
                'advanced_price_id' => $attribute['advanced_price_id'] ?? $product->advanced_price_id,
                'parent_id' => $product->id,
                'seo_title' => $attribute['seo_title'] ?? $product->seo_title,
                'seo_description' => $attribute['seo_description'] ?? $product->seo_description,
                'video_link' => $attribute['video_link'] ?? $product->video_link,
                'sku' => $attribute['sku'] ?? $product->sku,
            ];

            $variant = $this->createProduct($variantData);
            $this->updateProductAttributes($variant, [$attribute]);
            $this->updateProductCategories($variant, $product->categories->pluck('id')->toArray());
            $variants[] = $variant;
        }

        return $variants;
    }

    // chuẩn bị dữ liệu sản phẩm
    public function prepareProductData(Request $request, $id = null)
    {
        $productData = $request->validated();
        if ($request->hasFile('image')) {
            $productData['image'] = $this->uploadImage($request, 'image', 'assets/images/product');
        }
        $productData['slug'] = Str::slug($request->name);

        if ($id && $this->existsBySlug($productData['slug'], $id)) {
            throw new \Exception('Slug đã tồn tại');
        }

        return $productData;
    }
}

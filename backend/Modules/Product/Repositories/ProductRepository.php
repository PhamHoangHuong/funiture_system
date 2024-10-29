<?php

namespace Modules\Product\Repositories;

use App\Repositories\BaseRepository;
use Modules\Product\Entities\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Modules\Traits\ImageUploadTrait;

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
    public function getSourceContainProduct($product_id)
    {
        $product = $this->model->find($product_id);
        $sources = $product->sources()
            ->wherePivot('quantity', '>', 0)
            ->wherePivot('status', 1)
            ->get();

        return $sources->pluck('id');
    }

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

    public function updateProductCategories($product, array $categoryIds)
    {
        $product->categories()->sync($categoryIds);
    }

    public function createProduct(array $data)
    {
        return $this->model->create($data);
    }

    public function updateProduct($id, array $data)
    {
        $product = $this->model->findOrFail($id);
        $product->update($data);
        return $product;
    }

    public function deleteProduct($id)
    {
        $product = $this->model->findOrFail($id);
        $product->delete();
    }

    public function createVariants($product, array $attributes)
    {
        $variants = [];
        foreach ($attributes as $attribute) {
            $variantName = $product->name . ' - ' . $attribute['attribute_id'] . ':' . $attribute['attribute_value_id'];
            $variantData = [
                'name' => $variantName,
                'slug' => Str::slug($variantName),
                'description' => $product->description,
                'content' => $product->content,
                'status' => $product->status,
                'weight' => $product->weight,
                'price' => $product->price,
                'start_new_time' => $product->start_new_time,
                'end_new_time' => $product->end_new_time,
                'advanced_price_id' => $product->advanced_price_id,
                'parent_id' => $product->id,
                'seo_title' => $product->seo_title,
                'seo_description' => $product->seo_description,
                'video_link' => $product->video_link,
            ];

            $variant = $this->createProduct($variantData);
            $this->updateProductAttributes($variant, [$attribute]);
            $this->updateProductCategories($variant, $product->categories->pluck('id')->toArray());
            $variants[] = $variant;
        }

        return $variants;
    }

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

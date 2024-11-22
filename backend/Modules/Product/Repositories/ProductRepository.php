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
        // Clear existing attributes for the specific product (main or variant)
        $product->productAttributes()->delete();

        // Add new attributes for the specific product
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

    public function updateProductCollections($product, array $collectionIds)
    {
        $product->collections()->sync($collectionIds);
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

    public function prepareProductData(Request $request, $id = null)
    {
        $productData = $request->validated();
        if ($request->hasFile('image')) {
            $productData['image'] = $this->uploadImage($request, 'image', 'products');
        }
        $productData['slug'] = Str::slug($request->name);

        if ($id && $this->existsBySlug($productData['slug'], $id)) {
            throw new \Exception('Slug đã tồn tại');
        }

        return $productData;
    }

    public function findProduct($id, $relations = [])
    {
        return $this->model->with($relations)->findOrFail($id);
    }

    public function updateProductSources($product, array $sources)
    {
        $sourceData = [];
        foreach ($sources as $source) {
            $sourceData[$source['source_id']] = ['quantity' => $source['quantity']];
        }
        $product->sources()->sync($sourceData);
    }

    public function searchProduct(array $params)
    {
        $query = $this->model->query();

        // Tìm theo tên sản phẩm (name)
        $query->when(isset($params['name']), function ($q) use ($params) {
            $q->where('name', 'like', '%' . $params['name'] . '%');
        });

        // Tìm theo mã sản phẩm (sku)
        $query->when(isset($params['sku']), function ($q) use ($params) {
            $q->where('sku', 'like', '%' . $params['sku'] . '%');
        });

        // Tìm theo khoảng giá (min_price và max_price)
        $query->when(isset($params['min_price']), function ($q) use ($params) {
            $q->where('price', '>=', $params['min_price']);
        });

        $query->when(isset($params['max_price']), function ($q) use ($params) {
            $q->where('price', '<=', $params['max_price']);
        });

        // Tìm theo trạng thái (status)
        $query->when(isset($params['status']), function ($q) use ($params) {
            $q->where('status', $params['status']);
        });

        // Tìm theo trạng thái số lượng trong kho (stock_quantity)
        $query->when(isset($params['min_stock']), function ($q) use ($params) {
            $q->where('stock_quantity', '>=', $params['min_stock']);
        });

        $query->when(isset($params['max_stock']), function ($q) use ($params) {
            $q->where('stock_quantity', '<=', $params['max_stock']);
        });

        // Tìm theo danh mục (category_id)
        $query->when(isset($params['category_id']), function ($q) use ($params) {
            $q->whereHas('categories', function ($subQuery) use ($params) {
                $subQuery->where('category_id', $params['category_id']);
            });
        });

        // Tìm theo bộ sưu tập (collection_id)
        $query->when(isset($params['collection_id']), function ($q) use ($params) {
            $q->whereHas('collections', function ($subQuery) use ($params) {
                $subQuery->where('collection_id', $params['collection_id']);
            });
        });

        // Tìm theo thuộc tính (attributes) - dùng với bảng pivot product_attributes
        $query->when(isset($params['attribute_id']), function ($q) use ($params) {
            $q->whereHas('productAttributes', function ($subQuery) use ($params) {
                $subQuery->where('attribute_id', $params['attribute_id']);
            });
        });

        return $query->get();
    }

}

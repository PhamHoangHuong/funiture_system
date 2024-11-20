<?php

namespace Modules\Product\Repositories;

use App\Repositories\RepositoryInterface;
use Illuminate\Http\Request;

interface ProductRepositoryInterface extends RepositoryInterface
{
    public function findMany(array $ids);
    public function getSourceContainProduct($product_id);
    public function updateProductAttributes($product, array $attributes);
    public function updateProductCategories($product, array $categoryIds);
    public function updateProductCollections($product, array $collectionIds);
    public function createProduct(array $data);
    public function updateProduct($id, array $data);
    public function deleteProduct($id);
    public function prepareProductData(Request $request, $id = null);
    public function findProduct($id, $relations = []);
    public function updateProductSources($product, array $sources);

    public function searchProduct(array $params);
}

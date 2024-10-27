<?php

namespace Modules\Product\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Product\Http\Requests\StoreProductAttributeRequest;
use Modules\Product\Http\Requests\UpdateProductAttributeRequest;
use Modules\Product\Repositories\ProductAttributeRepositoryInterface;
use Modules\Product\Transformers\ProductAttributeResource;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use Modules\Traits\ResponseTrait;

class ProductAttributeController extends Controller
{
    use ResponseTrait;

    protected $productAttributeRepository;

    public function __construct(ProductAttributeRepositoryInterface $productAttributeRepository)
    {
        $this->productAttributeRepository = $productAttributeRepository;
    }

    public function index()
    {
        $productAttributes = $this->productAttributeRepository->getAll();
        return ProductAttributeResource::collection($productAttributes);
    }

    public function store(StoreProductAttributeRequest $request)
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();
            $productAttribute = $this->productAttributeRepository->create($validated);
            DB::commit();
            return $this->toResponseSuccess(new ProductAttributeResource($productAttribute), 'Product attribute created successfully', Response::HTTP_CREATED);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->handleException($e);
        }
    }

    public function show($id)
    {
        try {
            $productAttribute = $this->productAttributeRepository->find($id);
            if (!$productAttribute) {
                return $this->toResponseBad('Product attribute not found', Response::HTTP_NOT_FOUND);
            }
            return $this->toResponseSuccess(new ProductAttributeResource($productAttribute));
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function update(UpdateProductAttributeRequest $request, $id)
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();
            $productAttribute = $this->productAttributeRepository->update($id, $validated);
            DB::commit();
            return $this->toResponseSuccess(new ProductAttributeResource($productAttribute), 'Product attribute updated successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->handleException($e);
        }
    }

    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            $this->productAttributeRepository->delete($id);
            DB::commit();
            return $this->toResponseDeleteSuccess('Product attribute deleted successfully');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->handleException($e);
        }
    }
}

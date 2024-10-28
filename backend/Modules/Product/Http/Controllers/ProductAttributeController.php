<?php

namespace Modules\Product\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Product\Http\Requests\StoreProductAttributeRequest;
use Modules\Product\Http\Requests\UpdateProductAttributeRequest;
use Modules\Product\Repositories\ProductAttributeRepositoryInterface;
use Modules\Product\Transformers\ProductAttributeResource;
use Symfony\Component\HttpFoundation\Response;

class ProductAttributeController extends Controller
{
    protected $productAttributeRepository;

    public function __construct(ProductAttributeRepositoryInterface $productAttributeRepository)
    {
        $this->productAttributeRepository = $productAttributeRepository;
    }

    public function index()
    {
        $attributes = $this->productAttributeRepository->getAll();
        return ProductAttributeResource::collection($attributes);
    }

    public function store(StoreProductAttributeRequest $request)
    {
        $attribute = $this->productAttributeRepository->create($request->validated());
        return new ProductAttributeResource($attribute);
    }

    public function show($id)
    {
        $attribute = $this->productAttributeRepository->find($id);
        return new ProductAttributeResource($attribute);
    }

    public function update(UpdateProductAttributeRequest $request, $id)
    {
        $attribute = $this->productAttributeRepository->update($id, $request->validated());
        return new ProductAttributeResource($attribute);
    }

    public function destroy($id)
    {
        $this->productAttributeRepository->delete($id);
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}

<?php

namespace Modules\Source\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Source\Http\Requests\StoreSourceProductRequest;
use Modules\Source\Http\Requests\UpdateSourceProductRequest;
use Modules\Source\Repositories\SourceProductRepositoryInterface;
use Modules\Source\Transformers\SourceProductResource;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Database\QueryException;

class SourceProductController extends Controller
{
    protected $sourceProductRepository;

    public function __construct(SourceProductRepositoryInterface $sourceProductRepository)
    {
        $this->sourceProductRepository = $sourceProductRepository;
    }

    public function index()
    {
        return SourceProductResource::collection($this->sourceProductRepository->getAll());
    }

    public function store(StoreSourceProductRequest $request)
    {
        try {
            $sourceProduct = $this->sourceProductRepository->create($request->validated());
            return response()->json([
                'message' => 'SourceProduct created successfully',
                'data' => new SourceProductResource($sourceProduct)
            ], Response::HTTP_CREATED);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Failed to create SourceProduct: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show($id)
    {
        try {
            $sourceProduct = $this->sourceProductRepository->find($id);
            return new SourceProductResource($sourceProduct);
        } catch (\Exception $e) {
            return response()->json(['error' => 'SourceProduct not found'], Response::HTTP_NOT_FOUND);
        }
    }

    public function update(UpdateSourceProductRequest $request, $id)
    {
        try {
            $sourceProduct = $this->sourceProductRepository->update($id, $request->validated());
            return response()->json([
                'message' => 'SourceProduct updated successfully',
                'data' => new SourceProductResource($sourceProduct)
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update SourceProduct: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy($id)
    {
        try {
            $this->sourceProductRepository->delete($id);
            return response()->json(['message' => 'SourceProduct deleted successfully'], Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete SourceProduct: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

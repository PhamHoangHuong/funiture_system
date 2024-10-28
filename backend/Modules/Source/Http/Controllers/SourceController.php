<?php

namespace Modules\Source\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Source\Http\Requests\StoreSourceRequest;
use Modules\Source\Http\Requests\UpdateSourceRequest;
use Modules\Source\Repositories\SourceRepositoryInterface;
use Modules\Source\Transformers\SourceResource;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Database\QueryException;

class SourceController extends Controller
{
    protected $sourceRepository;

    public function __construct(SourceRepositoryInterface $sourceRepository)
    {
        $this->sourceRepository = $sourceRepository;
    }

    public function index()
    {
        return SourceResource::collection($this->sourceRepository->getAll());
    }

    public function store(StoreSourceRequest $request)
    {
        try {
            $source = $this->sourceRepository->create($request->validated());
            return response()->json([
                'message' => 'Source created successfully',
                'data' => new SourceResource($source)
            ], Response::HTTP_CREATED);
        } catch (QueryException $e) {
            if ($e->errorInfo[1] == 1062) {
                return response()->json(['error' => 'Source name already exists'], Response::HTTP_CONFLICT);
            }
            return response()->json(['error' => 'Failed to create source: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create source: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show($id)
    {
        try {
            $source = $this->sourceRepository->find($id);
            return new SourceResource($source);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Source not found'], Response::HTTP_NOT_FOUND);
        }
    }

    public function update(UpdateSourceRequest $request, $id)
    {
        try {
            $source = $this->sourceRepository->update($id, $request->validated());
            return response()->json([
                'message' => 'Source updated successfully',
                'data' => new SourceResource($source)
            ], Response::HTTP_OK);
        } catch (QueryException $e) {
            if ($e->errorInfo[1] == 1062) {
                return response()->json(['error' => 'Source name already exists'], Response::HTTP_CONFLICT);
            }
            return response()->json(['error' => 'Failed to update source'], Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update source'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy($id)
    {
        try {
            $this->sourceRepository->delete($id);
            return response()->json(['message' => 'Source deleted successfully'], Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete source'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

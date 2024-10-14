<?php
namespace Modules\Category\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Routing\Controller;
use Illuminate\Database\QueryException;
use Modules\Category\Transformers\CategoryResource;
use Symfony\Component\HttpFoundation\Response;
use Modules\Category\Transformers\CategoryReCategory;
use Modules\Category\Http\Requests\CategoryRequest;
use Modules\Category\Http\Requests\UpdateCategoryRequest;
use Modules\Category\Repositories\CategoriesRepositoryInterface;

class CategoryController extends Controller
{
    protected $categoryRepo;
    public function __construct(CategoriesRepositoryInterface $categoryRepo)
    {
        $this->categoryRepo = $categoryRepo;
    }
    public function index()
    {
        $categories = CategoryResource::collection($this->categoryRepo->getCategories()->get());

        if ($categories) {
            return response()->json(
                [
                    'data' => $categories,
                    'message' => 'Categories retrieved successfully',
                ],
                Response::HTTP_OK,
            );
        }

        return response()->json(
            [
                'message' => 'No data',
            ],
            Response::HTTP_NO_CONTENT,
        );
    }

    public function store(CategoryRequest $request)
    {
        try {
            $data = $request->validated();
            $data['slug'] = Str::slug($request->slug);
            $this->categoryRepo->create($data);
            return response()->json(
                [
                    'message' => 'Category created successfully',
                ],
                Response::HTTP_CREATED,
            );
        } catch (QueryException $e) {
            if ($e->errorInfo[1] == 1062) {
                return response()->json(['error' => 'Category name already exists'], Response::HTTP_CONFLICT);
            }
            return response()->json(['error' => 'Failed to create Category: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create Category: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function show($id)
    {
        try {
            $category = $this->categoryRepo->find($id);
            $response = [
                'category' => new CategoryResource($category),
                'categories' => CategoryResource::collection($this->categoryRepo->getCategories()->get()),
            ];
            return response()->json($response);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Category not found'], Response::HTTP_NOT_FOUND);
        }
    }
    public function update(CategoryRequest $request, $id)
    {
        try {
            $category = $this->categoryRepo->update($id, $request->validated());

            return response()->json(
                [
                    'message' => 'Category updated successfully',
                ],
                Response::HTTP_OK,
            );
        } catch (QueryException $e) {
            if ($e->errorInfo[1] == 1062) {
                return response()->json(['error' => 'Category name already exists'], Response::HTTP_CONFLICT);
            }
            return response()->json(['error' => 'Failed to update Category'], Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update Category'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function destroy($id)
    {
        try {
            $this->categoryRepo->delete($id);
            return response()->json(['message' => 'Category deleted successfully'], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete Category'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

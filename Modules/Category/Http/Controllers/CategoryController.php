<?php
namespace Modules\Category\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Modules\Category\Transformers\CategoryResource;
use Modules\Category\Http\Requests\CategoryRequest;
use Modules\Category\Repositories\CategoriesRepositoryInterface;
use Modules\Traits\ResponseTrait;

class CategoryController extends Controller
{
    use ResponseTrait;

    protected $categoryRepo;

    public function __construct(CategoriesRepositoryInterface $categoryRepo)
    {
        $this->categoryRepo = $categoryRepo;
    }

    public function index()
    {
        $categories = $this->categoryRepo->getAll();
        if (!$categories) {
            return $this->toResponseBad('Category not found', 404);
        }
        return $this->toResponseSuccess(CategoryResource::collection($categories));
    }

    public function store(CategoryRequest $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->validated();
            $data['slug'] = Str::slug($request->slug);
            $category = $this->categoryRepo->create($data);
            DB::commit();
            return $this->toResponseSuccess($category, 'Category created successfully');
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function show($id)
    {
        try {
            $category = $this->categoryRepo->find($id);
            if (!$category) {
                return $this->toResponseBad('Category not found', 404);
            }
            return $this->toResponseSuccess(new CategoryResource($category));
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function update(CategoryRequest $request, $id)
    {
        DB::beginTransaction();
        try {
            $data = $request->validated();
            $category = $this->categoryRepo->update($id, $data);
            DB::commit();
            return $this->toResponseSuccess($category, 'Category updated successfully');
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            $this->categoryRepo->delete($id);
            DB::commit();
            return $this->toResponseDeleteSuccess('Category deleted successfully');
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }
}

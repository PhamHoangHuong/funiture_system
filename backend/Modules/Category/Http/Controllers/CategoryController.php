<?php

namespace Modules\Category\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Modules\Category\Http\Requests\CategoryRequest;
use Modules\Category\Repositories\CategoriesRepositoryInterface;
use Modules\Traits\ImageUploadTrait;
use Modules\Traits\ResponseTrait;
use Symfony\Component\HttpFoundation\Response;

class CategoryController extends Controller
{
    use ResponseTrait, ImageUploadTrait;

    protected $categoryRepository;

    public function __construct(CategoriesRepositoryInterface $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function index()
    {
        try {
            $categories = $this->categoryRepository->getAll();
            if ($categories->isEmpty()) {
                return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
            }
            return $this->toResponseSuccess($categories, 'Tìm thấy dữ liệu', Response::HTTP_OK);
        } catch (\Exception $e) {
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show($id)
    {
        try {
            $categories = $this->categoryRepository->find($id);
            if (!$categories) {
                return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
            }
            return $this->toResponseSuccess($categories->load('products'), 'Tìm thấy dữ liệu', Response::HTTP_OK);
        } catch (\Exception $e) {
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(CategoryRequest $request)
    {
        DB::BeginTransaction();
        try {
            $existSlug = $this->categoryRepository->checkExistSlug($request->slug);
            if ($existSlug) {
                return $this->toResponseBad('Danh mục đã tồn tại', Response::HTTP_BAD_REQUEST);
            }

            //Chuẩn bị dữ liệu để tạo danh mục
            $data = $this->prepareCategoryData($request, null, true);
            //Tạo danh mục mới
            $category = $this->categoryRepository->create($data);

            //Kiểm tra xem có thêm sản phẩm khi tạo danh mục không
            if ($request->has('product_ids') && count($request->product_ids) > 0) {
                $this->categoryRepository->updateCategoryProducts($category, $request->input('product_ids', []));
            }

            DB::commit();
            return $this->toResponseSuccess(null, 'Tạo danh mục mới thành công', Response::HTTP_CREATED);
        } catch (\Exception $e) {
            DB::rollBack();
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(CategoryRequest $request, $id)
    {
        DB::BeginTransaction();
        try {
            $category = $this->categoryRepository->find($id);
            if (!$category) {
                return $this->toResponseBad('Không tìm thấy dữ liệu ', Response::HTTP_NOT_FOUND);
            }

            $existsSlug = $this->categoryRepository->checkExistSlug($request->slug, $category->id);
            if ($existsSlug) {
                return $this->toResponseBad('Slug đã tồn tại', Response::HTTP_BAD_REQUEST);
            }

            $data = $this->prepareCategoryData($request, $category->image, false);
            $category = $this->categoryRepository->update($id, $data);

            if ($request->has('product_ids') && count($request->product_ids) > 0) {
                $this->categoryRepository->updateCategoryProducts($category, $request->input('product_ids', []));
            }

            DB::commit();
            return $this->toResponseSuccess(null, 'Cập nhật dữ liệu thành công', Response::HTTP_OK);
        } catch (\Exception $e) {
            DB::rollBack();
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    public function destroy($id)
    {
        DB::BeginTransaction();
        try {
            $Category = $this->categoryRepository->find($id);
            if (!$Category) {
                return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
            }
            $this->categoryRepository->update($id, ['status' => 0]);
            $this->categoryRepository->delete($id);
            DB::commit();
            return $this->toResponseSuccess(null, 'Xóa dữ liệu thành công', Response::HTTP_OK);
        } catch (\Exception $e) {
            DB::rollBack();
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    protected function prepareCategoryData($request, $oldImage = null, $isInsert = false)
    {
        $data = $request->validated();
        if ($isInsert !== false) {
            if ($request->hasFile('image')) {
                $data['image'] = $this->uploadImage($request, 'image', 'categories', 'category');
            }
        } else {
            if ($request->hasFile('image')) {
                $data['image'] = $this->updateImage($request, 'image', 'categories', $oldImage);
            } else {
                $data['image'] = $oldImage;
            }
        }

        // Add additional fields
        $data['name'] = $request->input('name', $data['name'] ?? null);
        $data['slug'] = $request->input('slug', $data['slug'] ?? null);
        $data['parent_id'] = $request->input('parent_id', $data['parent_id'] ?? null);
        $data['description'] = $request->input('description', $data['description'] ?? null);
        $data['status'] = $request->input('status', $data['status'] ?? 1);

        return $data;
    }

    public function switchStatus($id)
    {
        DB::BeginTransaction();
        try {
            $Category = $this->categoryRepository->find($id);
            if (!$Category) {
                return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
            }
            $status = $Category->status == 1 ? 0 : 1;
            $this->categoryRepository->update($id, ['status' => $status]);
            DB::commit();
            return $this->toResponseSuccess(null, 'Cập nhật trạng thái dữ liệu thành công', Response::HTTP_OK);
        } catch (\Exception $e) {
            DB::rollBack();
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

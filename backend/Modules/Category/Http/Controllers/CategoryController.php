<?php

namespace Modules\Category\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
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
        try{
            $categories = $this->categoryRepository->getAll();
            if($categories->isEmpty()) {
                return $this->toResponseBad('Không tìm thấy dữ liệu',Response::HTTP_NOT_FOUND);
            }
            return $this->toResponseSuccess($categories, 'Tìm thấy dữ liệu', Response::HTTP_OK);
        }catch (\Exception $e) {
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show($id)
    {
        try{
            $categories = $this->categoryRepository->find($id);
            if(!$categories) {
                return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
            }
            return $this->toResponseSuccess($categories->load('products'), 'Tìm thấy dữ liệu', Response::HTTP_OK);
        }catch (\Exception $e) {
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(CategoryRequest $request)
    {
        DB::BeginTransaction();
        try{
            $existSlug = $this->categoryRepository->checkExistSlug($request->slug);
            if($existSlug) {
                return $this->toResponseBad('Danh mục đã tồn tại', Response::HTTP_BAD_REQUEST);
            }

            //Chuẩn bị dữ liệu để tạo danh mục
            $category=$this->prepareCategoryData($request, null, true);
            //Tạo danh mục mới
            $this->categoryRepository->create($category);

            //Kiểm tra xem có thêm sản phẩm khi tạo danh mục không
            if($request->has('products') && count($request->products) > 0) {
                $this->categoryRepository->updateCategoryProducts($category, $request->input('product_ids',[]));
            }

            DB::commit();
            return $this->toResponseSuccess(null, 'Tạo danh mục mới thành công', Response::HTTP_CREATED);
        }catch (\Exception $e) {
            DB::rollBack();
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(CategoryRequest $request, $id)
    {
        DB::BeginTransaction();
        try{
            $categories = $this->categoryRepository->find($id);
            if(!$categories) {
                return $this->toResponseBad('Không tìm thấy dữ liệu ', Response::HTTP_NOT_FOUND);
            }
            $existSlug = $this->categoryRepository->checkExistSlug($request->slug);
            if($existSlug && $categories->slug != $request->slug) {
                return $this->toResponseBad('Dữ liệu đã tồn tại', Response::HTTP_BAD_REQUEST);
            }

            $data = $this->prepareCategoryData($request, $categories->image, false);
            $this->categoryRepository->update($id, $data);

            //Kiểm tra xem có thay thế sản phẩm khi cập nhật danh mục không
            if($request->has('products') && count($request->products) > 0) {
                $this->categoryRepository->updateCategoryProducts($categories, $request->input('product_ids',[]));
            }

            DB::commit();
            return $this->toResponseSuccess(null, 'Cập nhật dữ liệu thành công', Response::HTTP_OK);
        }catch (\Exception $e) {
            DB::rollBack();
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    public function destroy($id)
    {
        DB::BeginTransaction();
        try{
            $Category = $this->categoryRepository->find($id);
            if(!$Category) {
                return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
            }
            $this->categoryRepository->update($id, ['status' => 0]);
            $this->categoryRepository->delete($id);
            DB::commit();
            return $this->toResponseSuccess(null, 'Xóa dữ liệu thành công', Response::HTTP_OK);
        }catch (\Exception $e) {
            DB::rollBack();
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    protected function prepareCategoryData($request, $oldImage = null, $isInsert = false)
    {
        $data = $request->validated();
        if($isInsert !== false) {
            if($request->hasFile('image')) {
                $data['image'] = $this->uploadImage($request, 'image', 'categories', 'category');
            }
        }else {
            if($request->hasFile('image')) {
                $data['image'] = $this->updateImage($request, 'image', 'categories', $oldImage);
            }else {
                $data['image'] = $oldImage;
            }
        }

        // Add additional fields
        $data['name'] = $request->input('name', $data['name'] ?? null);
        $data['slug'] = $request->input('slug', $data['slug'] ?? null);
        $data['description'] = $request->input('description', $data['description'] ?? null);
        $data['status'] = $request->input('status', $data['status'] ?? 1);

        return $data;
    }

    public function switchStatus($id)
    {
        DB::BeginTransaction();
        try{
            $Category = $this->categoryRepository->find($id);
            if(!$Category) {
                return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
            }
            $status = $Category->status == 1 ? 0 : 1;
            $this->categoryRepository->update($id, ['status' => $status]);
            DB::commit();
            return $this->toResponseSuccess(null, 'Cập nhật trạng thái dữ liệu thành công', Response::HTTP_OK);
        }catch (\Exception $e) {
            DB::rollBack();
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

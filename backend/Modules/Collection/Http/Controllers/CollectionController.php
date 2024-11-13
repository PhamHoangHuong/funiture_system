<?php

namespace Modules\Collection\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Modules\Collection\Http\Requests\CollectionRequest;
use Modules\Collection\Repositories\CollectionRepositoryInterface;
use Modules\Traits\ImageUploadTrait;
use Modules\Traits\ResponseTrait;
use Symfony\Component\HttpFoundation\Response;

class CollectionController extends Controller
{
    use ResponseTrait, ImageUploadTrait;

    protected $collectionRepository;
    public function __construct(CollectionRepositoryInterface $collectionRepository)
    {
        $this->collectionRepository = $collectionRepository;
    }

    public function index()
    {
        try{
            $collections = $this->collectionRepository->getAll();
            if($collections->isEmpty()) {
                return $this->toResponseBad('Không tìm thấy dữ liệu',Response::HTTP_NOT_FOUND);
            }
            return $this->toResponseSuccess($collections, 'Tìm thấy dữ liệu', Response::HTTP_OK);
        }catch (\Exception $e) {
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(CollectionRequest $request)
    {
        DB::BeginTransaction();
        try{
            $existSlug = $this->collectionRepository->checkExistSlug($request->slug);
            if($existSlug) {
                return $this->toResponseBad('Bộ sưu tập đã tồn tại', Response::HTTP_BAD_REQUEST);
            }

            if($request->hasFile('image')) {
                $image = $this->uploadImage($request, 'image', 'collections', 'collection');
                $request->merge(['image' => $image]);
            }
             $this->collectionRepository->create($request->validated());
            DB::commit();
            return $this->toResponseSuccess(null, 'Tạo bộ sưu tập mới thành công', Response::HTTP_CREATED);
        }catch (\Exception $e) {
            DB::rollBack();
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update(CollectionRequest $request, $id)
    {
        DB::BeginTransaction();
        try{
            $collection = $this->collectionRepository->find($id);
            if(!$collection) {
                return $this->toResponseBad('Không tìm thấy bộ sưu tập', Response::HTTP_NOT_FOUND);
            }

            $existSlug = $this->collectionRepository->checkExistSlug($request->slug);
            if($existSlug && $collection->slug != $request->slug) {
                return $this->toResponseBad('Bộ sưu tập đã tồn tại', Response::HTTP_BAD_REQUEST);
            }

            if($request->hasFile('image')) {
                $image = $this->updateImage($request, 'image', 'collections', $collection->image);
                $request->merge(['image' => $image]);
            }
            $this->collectionRepository->update($request->validated(), $id);
            DB::commit();
            return $this->toResponseSuccess(null, 'Cập nhật bộ sưu tập thành công', Response::HTTP_OK);
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
            $collection = $this->collectionRepository->find($id);
            if(!$collection) {
                return $this->toResponseBad('Không tìm thấy bộ sưu tập', Response::HTTP_NOT_FOUND);
            }
            $this->collectionRepository->update($id, ['status' => 0]);
            $this->collectionRepository->delete($id);
            DB::commit();
            return $this->toResponseSuccess(null, 'Xóa bộ sưu tập thành công', Response::HTTP_OK);
        }catch (\Exception $e) {
            DB::rollBack();
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

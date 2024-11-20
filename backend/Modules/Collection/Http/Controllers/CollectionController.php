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

    public function show($id)
    {
        try{
            $collection = $this->collectionRepository->find($id);
            if(!$collection) {
                return $this->toResponseBad('Không tìm thấy bộ sưu tập', Response::HTTP_NOT_FOUND);
            }
            return $this->toResponseSuccess($collection->load('products'), 'Tìm thấy bộ sưu tập', Response::HTTP_OK);
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

            $collection=$this->prepareCollectionData($request, null, true);
             $this->collectionRepository->create($collection);

             if($request->has('product_ids') && count($request->product_ids) > 0) {
                 $this->collectionRepository->updateCollectionProducts($collection, $request->input('product_ids',[]));
             }

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

            $existsSlug = $this->collectionRepository->checkExistSlug($request->slug, $collection->id);
            if ($existsSlug) {
                return $this->toResponseBad('Slug đã tồn tại', Response::HTTP_BAD_REQUEST);
            }

            $data = $this->prepareCollectionData($request, $collection->image, false);
            $collection = $this->collectionRepository->update($id, $data);

            if ($request->has('product_ids') && count($request->product_ids) > 0) {
                $this->collectionRepository->updateCollectionProducts($collection, $request->input('product_ids', []));
            }

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


    protected function prepareCollectionData($request, $oldImage = null, $isInsert = false)
    {
        $data = $request->validated();
        if($isInsert !== false) {
            if($request->hasFile('image')) {
                $data['image'] = $this->uploadImage($request, 'image', 'collections', 'collection');
            }
        }else {
            if($request->hasFile('image')) {
                $data['image'] = $this->updateImage($request, 'image', 'collections', $oldImage);
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
            $collection = $this->collectionRepository->find($id);
            if(!$collection) {
                return $this->toResponseBad('Không tìm thấy bộ sưu tập', Response::HTTP_NOT_FOUND);
            }
            $status = $collection->status == 1 ? 0 : 1;
            $this->collectionRepository->update($id, ['status' => $status]);
            DB::commit();
            return $this->toResponseSuccess(null, 'Cập nhật trạng thái bộ sưu tập thành công', Response::HTTP_OK);
        }catch (\Exception $e) {
            DB::rollBack();
            $message = $e->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

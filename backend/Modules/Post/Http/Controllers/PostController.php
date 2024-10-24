<?php

namespace Modules\Post\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Modules\Post\Http\Requests\StorePostRequest;
use Modules\Post\Http\Requests\UpdatePostRequest;
use Modules\Post\Repositories\PostRepositoryInterface;
use Modules\Traits\ResponseTrait;
use Symfony\Component\HttpFoundation\Response;

class PostController extends Controller
{
    use ResponseTrait;
    protected $postRepository;
    public function __construct(PostRepositoryInterface $postRepository)
    {
        $this->postRepository = $postRepository;
    }
    public function index()
    {
        $posts = $this->postRepository->getall();
        if ($posts->isEmpty()) {
            return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
        }
        return $this->toResponseSuccess($posts, 'Tìm thấy dữ liệu', Response::HTTP_OK);
    }



    public function store(StorePostRequest $request)
    {
        DB::beginTransaction();
        try{
            $this->postRepository->create($request->validated());
            DB::commit();
            return $this->toResponseSuccess(null,'Tạo bài viết mới thành công', Response::HTTP_CREATED);
        }catch (\Exception $e) {
            return $this->handleException($e);
        }
    }



    public function update(UpdatePostRequest $request, $id)
    {
        DB::beginTransaction();
        try{
            $post = $this->postRepository->find($id);
            if (!$post) {
                return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
            }
            $this->postRepository->update($id, $request->validated());
            DB::commit();
            return $this->toResponseSuccess(null,'Cập nhật bài viết thành công', Response::HTTP_OK);
        }catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function destroy($id)
    {
        DB::beginTransaction();
        try{
            $post = $this->postRepository->find($id);
            if (!$post) {
                return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
            }
            $this->postRepository->delete($id);
            DB::commit();
            return $this->toResponseSuccess(null,'Xóa bài viết thành công', Response::HTTP_OK);
        }catch (\Exception $e) {
            return $this->handleException($e);
        }
    }
}

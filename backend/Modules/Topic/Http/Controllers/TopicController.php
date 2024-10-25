<?php

namespace Modules\Topic\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Modules\Topic\Http\Requests\StoreTopicRequest;
use Modules\Topic\Http\Requests\UpdateTopicRequest;
use Modules\Topic\Repositories\TopicRepositoryInterface;
use Modules\Traits\ResponseTrait;
use Symfony\Component\HttpFoundation\Response;

class TopicController extends Controller
{
    use ResponseTrait;
    protected $topicRepository;
    public function __construct(TopicRepositoryInterface $topicRepository)
    {
        $this->topicRepository = $topicRepository;
    }
    public function index()
    {
        $topics = $this->topicRepository->getAll();

        if ($topics->isEmpty()) {
            return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
        }
        return $this->toResponseSuccess($topics, 'Tìm thấy dữ liệu', Response::HTTP_OK);
    }

    public function store(StoreTopicRequest $request)
    {
        DB::beginTransaction();
        try{
            $this->topicRepository->create($request->validated());
            DB::commit();
            return $this->toResponseSuccess(null,'Tạo chủ đề mới thành công', Response::HTTP_CREATED);
        }catch (\Exception $e) {
            return $this->handleException($e);
        }
    }
    public function update(UpdateTopicRequest $request, $id)
    {
        DB::beginTransaction();
        try{
            $topic = $this->topicRepository->find($id);
            if (!$topic) {
                return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
            }
            $this->topicRepository->update($id, $request->validated());
            DB::commit();
            return $this->toResponseSuccess(null,'Cập nhật chủ đề thành công', Response::HTTP_OK);
        }catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function destroy($id)
    {
        DB::beginTransaction();
        try{
            $topic = $this->topicRepository->find($id);
            if (!$topic) {
                return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
            }
            $this->topicRepository->delete($id);
            DB::commit();
            return $this->toResponseDeleteSuccess('Xóa chủ đề thành công', Response::HTTP_OK);
        }catch (\Exception $e) {
            return $this->handleException($e);
        }
    }
}

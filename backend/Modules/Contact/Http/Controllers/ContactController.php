<?php

namespace Modules\Contact\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Modules\Contact\Http\Requests\StoreContactRequest;
use Modules\Contact\Http\Requests\UpdateContactRequest;
use Modules\Contact\Repositories\ContactRepositoryInterface;
use Modules\Traits\ResponseTrait;
use Symfony\Component\HttpFoundation\Response;

class ContactController extends Controller
{
    use ResponseTrait;
    protected $contactRepository;

    public function __construct(ContactRepositoryInterface $contactRepository)
    {
        $this->contactRepository = $contactRepository;
    }

    public function index()
    {
        try{
            $listContact = $this->contactRepository->getAll();
            if ($listContact->isEmpty()) {
                return $this->toResponseBad('Không có dữ liệu', Response::HTTP_NO_CONTENT);
            }
            return $this->toResponseSuccess($listContact, 'Danh sách liên hệ', Response::HTTP_OK);
        }catch (\Exception $e){
            return $this->handleException($e);
        }
    }


    public function store(StoreContactRequest $request)
    {
        DB::beginTransaction();
        try{
            $this->contactRepository->create($request->validated());
            DB::commit();
            return $this->toResponseSuccess(null, 'Thêm mới liên hệ thành công', Response::HTTP_CREATED);
        }catch (\Exception $e){
            DB::rollBack();
            $message = $this->handleException($e);
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    //TODO: Thay đổi controller thành hàm trả lời liên hệ

    public function update(UpdateContactRequest $request, $id)
    {
        DB::beginTransaction();
        try{
            $this->contactRepository->update($id, $request->validated());
            DB::commit();
            return $this->toResponseSuccess(null, 'Cập nhật liên hệ thành công', Response::HTTP_OK);
        }catch (\Exception $e){
            DB::rollBack();
            $message = $this->handleException($e);
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy($id)
    {
        DB::beginTransaction();
        try{
            $this->contactRepository->delete($id);
            DB::commit();
            return $this->toResponseSuccess(null, 'Xóa liên hệ thành công', Response::HTTP_OK);
        }catch (\Exception $e){
            DB::rollBack();
            $message = $this->handleException($e);
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

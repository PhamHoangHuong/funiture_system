<?php

namespace Modules\Menu\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Modules\Menu\Http\Requests\MenuRequest;
use Modules\Menu\Repositories\MenuRepositoryInterface;
use Modules\Traits\ResponseTrait;
use Symfony\Component\HttpFoundation\Response;

class MenuController extends Controller
{
    use ResponseTrait;
    protected $menuRepository;
    public function __construct(MenuRepositoryInterface $menuRepository)
    {
        $this->menuRepository = $menuRepository;
    }


    public function index()
    {
        try {
            $menus = $this->menuRepository->getAll();
            if($menus->isEmpty()){
             return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
            }
            return $this->toResponseSuccess(null,'Tìm thấy dữ liệu',  Response::HTTP_OK);
        }catch (\Exception $exception){
            $message= $exception->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(MenuRequest $request)
    {
        DB::beginTransaction();
        try{
            $menu = $this->menuRepository->create($request->validated());
            DB::commit();
            return $this->toResponseSuccess($menu,'Thêm mới thành công', Response::HTTP_CREATED);
        }catch (\Exception $exception){
            DB::rollBack();
            $message= $exception->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    public function update(MenuRequest $request, $id)
    {
        DB::beginTransaction();
        try{
            $menu = $this->menuRepository->find($id);
            if(!$menu){
                return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
            }
            $this->menuRepository->update($id, $request->validated());

            DB::commit();
            return $this->toResponseSuccess(null,'Cập nhật thành công', Response::HTTP_OK);
        }catch (\Exception $exception){
            DB::rollBack();
            $message= $exception->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    public function destroy($id)
    {
        DB::beginTransaction();
        try{
            $menu = $this->menuRepository->find($id);
            if(!$menu){
                return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
            }
            $this->menuRepository->update($id, ['status'=>0]);
            $this->menuRepository->delete($id);
            DB::commit();
            return $this->toResponseSuccess(null,'Xóa thành công', Response::HTTP_OK);
        }catch (\Exception $exception){
            DB::rollBack();
            $message= $exception->getMessage();
            return $this->toResponseBad($message, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

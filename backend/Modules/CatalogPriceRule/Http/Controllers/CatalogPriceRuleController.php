<?php

namespace Modules\CatalogPriceRule\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Modules\CatalogPriceRule\Http\Requests\StoreCatalogPriceRuleRequest;
use Modules\CatalogPriceRule\Http\Requests\UpdateCatalogPriceRuleRequest;
use Modules\CatalogPriceRule\Repositories\CatalogPriceRuleRepositoryInterface;
use Modules\Traits\ResponseTrait;
use Symfony\Component\HttpFoundation\Response;

class CatalogPriceRuleController extends Controller
{
    use ResponseTrait;
    protected  $catalogPriceRuleRepository;

    public function __construct(CatalogPriceRuleRepositoryInterface $catalogPriceRuleRepository)
    {
        $this->catalogPriceRuleRepository = $catalogPriceRuleRepository;
    }
    public function index()
    {
            $catalogPriceRules = $this->catalogPriceRuleRepository->getAll();
            if($catalogPriceRules->isEmpty()){
                return $this->toResponseBad('Không có dữ liệu', Response::HTTP_NO_CONTENT);
            }
            return $this->toResponseSuccess($catalogPriceRules, 'Danh sách chương trình khuyến mãi', Response::HTTP_OK);
    }


    public function store(StoreCatalogPriceRuleRequest $request)
    {
        DB::beginTransaction();
        try {
            // Lưu thông tin chương trình khuyến mãi
           $this->catalogPriceRuleRepository->create($request->validated());

            DB::commit();
            return $this->toResponseSuccess(null,
                'Chương trình khuyến mãi đã được tạo thành công',
                Response::HTTP_CREATED
            );
        } catch (\Throwable $e) {
            DB::rollBack(); // Rollback the transaction on error
            return $this->handleException($e);
        }
    }


    public function show($id)
    {
        $catalogPriceRule = $this->catalogPriceRuleRepository->find($id);
        if(!$catalogPriceRule){
            return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
        }
        return $this->toResponseSuccess($catalogPriceRule, 'Chi tiết chương trình khuyến mãi', Response::HTTP_OK);
    }


    public function update(UpdateCatalogPriceRuleRequest $request, $id)
    {
        DB::beginTransaction();
        try {
            $catalogPriceRule = $this->catalogPriceRuleRepository->find($id);
            if(!$catalogPriceRule){
                return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
            }
            // Cập nhật thông tin chương trình khuyến mãi
            $this->catalogPriceRuleRepository->update($id, $request->validated());

            DB::commit();
            return $this->toResponseSuccess(null,
                'Chương trình khuyến mãi đã được cập nhật thành công',
                Response::HTTP_OK
            );
        } catch (\Throwable $e) {
            DB::rollBack(); // Rollback the transaction on error
            return $this->handleException($e);
        }
    }


    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            $catalogPriceRule = $this->catalogPriceRuleRepository->find($id);
            if(!$catalogPriceRule){
                return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
            }
            // Xóa chương trình khuyến mãi
            $this->catalogPriceRuleRepository->delete($id);

            DB::commit();
            return $this->toResponseSuccess(null,
                'Chương trình khuyến mãi đã được xóa thành công',
                Response::HTTP_OK
            );
        } catch (\Throwable $e) {
            DB::rollBack(); // Rollback the transaction on error
            return $this->handleException($e);
        }
    }
}

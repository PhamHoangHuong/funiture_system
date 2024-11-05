<?php

namespace Modules\CartPriceRule\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Modules\CartPriceRule\Http\Requests\StoreCartPriceRuleRequest;
use Modules\CartPriceRule\Http\Requests\UpdateCartPriceRuleRequest;
use Modules\CartPriceRule\Repositories\CartPriceRulesRepositoryInterface;
use Modules\CartPriceRule\Transformers\CartPriceRulesResource;
use Modules\Traits\ResponseTrait;
use Symfony\Component\HttpFoundation\Response;


class CartPriceRuleController extends Controller
{
    use ResponseTrait;

    protected $cartPriceRuleRepository;

    public function __construct(CartPriceRulesRepositoryInterface $cartPriceRuleRepository)
    {
        $this->cartPriceRuleRepository = $cartPriceRuleRepository;
    }


    public function index()
    {
        $salesRules = $this->cartPriceRuleRepository->getAll();

        if ($salesRules->isEmpty()) {
            return $this->toResponseBad('Không có dữ liệu', Response::HTTP_NO_CONTENT);
        }

        return $this->toResponseSuccess(CartPriceRulesResource::collection($salesRules), 'Danh sách chương trình khuyến mãi', Response::HTTP_OK);
    }

    public function show($id)
    {
       try{
           $salesRules = $this->cartPriceRuleRepository->find($id);

            if (!$salesRules) {
                return $this->toResponseBad('Không tìm thấy dữ liệu!', Response::HTTP_NOT_FOUND);
            }

            return $this->toResponseSuccess(new CartPriceRulesResource($salesRules), 'Chi tiết chương trình khuyến mãi', Response::HTTP_OK);
        } catch (\Throwable $e) {
            return $this->handleException($e);
       }
    }



    public function store(StoreCartPriceRuleRequest $request)
    {
        DB::beginTransaction();
        try {
            // Kiểm tra xem coupon đã tồn tại chưa
            if ($this->cartPriceRuleRepository->existsByCoupon($request->coupon)) {
                return $this->toResponseBad('Mã giảm giá đã tồn tại!', Response::HTTP_BAD_REQUEST);
            }
            // Lưu thông tin chương trình khuyến mãi
            $salesRules = $this->cartPriceRuleRepository->create($request->validated());

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


    public function update(UpdateCartPriceRuleRequest $request, $id)
    {
        DB::beginTransaction();
        try {
            // Tìm quy tắc giá giỏ hàng cần cập nhật
            $cartPriceRule = $this->cartPriceRuleRepository->find($id);

            //Kiểm tra xem quy tắc giá giỏ hàng có tồn tại không
            if (!$cartPriceRule) {
                return $this->toResponseBad('Không tìm thấy dữ liệu!', Response::HTTP_NOT_FOUND);
            }

            // Kiểm tra xem mã giảm giá đã tồn tại chưa
            if ($this->cartPriceRuleRepository->existsByCoupon($request->coupon, $id)) {
                return $this->toResponseBad('Mã giảm giá đã tồn tại!', Response::HTTP_BAD_REQUEST);
            }

            // Cập nhật thông tin của quy tắc
            $cartPriceRule->update($request->validated());

            DB::commit();
            return $this->toResponseSuccess(null, 'Cart Price Rule updated successfully', Response::HTTP_OK);
        } catch (\Throwable $e) {
            DB::rollBack();
            return $this->handleException($e);
        }
    }


    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            // Tìm chương trình khuyến mãi theo ID
            $cartPriceRule = $this->cartPriceRuleRepository->find($id);

            if (!$cartPriceRule) {
                return $this->toResponseBad('Không tìm thấy dữ liệu!', Response::HTTP_NOT_FOUND);
            }
            $this->cartPriceRuleRepository->update($id, ['is_active' => 0]);
            $cartPriceRule->delete();

            DB::commit();
            return $this->toResponseSuccess(null, 'Chương trình khuyến mãi đã được xóa thành công', Response::HTTP_OK);
        } catch (\Throwable $e) {
            DB::rollBack(); // Rollback giao dịch khi có lỗi
            return $this->handleException($e);
        }
    }

}

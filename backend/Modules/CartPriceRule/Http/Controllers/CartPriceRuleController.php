<?php

namespace Modules\CartPriceRule\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Modules\CartPriceRule\Http\Requests\StoreCartPriceRuleRequest;
use Modules\CartPriceRule\Http\Requests\UpdateCartPriceRuleRequest;
use Modules\CartPriceRule\Repositories\CartPriceRuleConditionRepositoryInterface;
use Modules\CartPriceRule\Repositories\CartPriceRuleRepositoryInterface;
use Modules\CartPriceRule\Transformers\CartPriceRuleResource;
use Modules\Traits\ResponseTrait;
use Symfony\Component\HttpFoundation\Response;


class CartPriceRuleController extends Controller
{
    use ResponseTrait;

    protected $cartPriceRuleRepository;
    protected $cartPriceRuleConditionRepository;

    public function __construct(CartPriceRuleRepositoryInterface          $cartPriceRuleRepository,
                                CartPriceRuleConditionRepositoryInterface $cartPriceRuleConditionRepository)
    {
        $this->cartPriceRuleRepository = $cartPriceRuleRepository;
        $this->cartPriceRuleConditionRepository = $cartPriceRuleConditionRepository;
    }


    public function index()
    {
       return CartPriceRuleResource::collection($this->cartPriceRuleRepository->getAll());
    }

    public function show($id)
    {
        return $this->cartPriceRuleRepository->find($id)->load('condition');

    }


    public function store(StoreCartPriceRuleRequest $request)
    {
        DB::beginTransaction();
        try {
            // Lưu thông tin chương trình khuyến mãi
            $cartPriceRule = $this->cartPriceRuleRepository->create($request->validated());

            // Lưu điều kiện liên quan đến chương trình khuyến mãi (chỉ có một điều kiện)
            if ($request->has('condition')) {
                $cartPriceRule->condition()->create($request->input('condition'));
            }
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

            if (!$cartPriceRule) {
                return $this->toResponseBad('Không tìm thấy dữ liệu!', Response::HTTP_NOT_FOUND);
            }

            // Cập nhật thông tin của quy tắc
            $cartPriceRule->update($request->validated());

            // Xử lý cập nhật conditions
            if ($request->has('condition')) {
                $conditionData = $request->input('condition');
                $cartPriceRule->condition()->update($conditionData);
            }

            // Load lại relation conditions

            DB::commit();

            return $this->toResponseSuccess(null,'Cart Price Rule updated successfully', Response::HTTP_OK);
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

            // Xóa chương trình khuyến mãi và điều kiện liên quan
            $cartPriceRule->condition()->delete();
            $cartPriceRule->delete();

            DB::commit();
            return $this->toResponseSuccess( null, 'Chương trình khuyến mãi đã được xóa thành công', Response::HTTP_OK);
        } catch (\Throwable $e) {
            DB::rollBack(); // Rollback giao dịch khi có lỗi
            return $this->handleException($e);
        }
    }

}

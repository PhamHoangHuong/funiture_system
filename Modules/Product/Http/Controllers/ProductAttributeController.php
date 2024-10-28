<?php

namespace Modules\Product\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Product\Http\Requests\StoreProductAttributeRequest;
use Modules\Product\Http\Requests\UpdateProductAttributeRequest;
use Modules\Product\Repositories\ProductAttributeRepositoryInterface;
use Modules\Product\Transformers\ProductAttributeResource;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Modules\Traits\ResponseTrait;

class ProductAttributeController extends Controller
{
    use ResponseTrait;

    protected $productAttributeRepository;

    public function __construct(ProductAttributeRepositoryInterface $productAttributeRepository)
    {
        $this->productAttributeRepository = $productAttributeRepository;
    }

    // Lấy danh sách tất cả thuộc tính sản phẩm
    public function index()
    {
        $productAttributes = $this->productAttributeRepository->getAll();
        return ProductAttributeResource::collection($productAttributes);
    }

    // Tạo mới một thuộc tính sản phẩm
    public function store(StoreProductAttributeRequest $request)
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();
            $productAttribute = $this->productAttributeRepository->create($validated);
            DB::commit();
            return $this->toResponseSuccess($productAttribute);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    // Hiển thị thông tin chi tiết của một thuộc tính sản phẩm
    public function show($id)
    {
        try {
            $productAttribute = $this->productAttributeRepository->find($id);
            if (!$productAttribute) {
                return $this->toResponseBad('Không có id productAttribute ' . $id, Response::HTTP_NOT_FOUND);
            }
            return $this->toResponseSuccess(new ProductAttributeResource($productAttribute));
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    // Cập nhật thông tin thuộc tính sản phẩm
    public function update(UpdateProductAttributeRequest $request, $id)
    {
        DB::beginTransaction();
        try {
            $validated = $request->validated();
            $productAttribute = $this->productAttributeRepository->update($id, $validated);
            DB::commit();
            return $this->toResponseSuccess($productAttribute, 'Cập nhật thành công');
        } catch (QueryException $e) {
            return $this->handleException($e);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    // Xóa thuộc tính sản phẩm
    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            $this->productAttributeRepository->delete($id);
            DB::commit();
            return $this->toResponseDeleteSuccess('Xóa thành công');
        } catch (\Exception $e) {
            return $this->handleException($e); // Gọi hàm xử lý lỗi từ trait
        }
    }
}

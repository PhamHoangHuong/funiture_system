<?php

namespace Modules\AdvancedPrice\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\AdvancedPrice\Http\Requests\StoreAdvancedPriceRequest;
use Modules\AdvancedPrice\Http\Requests\UpdateAdvancedPriceRequest;
use Modules\AdvancedPrice\Repositories\AdvancedPriceRepositoryInterface;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Database\QueryException;
use Modules\AdvancedPrice\Transformers\AdvancedPriceResource;
use Modules\Traits\ResponseTrait;
use Modules\Product\Entities\Product;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AdvancedPriceController extends Controller
{
    use ResponseTrait;

    protected $advancedPriceRepository;

    public function __construct(AdvancedPriceRepositoryInterface $advancedPriceRepository)
    {
        $this->advancedPriceRepository = $advancedPriceRepository;
    }

    public function index()
    {
        try {
            $advancedPrices = $this->advancedPriceRepository->getAll();
            return $this->toResponseSuccess(
                AdvancedPriceResource::collection($advancedPrices),
                'Advanced prices retrieved successfully'
            );
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function store(StoreAdvancedPriceRequest $request)
    {
        try {
            $product = Product::findOrFail($request->product_id);
            $advancedPrice = $this->advancedPriceRepository->create($request->validated());
            return response()->json([
                'message' => 'Giá nâng cao đã được tạo thành công',
                'data' => $advancedPrice
            ], Response::HTTP_CREATED);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Sản phẩm không tồn tại'], Response::HTTP_NOT_FOUND);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Lỗi cơ sở dữ liệu: ' . $e->getMessage()], Response::HTTP_CONFLICT);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Không thể tạo giá nâng cao: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show($id)
    {
        try {
            $advancedPrice = $this->advancedPriceRepository->find($id);
            return response()->json($advancedPrice);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Không tìm thấy giá nâng cao: ' . $e->getMessage()], Response::HTTP_NOT_FOUND);
        }
    }

    public function edit($id)
    {
        try {
            $advancedPrice = $this->advancedPriceRepository->find($id);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Không tìm thấy giá nâng cao: ' . $e->getMessage()], Response::HTTP_NOT_FOUND);
        }
    }

    public function update(UpdateAdvancedPriceRequest $request, $id)
    {
        try {
            $advancedPrice = $this->advancedPriceRepository->update($id, $request->validated());
            return response()->json([
                'message' => 'Giá nâng cao đã được cập nhật thành công',
                'data' => $advancedPrice
            ], Response::HTTP_OK);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Lỗi cơ sở dữ liệu: ' . $e->getMessage()], Response::HTTP_CONFLICT);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Không thể cập nhật giá nâng cao: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy($id)
    {
        try {
            $this->advancedPriceRepository->delete($id);
            return response()->json(['message' => 'Giá nâng cao đã được xóa thành công'], Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Không thể xóa giá nâng cao: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

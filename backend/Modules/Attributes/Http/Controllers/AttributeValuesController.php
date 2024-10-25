<?php

namespace Modules\Attributes\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Attributes\Repositories\AttributeValueRepositoryInterface;
use Modules\Attributes\Transformers\AttributeValueResource;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Database\QueryException;

class AttributeValuesController extends Controller
{
    protected $attributeValueRepository;

    public function __construct(AttributeValueRepositoryInterface $attributeValueRepository)
    {
        $this->attributeValueRepository = $attributeValueRepository;
    }

    // Lấy danh sách tất cả giá trị thuộc tính
    public function index()
    {
        return AttributeValueResource::collection($this->attributeValueRepository->getAll());
    }

    // Tạo mới một giá trị thuộc tính
    public function store(Request $request)
    {
        try {
            $attributeValue = $this->attributeValueRepository->create($request->all());
            return response()->json([
                'message' => 'Giá trị thuộc tính đã được tạo thành công',
                'data' => new AttributeValueResource($attributeValue)
            ], Response::HTTP_CREATED);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Giá trị thuộc tính đã tồn tại'], Response::HTTP_CONFLICT);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Không thể tạo giá trị thuộc tính'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Hiển thị thông tin chi tiết của một giá trị thuộc tính
    public function show($id)
    {
        try {
            $attributeValue = $this->attributeValueRepository->find($id);
            return new AttributeValueResource($attributeValue);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Không tìm thấy giá trị thuộc tính'], Response::HTTP_NOT_FOUND);
        }
    }

    // Cập nhật thông tin giá trị thuộc tính
    public function update(Request $request, $id)
    {
        try {
            $attributeValue = $this->attributeValueRepository->update($id, $request->all());
            return response()->json([
                'message' => 'Giá trị thuộc tính đã được cập nhật thành công',
                'data' => new AttributeValueResource($attributeValue)
            ], Response::HTTP_OK);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Giá trị thuộc tính đã tồn tại'], Response::HTTP_CONFLICT);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Không thể cập nhật giá trị thuộc tính'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Xóa giá trị thuộc tính
    public function destroy($id)
    {
        try {
            $this->attributeValueRepository->delete($id);
            return response()->json(['message' => 'Giá trị thuộc tính đã được xóa thành công'], Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Không thể xóa giá trị thuộc tính'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
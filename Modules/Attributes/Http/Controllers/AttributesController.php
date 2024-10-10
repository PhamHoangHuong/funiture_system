<?php

namespace Modules\Attributes\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Attributes\Http\Requests\StoreAttributeRequest;
use Modules\Attributes\Http\Requests\UpdateAttributeRequest;
use Modules\Attributes\Repositories\AttributeRepositoryInterface;
use Modules\Attributes\Transformers\AttributeResource;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Database\QueryException;

class AttributesController extends Controller
{
    protected $attributeRepository;

    public function __construct(AttributeRepositoryInterface $attributeRepository)
    {
        $this->attributeRepository = $attributeRepository;
    }

    // Lấy danh sách tất cả thuộc tính
    public function index()
    {
        return AttributeResource::collection($this->attributeRepository->getAll());
    }

    // Tạo mới một thuộc tính
    public function store(StoreAttributeRequest $request)
    {
        try {
            $attributeData = $request->validated();
            $attribute = $this->attributeRepository->create($attributeData);

            return response()->json([
                'message' => 'Thuộc tính đã được tạo thành công',
                'data' => new AttributeResource($attribute)
            ], Response::HTTP_CREATED);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Lỗi cơ sở dữ liệu: ' . $e->getMessage()], Response::HTTP_CONFLICT);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Không thể tạo thuộc tính: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Hiển thị thông tin chi tiết của một thuộc tính
    public function show($id)
    {
        try {
            $attribute = $this->attributeRepository->find($id);
            return new AttributeResource($attribute);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Không tìm thấy thuộc tính: ' . $e->getMessage()], Response::HTTP_NOT_FOUND);
        }
    }

    // Cập nhật thông tin thuộc tính
    public function update(UpdateAttributeRequest $request, $id)
    {
        try {
            $attributeData = $request->validated();
            $attribute = $this->attributeRepository->update($id, $attributeData);

            return response()->json([
                'message' => 'Thuộc tính đã được cập nhật thành công',
                'data' => new AttributeResource($attribute)
            ], Response::HTTP_OK);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Lỗi cơ sở dữ liệu: ' . $e->getMessage()], Response::HTTP_CONFLICT);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Không thể cập nhật thuộc tính: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    // Xóa thuộc tính
    public function destroy($id)
    {
        try {
            $this->attributeRepository->delete($id);
            return response()->json(['message' => 'Thuộc tính đã được xóa thành công'], Response::HTTP_NO_CONTENT);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Không thể xóa thuộc tính: ' . $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
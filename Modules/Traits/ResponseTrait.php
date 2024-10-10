<?php

namespace Modules\Traits;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

trait ResponseTrait
{

    // thông báo khi thực hiện thành công và trả về dữ liệu || HTTP_OK là mã 200 -> thành công
    public function toResponseSuccess($data, $message = 'Thành công', $status = Response::HTTP_OK)
    {
        $response = [
            'message' => $message
        ];

        if (!is_null($data)) {
            $response['data'] = $data;
        }

        return response()->json($response, $status);
    }

    // thông báo khi xóa thành công và không trả về dữ liệu || HTTP_OK là mã 200 -> thành công
    public function toResponseDeleteSuccess($message = 'Xóa thành công', $status = Response::HTTP_OK)
    {
        return response()->json([
            'message' => $message
        ], $status);
    }

    //thông báo khi thực hiện thất bại và trả về lỗi cụ thể || HTTP_BAD_REQUEST là lỗi 400 -> lỗi do client gửi lên
    public function toResponseBad($message, $status = Response::HTTP_BAD_REQUEST)
    {
        return response()->json([
            'error' => $message
        ], $status);
    }

    // thông báo khi có lỗi xảy ra và ghi log lỗi cho dễ theo dõi || rollback lại các thay đổi trong database
    public function handleException(\Exception $e)
    {
        DB::rollBack();
        Log::error('Lỗi: ' . $e->getMessage(), ['exception' => $e]);
        return $this->toResponseBad($e->getMessage());
    }
}

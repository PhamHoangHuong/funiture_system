<?php

namespace Modules\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

trait ImageUploadTrait
{
    /**
     * Upload một ảnh đơn lẻ.
     *
     * @param Request $request Đối tượng HTTP request.
     * @param string $inputName Tên của trường input chứa ảnh.
     * @param string $path Đường dẫn thư mục nơi ảnh sẽ được lưu trữ.
     * @return string|null Đường dẫn đến ảnh đã upload hoặc null nếu không có ảnh nào được upload.
     */
    public function uploadImage(Request $request, $inputName, $path)
    {
        if ($request->hasFile($inputName)) {
            $image = $request->file($inputName);
            $ext = $image->getClientOriginalExtension();
            $imageName = 'media_' . uniqid() . '.' . $ext;
            $fullPath = public_path('../../frontend/public/' . $path);
            if (!File::isDirectory($fullPath)) {
                File::makeDirectory($fullPath, 0777, true, true);
            }
            $image->move($fullPath, $imageName);
            return $path . '/' . $imageName;
        }
        return null;
    }

    /**
     * Upload nhiều ảnh.
     *
     * @param Request $request Đối tượng HTTP request.
     * @param string $inputName Tên của trường input chứa các ảnh.
     * @param string $path Đường dẫn thư mục nơi các ảnh sẽ được lưu trữ.
     * @return array Mảng chứa đường dẫn đến các ảnh đã upload.
     */
    public function uploadMultiImage(Request $request, $inputName, $path)
    {
        $imagePaths = [];
        if ($request->hasFile($inputName)) {
            $images = $request->file($inputName);
            foreach ($images as $image) {
                $ext = $image->getClientOriginalExtension();
                $imageName = 'media_' . uniqid() . '.' . $ext;
                $fullPath = public_path('../../frontend/public/' . $path);
                if (!File::isDirectory($fullPath)) {
                    File::makeDirectory($fullPath, 0777, true, true);
                }
                $image->move($fullPath, $imageName);
                $imagePaths[] = $path . '/' . $imageName;
            }
        }
        return $imagePaths;
    }

    /**
     * Cập nhật ảnh, xóa ảnh cũ nếu có.
     *
     * @param Request $request Đối tượng HTTP request.
     * @param string $inputName Tên của trường input chứa ảnh mới.
     * @param string $path Đường dẫn thư mục nơi ảnh mới sẽ được lưu trữ.
     * @param string|null $oldPath Đường dẫn đến ảnh cũ sẽ bị xóa.
     * @return string|null Đường dẫn đến ảnh mới đã upload hoặc đường dẫn ảnh cũ nếu không có ảnh mới được upload.
     */
    public function updateImage(Request $request, $inputName, $path, $oldPath = null)
    {
        if ($request->hasFile($inputName)) {
            if ($oldPath) {
                $this->deleteImage($oldPath);
            }
            $image = $request->file($inputName);
            $ext = $image->getClientOriginalExtension();
            $imageName = 'media_' . uniqid() . '.' . $ext;
            $fullPath = public_path('../../frontend/public/' . $path);
            if (!File::isDirectory($fullPath)) {
                File::makeDirectory($fullPath, 0777, true, true);
            }
            $image->move($fullPath, $imageName);
            return $path . '/' . $imageName;
        }
        return $oldPath;
    }

    /**
     * Xóa ảnh khỏi hệ thống file.
     *
     * @param string $path Đường dẫn đến ảnh sẽ bị xóa.
     * @return void
     */
    public function deleteImage(string $path)
    {
        $fullPath = public_path('../../frontend/public/' . $path);
        if (File::exists($fullPath)) {
            File::delete($fullPath);
        }
    }
}

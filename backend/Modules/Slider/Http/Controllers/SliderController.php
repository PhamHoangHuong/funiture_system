<?php

namespace Modules\Slider\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Modules\Slider\Http\Requests\StoreSliderRequest;
use Modules\Slider\Http\Requests\UpdateSliderRequest;
use Modules\Slider\Repositories\SliderRepositoryInterface;
use Modules\Slider\Repositories\SliderImageRepositoryInterface;
use Modules\Traits\ImageUploadTrait;
use Modules\Traits\ResponseTrait;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class SliderController extends Controller
{
    use ResponseTrait, ImageUploadTrait;

    protected $sliderRepository;
    protected $sliderImageRepository;

    public function __construct(SliderRepositoryInterface $sliderRepository, SliderImageRepositoryInterface $sliderImageRepository)
    {
        $this->sliderRepository = $sliderRepository;
        $this->sliderImageRepository = $sliderImageRepository;
    }

    public function index()
    {
        try {
            $sliders = $this->sliderRepository->getAll()->load('images');
            if ($sliders->isEmpty()) {
                return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NO_CONTENT);
            }
            return $this->toResponseSuccess($sliders, 'Tìm thấy dữ liệu');
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function show($id)
    {
        try {
            $slider = $this->sliderRepository->find($id);
            if (!$slider) {
                return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
            }
            return $this->toResponseSuccess($slider->load('images'), 'Tìm thấy dữ liệu');
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function store(StoreSliderRequest $request)
    {
        DB::beginTransaction();
        try {
            $sliderData = $request->only(['title', 'type', 'position', 'status']);
            $slider = $this->sliderRepository->create($sliderData);

            $sliderFolder = 'slider/' . str_pad($slider->id, 2, '0', STR_PAD_LEFT);

            $imageKeys = preg_grep('/^images_\d+_image$/', array_keys($request->all()));
            foreach ($imageKeys as $imageKey) {
                $index = explode('_', $imageKey)[1];
                $uploadedImagePath = $this->uploadImage($request, $imageKey, $sliderFolder, 'slider');

                $slider->images()->create([
                    'image' => $uploadedImagePath,
                    'link' => $request->input("images_{$index}_link"),
                    'name' => $request->input("images_{$index}_name"),
                    'description' => $request->input("images_{$index}_description"),
                    'sort_order' => $request->input("images_{$index}_sort_order"),
                    'active' => $request->boolean("images_{$index}_active"),
                ]);
            }

            DB::commit();
            return $this->toResponseSuccess(null, 'Tạo slider mới thành công', Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function update(UpdateSliderRequest $request, $id)
    {
        DB::beginTransaction();
        try {
            $slider = $this->sliderRepository->find($id);
            if (!$slider) {
                return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
            }

            $sliderData = $request->only(['title', 'type', 'position', 'status']);
            $this->sliderRepository->update($id, $sliderData);

            $sliderFolder = 'slider/slider' . str_pad($slider->id, 2, '0', STR_PAD_LEFT);

            if ($request->has('images')) {
                $keepImageIds = [];
                foreach ($request->images as $index => $imageData) {
                    $imageId = $imageData['id'] ?? null;
                    $newImageData = [
                        'link' => $imageData['link'],
                        'name' => $imageData['name'],
                        'description' => $imageData['description'],
                        'sort_order' => $imageData['sort_order'],
                        'active' => $imageData['active'],
                    ];

                    if (isset($request->file('images')[$index]['image'])) {
                        $newImageData['image'] = $this->uploadImage($request, "images.{$index}.image", $sliderFolder, 'slider');
                    }

                    if ($imageId) {
                        $image = $this->sliderImageRepository->find($imageId);
                        if ($image) {
                            if (isset($newImageData['image'])) {
                                $this->deleteImage($image->image);
                            }
                            $this->sliderImageRepository->update($imageId, $newImageData);
                            $keepImageIds[] = $imageId;
                        }
                    } else {
                        $newImageData['slider_id'] = $slider->id;
                        $newImage = $this->sliderImageRepository->create($newImageData);
                        $keepImageIds[] = $newImage->id;
                    }
                }

                // Xóa các ảnh không còn trong request
                $slider->images()->whereNotIn('id', $keepImageIds)->get()->each(function ($image) {
                    $this->deleteImage($image->image);
                    $image->delete();
                });
            }

            DB::commit();
            $updatedSlider = $this->sliderRepository->find($id)->load('images');
            return $this->toResponseSuccess($updatedSlider, 'Cập nhật slider thành công', Response::HTTP_OK);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Lỗi cập nhật slider: ' . $e->getMessage());
            return $this->handleException($e);
        }
    }

    public function destroy($id)
    {
        try {
            $slider = $this->sliderRepository->find($id);
            if (!$slider) {
                return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
            }
            $this->sliderRepository->delete($id);
            return $this->toResponseDeleteSuccess();
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    protected function updateSliderImages($slider, $images)
    {
        $sliderFolder = 'slider/' . str_pad($slider->id, 2, '0', STR_PAD_LEFT);

        foreach ($images as $imageData) {
            if (isset($imageData['id'])) {
                $image = $this->sliderImageRepository->find($imageData['id']);
                if ($image) {
                    if (isset($imageData['image']) && $imageData['image'] instanceof \Illuminate\Http\UploadedFile) {
                        $this->deleteImage($image->image);
                        $imageData['image'] = $this->uploadImage($imageData, 'image', $sliderFolder, 'slider');
                    }
                    $image->update($imageData);
                }
            } else {
                if (isset($imageData['image']) && $imageData['image'] instanceof \Illuminate\Http\UploadedFile) {
                    $imageData['image'] = $this->uploadImage($imageData, 'image', $sliderFolder, 'slider');
                }
                $slider->images()->create($imageData);
            }
        }
    }
}

<?php

namespace Modules\Slider\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Modules\Slider\Http\Requests\StoreSliderImageRequest;
use Modules\Slider\Http\Requests\UpdateSliderImageRequest;
use Modules\Slider\Repositories\SliderImageRepositoryInterface;
use Modules\Slider\Repositories\SliderRepositoryInterface;
use Modules\Slider\Transformers\SliderImageResource;
use Modules\Traits\ImageUploadTrait;
use Modules\Traits\ResponseTrait;
use Symfony\Component\HttpFoundation\Response;

class SliderImageController extends Controller
{
    use ResponseTrait, ImageUploadTrait;

    protected $sliderImageRepository;
    protected $sliderRepository;

    public function __construct(SliderImageRepositoryInterface $sliderImageRepository, SliderRepositoryInterface $sliderRepository)
    {
        $this->sliderImageRepository = $sliderImageRepository;
        $this->sliderRepository = $sliderRepository;
    }

    public function store(StoreSliderImageRequest $request)
    {
        DB::beginTransaction();
        try {
            $slider = $this->getSlider($request->slider_id);
            if (!$slider) {
                return $this->toResponseBad('Không tìm thấy slider', Response::HTTP_NOT_FOUND);
            }

            $data = $this->prepareSliderImageDataForInsert($request);
            $this->incrementSortOrder($slider);

            $sliderImage = $this->sliderImageRepository->create($data);

            DB::commit();
            return $this->toResponseSuccess(new SliderImageResource($sliderImage), 'Thêm dữ liệu hình ảnh thành công', Response::HTTP_CREATED);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->handleException($e);
        }
    }

    public function update(UpdateSliderImageRequest $request, $sliderImageId)
    {
        DB::beginTransaction();
        try {
            $sliderImage = $this->sliderImageRepository->find($sliderImageId);
            if (!$sliderImage) {
                return $this->toResponseBad('Không tìm thấy hình ảnh slider', Response::HTTP_NOT_FOUND);
            }

            $slider = $this->getSlider($sliderImage->slider_id);
            if (!$slider) {
                return $this->toResponseBad('Không tìm thấy slider', Response::HTTP_NOT_FOUND);
            }

            $data = $this->prepareSliderImageDataForUpdate($request, $sliderImage->image_url);
            $sliderImage->update($data);

            DB::commit();
            return $this->toResponseSuccess(new SliderImageResource($sliderImage), 'Cập nhật dữ liệu hình ảnh thành công', Response::HTTP_OK);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->handleException($e);
        }
    }

    private function getSlider($sliderId)
    {
        return $this->sliderRepository->find($sliderId);
    }

    private function prepareSliderImageDataForInsert($request)
    {
        $data = $request->validated();

        if ($request->hasFile('image_url')) {
            $data['image_url'] = $this->uploadImage($request, 'image_url', 'uploads/sliders');
            if (!$data['image_url']) {
                throw new \Exception('Không thể upload hình ảnh');
            }
        }

        return $data;
    }

    private function prepareSliderImageDataForUpdate($request, $existingImageUrl = null)
    {
        $data = $request->validated();

        if ($request->hasFile('image_url')) {
            $data['image_url'] = $this->updateImage($request, 'image_url', 'uploads/sliders', $existingImageUrl);
            if (!$data['image_url']) {
                throw new \Exception('Không thể upload hình ảnh');
            }
        } else {
            $data['image_url'] = $existingImageUrl;
        }

        return $data;
    }

    private function incrementSortOrder($slider)
    {
        foreach ($slider->images as $image) {
            $image->update(['sort_order' => $image->sort_order + 1]);
        }
    }
}
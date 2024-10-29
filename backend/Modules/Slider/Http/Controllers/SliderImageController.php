<?php

namespace Modules\Slider\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Modules\Slider\Http\Requests\StoreSliderImageRequest;
use Modules\Slider\Http\Requests\UpdateSliderImageRequest;
use Modules\Slider\Repositories\SliderImageRepositoryInterface;
use Modules\Slider\Repositories\SliderRepositoryInterface;
use Modules\Traits\ImageUploadTrait;
use Modules\Traits\ResponseTrait;
use Symfony\Component\HttpFoundation\Response;

class SliderImageController extends Controller
{
    use ResponseTrait, ImageUploadTrait;

    protected $sliderImageRepository;
    protected $sliderRepository;

    public function __construct(SliderImageRepositoryInterface $sliderImageRepository,
                                SliderRepositoryInterface      $sliderRepository)
    {
        $this->sliderImageRepository = $sliderImageRepository;
        $this->sliderRepository = $sliderRepository;
    }

    public function store(StoreSliderImageRequest $request)
    {
        DB::beginTransaction();
        try {
            $slider = $this->sliderRepository->find($request->slider_id);
            if (!$slider) {
                return $this->toResponseBad('Không tìm thấy slider', Response::HTTP_NOT_FOUND);
            }

            $data = $this->prepareSliderImageData($request, null, true);

            $this->sliderImageRepository->create($data);

            DB::commit();
            return $this->toResponseSuccess(null, 'Thêm dữ liệu hình ảnh thành công', Response::HTTP_CREATED);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->handleException($e);
        }
    }

    public function update(UpdateSliderImageRequest $request, $id)
    {
        DB::beginTransaction();
        try {
            $sliderImage = $this->sliderImageRepository->find($id);
            if (!$sliderImage) {
                return $this->toResponseBad('Không tìm thấy hình ảnh slider', Response::HTTP_NOT_FOUND);
            }
            $slider = $this->sliderRepository->find($sliderImage->slider_id);
            if (!$slider) {
                return $this->toResponseBad('Không tìm thấy slider', Response::HTTP_NOT_FOUND);
            }
            $data = $this->prepareSliderImageData($request, $sliderImage->image_url, false);

            $sliderImage->update($data);

            DB::commit();
            return $this->toResponseSuccess(null, 'Cập nhật dữ liệu hình ảnh thành công', Response::HTTP_OK);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->handleException($e);
        }
    }


    private function prepareSliderImageData($request, $oldImageUrl = null, $isInsert = false)
    {
        $data = $request->validated();

        if ($isInsert !== false) {
            if ($request->hasFile('image_url')) {
                $data['image_url'] = $this->uploadImage($request, 'image_url', 'sliders', 'slider');
            }
        } else {
            if ($request->hasFile('image_url')) {
                $data['image_url'] = $this->updateImage($request, 'image_url', 'sliders', $oldImageUrl);
            } else {
                $data['image_url'] = $oldImageUrl;
            }
        }

        if (!$data['image_url']) {
            throw new \Exception('Không thể upload hình ảnh');
        }

        // Add additional fields
        $data['sort_order'] = $request->input('sort_order', $data['sort_order'] ?? 1);
        $data['link'] = $request->input('link', $data['link'] ?? null);
        $data['title'] = $request->input('title', $data['title'] ?? null);
        $data['description'] = $request->input('description', $data['description'] ?? null);
        $data['status'] = $request->input('status', $data['status'] ?? true);

        return $data;
    }
}
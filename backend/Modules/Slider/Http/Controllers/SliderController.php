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
    use ResponseTrait;

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
            $sliders = $this->sliderRepository->getAll();
            if ($sliders->isEmpty()) {
                return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NO_CONTENT);
            }
            return $this->toResponseSuccess(null, 'Tìm thấy dữ liệu', Response::HTTP_OK);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function show($id)
    {
        try {
            $slider = $this->sliderRepository->find($id)->load('images');
            if (!$slider) {
                return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NOT_FOUND);
            }
            return $this->toResponseSuccess(null, 'Tìm thấy dữ liệu', Response::HTTP_OK);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function store(StoreSliderRequest $request)
    {
        DB::beginTransaction();
        try {
            $this->sliderRepository->create($request->validated());
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
            $this->sliderRepository->update($id, $request->validated());
            DB::commit();
            return $this->toResponseSuccess(null, 'Cập nhật slider thành công', Response::HTTP_OK);
        } catch (\Exception $e) {
            DB::rollBack();
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
            $this->sliderRepository->update($id, ['status' => 0]);
            $this->handleSliderImageDeleteBySliderId($id);
            $this->sliderRepository->delete($id);
            return $this->toResponseDeleteSuccess();
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function handleSliderImageDeleteBySliderId($sliderId)
    {
        $sliderImages = $this->sliderImageRepository->getBySliderId($sliderId);
        foreach ($sliderImages as $sliderImage) {
            $this->sliderImageRepository->update($sliderImage->id, ['status' => 0]);
            $this->sliderImageRepository->delete($sliderImage->id);
        }
    }
}

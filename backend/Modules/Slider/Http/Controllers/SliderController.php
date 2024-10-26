<?php

namespace Modules\Slider\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Modules\Slider\Entities\SliderImage;
use Modules\Slider\Http\Requests\StoreSliderRequest;
use Modules\Slider\Http\Requests\UpdateSliderRequest;
use Modules\Slider\Repositories\SliderImageRepositoryInterface;
use Modules\Slider\Repositories\SliderRepositoryInterface;
use Modules\Slider\Transformers\SliderResource;
use Modules\Traits\ImageUploadTrait;
use Modules\Traits\ResponseTrait;
use Symfony\Component\HttpFoundation\Response;

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
        $sliders= $this->sliderRepository->getAll()->load('images');
        if($sliders->isEmpty()){
            return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NO_CONTENT);
        }
        return $this->toResponseSuccess($sliders, 'Tìm thấy dữ liệu', Response::HTTP_OK);
    }

    public function show($id)
    {
        $slider = $this->sliderRepository->find($id);
        if(!$slider){
            return $this->toResponseBad('Không tìm thấy dữ liệu', Response::HTTP_NO_CONTENT);
        }
        return $this->toResponseSuccess($slider->load('images'), 'Tìm thấy dữ liệu', Response::HTTP_OK);
    }

    public function store(StoreSliderRequest $request)
    {
        DB::beginTransaction();
        try {
            // Tạo Slider
            $slider = $this->sliderRepository->create($request->validated());

            if (isset($slider['images'])) {

                foreach ($slider['images'] as $image) {
                    $uploadedImagePath = $this->uploadImage($request, 'images.*.image', 'sliders');


                    // Lưu thông tin hình ảnh vào bảng hình ảnh
                    $slider->images()->create([
                        'image' => $uploadedImagePath,
                        'link' => $image['link'] ?? null,
                        'name' => $image['name'] ?? null,
                        'description' => $image['description'] ?? null,
                        'sort_order' => $image['sort_order'] ?? null,
                        'active' => $image['active'] ?? false,
                    ]);
                }
            }


            DB::commit();
            return $this->toResponseSuccess(null, 'Tạo slider mới thành công', Response::HTTP_CREATED);
        } catch (\Exception $exception) {
            DB::rollBack();
            return $this->toResponseBad($exception->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
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
            $this->sliderRepository->update($id,$request->validated());
            if ($request->has('images')) {
                // Tải lên nhiều hình ảnh
                $imagePaths = $this->updateImage($request, 'images.*.image', 'uploads/sliders');

                foreach ($imagePaths as $key => $imagePath) {
                    $slider->images()->updateOrCreate([
                        'image' => $imagePath,
                        'link' => $request->images[$key]['link'] ?? null,
                        'name' => $request->images[$key]['name'] ?? null,
                        'description' => $request->images[$key]['description'] ?? null,
                        'sort_order' => $request->images[$key]['sort_order'] ?? 1,
                        'active' => $request->images[$key]['active'] ?? 1,
                    ]);
                }
            }

            DB::commit();
            return $this->toResponseSuccess(null, 'Cập nhật dữ liệu thành công', Response::HTTP_OK);
        } catch (\Exception $exception) {
            DB::rollBack();
            return $this->toResponseBad($exception->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }



    public function destroy($id)
    {
        //
    }
}

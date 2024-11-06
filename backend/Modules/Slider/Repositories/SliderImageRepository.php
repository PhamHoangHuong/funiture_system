<?php

namespace Modules\Slider\Repositories;

use App\Repositories\BaseRepository;
use Modules\Slider\Entities\SliderImage;

class SliderImageRepository extends BaseRepository implements SliderImageRepositoryInterface
{
    public function getModel(): string
    {
        return SliderImage::class;
    }

    public function getBySliderId($sliderId)
    {
        return $this->model->where('slider_id', $sliderId)->get();
    }
}

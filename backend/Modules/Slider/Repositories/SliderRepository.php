<?php

namespace Modules\Slider\Repositories;

use App\Repositories\BaseRepository;
use Modules\Slider\Entities\Slider;

class SliderRepository extends BaseRepository implements SliderRepositoryInterface
{
    public function getModel(): string
    {
        return Slider::class;
    }
}

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

    public function update($id, array $data)
    {
        $slider = $this->find($id);
        if ($slider) {
            $slider->update($data);
            return $slider;
        }
        return null;
    }
}

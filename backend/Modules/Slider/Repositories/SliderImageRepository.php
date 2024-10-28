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

    public function update($id, array $data)
    {
        $image = $this->find($id);
        if ($image) {
            $image->update($data);
            return $image;
        }
        return null;
    }

    public function create(array $data)
    {
        return SliderImage::create($data);
    }
}

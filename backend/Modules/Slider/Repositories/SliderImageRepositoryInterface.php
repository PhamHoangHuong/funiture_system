<?php

namespace Modules\Slider\Repositories;

use App\Repositories\RepositoryInterface;

interface SliderImageRepositoryInterface extends RepositoryInterface
{
    public function create(array $data);
}

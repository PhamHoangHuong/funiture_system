<?php

namespace Modules\Review\Repositories;

use App\Repositories\BaseRepository;
use Modules\Review\Entities\Review;

class ReviewRepository extends BaseRepository implements ReviewRepositoryInterface
{
    public function getModel(): string
    {
        return Review::class;
    }
}
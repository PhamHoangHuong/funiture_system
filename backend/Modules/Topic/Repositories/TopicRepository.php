<?php

namespace Modules\Topic\Repositories;

use App\Repositories\BaseRepository;
use Modules\Topic\Entities\Topic;

class TopicRepository extends BaseRepository implements TopicRepositoryInterface
{
    public function getModel(): string
    {
        return Topic::class;
    }
}
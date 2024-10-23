<?php

namespace Modules\Post\Repositories;

use App\Repositories\BaseRepository;
use Modules\Post\Entities\Post;

class PostRepository extends BaseRepository implements PostRepositoryInterface
{
    public function getModel(): string
    {
        return Post::class;
    }
}
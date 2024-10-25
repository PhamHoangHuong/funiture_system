<?php

namespace Modules\Source\Repositories;

use App\Repositories\BaseRepository;
use Modules\Source\Entities\Source;

class SourceRepository extends BaseRepository implements SourceRepositoryInterface
{
    public function getModel(): string
    {
        return Source::class;
    }
}

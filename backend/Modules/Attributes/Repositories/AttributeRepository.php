<?php

namespace Modules\Attributes\Repositories;

use App\Repositories\BaseRepository;
use Modules\Attributes\Entities\Attribute;

class AttributeRepository extends BaseRepository implements AttributeRepositoryInterface
{
    public function getModel(): string
    {
        return Attribute::class;
    }
}
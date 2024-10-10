<?php

namespace Modules\Attributes\Repositories;

use App\Repositories\BaseRepository;
use Modules\Attributes\Entities\AttributeValue;

class AttributeValueRepository extends BaseRepository implements AttributeValueRepositoryInterface
{
    public function getModel(): string
    {
        return AttributeValue::class;
    }
}
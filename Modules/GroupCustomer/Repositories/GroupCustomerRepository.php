<?php

namespace Modules\GroupCustomer\Repositories;

use App\Repositories\BaseRepository;
use Modules\GroupCustomer\Entities\GroupCustomer;

class GroupCustomerRepository extends BaseRepository implements GroupCustomerRepositoryInterface
{
    public function getModel() : string
    {
        return GroupCustomer::class;
    }
}

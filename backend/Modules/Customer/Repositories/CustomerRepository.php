<?php

namespace Modules\Customer\Repositories;

use App\Repositories\BaseRepository;
use Modules\Customer\Entities\Customer;

class CustomerRepository extends BaseRepository implements CustomerRepositoryInterface
{
    public function getModel(): string
    {
        return Customer::class;
    }
}
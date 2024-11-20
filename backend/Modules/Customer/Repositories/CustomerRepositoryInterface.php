<?php

namespace Modules\Customer\Repositories;

use App\Repositories\RepositoryInterface;

interface CustomerRepositoryInterface extends RepositoryInterface
{
    public function getFullAddress($user);
}
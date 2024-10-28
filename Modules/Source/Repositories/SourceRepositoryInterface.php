<?php

namespace Modules\Source\Repositories;

use App\Repositories\RepositoryInterface;

interface SourceRepositoryInterface extends RepositoryInterface {
    public function getProductSources($productId);
}

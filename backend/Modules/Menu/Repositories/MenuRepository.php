<?php

namespace Modules\Menu\Repositories;

use App\Repositories\BaseRepository;
use Modules\Menu\Entities\Menu;

class MenuRepository extends BaseRepository implements MenuRepositoryInterface
{
    public function getModel(): string
    {
        return Menu::class;
    }
}
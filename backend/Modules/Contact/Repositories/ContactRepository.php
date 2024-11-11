<?php

namespace Modules\Contact\Repositories;

use App\Repositories\BaseRepository;
use Modules\Contact\Entities\Contact;

class ContactRepository extends BaseRepository implements ContactRepositoryInterface
{
    public function getModel(): string
    {
        return Contact::class;
    }
}
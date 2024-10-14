<?php

namespace Modules\Auth\Http\Controllers;
use App\Http\Controllers\BaseAuthController;

class AuthController extends BaseAuthController
{
    public function __construct()
    {
        $this->guard = 'api';
    }
}

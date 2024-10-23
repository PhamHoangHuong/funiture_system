<?php

namespace Modules\Customer\Http\Controllers;

use App\Http\Controllers\BaseAuthController;
use Auth;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Modules\Customer\Entities\Customer;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends BaseAuthController
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    public function handleGoogleCallback()
    {
        $this->handleSocialCallback('google','google_id');
    }

}
<?php

namespace Modules\Customer\Http\Controllers;

use Auth;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Modules\Customer\Entities\Customer;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    public function handleGoogleCallback()
    {
        // dd(1);
        try {
            $user = Socialite::driver('google')->stateless()->user();
            $finduser = Customer::where('google_id', $user->id)->first();

            if ($finduser) {
                Auth::guard('customer')->login($finduser);
                return response()->json([
                    'status' => 'success',
                    'message' => 'Logged in successfully',
                ]);
            } else {
                $newUser = Customer::create([
                    // chuyen sang observer
                    'name' => $user->name,
                    'email' => $user->email,
                    'status' => 1,
                    'google_id' => $user->id,
                    'group_id' => 1,
                    'password' => Hash::make(Str::random(12))
                ]);
                Auth::guard('customer')->login($newUser);
                return response()->json([
                    'status' => 'success',
                    'message' => 'Account created and logged in successfully',
                ]);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

}
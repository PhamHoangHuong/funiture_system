<?php

namespace Modules\Customer\Http\Controllers;

use Hash;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Modules\Customer\Entities\Customer;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Modules\Auth\Transformers\UserResource;
use App\Http\Controllers\BaseAuthController;
use Modules\Customer\Http\Requests\CustomerRequest;

class AuthCustomerController extends BaseAuthController
{
    public function __construct()
    {
        $this->guard = 'customer';
    }
    public function register(CustomerRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $customer = Customer::create($data);
        auth('customer')->login($customer);
        return response()->json(new UserResource(auth('customer')->user()));
    }

    public function handleForgotPass(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        $status = Password::broker('customers')->sendResetLink($request->only('email'));

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json(['status' => __('passwords.sent')]);
        } else {
            return response()->json(['error' => __('passwords.user')], 400);
        }
    }

    public function handleResetPass(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        $status = Password::broker('customers')->reset($request->only('email', 'password', 'password_confirmation', 'token'), function (Customer $user, string $password) {
            $user
                ->forceFill([
                    'password' => Hash::make($password),
                ])
                ->setRememberToken(Str::random(60));

            $user->save();

            event(new PasswordReset($user));
        });

        if ($status === Password::PASSWORD_RESET) {
            return response()->json(['status' => __('passwords.reset')]);
        } else {
            return response()->json(['error' => __('passwords.user')], 400);
        }
    }
}

<?php

namespace Modules\Customer\Http\Controllers;

use Hash;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cookie;
use Modules\Customer\Entities\Customer;
use Tymon\JWTAuth\Exceptions\JWTException;
use Modules\Auth\Transformers\UserResource;
use Tymon\JWTAuth\Contracts\Providers\Auth;
use App\Http\Controllers\BaseAuthController;
use Illuminate\Support\Facades\Hash as FacadesHash;
use Symfony\Component\HttpFoundation\Response;
use Modules\Customer\Http\Requests\CustomerRequest;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;


class AuthCustomerController extends BaseAuthController
{
    public function __construct()
    {
        $this->guard = 'customer';
    }
    public function register(CustomerRequest $request)
    { {
            $data = $request->validated();
            $data['password'] = FacadesHash::make($data['password']);
            $customer = Customer::create($data);

            auth('customer')->login($customer);
            return response()->json(new UserResource(auth('customer')->user()));
        }
        
    }
}

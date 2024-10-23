<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cookie;
use Modules\Customer\Entities\Customer;
use Laravel\Socialite\Facades\Socialite;
use Tymon\JWTAuth\Exceptions\JWTException;
use Modules\Auth\Transformers\UserResource;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

class BaseAuthController extends Controller
{
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth($this->guard)->attempt($credentials)) {
            return response()->json(['error' => 'Sai tên đăng nhập hoặc mật khẩu'], Response::HTTP_UNAUTHORIZED);
        }

        $user = auth($this->guard)->user();
        $refreshTokenData = $this->setRefreshTokenData($user);

        $refresh_token = JWTAuth::getJWTProvider()->encode($refreshTokenData);
        $cookie = $this->setTokenAndRefreshToken($token, $refresh_token, $user);
        $tokenCookie = $cookie['tokenCookie'];
        $refreshTokenCookie = $cookie['refreshTokenCookie'];

        return $this->respondWithToken($token, $refresh_token, $user)->withCookie($tokenCookie)->withCookie($refreshTokenCookie);
    }

    public function profile()
    {
        return response()->json(new UserResource(auth($this->guard)->user()));
    }

    public function logout()
    {
        auth($this->guard)->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh(Request $request)
    {
        try {
            if ($request->hasCookie('access_token')) {
                $token = $request->cookie('access_token');
                $request->headers->set('Authorization', 'Bearer ' . $token);
            }
            $user = JWTAuth::parseToken()->authenticate();
            $token = auth($this->guard)->refresh();
            auth($this->guard)->invalidate(true);

            $refreshTokenData = $this->setRefreshTokenData($user);
            $refresh_token = JWTAuth::getJWTProvider()->encode($refreshTokenData);
            $cookie = $this->setTokenAndRefreshToken($token, $refresh_token, $user);
            $tokenCookie = $cookie['tokenCookie'];
            $refreshTokenCookie = $cookie['refreshTokenCookie'];
            return $this->respondWithToken($token, $refresh_token, $user)->withCookie($tokenCookie)->withCookie($refreshTokenCookie);

        } catch (TokenExpiredException $e) {
            if ($request->hasCookie('refresh_token')) {
                $refreshTokenCookie = $request->cookie('refresh_token');
                $refreshTokenCookieDecode = JWTAuth::getJWTProvider()->decode($refreshTokenCookie);
                $user = User::find($refreshTokenCookieDecode['user_id']);
                $token = auth($this->guard)->login($user);

                $refreshTokenData = $this->setRefreshTokenData($user);
                $refreshTokenDataEncode = JWTAuth::getJWTProvider()->encode($refreshTokenData);

                $cookie = $this->setTokenAndRefreshToken($token, $refreshTokenDataEncode, $user);

                return $this->respondWithToken($token, $refreshTokenDataEncode, $user)->withCookie($cookie['tokenCookie'])->withCookie($cookie['refreshTokenCookie']);
            }

            return response()->json(['message' => 'Cookie không tồn tại '], Response::HTTP_UNAUTHORIZED);
        } catch (JWTException $e) {
            return response()->json(['message' => 'Token không hợp lệ'], Response::HTTP_UNAUTHORIZED);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Token không tồn tại'], Response::HTTP_UNAUTHORIZED);
        }
    }

    // BASE Social login

    public function handleSocialCallback($social, $col)
    {
        try {
            $user = Socialite::driver($social)->stateless()->user();
            $finduser = Customer::where($col, $user->id)->first();

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
                     $col => $user->id,
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


    protected function respondWithToken($token, $refresh_token, $user)
    {
        return response()->json([
            'access_token' => $token,
            'user' => new UserResource($user),
            'refresh_token' => $refresh_token,
            'token_type' => 'bearer',
            'expires_in' => time() + 1
        ]);
    }

    private function setTokenAndRefreshToken($token, $refresh_token, $user)
    {
        $refreshTokenCookie = Cookie::make(
            'refresh_token',
            $refresh_token,
            config('jwt.refresh_ttl'),
            '/',
            null,
            true,
            true,
            false,
            'None'
        );

        $cookie = Cookie::make(
            'access_token',
            $token,
            auth($this->guard)->factory()->getTTL() * 60 * 24, // 1 ngày
            '/',
            null,
            true,
            true,
            false,
            'None'
        );

        return [
            'tokenCookie' => $cookie,
            'refreshTokenCookie' => $refreshTokenCookie
        ];
    }

    private function setRefreshTokenData($user)
    {
        $refreshTokenData = [
            'user_id' => $user->id,
            'expires_in' => time() * config('jwt.refresh_ttl')
        ];

        return $refreshTokenData;
    }
}

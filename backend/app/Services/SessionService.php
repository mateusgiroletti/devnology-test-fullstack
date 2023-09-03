<?php

namespace App\Services;

use App\Http\Requests\CreateSessionRequest;
use Illuminate\Support\Facades\Auth;
use stdClass;

class SessionService
{
    public function __construct()
    {
    }

    public function createSession(CreateSessionRequest $request)
    {
        $response = new stdClass();
        $response->error = false;

        $userLogin = [
            'email' => $request->email,
            'password' => $request->password
        ];

        if (!Auth::attempt($userLogin)) {
            $response->error = true;

            return $response;
        }

        $user = Auth::user();
        $response->token = $user->createToken('JWT');

        return $response;
    }
}

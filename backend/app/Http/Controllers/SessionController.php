<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SessionController extends Controller
{
    public function store(Request $request)
    {
        $userLogin = [
            'email' => $request->email, 'password' => $request->password
        ];

        if (Auth::attempt($userLogin)) {
            $user = Auth::user();
            $token = $user->createToken('JWT');

            return response()->json(
                [
                    "email" => $request['email'],
                    "token" => $token->plainTextToken
                ]
            );
        }

        return response()->json(
            [
                'erro' => true,
                'message' => 'user invalid'
            ],
            401
        );
    }
}

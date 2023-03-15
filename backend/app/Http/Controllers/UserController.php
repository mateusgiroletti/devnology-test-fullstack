<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $newUser = [
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => bcrypt($request['password']),
        ];

        $user = User::create($newUser);

        auth()->login($user);
        $token = $user->createToken('JWT');

        return response()->json(
            [
                "email" => $request['email'],
                "token" => $token->plainTextToken
            ]
        );
    }
}

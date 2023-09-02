<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Services\UserService;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function store(CreateUserRequest $request)
    {

        $newUser = $this->userService->createUser($request);

        dd($newUser);


        /*   auth()->login($user);
        $token = $user->createToken('JWT'); */

        return response()->json(
            [
                /* "email" => $request['email'],
                "token" => $token->plainTextToken */
            ]
        );
    }
}

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

        $tokenNewUser = $this->userService->createUser($request);

        return response()->json(
            [
                "email" => $request['email'],
                "token" => $tokenNewUser->plainTextToken
            ]
        );
    }
}

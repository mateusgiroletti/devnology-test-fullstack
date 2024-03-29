<?php

namespace App\Services;

use App\Http\Requests\CreateUserRequest;
use App\Repositories\UserRepository;

class UserService
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function createUser(CreateUserRequest $request)
    {
        $newUser = [
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => bcrypt($request['password']),
        ];

        $createadUser = $this->userRepository->create($newUser);

        auth()->login($createadUser);
        $token = $createadUser->createToken('JWT');

        return $token;
    }
}

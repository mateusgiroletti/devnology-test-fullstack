<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    public function create($user)
    {
        return User::create($user);
    }
}

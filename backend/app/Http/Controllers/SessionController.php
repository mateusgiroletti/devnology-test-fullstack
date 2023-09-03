<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateSessionRequest;
use App\Services\SessionService;

class SessionController extends Controller
{
    protected $sessionService;

    public function __construct(SessionService $sessionService)
    {
        $this->sessionService = $sessionService;
    }

    public function store(CreateSessionRequest $request)
    {
        $createSession = $this->sessionService->createSession($request);

        if ($createSession->error) {
            return response()->json(
                [
                    'erro' => true,
                    'message' => 'user invalid'
                ],
                401
            );
        }

        return response()->json(
            [
                "email" => $request['email'],
                "token" => $createSession->token->plainTextToken
            ]
        );
    }
}

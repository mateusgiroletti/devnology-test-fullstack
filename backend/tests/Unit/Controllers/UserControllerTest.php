<?php

namespace Tests\Unit\Controllers;

use App\Http\Controllers\UserController;
use App\Http\Requests\CreateUserRequest;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    public function testStoreMethodCreatesUserAndReturnsJsonResponse()
    {
        // Crie uma instância falsa do CreateUserRequest
        $request = CreateUserRequest::create('/api/users', 'POST', [
            'email' => 'test@example.com',
            // Adicione outros campos necessários aqui
        ]);

        // Crie uma instância falsa do UserService
        /** @var \PHPUnit\Framework\MockObject\MockObject|UserService $userService */
        $userService = $this->createMock(UserService::class);
        $userService->expects($this->once())
            ->method('createUser')
            ->with($request)
            ->willReturn((object)['plainTextToken' => 'test-token']);

        // Crie uma instância do UserController com o UserService falso
        $controller = new UserController($userService);

        // Chame o método store do controller
        $response = $controller->store($request);

        // Verifique se a resposta é uma instância de JsonResponse
        $this->assertInstanceOf(JsonResponse::class, $response);

        // Verifique se a resposta JSON está correta
        $this->assertEquals(['email' => 'test@example.com', 'token' => 'test-token'], $response->getData(true));
    }
}

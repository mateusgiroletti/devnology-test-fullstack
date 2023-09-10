<?php

namespace Tests\Unit\Controllers;

use App\Http\Controllers\SessionController;
use App\Http\Requests\CreateSessionRequest;
use App\Services\SessionService;
use Illuminate\Http\JsonResponse;
use Tests\TestCase;

class SessionControllerTest extends TestCase
{
    public function testStoreMethodCreatesSessionAndReturnsJsonResponse()
    {
        // Crie uma instância falsa do CreateSessionRequest
        $request = CreateSessionRequest::create('/api/sessions', 'POST', [
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        // Crie uma instância falsa do SessionService
        /** @var \PHPUnit\Framework\MockObject\MockObject|SessionService $sessionService */
        $sessionService = $this->createMock(SessionService::class);
        $sessionService->expects($this->once())
            ->method('createSession')
            ->with($request)
            ->willReturn((object)['token' => (object)['plainTextToken' => 'test-token'], 'error' => false]);

        // Crie uma instância do SessionController com o SessionService falso
        $controller = new SessionController($sessionService);

        // Chame o método store do controller
        $response = $controller->store($request);

        // Verifique se a resposta é uma instância de JsonResponse
        $this->assertInstanceOf(JsonResponse::class, $response);

        // Verifique se a resposta JSON está correta
        $this->assertEquals(['email' => 'test@example.com', 'token' => 'test-token'], $response->getData(true));
    }

    public function testStoreMethodHandlesErrorAndReturnsErrorResponse()
    {
        // Crie uma instância falsa do CreateSessionRequest
        $request = CreateSessionRequest::create('/api/sessions', 'POST', [
            'email' => 'invalid@example.com',
            'password' => 'invalid-password',
            // Adicione outros campos necessários aqui
        ]);

        // Crie uma instância falsa do SessionService
        /** @var \PHPUnit\Framework\MockObject\MockObject|SessionService $sessionService */
        $sessionService = $this->createMock(SessionService::class);
        $sessionService->expects($this->once())
            ->method('createSession')
            ->with($request)
            ->willReturn((object)['error' => true]);

        // Crie uma instância do SessionController com o SessionService falso
        $controller = new SessionController($sessionService);

        // Chame o método store do controller
        $response = $controller->store($request);

        // Verifique se a resposta é uma instância de JsonResponse
        $this->assertInstanceOf(JsonResponse::class, $response);

        // Verifique se a resposta JSON contém a mensagem de erro adequada
        $responseData = $response->getData(true);
        $this->assertEquals(true, $responseData['erro']);
        $this->assertEquals('user invalid', $responseData['message']);
        $this->assertEquals(401, $response->getStatusCode()); // Verifique se o status code é 401 (não autorizado)
    }
}

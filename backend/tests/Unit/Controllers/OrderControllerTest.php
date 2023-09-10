<?php

namespace Tests\Unit\Controllers;

use App\Http\Controllers\OrderController;
use App\Http\Requests\CreateOrderRequest;
use App\Services\OrderService;
use Illuminate\Http\JsonResponse;
use Tests\TestCase;

class OrderControllerTest extends TestCase
{
    public function testStoreMethodCreatesOrderAndReturnsJsonResponse()
    {
        // Crie uma instância falsa do CreateOrderRequest
        $request = CreateOrderRequest::create('/api/orders', 'POST', [
            'product' => 'Test Product',
            'quantity' => 5,
        ]);

        // Crie uma instância falsa do OrderService
        /** @var \PHPUnit\Framework\MockObject\MockObject|OrderService $orderService */
        $orderService = $this->createMock(OrderService::class);

        // Simule uma criação de pedido bem-sucedida
        $orderService->expects($this->once())
            ->method('createOrder')
            ->with($request)
            ->willReturn((object)['error' => false]);

        // Crie uma instância do OrderController com o OrderService falso
        $controller = new OrderController($orderService);

        // Chame o método store do controller
        $response = $controller->store($request);

        // Verifique se a resposta é uma instância de JsonResponse
        $this->assertInstanceOf(JsonResponse::class, $response);

        // Verifique se a resposta JSON está correta
        $this->assertEquals(['product' => 'Test Product', 'quantity' => 5], $response->getData(true));
    }

    public function testStoreMethodHandlesErrorAndReturnsErrorResponse()
    {
        // Crie uma instância falsa do CreateOrderRequest
        $request = CreateOrderRequest::create('/api/orders', 'POST', [
            'product' => 'Invalid Product',
            'quantity' => 0,
            // Adicione outros campos necessários aqui
        ]);

        // Crie uma instância falsa do OrderService
        /** @var \PHPUnit\Framework\MockObject\MockObject|OrderService $orderService */
        $orderService = $this->createMock(OrderService::class);

        // Simule um erro na criação do pedido
        $orderService->expects($this->once())
            ->method('createOrder')
            ->with($request)
            ->willReturn((object)['error' => true]);

        // Crie uma instância do OrderController com o OrderService falso
        $controller = new OrderController($orderService);

        // Chame o método store do controller
        $response = $controller->store($request);

        // Verifique se a resposta é uma instância de JsonResponse
        $this->assertInstanceOf(JsonResponse::class, $response);

        // Verifique se a resposta JSON contém a mensagem de erro adequada
        $responseData = $response->getData(true);

        $this->assertEquals(true, $responseData['erro']);
        $this->assertEquals('Error inserting data', $responseData['message']);
        $this->assertEquals(400, $response->getStatusCode()); // Verifique se o status code é 400 (Bad Request)
    }
}

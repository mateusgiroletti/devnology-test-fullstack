<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateOrderRequest;
use App\Services\OrderService;

class OrderController extends Controller
{
    protected $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function store(CreateOrderRequest $request)
    {

        $createOrder = $this->orderService->createOrder($request);

        if ($createOrder->error) {
            return response()->json(
                [
                    'erro' => true,
                    'message' => 'Error inserting data'
                ],
                400
            );
        }

        return response()->json($request);
    }
}

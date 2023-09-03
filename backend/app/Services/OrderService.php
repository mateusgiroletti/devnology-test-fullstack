<?php

namespace App\Services;

use App\Http\Requests\CreateOrderRequest;
use App\Repositories\OrderProductRepository;
use App\Repositories\OrderRepository;
use App\Repositories\ProductRepository;
use Exception;
use Illuminate\Support\Facades\DB;
use stdClass;

class OrderService
{
    protected $orderRepository;
    protected $productRepository;
    protected $orderProductRepository;

    public function __construct(
        OrderRepository $orderRepository,
        ProductRepository $productRepository,
        OrderProductRepository $orderProductRepository
    ) {
        $this->orderRepository = $orderRepository;
        $this->productRepository = $productRepository;
        $this->orderProductRepository = $orderProductRepository;
    }

    public function createOrder(CreateOrderRequest $request)
    {
        $response = new stdClass();
        $response->error = false;

        $userId = $request->user()->id;

        $order = $request->order;
        $order['user_id'] = $userId;

        DB::beginTransaction();

        try {
            $newOrder = $this->orderRepository->create($order);

            $products = $request->products;

            foreach ($products as $product) {
                $dataProduct = [
                    'name' => $product['name'],
                    'value' => $product['value'],
                    'discount_value' => $product['discount_value'] ?? null
                ];

                $newProduct = $this->productRepository->create($dataProduct);

                $orderProduct = [
                    'order_id' => $newOrder->id,
                    'product_id' => $newProduct->id,
                    'quantity' => $product['quantity']
                ];

                $this->orderProductRepository->create($orderProduct);
            }

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            $response->error = true;
            $response->msg = $e->getMessage();
        }

        return $response;
    }
}

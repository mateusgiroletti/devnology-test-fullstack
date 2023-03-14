<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function store(Request $request)
    {

        $userId = $request->user()->id;

        $order = $request->order;
        $order['user_id'] = $userId;

        $orderId = DB::table('orders')->insertGetId($order);

        $products = $request->products;
        foreach ($products as $product) {
            $dataProduct = [
                'name' => $product['name'],
                'value' => $product['value'],
                'discount_value' => $product['discount_value'] ?? null
            ];

            $productId = DB::table('products')->insertGetId($dataProduct);

            $orderProduct = [
                'order_id' => $orderId,
                'product_id' => $productId,
                'quantity' => $product['quantity']
            ];

            DB::table('orders_products')->insert($orderProduct);
        }
        return response()->json($request);
    }
}

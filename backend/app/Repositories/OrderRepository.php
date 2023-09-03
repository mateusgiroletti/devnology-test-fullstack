<?php

namespace App\Repositories;

use App\Models\Order;

class OrderRepository
{
    public function create($order)
    {
        return Order::create($order);
    }
}

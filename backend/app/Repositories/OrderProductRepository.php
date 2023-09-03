<?php

namespace App\Repositories;

use App\Models\OrderProduct;

class OrderProductRepository
{
    public function create($orderProduct)
    {
        return OrderProduct::create($orderProduct);
    }
}

<?php

namespace App\Repositories;

use App\Models\Product;

class ProductRepository
{
    public function create($product)
    {
        return Product::create($product);
    }
}

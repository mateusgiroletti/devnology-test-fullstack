<?php

namespace Tests\Unit\Models;

use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class OrderProductTest extends TestCase
{
    public function test_order_product_database_has_expected_columns()
    {
        // Verifica se as colunas existens no Schema
        $this->assertTrue(
            Schema::hasColumns('orders_products', [
                'order_id', 'product_id', 'quantity'
            ]),
            1
        );
    }
}

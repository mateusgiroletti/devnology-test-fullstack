<?php

namespace Tests\Unit\Models;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_product_belongs_to_many_orders()
    {
        // Crie um produto
        $product = Product::factory()->create();

        // Crie algumas ordens associadas a esse produto
        $orders = Order::factory(3)->create();

        // Associe os produtos à ordem usando o relacionamento
        foreach ($orders as $order) {
            $product->order()->attach($order->id, ['quantity' => fake()->randomNumber(1)]);
        }

        // Verifique se o relacionamento de produto para ordens está correto
        $this->assertInstanceOf(\Illuminate\Database\Eloquent\Relations\BelongsToMany::class, $product->order());

        // Verifique se o relacionamento retorna as ordens corretas
        $this->assertEquals(3, $product->order()->count()); // Certifique-se de ajustar o número de ordens conforme necessário
    }
}

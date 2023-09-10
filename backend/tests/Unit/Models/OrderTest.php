<?php

namespace Tests\Unit\Models;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class OrderTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_orders_database_has_expected_columns()
    {
        // Verifica se as colunas existens no Schema
        $this->assertTrue(
            Schema::hasColumns('orders', [
                'value_total', 'user_id'
            ]),
            1
        );
    }

    public function test_order_belongs_to_user()
    {
        // Crie um usuário
        $user = User::factory()->create();

        // Crie algumas ordens relacionadas a esse usuário
        $order = Order::factory(1)->create(['user_id' => $user->id]);

        // Verifica se o pedido estão associados algum usuario
        $this->assertTrue($order->first()->user()->exists($user));

        // Verifica se o relacionamento entre pedido e usuario esta correto
        $this->assertInstanceOf(\Illuminate\Database\Eloquent\Relations\BelongsTo::class, $order->first()->user());
    }

    public function test_order_belongs_to_many_products()
    {
        $order = Order::factory()->create();

        // Crie alguns produtos associados a essa ordem
        $products = Product::factory(3)->create();

        // Associe os produtos à ordem usando o relacionamento
        foreach ($products as $product) {
            $order->product()->attach($product->id, ['quantity' => fake()->randomNumber(1)]);
        }

        // Verifique se o relacionamento de ordem para produtos está correto
        $this->assertInstanceOf(\Illuminate\Database\Eloquent\Relations\BelongsToMany::class, $order->product());

        // Verifique se o relacionamento retorna os produtos corretos
        $this->assertEquals(3, $order->product()->count());
    }
}

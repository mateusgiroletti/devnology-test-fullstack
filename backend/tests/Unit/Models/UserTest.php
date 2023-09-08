<?php

namespace Tests\Unit\Models;

use App\Models\Order;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_users_database_has_expected_columns()
    {
        $this->assertTrue(true);

        $this->assertTrue(
            Schema::hasColumns('users', [
                'id', 'name', 'email', 'password'
            ]),
            1
        );
    }

    public function test_user_has_many_orders()
    {
        // Crie um usuário
        $user = User::factory()->create();

        // Crie algumas ordens relacionadas a esse usuário
        $order = Order::factory(3)->create(['user_id' => $user->id]);

        // Verifica se existe algum pedido de algum usuario
        $this->assertTrue($user->order()->exists($order));

        // Verifica se a quantidade de pedidos criados é a mesma no relacionamento do usuario com pedidos
        $this->assertEquals($order->count(), $user->order()->count());

        // Verifica se o relacionamento entre usuario e pedido esta correto
        $this->assertInstanceOf(\Illuminate\Database\Eloquent\Relations\HasMany::class, $user->order());
    }
}

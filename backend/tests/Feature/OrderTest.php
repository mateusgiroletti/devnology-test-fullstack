<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_order()
    {
        $dataForm = [
            "products" => [
                [
                    "name" => "teste",
                    "value" => "120.00",
                    "quantity" => 2,
                    "discount_value" => "0.25"
                ],
                [
                    "name" => "teste2",
                    "value" => "130.00",
                    "quantity" => 1
                ]
            ],
            "order" => [
                "value_total" => "250.00"
            ]
        ];

        $newUser = User::create([
            'name' => 'Teste',
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
        ]);

        // Autentique o usuário manualmente
        $this->actingAs($newUser);

        // Agora, crie um token JWT para o usuário autenticado
        $user = auth()->user();
        $token = $user->createToken('JWT')->accessToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('POST', '/api/order', $dataForm);

        $response->assertStatus(200);
        $response->assertJson($dataForm);
    }

    public function test_cannot_create_order_when_token_is_invalid()
    {
        $dataForm = [
            "products" => [
                [
                    "name" => "teste",
                    "value" => "120.00",
                    "quantity" => 2,
                    "discount_value" => "0.25"
                ],
                [
                    "name" => "teste2",
                    "value" => "130.00",
                    "quantity" => 1
                ]
            ],
            "order" => [
                "value_total" => "250.00"
            ]
        ];

        $response = $this->json('POST', '/api/order', $dataForm);

        $response->assertStatus(401);
    }

    public function test_cannot_create_order_when_form_is_invalid()
    {
        $dataForm = [];

        $newUser = User::create([
            'name' => 'Teste',
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
        ]);

        // Autentique o usuário manualmente
        $this->actingAs($newUser);

        // Agora, crie um token JWT para o usuário autenticado
        $user = auth()->user();
        $token = $user->createToken('JWT')->accessToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->json('POST', '/api/order', $dataForm);

        $response->assertStatus(400);
        $response->assertJson([
            'success' => false,
            'message' => 'Validation errors',
            'data' => [
                'products' => [
                    'The products field is required'
                ],
                'order' => [
                    'The order field is required'
                ]
            ]
        ]);
    }
}

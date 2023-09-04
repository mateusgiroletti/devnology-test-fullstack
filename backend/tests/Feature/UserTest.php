<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{

    use RefreshDatabase;

    public function test_register_user_and_return_errors_validation(): void
    {
        $userData = [
            'name' => '',
            'email' => '',
            'password' => '',
        ];

        $response = $this->json('POST', '/api/user', $userData);

        $response->assertStatus(400);
        $response->assertJson([
            'success' => false,
            'message' => 'Validation errors',
            'data' => [
                'name' => [
                    'The name field is required'
                ],
                'email' => [
                    'The email field is required'
                ],
                'password' => [
                    'The password field is required'
                ]
            ]
        ]);
    }

    public function test_register_user_and_return_token_and_email(): void
    {
        $userData = [
            'name' => 'testing app',
            'email' => 'testingapp@test.com',
            'password' => bcrypt('testing'),
        ];

        $response = $this->json('POST', '/api/user', $userData);

        $response->assertStatus(200);
        $response->assertJsonStructure(['email']);
        $response->assertJsonStructure(['token']);
    }
}

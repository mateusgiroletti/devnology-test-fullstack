<?php

namespace Tests\Unit\Services;

use App\Http\Requests\CreateUserRequest;
use App\Repositories\UserRepository;
use App\Services\UserService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class UserServiceTest extends TestCase
{
    use RefreshDatabase;

    public function testCreateUserMethod()
    {
        // Crie uma instância falsa do CreateUserRequest
        $request = CreateUserRequest::create('/api/users', 'POST', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'testpassword',
        ]);

        // Crie uma instância falsa do UserRepository
        $userRepository = $this->app->make(UserRepository::class);

        // Crie uma instância do UserService com o UserRepository falso
        $userService = new UserService($userRepository);

        // Chame o método createUser do serviço
        $token = $userService->createUser($request);

        // Verifique se o token foi gerado
        $this->assertNotNull($token);

        // Verifique se o usuário foi criado no banco de dados
        $this->assertDatabaseHas('users', [
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Verifique se o usuário está autenticado
        $this->assertTrue(Auth::check());
    }
}

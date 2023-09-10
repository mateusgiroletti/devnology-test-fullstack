<?php

namespace Tests\Unit\Services;

use App\Http\Requests\CreateSessionRequest;
use App\Models\User;
use App\Services\SessionService;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class SessionServiceTest extends TestCase
{
    use RefreshDatabase; // Use this to refresh the database for testing

    public function testCreateSessionMethodSuccess()
    {
        // Crie uma instância falsa do CreateSessionRequest
        $request = CreateSessionRequest::create('/api/sessions', 'POST', [
            'email' => 'test@example.com',
            'password' => 'testpassword',
        ]);

        // Crie uma instância do SessionService
        $sessionService = new SessionService();

        // Crie um usuário de teste no banco de dados
        User::factory()->create([
            'email' => 'test@example.com',
            'password' => Hash::make('testpassword'),
        ]);

        // Chame o método createSession do serviço
        $response = $sessionService->createSession($request);

        // Verifique se o erro é falso
        $this->assertFalse($response->error);

        // Verifique se o token JWT foi gerado
        $this->assertNotNull($response->token);
    }

    public function testCreateSessionMethodError()
    {
        // Crie uma instância falsa do CreateSessionRequest com credenciais inválidas
        $request = CreateSessionRequest::create('/api/sessions', 'POST', [
            'email' => 'invalid@example.com',
            'password' => 'invalidpassword',
        ]);

        // Crie uma instância do SessionService
        $sessionService = new SessionService();

        // Chame o método createSession do serviço
        $response = $sessionService->createSession($request);

        // Verifique se o erro é verdadeiro
        $this->assertTrue($response->error);
    }
}

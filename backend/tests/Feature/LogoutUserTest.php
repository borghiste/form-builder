<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\User;
use Tests\TestCase;

class LogoutUserTest extends TestCase
{
   
public function test_logout_delete_access_token(): void
    {
        // Create a user and authenticate to get an access token
        $user = User::factory()->create();
        $token = $user->createToken('test-token')->plainTextToken;

        $response = $this->postJson('api/logout', [], [
            'Authorization' => 'Bearer' . $token,
        ]);
        $response->assertOk()
                 ->assertJson(['message' => 'Logout successful']);
    }
}

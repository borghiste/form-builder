<?php

namespace Tests\Feature;

use App\Models\Organization;
use App\Models\User;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;


class LoginTest extends TestCase
{
    use RefreshDatabase;

    private function createUser(): User
    {
        $organization = Organization::create([
            'name' => 'Acme Organization',
            'subdomain' => 'acme-organization',
            'slug' => 'acme-organization',
        ]);

        return User::create([
            'organization_id' => $organization->id,
            'name' => 'John Doe',
            'email' => 'john@acme.com',
            'password' => Hash::make('password123'),
            'role' => 'owner',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);
    }

    public function test_login_returns_user_and_organization_on_successful_login(): void
    {
        // Clear the session to ensure a clean state for the test
        $this->withSession([]);
// Create a user and associated organization for testing
        $user = $this->createUser();
        
      

        $response = $this
        ->withHeader('Referer', config('app.url'))
        ->postJson('/api/login', [
            'email' => Organization::first()->users()->first()->email,
            'password' => 'password123',])
;
        $response
            ->assertOk()
            ->assertJsonPath('user.email', 'john@acme.com')
            ->assertJsonPath('organization.subdomain', 'acme-organization');

            $this->assertAuthenticatedAs($user);
    }

    public function test_login_with_wrong_password_returns_unauthorized(): void
    {
        $this->createUser();

        $response = $this->postJson('/api/login', [
            'email' => 'john@acme.com',
            'password' => 'wrong-password',
        ]);

        $response
            ->assertStatus(401)
            ->assertJsonPath('message', 'Invalid credentials');
    }

    public function test_login_validates_required_fields(): void
    {
        $response = $this->postJson('/api/login', [
            'email' => 'not-an-email',
        ]);

        $response
            ->assertStatus(422);
           
    }
}

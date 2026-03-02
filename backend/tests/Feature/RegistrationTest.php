<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Organization and user registration to the service feature test.
     */
    public function test_registration(): void
    {
            $response = $this->postJson('/api/register', [
                'organization_name' => 'acme Organization',
                'subdomain' => 'acme',
                'plan' => 'free',
                'owner_name' => 'John Doe',
                'password' => 'password123',
                'password_confirmation' => 'password123',
                'email' => 'test@example.com']);
               
                $response->assertStatus(200);
    }
    /**
     * Get the maximum number of users allowed for a given plan.
     */
    private function getMaxUsers(array $plan): int
    {
        // Example logic for returning max users based on the plan
        return $plan[0] === 'free' ? 10 : 100;
    }

    private function getMaxForms(array $plan): int
    {
        // Example logic for returning max forms based on the plan
        return $plan[0] === 'free' ? 5 : 50;
    }
}
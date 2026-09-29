<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Request;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

use Tests\TestCase;

class LogoutUserTest extends TestCase
{
   
    use RefreshDatabase;
public function test_logout_delete_access_token(): void

    {
        $organization = Organization::factory()->create([
            'name' => 'Top Organization',
            'subdomain' => 'top-organization',
            'slug' => 'top-organization',
        ]);
        $user = User::factory()->create([
                'organization_id' => $organization->id,
                'name' => 'John Doe',
                'email' => 'test@kh.kh',
                'password' => Hash::make('password123'),
                'role' => 'owner',
                'is_active' => true,
                'email_verified_at' => now(),
        ]);

        
       $response = $this->withHeaders([
        'accept' => 'application/json',
        'Referer' => config('app.url')
       ])
       ->actingAs($user, 'web')->postJson('/api/logout');

        $response->assertStatus(200);

      
    }
}

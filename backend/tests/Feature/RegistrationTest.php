<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mail;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration(): void
    {
        Mail::fake();
        $data = [
            'organization_name'     => 'acme organization',
            'owner_name'            => 'John Doe',
            'email'                 => 'john@acme.com',
            'password'              => 'password123',
            'password_confirmation' => 'password123',
        ];

        $response = $this->postJson('/api/register', $data );
        



         if ($response->status() !== 200) {
                          $response->dump();
         }

         $this->assertDatabaseHas('organizations', [
                      'name' => 'acme organization',
                  'subdomain' => 'acme-organization',]);
                  
        $this->assertDatabaseHas('users', [
            'name' => 'John Doe',
            'email' => $data['email']
        ]);

        Mail::assertQueued(\App\Mail\WelcomeEmail::class, function ($mail) use ($data){
                     return $mail->hasTo($data['email']);
        });
        $response->assertStatus(200);
 

    }
}
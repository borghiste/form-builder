<?php

namespace Tests\Feature;

use Mail;
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
        Mail::fake();
            $response = $this->postJson('/api/register', [
                'organization_name' => 'acme Organization',
                'subdomain' => 'acme',
                'plan' => 'free',
                'owner_name' => 'John Doe',
                'password' => 'password123',
                'password_confirmation' => 'password123',
                'email' => 'test@example.com']);

                $response->assertStatus(200);
                
                Mail::assertSent(\App\Mail\WelcomeEmail::class, function ($mail) {
                    return $mail->hasTo('test@example.com');
                });
            }
    }

 
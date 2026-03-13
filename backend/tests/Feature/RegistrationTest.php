<?php

namespace Tests\Feature;

use Illuminate\Validation\Rules\Unique;
use Mail;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Services\RegistrationService;


class RegistrationTest extends TestCase
{
   
    use RefreshDatabase;
    /**
     * Organization and user registration to the service feature test.
     */
    public function test_registration(): void
    {

        Mail::fake();
      $service = app(RegistrationService::class);
      $data = ['organization_name' => 'acme Organization',
                'owner_name' => 'John Doe',
                 'email' => fake()->Unique()->safeEmail(),
                
                'password' => 'password123',
                'password_confirmation' => 'password123'];

     

      $response = $this->postJson('/api/register', $data);

  
    

      // db verification
      $this->assertDatabaseHas('organizations', [
        'name' => 'acme Organization',
    'subdomain' => 'acme-organization',]);
        
    $this->assertDatabaseHas('users', [
        'name' => 'John Doe',
        'email' => $data['email']
    ]);


     // verify email sent
 
     Mail::assertQueued(\App\Mail\WelcomeEmail::class, function ($mail) use ($data){
        return $mail->hasTo($data['email']);
    });

     
        $response->assertStatus(200);
       
    }


}

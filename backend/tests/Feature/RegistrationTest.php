<?php

namespace Tests\Feature;


use Mail;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Services\RegistrationService;



class RegistrationTest extends TestCase
{
    // test per verificare la funzionalità di registrazione dell'organizzazione e dell'utente al servizio.
    //  Il test utilizza il trait RefreshDatabase per garantire che il database venga ripristinato a uno stato pulito prima di ogni test, evitando interferenze tra i test.
   
    use RefreshDatabase;
  

      
    public function test_registration(): void
    {
// viene utilizzato Mail::fake() per simulare l'invio delle email, consentendo di verificare se le email vengono inviate correttamente senza effettivamente inviarle.
        Mail::fake();
        
      

      // viene creato un array di dati di input per la registrazione, che include il nome dell'organizzazione, il nome del proprietario, l'email e la password.
      $data = ['organization_name' => 'acme organization',
                'owner_name' => 'John Doe',
                 'email' => fake()->Unique()->safeEmail(),
                
                'password' => 'password123',
                'password_confirmation' => 'password123'];

                //  Viene effettuata una richiesta POST alla route di registrazione con questi dati.

      $response = $this->postJson('/api/register', $data);
        if ($response->status() !== 200) {
            $response->dump();
            
        }


      // db verification
      // dopo la richiesta, vengono effettuate verifiche sul database per assicurarsi che l'organizzazione e l'utente siano stati creati correttamente. Infine, viene verificato che un'email di benvenuto sia stata messa in coda per essere inviata all'indirizzo email specificato durante la registrazione.
      $this->assertDatabaseHas('organizations', [
        'name' => 'acme organization',
    'subdomain' => 'acme-organization',]);
        
    $this->assertDatabaseHas('users', [
        'name' => 'John Doe',
        'email' => $data['email']
    ]);


     // verifixa che l'email di benvenuto è stata messa in coda per essere inviata all'indirizzo email specificato durante la registrazione.
 
     Mail::assertQueued(\App\Mail\WelcomeEmail::class, function ($mail) use ($data){
        return $mail->hasTo($data['email']);
    });

     
        $response->assertStatus(200);
       
    }

}

<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\User;
use Tests\TestCase;
use App\Models\Invitation;

class InvitationsTest extends TestCase
{
    /**
     * A basic feature test example.
     */

     use RefreshDatabase;
    public function test_send_invitations(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $data = [
            'invitations' => [
                [
                'email' => 'ter@jhg.u',
                'role' => 'viewer',
                'message' => 'ciao'
                ]
            ]
            ];
        $response = $this->postJson('/api/invitations/sendinvite', $data);

        $response->assertStatus(200);

        $this->assertDatabaseHas('invitations', [
            'email' => 'ter@jhg.u',
            'role' => 'viewer',
            'message' => 'ciao',
            'invited_by' => $user->id
        ]);
    }




    // TEST 1: caso felice — token valido
    public function test_accept_invitation_with_valid_token(): void

    {
        $user = User::factory()->create();
        $invitation = Invitation::factory()->create([
            'token' => 'valid-token-abc123',
            'user_id' => $user->id
        ]);

        $response = $this->actingAs($user)->postJson("/api/invitations/{$invitation->token}/accept");

        $response->assertStatus(200);
    }

    // // TEST 2: token inesistente → 404
     public function test_accept_invitation_with_invalid_token_returns_404(): void
     {
        $user = User::factory()->create();
        
         $response = $this->actingAs($user)->postJson('/api/invitations/token-che-non-esiste/accept');

         $response->assertStatus(404);
     }

     // TEST 3: verifica che l'invito sia marcato come accettato nel DB
     public function test_invitation_is_marked_as_accepted_in_database(): void
     {
        $user = User::factory()->create();

         $invitation = Invitation::factory()->create([
             'token'      => 'valid-token-abc123',
             'accepted_at' => null,
         ]);

         $this->actingAs($user)->postJson("/api/invitations/{$invitation->token}/accept");

         $this->assertNotNull($invitation->fresh()->accepted_at);
     }

     // TEST 4: accettare due volte lo stesso invito → 422 o 409
     public function test_cannot_accept_already_accepted_invitation(): void
     {
            $user = User::factory()->create();
         $invitation = Invitation::factory()->create([
             'token'       => 'already-used-token',
             'accepted_at' => now(),
         ]);

         $response = $this->actingAs($user)->postJson("/api/invitations/{$invitation->token}/accept");

         $response->assertStatus(422);
     }

     // TEST 5: token scaduto → 422
public function test_expired_token_is_rejected(): void
{
    $user = User::factory()->create();
    $invitation = Invitation::factory()->create([
        'token'      => 'expired-token',
        'user_id'    => $user->id,
        'status'     => 'pending',
        'expires_at' => now()->subDay(),
    ]);

    $this->actingAs($user)
         ->postJson('/api/invitations/expired-token/accept')
         ->assertStatus(422)
         ->assertJson(['message' => 'Invitation expired']);
}

 // TEST 6: accettazione restituisce redirect e dati invitation
 public function test_acceptance_returns_redirect_to_register(): void
 {
     $user = User::factory()->create();
     $invitation = Invitation::factory()->create([
         'token'   => 'valid-token-abc123',
         'user_id' => $user->id,
         'status'  => 'pending',
         'email'   => 'invitato@example.com',
     ]);

     $this->actingAs($user)
          ->postJson('/api/invitations/valid-token-abc123/accept')
          ->assertStatus(200)
          ->assertJsonStructure([
              'message',
              'redirect_to',
              'invitation' => ['email', 'role'],
          ]);
 }

  // TEST 7: registrazione con email sbagliata → 403
  public function test_registration_with_wrong_email_is_rejected(): void
  {
      Invitation::factory()->create([
          'token'  => 'valid-token',
          'status' => 'accepted',
          'email'  => 'giusto@example.com',
      ]);

      $user = User::factory()->create();

      $this->postJson('api/register-invitation', [
          'token'    => 'valid-token',
          'email'    => 'sbagliato@example.com',
          'name'     => 'Mario',
          'password' => 'password123',
      ])
      ->assertStatus(422)
      ->assertJson(['message' => "Email doesn't match the invitation."]);
  }

 // TEST 8: registrazione corretta → utente creato
 public function test_registration_with_correct_email_creates_user(): void
 {
     Invitation::factory()->create([
         'token'  => 'valid-token',
         'status' => 'accepted',
         'email'  => 'giusto@example.com',
     ]);

     $this->postJson('/api/register-invitation', [
         'token'    => 'valid-token',
         'email'    => 'giusto@example.com',
         'name'     => 'Mario Rossi',
         'password' => 'password123',
     ])
     ->assertStatus(201)
     ->assertJsonStructure(['user' => ['id', 'name', 'email']]);

     $this->assertDatabaseHas('users', ['email' => 'giusto@example.com']);
 }
}

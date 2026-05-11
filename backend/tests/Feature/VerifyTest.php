<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Organization;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\URL;

class VerifyTest extends TestCase
{
    use RefreshDatabase;

    private function createUserWithOrganization(): User
    {
        $organization = Organization::create([
            'name'          => 'Acme Organization',
            'subdomain'     => 'acme-organization',
            'slug'          => 'acme-organization',
            'max_users'     => 3,
            'max_forms'     => 3,
            'trial_ends_at' => now()->addDays(14),
        ]);

        return User::create([
            'organization_id'   => $organization->id,
            'name'              => 'John Doe',
            'email'             => 'john@acme.com',
            'password'          => bcrypt('password123'),
            'role'              => 'owner',
            'is_active'         => true,
            'last_login_at'     => null,
            'email_verified_at' => null,
        ]);
    }

    private function generateMagicLink(User $user): string
    {
        return URL::temporarySignedRoute(
            'verify.email',
            now()->addMinutes(15),
            [
                'user' => $user->id,
                'tag'  => $user->last_login_at?->timestamp ?? 0,
            ]
        );
    }

    // -----------------------------------------------------------------------
    // verifica con successo
    // -----------------------------------------------------------------------
    public function test_valid_magic_link_verifies_user(): void
    {
        $user = $this->createUserWithOrganization();
        $url  = $this->generateMagicLink($user);

        $response = $this->get($url);

        // redirect al frontend
        $response->assertRedirect();

        // email_verified_at e last_login_at aggiornati
        $this->assertDatabaseHas('users', [
            'id'    => $user->id,
            'email' => $user->email,
        ]);

        $user->refresh();
        $this->assertNotNull($user->email_verified_at);
        $this->assertNotNull($user->last_login_at);
    }

    // -----------------------------------------------------------------------
    // tag errato: il link è stato già usato
    // -----------------------------------------------------------------------
    public function test_invalid_tag_returns_403(): void
    {
        $user = $this->createUserWithOrganization();

        // genera il link con un tag sbagliato
        $url = URL::temporarySignedRoute(
            'verify.email',
            now()->addMinutes(15),
            [
                'user' => $user->id,
                'tag'  => 999999, // tag non corrispondente
            ]
        );

        $response = $this->get($url);

        $response->assertStatus(403);

        // il DB non deve essere stato aggiornato
        $user->refresh();
        $this->assertNull($user->email_verified_at);
        $this->assertNull($user->last_login_at);
    }

    // -----------------------------------------------------------------------
    // CASO 3 — link scaduto (expiresAt nel passato)
    // -----------------------------------------------------------------------
    public function test_expired_magic_link_is_rejected(): void
    {
        $user = $this->createUserWithOrganization();

        $url = URL::temporarySignedRoute(
            'verify.email',
            now()->subMinutes(1), // già scaduto
            [
                'user' => $user->id,
                'tag'  => $user->last_login_at?->timestamp ?? 0,
            ]
        );

        $response = $this->get($url);

        $response->assertStatus(403);

        $user->refresh();
        $this->assertNull($user->email_verified_at);
    }

    // -----------------------------------------------------------------------
    // link già usato: il tag non corrisponde più perché last_login_at è stato aggiornato al primo click
    // -----------------------------------------------------------------------
    public function test_magic_link_cannot_be_used_twice(): void
    {
        $user = $this->createUserWithOrganization();
        $url  = $this->generateMagicLink($user);

        // primo click — deve funzionare
        $this->get($url)->assertRedirect();

        // secondo click — il tag non corrisponde più al nuovo last_login_at
        $response = $this->get($url);
        $response->assertStatus(403);
    }

    // -----------------------------------------------------------------------
    // CASO 5 — utente inesistente
    // -----------------------------------------------------------------------
    public function test_nonexistent_user_returns_404(): void
    {
        $url = URL::temporarySignedRoute(
            'verify.email',
            now()->addMinutes(15),
            [
                'user' => 99999, // ID che non esiste
                'tag'  => 0,
            ]
        );

        $response = $this->get($url);

        $response->assertStatus(404);
    }
}



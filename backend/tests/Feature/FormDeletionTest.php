<?php

namespace Tests\Feature;

use App\Models\Form;
use App\Models\FormField;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class FormDeletionTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_deletes_a_form_and_its_related_fields(): void
    {
        $organization = Organization::create([
            'name' => 'Acme Organization',
            'subdomain' => 'acme-organization',
            'slug' => 'acme-organization',
        ]);

        $user = User::create([
            'organization_id' => $organization->id,
            'name' => 'John Doe',
            'email' => 'john@acme.com',
            'password' => Hash::make('password123'),
            'role' => 'owner',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        $form = Form::create([
            'name' => 'Contact form',
            'description' => 'Customer contact form',
            'organization_id' => $organization->id,
            'created_by' => $user->id,
        ]);

        $field = FormField::create([
            'form_id' => $form->id,
            'label' => 'Email',
            'type' => 'email',
            'required' => true,
        ]);

        $this->actingAs($user, 'sanctum');

        $response = $this->deleteJson('/api/forms/' . $form->id);

        $response
            ->assertOk()
            ->assertJsonPath('message', 'Form deleted');

        $this->assertDatabaseMissing('forms', ['id' => $form->id]);
        $this->assertDatabaseMissing('form_fields', ['id' => $field->id]);
    }

    public function test_it_returns_404_when_trying_to_delete_a_non_existent_form(): void
    {
        $organization = Organization::create([
            'name' => 'Acme Organization',
            'subdomain' => 'acme-organization',
            'slug' => 'acme-organization',
        ]);

        $user = User::create([
            'organization_id' => $organization->id,
            'name' => 'John Doe',
            'email' => 'john@acme.com',
            'password' => Hash::make('password123'),
            'role' => 'owner',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        $this->actingAs($user, 'sanctum');

        $response = $this->deleteJson('/api/forms/999999');

        $response->assertNotFound();
    }
}

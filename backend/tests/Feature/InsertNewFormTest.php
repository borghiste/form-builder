<?php

namespace Tests\Feature;

use App\Models\Organization;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class InsertNewFormTest extends TestCase
{
    use RefreshDatabase;

    public function test_insert_new_form(): void
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

        $newFormData = [
            'name' => 'Test Form',
            'description' => 'This is a test form',
            'form_fields' => [
                [
                    'label' => 'Field 1',
                    'type' => 'text',
                    'required' => true,
                ],
                [
                    'label' => 'Field 2',
                    'type' => 'number',
                    'required' => false,
                ],
            ],
        ];

        $this->actingAs($user, 'sanctum');

        $response = $this->postJson('/api/forms', $newFormData);

        $response
            ->assertOk()
            ->assertJsonPath('message', 'form created successfully')
            ->assertJsonPath('form.name', 'Test Form');

        $formId = $response->json('form.id');

        $this->assertDatabaseHas('forms', [
            'id' => $formId,
            'name' => 'Test Form',
            'description' => 'This is a test form',
        ]);

        $this->assertDatabaseHas('form_fields', [
            'form_id' => $formId,
            'label' => 'Field 1',
            'type' => 'text',
            'required' => true,
        ]);

        $this->assertDatabaseHas('form_fields', [
            'form_id' => $formId,
            'label' => 'Field 2',
            'type' => 'number',
            'required' => false,
        ]);
    }
}

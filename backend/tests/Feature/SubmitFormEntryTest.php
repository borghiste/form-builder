<?php

namespace Tests\Feature;

use App\Models\Form;
use App\Models\FormSubmission;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SubmitFormEntryTest extends TestCase
{
    use RefreshDatabase;

    private Organization $organization;
    private User $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->organization = Organization::factory()->create();
        $this->user = User::factory()->create([
            'organization_id' => $this->organization->id,
            'role' => 'admin',
        ]);
    }

    private function createForm(?Organization $organization = null): Form
    {
        $organization ??= $this->organization;

        return Form::factory()->create([
            'organization_id' => $organization->id,
            'created_by' => $this->user->id,
        ]);
    }

    public function test_submission_requires_authentication(): void
    {
        $form = $this->createForm();

        $this->postJson("/api/forms/{$form->id}/entries", [
            'entryData' => ['form_fields' => [['label' => 'Nome', 'value' => 'Ada']]],
        ])->assertUnauthorized();
    }

    public function test_submission_is_rejected_for_another_organization(): void
    {
        $this->actingAs($this->user, 'sanctum');
        $form = $this->createForm(Organization::factory()->create());

        $this->postJson("/api/forms/{$form->id}/entries", [
            'entryData' => ['form_fields' => [['label' => 'Nome', 'value' => 'Ada']]],
        ])->assertForbidden();
    }

    public function test_submission_successfully_created_for_the_form(): void
    {
        $this->actingAs($this->user, 'sanctum');
        $form = $this->createForm();
        $formFields = [['label' => 'Nome', 'value' => 'Ada']];

        $this->postJson("/api/forms/{$form->id}/entries", [
            'entryData' => ['form_fields' => $formFields],
        ])
            ->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('entry.form_id', $form->id)
            ->assertJsonPath('entry.submitted_by', $this->user->name)
            ->assertJsonPath('entry.data', $formFields);

        $this->assertDatabaseHas('form_submissions', [
            'form_id' => $form->id,
        ]);
    }

    public function test_missing_entry_data_is_rejected(): void
    {
        $this->actingAs($this->user, 'sanctum');
        $form = $this->createForm();

        $this->postJson("/api/forms/{$form->id}/entries", [])
            ->assertUnprocessable();
    }

    public function test_entries_endpoint_returns_only_the_selected_form(): void
    {
        $this->actingAs($this->user, 'sanctum');
        $form = $this->createForm();
        $otherForm = $this->createForm();

        FormSubmission::create([
            'form_id' => $form->id,
            'data' => [['label' => 'Selected', 'value' => 'yes']],
            'submitted_by' => $this->user->name,
            'submitted_by_role' => $this->user->role,
        ]);
        FormSubmission::create([
            'form_id' => $otherForm->id,
            'data' => [['label' => 'Other', 'value' => 'no']],
            'submitted_by' => $this->user->name,
            'submitted_by_role' => $this->user->role,
        ]);

        $this->getJson("/api/forms/{$form->id}/entries")
            ->assertOk()
            ->assertJsonCount(1, 'entries')
            ->assertJsonPath('entries.0.form_id', $form->id);
    }

    public function test_entries_endpoint_rejects_another_organization(): void
    {
        $this->actingAs($this->user, 'sanctum');
        $form = $this->createForm(Organization::factory()->create());

        $this->getJson("/api/forms/{$form->id}/entries")
            ->assertForbidden();
    }

    public function test_all_entries_endpoint_returns_entries_for_the_users_organization(): void
    {
        $this->actingAs($this->user, 'sanctum');
        $form = $this->createForm();
        $otherForm = $this->createForm(Organization::factory()->create());

        FormSubmission::create([
            'form_id' => $form->id,
            'data' => [['label' => 'Own form', 'value' => 'yes']],
            'submitted_by' => $this->user->name,
            'submitted_by_role' => $this->user->role,
        ]);
        FormSubmission::create([
            'form_id' => $otherForm->id,
            'data' => [['label' => 'Other form', 'value' => 'no']],
            'submitted_by' => $this->user->name,
            'submitted_by_role' => $this->user->role,
        ]);

        $this->getJson('/api/forms/entries')
            ->assertOk()
            ->assertJsonCount(1, 'entries')
            ->assertJsonPath('entries.0.form.id', $form->id)
            ->assertJsonPath('entries.0.form.creator.name', $this->user->name);
    }
}

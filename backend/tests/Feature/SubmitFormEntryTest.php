<?php

namespace Tests\Feature;

use GuzzleHttp\Promise\Create;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Concerns\AssertsStatusCodes;
use Tests\TestCase;
use App\Models\User;
use App\Models\Form;
use App\Models\FormSubmission;

class SubmitFormEntryTest extends TestCase
{
    /**
     * A basic feature test example.
     */

    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create([
            'role' => 'viewer'
        ]);

        $this->actingAs($this->user, 'sanctum');

    }

    protected $formFields = [
        ['label' => 'Nome', 'value' => 'Ada'],];

      private function createOwnForm(array $attributes = []): Form
      
{
    return Form::factory()->create(array_merge([
        'organization_id' => $this->user->organization_id,
    ], $attributes));

}
    public function test_form_submission_rejects_non_authenticated_user(): void
    {
        // 401 senza autenticazione, perché la route usa auth:sanctum

        $form = $this->createOwnForm([
            'name' => 'test'
        ]);
     
        $this->app['auth']->forgetGuards();
       
        $this->postJson("/api/entries/submit", ['form_id' => $form->id])->assertUnauthorized();
        

        
    }

    // 400 se manca form_id.

    public function test_missing_form_id()
    {

        $formFields = [
        ['label' => 'Nome', 'value' => 'Ada'],
    ];


        $response = $this->postJson("/api/entries/submit", [
            'entryData' => [ 
            'form_fields' =>$formFields]
        ]);

        $response->assertStatus(400);
    }

//     404 se form_id non corrisponde a nessun form.

public function test_form_id_not_existing()
{
     $formFields = [
        ['label' => 'Nome', 'value' => 'Ada'],
    ];

    $response = $this->postJson("/api/entries/submit", [
        'form_id' => 0,
        'entryData' => [ 
            'form_fields' =>$formFields]

    ]);

    $response->assertStatus(404);
}
// 200 con dati validi e creazione corretta della FormSubmission.

public function test_submission_successfully_created_with_valid_data()
{
    $form = Form::factory()->create([
        'name' => 'test'
    ]);

     $formFields = [
        ['label' => 'Nome', 'value' => 'Ada'],
    ];

    $response = $this->postJson("/api/entries/submit", [
        'form_id' => $form->id,
        'entryData' => [ 
            'form_fields' =>$formFields]
    ]);

    $response->assertStatus(200)
      ->assertOk()
        ->assertJsonPath('success', true)
        ->assertJsonPath('entry.form_id', $form->id)
        ->assertJsonPath('entry.submitted_by', $this->user->name)
        ->assertJsonPath('entry.data', $formFields);

    $this->assertDatabaseHas('form_submissions', [
        'form_id' => $form->id,
    ]);
}

// Verifica della persistenza JSON di entryData.form_fields.


public function test_json_data_in_db(): void
{
    $form = $this->createOwnForm();
    $formFields = [
        ['label' => 'Nome', 'value' => 'Ada'],
    ];

    $response = $this->postJson('/api/entries/submit', [
        'form_id' => $form->id,
        'entryData' => [
            'form_fields' => $formFields,
        ],
    ]);

    $response->assertOk();

    $submission = FormSubmission::findOrFail(
        $response->json('entry.id')
    );

    $this->assertSame($formFields, $submission->data);
}


public function test_missing_entry_data()
{

    $form = $this->createOwnForm();
      $response = $this->postJson('/api/entries/submit', [
        'form_id' => $form->id,
        
    ]);

    $response->assertStatus(422);
}
// 500 se avviene un errore durante la creazione del record.

public function test_error_during_record_creation()
{
    $form = $this->createOwnForm();

      FormSubmission::creating(function () {
        throw new \RuntimeException('Errore simulato');
    });
      $response = $this->postJson('/api/entries/submit', [
        'form_id' => $form->id,
        'entryData' => [
        'form_fields' => $this->formFields ]
        
    ]);

    $response->assertStatus(500);


  
}
}

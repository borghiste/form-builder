<?php

namespace Tests\Feature;

use App;
use App\Models\FormField;
use App\Models\Organization;
use DB;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\Form;
use App\Models\User;
use Tests\TestCase;

class UpdateFormTest extends TestCase
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
            'role' => 'admin'
        ]);
        $this->actingAs($this->user, 'sanctum');
    }

    private function createOwnForm(array $attributes = []): Form
{
    return Form::factory()->create(array_merge([
        'organization_id' => $this->user->organization_id,
    ], $attributes));
}
   public function test_update_form_name_and_description(): void
{
   $form = Form::factory()->create([
    'name' => 'old name',
    'description' => 'old description',
    'organization_id' => $this->user->organization_id
   ]);


   $response = $this->putJson("/api/forms/{$form->id}", [
    'name' => 'new name',
    'description' => 'new description'
   ]);

   $response->assertOk();

   
   $this->assertDatabaseHas('forms', [
       'id'   => $form->id,
       'name' => 'new name',
       'description' => 'new description'
       ]);
       
}

public function test_form_list_only_returns_forms_from_the_users_organization(): void
{
    $ownForm = $this->createOwnForm();
    $otherOrganizationForm = Form::factory()->create();

    $response = $this->getJson('/api/forms');

    $response->assertOk()
        ->assertJsonCount(1)
        ->assertJsonPath('0.id', $ownForm->id);

    $this->assertNotSame(
        $ownForm->organization_id,
        $otherOrganizationForm->organization_id
    );
}

public function test_update_form_replaces_its_fields_and_returns_the_updated_form(): void
{
    $form = $this->createOwnForm();
    $oldField = $form->formFields()->create([
        'label' => 'Old field',
        'type' => 'text',
        'required' => false,
        'order' => 0,
    ]);

    $response = $this->putJson("/api/forms/{$form->id}", [
        'name' => 'Updated form',
        'description' => null,
        'form_fields' => [
            [
                'label' => 'Email',
                'type' => 'email',
                'required' => true,
            ],
        ],
    ]);

    $response->assertOk()
        ->assertJsonPath('form.name', 'Updated form')
        ->assertJsonPath('form.form_fields.0.label', 'Email');

    $this->assertDatabaseMissing('form_fields', ['id' => $oldField->id]);
    $this->assertDatabaseHas('form_fields', [
        'form_id' => $form->id,
        'label' => 'Email',
        'type' => 'email',
        'required' => true,
        'order' => 0,
    ]);
}

public function test_update_form_requires_name(): void
{
    $form = $this->createOwnForm(['name' => 'old name']);

    $response = $this->putJson("/api/forms/{$form->id}", [
        'description' => 'new description',
        
    ]);

    $response->assertStatus(422);
    $this->assertDatabaseHas('forms', [
        'id'   => $form->id,
        'name' => 'old name',
    ]);
}


// Aggiornamento con successo di solo nome

// PUT con solo name
// verifica che description resti invariato
// status 200
public function test_update_only_form_name()
{
    $form = $this->createOwnForm(['name' => 'old name',
    'description' => 'old description',
    
    ]);

      $response = $this->putJson("/api/forms/{$form->id}", [
        'name' => 'new name',
        
    ]);
    $response->assertStatus(200);
    $this->assertDatabaseHas('forms', [
        'name' => 'new name',
        'description' => 'old description'
    
    ]);

}

// Aggiornamento con successo di solo descrizione

// PUT con solo description
// verifica che name resti invariato
public function test_update_only_form_description()
{
    $form = $this->createOwnForm([
        'name' => 'old name',
    'description' => 'old description',
    
    ]);

      $response = $this->putJson("/api/forms/{$form->id}", [
      'name' => 'old name',  
      'description' => 'new description'
      
        
    ]);
    $response->assertStatus(200);
    $this->assertDatabaseHas('forms', [
        'name' => 'old name',
        'description' => 'new description'
    
    ]);

}

// Validazione name vuoto / null

// name = null o stringa vuota
// status 422
// record non aggiornato

public function test_do_not_update_form_when_name_is_empty()
{
    $form = $this->createOwnForm(['name' => 'name',
    
    ]);

    $response = $this->putJson("/api/forms/{$form->id}", [
      'name' => ''
        
    ]);
    $response->assertStatus(422);
    $this->assertDatabaseHas('forms', [
        'name' => 'name'
    
    ]);
}

// Validazione lunghezza / contenuto non valido

// se la regola prevede max length o trim rules
// test per stringa troppo lunga / whitespace only


public function test_update_form_rejects_blank_name_after_trim(): void
{
    $form = $this->createOwnForm([
        'name' => 'old name',
        'description' => 'old description',
      
    ]);

    $response = $this->putJson("/api/forms/{$form->id}", [
        'name' => '   ',
        'description' => 'new description',
    ]);

    $response->assertStatus(422);

    $this->assertDatabaseHas('forms', [
        'id' => $form->id,
        'name' => 'old name',
        'description' => 'old description',
    ]);
}

public function test_update_form_rejects_long_description(): void
{
    $form = $this->createOwnForm([
        'name' => 'old name',
        'description' => 'old description',
        
    ]);

    $response = $this->putJson("/api/forms/{$form->id}", [
        'name' => '   ',
        'description' => fake()->paragraphs(3, true),

    ]);

    $response->assertStatus(422);

    $this->assertDatabaseHas('forms', [
        'id' => $form->id,
        'name' => 'old name',
        'description' => 'old description',
    ]);
}

// Form non trovato

// chiamata a /api/forms/999999
// status 404
// nessuna modifica nel DB
// Utente non autorizzato

    public function test_update_form_not_found()
    {
          $form = Form::factory()->create([
        'name' => 'old name',
        'description' => 'old description',
        
    ]);

        $response = $this->putJson("/api/forms/999999",[
            'name' => 'new name',
            'description' => 'new description'
        ]);

        $response->assertStatus(404);

         $this->assertDatabaseCount('forms', 1);

        $this->assertDatabaseHas('forms', [
        'id' => $form->id,
        'name' => 'old name',
        'description' => 'old description']);
    }

// form appartenente a un’altra organizzazione / altro utente
// status 403 o 404 (a seconda della policy)
// verifica che non sia aggiornabile
// Utente autenticato ma senza permessi


public function test_update_form_without_permission_is_forbidden(): void
{
    $owner = User::factory()->create();
    $otherUser = User::factory()->create([
        'organization_id' => Organization::factory()->create()->id,
    ]);

    $form = $this->createOwnForm([
        'name'            => 'old name',
        'description'     => 'old description',
        
    ]);

    $this->actingAs($otherUser, 'sanctum');

    $response = $this->putJson("/api/forms/{$form->id}", [
        'name' => 'should not update',
    ]);

    $response->assertStatus(403);

    $this->assertDatabaseHas('forms', [
        'id'              => $form->id,
        'name'            => 'old name',
       
    ]);
}




// controllo accesso su endpoint

public function test_update_form_requires_authentication(): void
{
    $form = $this->createOwnForm(['name' => 'old name']);

    
    $this->app['auth']->forgetGuards();

    $response = $this->putJson("/api/forms/{$form->id}", [
        'name' => 'should not update',
    ]);

    $response->assertStatus(401);

    $this->assertDatabaseHas('forms', [
        'id'   => $form->id,
        'name' => 'old name',
    ]);
}
// Aggiornamento con dati identici

public function test_update_form_with_identical_data_succeeds(): void
{
    $form = $this->createOwnForm([
        'name'        => 'same name',
        'description' => 'same description',
    ]);

    $response = $this->putJson("/api/forms/{$form->id}", [
        'name'        => 'same name',
        'description' => 'same description',
    ]);

    $response->assertOk();
    $response->assertStatus(200);

    $this->assertDatabaseHas('forms', [
        'id'          => $form->id,
        'name'        => 'same name',
        'description' => 'same description',
    ]);
}

public function test_update_form_requires_admin_role(): void
{
    $viewer = User::factory()->create([
        'organization_id' => $this->user->organization_id,  
        'role' => 'viewer'
        
        
    ]);

    $form = $this->createOwnForm(['name' => 'old name']);

    $this->actingAs($viewer, 'sanctum');

    $response = $this->putJson("/api/forms/{$form->id}", [
        'name' => 'should not update',
    ]);

    $response->assertStatus(403);

    $this->assertDatabaseHas('forms', [
        'id'   => $form->id,
        'name' => 'old name',
    ]);
}

}

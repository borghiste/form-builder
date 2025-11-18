<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Form;
use App\Models\FormField;

class FormListController extends Controller
{
    // Get forms list from database
    public function getFormList(){
        $forms = Form::with('formFields')->get();
        return response()->json($forms);
    }

    // Insert new form into database
    // public function createNewForm(Request $request){
    //     \Log::info('=== INIZIO CREAZIONE FORM ===');
    //     \Log::info('Raw request:', $request->all());
        
    //     try {
    //         $validated = $request->validate([
    //             'name' => 'required|string|max:255',
    //             'description' => 'nullable|string',
    //             'form_fields' => 'required|array|min:1',
    //             'form_fields.*.label' => 'required|string|max:255',
    //             'form_fields.*.type' => 'required|string|max:255',
    //             'form_fields.*.required' => 'boolean| nullable',
    //         ]);
            
    //         \Log::info('Validation OK:', $validated);

    //         $form = Form::create([
    //             'name' => $validated['name'],
    //             'description' => $validated['description'] ?? null
    //         ]);
            
    //         \Log::info('Form creato, ID:', ['form_id' => $form->id]);

    //         foreach ($validated['form_fields'] as $index => $field) {
    //             \Log::info("Tentativo creazione field $index:", $field);
                
    //             $formField = $form->formFields()->create([
    //                 'label' => $field['label'],
    //                 'type' => $field['type'],
    //                 'required' => $field['required'] ?? false,
    //                 'order' => $index,
    //             ]);
                
    //             \Log::info("Field creato, ID:", ['field_id' => $formField->id]);
    //         }

    //         \Log::info('=== FINE CREAZIONE FORM ===');

    //         return response()->json([
    //             'message' => 'Form created successfully',
    //             'data' => $form->load('formFields')
    //         ], 201);
            
    //     } catch (\Exception $e) {
    //         \Log::error('ERRORE:', [
    //             'message' => $e->getMessage(),
    //             'trace' => $e->getTraceAsString()
    //         ]);
            
    //         return response()->json([
    //             'error' => $e->getMessage()
    //         ], 500);
    //     }
    // } 

    // Delete form from database
    public function deleteForm($formId){
        $form = Form::findOrFail($formId);
        $form->delete();
        return response()->json(['message' => 'Form deleted']);
    }
}
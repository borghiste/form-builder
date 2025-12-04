<?php

namespace App\Http\Controllers;
 use App\Models\Form;
 use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class FormController extends Controller
{
    // get form
    public function getForm( string $formId){
        $form = Form::with('formFields')->findOrFail($formId);
        return response()->json($form);
         
    }


    // create a new form
    public function createNewForm( Request $request){
        // implementation od creating a new form

        $validate = $request->validate([
            'name'=> 'required|string|max:255',
            'description'=>'nullable|string',
            'form_fields'=> 'required|array|min:1', 
            'form_fields.*.label' => 'required|string|max:255',
            'form_fields.*.type' => 'required|string|max:255',
            'form_fields.*.required' => 'boolean']);

            $newForm = Form::create(([
                'name'=> $validate['name'],
                'description'=>$validate['description'] ?? null
            ]));
foreach($validate['form_fields'] as $index => $field){
    $newForm->formFields()->create([
        'label'=> $field['label'],
        'type'=> $field['type'],
        'required'=> $field['required'] ?? false,
        'order'=> $index
    ]);
};
return response()->json($newForm->load('formFields'));

    }

    // UPDATE FORM
    public function updateForm(Request $request)
{
    logger()->info('1 - Incoming form data', ['data' => $request->all()]);
    
    // Converti required in boolean E filtra gli ID temporanei
    $data = $request->all();
    if (isset($data['form_fields'])) {
        foreach ($data['form_fields'] as &$field) {
            // Converti required in boolean
            $field['required'] = filter_var($field['required'] ?? false, FILTER_VALIDATE_BOOLEAN);
            
            // Se l'ID non è numerico, rimuovilo (è un ID temporaneo del frontend)
            if (isset($field['id']) && !is_numeric($field['id'])) {
                unset($field['id']);
            }
        }
    }
    
    logger()->info('2 - Data dopo conversione e pulizia', ['data' => $data]);
    
    try {
        $validated = validator($data, [
            'id' => 'required|integer|exists:forms,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'form_fields' => 'required|array|min:1',
            'form_fields.*.id' => 'nullable|integer|exists:form_fields,id',
            'form_fields.*.label' => 'required|string|max:255',
            'form_fields.*.type' => 'required|string|in:text,email,number,textarea,select,checkbox,radio,date,time,select',
            'form_fields.*.required' => 'boolean',
            'form_fields.*.order' => 'nullable|integer'
        ])->validate();
        
        logger()->info('3 - Validation passed', ['validated' => $validated]);
        
    } catch (\Illuminate\Validation\ValidationException $e) {
        
        
        return response()->json([
            'message' => 'Validation failed',
            'errors' => $e->errors()
        ], 422);
    }
    
    try {
        DB::beginTransaction();
        logger()->info('4 - Transaction started');
        
        $form = Form::findOrFail($validated['id']);
        logger()->info('5 - Form found', ['form_id' => $form->id]);
        
        // Update form data
        $form->update([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? null,
        ]);
        
        logger()->info('6 - Form name updated', ['new_name' => $form->name]);
        
        // Get incoming field IDs (solo quelli numerici esistenti)
        $incomingIds = collect($validated['form_fields'])
            ->pluck('id')
            ->filter(fn($id) => !empty($id) && is_numeric($id))
            ->toArray();
        
        logger()->info('7 - Incoming field IDs', ['ids' => $incomingIds]);
        
        // Delete removed fields
        if (!empty($incomingIds)) {
            $deletedCount = $form->formFields()
                ->whereNotIn('id', $incomingIds)
                ->delete();
        } else {
            // Se non ci sono ID esistenti, elimina tutti i campi vecchi
            $deletedCount = $form->formFields()->delete();
        }
        
        logger()->info('8 - Deleted fields', ['count' => $deletedCount]);
        
        // Update or create fields
        foreach ($validated['form_fields'] as $index => $fieldData) {
            logger()->info('9 - Processing field', [
                'index' => $index,
                'has_id' => !empty($fieldData['id']),
                'field_id' => $fieldData['id'] ?? 'new',
                'label' => $fieldData['label']
            ]);
            
            if (!empty($fieldData['id'])) {
                // Update existing field
                $affectedRows = FormField::where('id', $fieldData['id'])
                    ->where('form_id', $form->id)
                    ->update([
                        'label' => $fieldData['label'],
                        'type' => $fieldData['type'],
                        'required' => $fieldData['required'],
                        'order' => $index,
                    ]);
                
                logger()->info('10 - Field updated', [
                    'field_id' => $fieldData['id'],
                    'affected_rows' => $affectedRows
                ]);
            } else {
                // Create new field
                $newField = $form->formFields()->create([
                    'label' => $fieldData['label'],
                    'type' => $fieldData['type'],
                    'required' => $fieldData['required'],
                    'order' => $index,
                ]);
                
                logger()->info('11 - New field created', ['field_id' => $newField->id]);
            }
        }
        
        DB::commit();
        logger()->info('12 - Transaction committed');
        
        $updatedForm = $form->fresh()->load('formFields');
        
        logger()->info('13 - Final form', ['form' => $updatedForm->toArray()]);
        
        return response()->json([
            'message' => 'Form updated successfully',
            'data' => $updatedForm
        ]);
        
    } catch (\Exception $e) {
        DB::rollBack();
        
        logger()->error('ERROR', [
            'message' => $e->getMessage(),
            'line' => $e->getLine(),
            'file' => $e->getFile()
        ]);
        
        return response()->json([
            'message' => 'Failed to update form',
            'error' => $e->getMessage()
        ], 500);
    }
}

}
    
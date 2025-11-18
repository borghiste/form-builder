<?php

namespace App\Http\Controllers;
 use App\Models\Form;

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

}
    
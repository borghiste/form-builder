<?php

namespace App\Http\Controllers;
 use App\Models\Form;

use Illuminate\Http\Request;

class FormController extends Controller
{
    // get form
    public function getForm( string $formId){
        $form = Form::findOrFail($formId);
        return response()->json($form);
    }


    // save form
    public function saveForm(Request $request){
    
    
        $form = Form::create(['name'=> $request->name]);
        return response()->json($form);}

    
    

}
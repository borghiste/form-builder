<?php

namespace App\Http\Controllers;
 use App\Models\Form;

use Illuminate\Http\Request;

class FormController extends Controller
{
    public function getForm( string $formId){
        $form = Form::findOrFail($formId);
        return response()->json($form);
    }
}

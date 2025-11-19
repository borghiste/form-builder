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


    // Delete form and its related fields from database
    public function deleteForm($formId){
        $form = Form::findOrFail($formId);
        $formFields = FormField::where('form_id', $formId)->get();
        $form->delete();
        $formFields->each->delete();
        return response()->json(['message' => 'Form deleted']);
    }
}
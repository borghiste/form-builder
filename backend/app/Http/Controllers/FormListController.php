<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Form;
use Symfony\Component\Console\Input\Input;

class FormListController extends Controller
{
    // get forms list from database
    public function getFormList(){
        $forms = Form::all();
        return response()->json($forms);
    }

    // insert new form into database
    public function addNewForm(Request $request){

                        $request->validate(['name' => 'string|max:255']);
                    $newForm = Form::create($request->only(['name']));
                    return response()->json($newForm);
                        }


    // delete new form from database
      public function deleteForm($formId){

                              $form = Form::findOrFail($formId);
                              $form->delete();
                              return response()->json(['message'=> 'form deleted']);
                    
                          }

    
  
                        
                            
                        } 

                    



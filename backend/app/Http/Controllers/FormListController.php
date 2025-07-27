<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Form;
use Symfony\Component\Console\Input\Input;

class FormListController extends Controller
{
    public function getFormList(){
        $forms = Form::all();
        return response()->json($forms);
    }

    public function addNewForm(Request $request){

                        $request->validate(['name' => 'string|max:255']);
                    $newForm = Form::create($request->only(['name']));
                    return response()->json($newForm);
                        }

    
  
                        
                            
                        } 

                    



<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Form;

class FormListController extends Controller
{
    public function getFormList(){
        $forms = form::all();
        return response()->json($forms);
    }
}

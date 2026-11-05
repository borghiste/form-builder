<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FormSubmission;

class FormEntriesController extends Controller
{
    // Get entries list from database
    public function getFormsEntries()
    {
        $entries = FormSubmission::all();

      
       
         
    

        return response()->json($entries);
    }
}

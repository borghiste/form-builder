<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FormEntry;

class FormEntriesController extends Controller
{
    // Get entries list from database
    public function getFormsEntries()
    {
        $entries = FormEntry::all();

      
       
         
    

        return response()->json($entries);
    }
}

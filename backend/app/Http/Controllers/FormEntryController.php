<?php

namespace App\Http\Controllers;
use App\Models\FormEntry;
use Illuminate\Http\Request;

class FormEntryController extends Controller
{


public function submitFormEntry(Request $request){
    \Log::info('=== START ===');
    \Log::info('Request data:', $request->all());
    
    // Test 1: Can we even reach here?
    if (!$request->has('form_id')) {
        return response()->json(['error' => 'No form_id'], 400);
    }
    
    // Test 2: Does the form exist?
    $form = \App\Models\Form::find($request->form_id);
    if (!$form) {
        return response()->json(['error' => 'Form not found'], 404);
    }
    
    // Test 3: Try to create entry
    try {
        $entry = FormEntry::create([
            'form_id' => $request->form_id,
            'form_version' => 1, // Default version
            'data' => $request->entryData['form_fields']
        ]);
        
        return response()->json(['success' => true, 'entry' => $entry]);
        
    } catch (\Exception $e) {
        \Log::error('Database error: ' . $e->getMessage());
        return response()->json(['error' => $e->getMessage()], 500);
    }
}
     }
    


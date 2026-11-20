<?php

namespace App\Http\Controllers;
use App\Models\FormSubmission;
use Illuminate\Http\Request;

class FormEntryController extends Controller
{


public function submitFormEntry(Request $request){

$request->validate([
    'entryData.form_fields' => ['required', 'array']
]);

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
        $entry = FormSubmission::create([
            'form_id' => $request->form_id,
            'form_version' => 1,
            'data' => $request->input('entryData.form_fields'),
            'submitted_by' => $request->user()->name,
            'submitted_by_role' => $request->user()->role,
        ]);
        
        return response()->json(['success' => true, 'entry' => $entry]);
        
    } catch (\Exception $e) {
        \Log::error('Database error: ' . $e->getMessage());
        return response()->json(['error' => $e->getMessage()], 500);
    }
}
     }
    

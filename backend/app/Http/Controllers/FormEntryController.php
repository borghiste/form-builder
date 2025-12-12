<?php

namespace App\Http\Controllers;
use app\Models\FormEntry;
use Illuminate\Http\Request;

class FormEntryController extends Controller
{

  public function submitFormEntry(Request $request)
{
    // Validazione
    $validated = $request->validate([
        'form_id' => 'required|integer|exists:forms,id',
        'data' => 'required|array'
    ]);

    // Saving in DB
    $entry = FormEntry::create($validated);

    // Ritorna l'oggetto salvato al frontend
    return response()->json([
        'message' => 'Saved successfully',
        'entry' => $entry
    ]);
}

    }
    


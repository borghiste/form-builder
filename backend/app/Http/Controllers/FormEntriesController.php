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

        // Decodifichiamo il campo 'data' se è JSON
        $entries->transform(function ($entry) {
            if (isset($entry->data)) {
                $decoded = json_decode($entry->data, true); // true = array associativo
                $entry->data = $decoded ?: $entry->data; // se non è JSON valido rimane stringa
            }
            return $entry;
        });

        return response()->json($entries);
    }
}

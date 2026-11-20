<?php

namespace App\Http\Controllers;

use App\Models\FormSubmission;

class FormEntriesController extends Controller
{
    // Get entries list from database
    public function getFormsEntries()
    {
        $entries = FormSubmission::with([
            'form:id,name,created_by',
            'form.creator:id,name'
        ])->get();

        return response()->json($entries);
    }
}

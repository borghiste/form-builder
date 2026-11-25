<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\FormSubmission;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class FormEntryController extends Controller
{
    use AuthorizesRequests;

    public function submitFormEntry(Request $request, Form $form)
    {
        $this->authorize('submitEntry', $form);

        $validated = $request->validate([
            'entryData.form_fields' => ['required', 'array'],
        ]);

        try {
            $entry = FormSubmission::create([
                'form_id' => $form->id,
                'data' => $validated['entryData']['form_fields'],
                'submitted_by' => $request->user()->name,
                'submitted_by_role' => $request->user()->role,
            ]);

            return response()->json([
                'success' => true,
                'entry' => $entry,
            ]);
        } catch (\Throwable $exception) {
            report($exception);

            return response()->json([
                'error' => 'Unable to submit form entry.',
            ], 500);
        }
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\FormSubmission;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class FormEntriesController extends Controller
{
    use AuthorizesRequests;

    public function getAllFormsEntries(Request $request)
    {
        $entries = FormSubmission::query()
            ->whereHas('form', fn ($query) =>
                $query->where('organization_id', $request->user()->organization_id)
            )
            ->with(['form:id,name,created_by', 'form.creator:id,name'])
            ->latest()
            ->get();

        return response()->json(['entries' => $entries]);
    }

    public function getFormsEntriesByForm(Form $form)
    {
        $this->authorize('viewEntries', $form);

        $entries = FormSubmission::query()
            ->where('form_id', $form->id)
            ->with(['form:id,name,created_by', 'form.creator:id,name'])
            ->latest()
            ->get();

        return response()->json([
            'form_id' => $form->id,
            'entries' => $entries,
        ]);
    }
}

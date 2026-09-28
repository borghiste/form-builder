<?php

namespace App\Http\Controllers;

use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use App\Models\Invitation;
use Illuminate\Support\Facades\Auth;
use App\Services\SendInvitationsService;


class InvitationController extends Controller
{
   private SendInvitationsService $sendInvitationService;
    public function __construct()
    {
        $this->sendInvitationService = new SendInvitationsService();

    }
public function getInvitations()
{
    $user = Auth::user();
    
    $invitations = Invitation::where('organization_id', $user->organization_id)->get();
        
    return response()->json($invitations);
}

public function sendInvitations(Request $request)
 {
    $validated = $request->validate([
        'invitations' => 'required|array',
        'invitations.*.email' => 'required|email',
        'invitations.*.role' => 'required|string',
        'invitations.*.message' => 'nullable|string'
    ]);



    return $this->sendInvitationService->sendInvitations($validated['invitations'],
$request->user());

    

}

public function acceptInvitation(string $token, Request $request)
{
    $invitation = Invitation::where('token', $token)->firstOrFail();

    if ($invitation->accepted_at !== null) {
        return response()->json([
            'message' => 'This invitation has already been accepted.'
        ], 422);
    }

    if (!$invitation->expires_at || $invitation->expires_at->isPast()) {
        return response()->json([
            'message' => 'Invitation expired'
        ], 422);
    }

    $invitation->markAsAccepted();

    return response()->json([
        'message' => 'Invitation accepted successfully.',
        'redirect_to' => config('app.frontend_url') . '/register?token=' . $invitation->token,
        'invitation' => [
            'email' => $invitation->email,
            'role' => $invitation->role,
        ],
    ], 200);
}


}
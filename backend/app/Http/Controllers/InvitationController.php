<?php

namespace App\Http\Controllers;

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

public function acceptInvitation(Request $request, string $token)
{
    $invitation = Invitation::where('token', $token)->firstOrFail();
    
    // logica di accettazione...
    
    return response()->json(['message' => 'Invitation accepted']);
}
}

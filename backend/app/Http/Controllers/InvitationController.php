<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invitation;
use Illuminate\Support\Facades\Auth;

class InvitationController extends Controller
{
   // InvitationController.php
public function getInvitations()
{
    $user = Auth::user();
    
    $invitations = Invitation::where('organization_id', $user->organization_id)
        ->get();
        
    return response()->json($invitations);
}
}

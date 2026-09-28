<?php
namespace App\Services;

use App\Models\Invitation;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Mail;
use App\Mail\InvitationMail;

class SendInvitationsService
{
    public function sendInvitations(array $invitations, $invitedBy): void
    {
        foreach ($invitations as $item) {
            $invitation = Invitation::create([
                'organization_id' => $invitedBy->organization_id,
                'invited_by'      => $invitedBy->id,
                'user_id'         => $invitedBy->id,
                'email'           => $item['email'],
                'role'            => $item['role'],
                'message'         => $item['message'] ?? null,
                'status'          => 'pending',
                'token'           => Invitation::generateToken(),
                'expires_at'      => now()->addDays(7),
            ]);

            $invitationLink = URL::temporarySignedRoute(
                'invitations.accept',
                now()->addDays(7),
                ['token' => $invitation->token]
            );

            
          
            
            Mail::to($invitation->email)->queue(new InvitationMail(
                $invitationLink,
                $item['role'],
                $item['message'] ?? null,
                $invitedBy
            ));
        }
    }
}
<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class InvitationMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public string $invitedBy,
    public string $role,
    public ?string $invitationMessage,
    public string $invitationLink
    )       
    {}

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $invitedBy = $this->invitedBy;
        return new Envelope(
            subject: $invitedBy.' Invitation Email',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.invitationMail',
            with: ['url' => $this->invitationLink, 
            'message' => $this->invitationMessage, 
            'role' => $this->role, 
            'invitedBy' => $this->invitedBy],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}

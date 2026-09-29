<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Invitation extends Model 
{
    use HasFactory;
    protected $fillable = [
        'organization_id',
        'invited_by',
        'user_id',
        'email',
        'role',
        'message',
        'token',
        'status',
        'expires_at',
        'accepted_at',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'accepted_at' => 'datetime',
    ];

    // Relazioni
    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function inviter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'invited_by');
    }

    // Scopes
    public function scopePending($query)
    {
        return $query->where('status', 'pending')
                     ->where('expires_at', '>', now());
    }

    // Helpers
    public static function generateToken(): string
    {
        return Str::random(64);
    }

    public function isValid(): bool
    {
        return $this->status === 'pending' 
            && $this->expires_at->isFuture();
    }

    public function markAsAccepted(): void
    {
        $this->update([
            'status' => 'accepted',
            'accepted_at' => now(),
        ]);
    }

    public function revoke(): void
    {
        $this->update(['status' => 'revoked']);
    }
}

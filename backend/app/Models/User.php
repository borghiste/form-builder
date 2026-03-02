<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, SoftDeletes;

    protected $fillable = [
        'organization_id',
        'name',
        'email',
        'password',
        'role',
        'avatar_url',
        'is_active',
        'invited_by',
        'last_login_at',
        'last_login_ip',
        'preferences',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'last_login_at' => 'datetime',
        'email_verified_at' => 'datetime',
        'preferences' => 'array',
    ];

    // Relazioni
    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function createdForms(): HasMany
    {
        return $this->hasMany(Form::class, 'created_by');
    }

    public function formPermissions(): HasMany
    {
        return $this->hasMany(FormPermission::class);
    }

    public function inviter(): BelongsTo
    {
        return $this->belongsTo(User::class, 'invited_by');
    }

    public function invitedUsers(): HasMany
    {
        return $this->hasMany(User::class, 'invited_by');
    }

    public function activityLogs(): HasMany
    {
        return $this->hasMany(ActivityLog::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByRole($query, string $role)
    {
        return $query->where('role', $role);
    }

    // Permessi
    public function isOwner(): bool
    {
        return $this->role === 'owner';
    }

    public function isAdmin(): bool
    {
        return in_array($this->role, ['owner', 'admin']);
    }

    public function isEditor(): bool
    {
        return $this->role === 'editor';
    }

    public function isViewer(): bool
    {
        return $this->role === 'viewer';
    }

    public function canManageTeam(): bool
    {
        return $this->isAdmin();
    }

    public function canManageBilling(): bool
    {
        return $this->isOwner();
    }

    public function canCreateForms(): bool
    {
        return in_array($this->role, ['owner', 'admin', 'editor']);
    }

    public function canEditForm(Form $form): bool
    {
        if ($this->isAdmin()) {
            return true;
        }

        if ($form->created_by === $this->id) {
            return true;
        }

        $permission = $this->formPermissions()
            ->where('form_id', $form->id)
            ->first();

        return $permission && in_array($permission->permission, ['edit', 'admin']);
    }

    public function canViewForm(Form $form): bool
    {
        if ($this->isAdmin()) {
            return true;
        }

        if ($form->created_by === $this->id) {
            return true;
        }

        if ($form->is_shared) {
            return true;
        }

        return $this->formPermissions()
            ->where('form_id', $form->id)
            ->exists();
    }
}

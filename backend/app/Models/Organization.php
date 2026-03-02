<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\User;
use App\Models\Form;
use App\Models\Folder;
use App\Models\Invitation;
use App\Models\ActivityLog;


class Organization extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'subdomain',
        'slug',
        'plan|default:free',
        'max_users',
        'max_forms',
        'max_responses_per_month',
        'settings',
        'is_active',
        'trial_ends_at',
        'subscription_ends_at',
    ];

    protected $casts = [
        'custom_branding' => 'array',
        'settings' => 'array',
        'is_active' => 'boolean',
        'trial_ends_at' => 'datetime',
        'subscription_ends_at' => 'datetime',
    ];

    // Relazioni
    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function forms(): HasMany
    {
        return $this->hasMany(Form::class);
    }

    public function folders(): HasMany
    {
        return $this->hasMany(Folder::class);
    }

    public function invitations(): HasMany
    {
        return $this->hasMany(Invitation::class);
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

    public function scopeBySubdomain($query, string $subdomain)
    {
        return $query->where('subdomain', $subdomain);
    }

    // Helpers
    public function isOnTrial(): bool
    {
        return $this->trial_ends_at && $this->trial_ends_at->isFuture();
    }

    public function hasActiveSubscription(): bool
    {
        return $this->subscription_ends_at && $this->subscription_ends_at->isFuture();
    }

    public function canAddUser(): bool
    {
        return $this->users()->count() < $this->max_users;
    }

    public function canAddForm(): bool
    {
        return $this->forms()->count() < $this->max_forms;
    }

    public function getUsageStats(): array
    {
        return [
            'users' => [
                'current' => $this->users()->count(),
                'max' => $this->max_users,
                'percentage' => ($this->users()->count() / $this->max_users) * 100,
            ],
            'forms' => [
                'current' => $this->forms()->count(),
                'max' => $this->max_forms,
                'percentage' => ($this->forms()->count() / $this->max_forms) * 100,
            ],
        ];
    }
}


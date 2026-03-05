<?php

namespace App\Services;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class RegistrationService
{
    //* Handle the registration of a new organization and its owner.

    public function execute(array $data): array
    {
        Log::info('Creating organization');
        return DB::transaction(function () use ($data) {

            $plan = $data['plan'] ?? 'free';
            $subdomain = Str::slug($data['organization_name']);

            $organization = Organization::create([
                'name' => $data['organization_name'],
                'subdomain' => $subdomain,
                'slug' => $subdomain,
                'max_users' => 3,
                'max_forms' => 3,
                'trial_ends_at' => now()->addDays(14),
            ]);

            $user = User::create([
                'organization_id' => $organization->id,
                'name' => $data['owner_name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'role' => 'owner',
                'is_active' => true
                
            ]);

            $token = $user->createToken('auth-token')->plainTextToken;

            return compact('organization', 'user', 'token');
        });
    }

    private function getMaxUsers(string $plan): int
    {
        return match($plan) {
            'free' => 1,
            'pro' => 5,
            'enterprise' => 999,
            default => 1
        };
    }
    private function getMaxForms(string $plan): int
          {
              return match($plan) {
                  'free' => 3,
                  'pro' => 50,
                  'enterprise' => 999,
                  default => 3
              };
}
}
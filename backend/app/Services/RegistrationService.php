<?php

namespace App\Services;
use App\Mail\WelcomeEmail;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Mail;

class RegistrationService
{
    //* Handle the registration of a new organization and its owner.

    public function registration(array $data): array
    {
       
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

            $magicLink = URL::temporarySignedRoute(
                'login.verify',
                now()->addMinutes(15),
                ['user' => $user->id]
            );

            // $token = $user->createToken('auth-token')->plainTextToken;


        Mail::to($user->email)->queue(new WelcomeEmail($user->name, $magicLink));
            return compact('organization', 'user', 'magicLink');
        });
    }

}
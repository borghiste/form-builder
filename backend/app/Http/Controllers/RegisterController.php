<?php

namespace App\Http\Controllers;

use App\Models\Invitation;
use App\Models\User;
use App\Services\RegistrationService;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function __construct(
        protected RegistrationService $registrationService
    ) {}

    public function register(Request $request)
    {
        $data = $request->validate([
            'organization_name' => 'required|string|max:255',
            'owner_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'plan' => 'nullable|string|in:free,pro,enterprise',
        ]);

        try {
            $result = $this->registrationService->registration($data, $request);

            return response()->json([
                'message' => 'Registration successful. Please check your email for verification.',
                'organization' => $result['organization'],
                'user' => $result['user'],
            ]);
        } catch (\Throwable $e) {
            return response()->json(['message' => 'Registration failed. Please try again later.'], 500);
        }
    }

    public function registerInvitation(Request $request)
    {
        $validated = $request->validate([
            'token' => 'required|string',
            'name' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        $invitation = Invitation::where('token', $validated['token'])
            ->where('status', 'accepted')
            ->firstOrFail();

        if ($invitation->email !== $validated['email']) {
            return response()->json([
                'message' => "Email doesn't match the invitation."
            ], 422);
        }

        $user = User::create([
            'organization_id' => $invitation->organization_id,
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'role' => $invitation->role,
            'is_active' => true,
            'invited_by' => $invitation->invited_by,
        ]);

        $invitation->update([
            'user_id' => $user->id,
            'status' => 'accepted',
        ]);

        return response()->json(['user' => $user], 201);
    }
}
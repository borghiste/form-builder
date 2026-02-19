<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'company' => 'nullable|string|max:255',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Create a new user
        $user = \App\Models\User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'company' => $validatedData['company'] ?? null,
            'password' => bcrypt($validatedData['password']),
        ]);

        // Return a response (you can customize this as needed)
        return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
    }
}

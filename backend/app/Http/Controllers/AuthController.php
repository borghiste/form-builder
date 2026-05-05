<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Services\VerifyService;
use App\Models\User;
use App\Services\LoginService;
use Illuminate\Validation\ValidationException;





class AuthController extends Controller
{
 
    private LoginService $loginService;
    public function __construct()
    {
        $this->loginService = new LoginService();
        $this->VerifyService = new VerifyService();
    
    }
    // funzione per verificare l'email dell'utente. Viene chiamata quando l'utente clicca sul magic link di verifica inviato via email. Controlla se il tag di verifica corrisponde al timestamp dell'ultimo login dell'utente. Se la verifica ha successo, aggiorna il timestamp dell'ultimo login e la data di verifica dell'email, e reindirizza l'utente al subdominio appropriato del frontend in base alla sua organizzazione.
    public function verify(Request $request, User $user)
    {
        return $this->VerifyService->verify($request, $user);
    }

    public function getAuthenticatedUser(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'No authenticated user'], 401);
        }

        return response()->json([
            'message' => 'Authenticated user retrieved successfully',
            'user' => $user
        ], 200);
    }

 


    public function login(Request $request)
    {
        try {
            $validated = $request->validate([
                'email' => 'required|email',
                'password' => 'required|string',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Validation failed', 'errors' => $e->errors()], 422);
        }

        try {
            $result = $this->loginService->login($validated);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Login failed, please try again', 'error' => $e->getMessage()], 500);
        }

        return response()->json([
            'message' => 'Login successful',
            'user' => $result
        ], 200);
    }

}
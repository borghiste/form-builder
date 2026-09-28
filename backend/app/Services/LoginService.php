<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Auth\AuthenticationException;

use Illuminate\Support\Facades\Auth;

class LoginService
{
   // This method handles the login request. It validates the incoming request data, attempts to authenticate the user using the provided credentials, and returns a JSON response with the user's information if authentication is successful. If authentication fails, it returns an unauthorized message.
  
     public function login($request, array $credentials)
     {
        
        if(!Auth::attempt($credentials)) {
            throw new AuthenticationException('Invalid credentials');
        }
   

        $user = Auth::user()->load('organization');
        if($user->email_verified_at === null) {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            throw new AuthenticationException('Email not verified');
            
        }
        $request->session()->regenerate();
        return ['user' => $user,
        'organization' => $user ->organization];
        //  $token = $user->createToken('auth_token')->plainTextToken;
        // return [
        //     'user' => $user,
        //     'organization' => $user->organization,
        //      'token' => $token,
        //     'token-Type' => 'Bearer'];
     
}

}


<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use App\Services\RegistrationService;
use Illuminate\Support\Facades\Mail;
use App\Mail\WelcomeEmail;
use Illuminate\Validation\Exception;
use Illuminate\Support\Facades\Log;

class RegistrationController extends Controller
{

    private RegistrationService $registrationService;

   
    public function __construct(RegistrationService $registrationService)
    {
        $this->registrationService = $registrationService;
    }
 
    /**
  
     *  Owner Registration + Organization
     */

     public function register(Request $request)
     {
        Log::info('Registration attempt for email: ' . $request->input('email'));
        Log::info('validating data');
        $validated = $request->validate([
            'organization_name' => 'required|string|max:255',
            'owner_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        
        ]);
        Log::info('validated');
        try {
        $result = $this ->registrationService->execute($validated);
        } catch (\Exception $e)
        {
            return response()->json(['Registration failed, please try again'],500);
        }

        Mail::to($result['user']->email)->queue(new WelcomeEmail());
        
        return response()->json([
            'message' => 'Organization created successfully',
            'Organization' => $result['organization']
        ]);

     }
}


<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use App\Services\RegistrationService;
use Illuminate\Support\Facades\Mail;
use App\Mail\WelcomeEmail;
use Illuminate\Validation\Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
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
       
        $validated = $request->validate([
            'organization_name' => 'required|string|max:255',
            'owner_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',

        ]);
        
        try {
        $result = $this ->registrationService->registration($validated);
        } catch (\Exception $e)
        {
            return response()->json(['Registration failed, please try again'],500);
        }

        
     
        
        return response()->json([
            'message' => 'Organization created successfully',
            'Organization' => $result['organization']
        ]);


     }
}


<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Services\VerifyService;
use App\Models\User;
use App\Services\LoginService;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Validation\ValidationException;






class AuthController extends Controller
{
 
    private LoginService $loginService;
    private VerifyService $verifyService;

    public function __construct()
    {
        $this->loginService = new LoginService();
        $this->verifyService = new VerifyService();
    }
  
    public function verify(Request $request, User $user)
    {
        return $this->verifyService->verify($request, $user);
       
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
            //valiidate the incoming request data to ensure that the email and password fields are present and correctly formatted. If the validation fails, a ValidationException will be thrown, which is caught in the catch block to return a JSON response with the validation errors and a 422 status code.
            $credentials = $request->validate([
                'email' => 'required|email',
                'password' => 'required|string|min:8',
            ]);

            $result = $this->loginService->login($request, $credentials);

            return response()->json([
                'message' => 'Login successful',
                'user' => $result['user'],
                'organization' => $result['organization']
            ], 200);
            
        } 
        catch (ValidationException $e) {
            return response()->json(['message' => $e->getMessage(), 'errors' => $e->errors()], 422);
        }

        catch (AuthenticationException $e) {
            return response()->json(['message' => $e->getMessage()], 401);
        }

        

      
        
    }

}

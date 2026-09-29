<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Services\VerifyUserService;
use App\Models\User;
use App\Services\LoginService;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Validation\ValidationException;
use App\Services\RegistrationService;



class AuthController extends Controller
{
 
    private RegistrationService $registrationService;
    private LoginService $loginService;
    private VerifyUserService $verifyUserService;

    public function __construct()
    {
        $this->registrationService = new RegistrationService();
        $this->loginService = new LoginService();
        $this->verifyUserService = new verifyUserService();
    }
  

    public function  registerUser(Request $request)
    {
        $validated = $request->validate([
            'organization_name' => 'required|string|max:255',
            'owner_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $result = $this->registrationService->registration($validated);

        return response()->json([
            'message' => 'Registration successful. Please check your email for verification.',
            'organization' => $result['organization'],
            'user' => $result['user'],
        ], 200);

    }
//     public function registerUser(Request $request)
//     {
      
//        // prova validazioine dei dati di input ricevuti dalla richiesta. Se la validazione fallisce, viene registrato un messaggio di log con i dettagli degli errori e viene rilanciata l'eccezione di validazione. 
//        try {
      
//        $validated = $request->validate([
//            'organization_name' => 'required|string|max:255',
//            'owner_name' => 'required|string|max:255',
//            'email' => 'required|email|max:255|unique:users,email',
//            'password' => 'required|string|min:8|confirmed',

//        ]);
//    }
//    catch (ValidationException $e) {
//        Log::info('validation, failed', ['errors' => $e->errors()]);
//        throw $e;
//    }
//        Log::info('validated', ['validated' => $validated]);
       
//        try {
//            // se la validazione dei dati di input è riuscita, viene chiamato il metodo registration del servizio di registrazione per creare l'utente e l'organizzazione. Se si verifica un'eccezione durante questo processo, viene restituita una risposta JSON con un messaggio di errore e i dettagli dell'eccezione.
//        $result = $this ->registrationService->registration($validated, $request);
//        } catch (\Exception $e)
//        {
//            return response()->json([
//                'message' => 'Registration failed, please try again', 
//                'error' => $e->getMessage()], 500);
//        }


//        // se la registrazione è riuscita, viene restituita una risposta JSON con un messaggio di successo.
//        return response()->json([
//            'message' => 'Organization created successfully. You\'ll  receive an email with a link to verify your email and access your dashboard.',
           
//        ]);


//     }

    public function verifyUser(Request $request, User $user)
    {
        return $this->verifyUserService->verifyUser($request, $user);
       
    }

    public function getAuthenticatedUser(Request $request)
    {
        $user = $request->user()?->load('organization');

        if (!$user) {
            return response()->json(['message' => 'No authenticated user'], 401);
        }

        return response()->json([
            'message' => 'Authenticated user retrieved successfully',
            'user' => $user,
            'organization' => $user->organization,
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

    public function logout(Request $request)
    {
        $request->session()->invalidate();
        $request->session()->regenerateToken();


        return response()->json(['message' => 'Logout successful'], 200);
    }

}

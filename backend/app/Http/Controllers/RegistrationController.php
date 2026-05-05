<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\RegistrationService;
use Illuminate\Validation\ValidationException;
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
    // il metodo register del RegistrationController gestisce la registrazione di un nuovo utente e la creazione dell'organizzazione associata. 

     public function register(Request $request)
     {
       
        // prova validazioine dei dati di input ricevuti dalla richiesta. Se la validazione fallisce, viene registrato un messaggio di log con i dettagli degli errori e viene rilanciata l'eccezione di validazione. 
        try {
       
        $validated = $request->validate([
            'organization_name' => 'required|string|max:255',
            'owner_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',

        ]);
    }
    catch (ValidationException $e) {
        Log::info('validation, failed', ['errors' => $e->errors()]);
        throw $e;
    }
        Log::info('validated', ['validated' => $validated]);
        
        try {
            // se la validazione dei dati di input è riuscita, viene chiamato il metodo registration del servizio di registrazione per creare l'utente e l'organizzazione. Se si verifica un'eccezione durante questo processo, viene restituita una risposta JSON con un messaggio di errore e i dettagli dell'eccezione.
        $result = $this ->registrationService->registration($validated);
        } catch (\Exception $e)
        {
            return response()->json([
                'message' => 'Registration failed, please try again', 
                'error' => $e->getMessage()], 500);
        }


        // se la registrazione è riuscita, viene restituita una risposta JSON con un messaggio di successo.
        return response()->json([
            'message' => 'Organization created successfully. You\'ll  receive an email with a link to verify your email and access your dashboard.',
            
        ]);


     }
}


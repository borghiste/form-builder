<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\Request;

class VerifyService
{
    // metodo per verificare l'email dell'utente. Viene chiamato tramite il AuthController quando l'utente clicca sul magic link di verifica inviato via email. Controlla se il tag di verifica corrisponde al timestamp dell'ultimo login dell'utente. Se la verifica ha successo, aggiorna il timestamp dell'ultimo login e la data di verifica dell'email, e reindirizza l'utente al subdominio appropriato del frontend in base alla sua organizzazione.
    public function verify(Request $request, User $user)
    {
        $user = User::findOrFail($user->id);
        if ($request->query('tag') != ($user->last_login_at?->timestamp ?? 0)) {
        abort(403, 'Link is not valid');
        }
        $user->update(['last_login_at' => now(),
        'email_verified_at' => now()]);

        // autentica user
        Auth() ->login($user);

        $subdomain = $user->organization->subdomain; 
        $url = config('app.frontend_url') . '/' . $subdomain. '/forms';
        
        return redirect()->away($url);
    }
}
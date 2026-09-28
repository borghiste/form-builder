<?php

namespace App\Services;

use App\Mail\WelcomeEmail;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

class RegistrationService
{
   
     
    public function registration(array $data): array
    {
        try {
            // ---------------------------------------------------------------
            // DB::transaction garantisce atomicità:
            // se qualsiasi operazione fallisce, tutto viene rollbackato.
            // Il valore restituito dalla closure diventa il return della transaction.
            // ---------------------------------------------------------------
            $result = DB::transaction(function () use ($data) {

                // -----------------------------------------------------------
                // PIANO
                // Legge il piano scelto, default 'free'.
                // Viene usato per determinare i limiti dall'apposito config.
                // -----------------------------------------------------------
                $plan = $data['plan'] ?? 'free';

                // -----------------------------------------------------------
                // SUBDOMAIN UNIVOCO
                // Str::slug converte "Acme Corp" → "acme-corp".
                // Il while verifica nel DB se esiste già; se sì, aggiunge
                // un suffisso numerico: acme-corp-1, acme-corp-2, ecc.
                //
                // Race condition residua: due registrazioni simultanee
                // potrebbero superare il while con lo stesso valore prima
                // del commit. Il vincolo UNIQUE sul DB è la vera protezione;
                // questa logica è solo per generare un valore "pulito".
                // -----------------------------------------------------------
                $base      = Str::slug($data['organization_name']);
                $subdomain = $base;
                $i         = 1;

                while (Organization::where('subdomain', $subdomain)->exists()) {
                    $subdomain = $base . '-' . $i++;
                }

                // -----------------------------------------------------------
                // CREAZIONE ORGANIZATION
                // max_users e max_forms vengono letti da config/plans.php
                // in base al piano scelto, con fallback a 3.
                //
        
                // -----------------------------------------------------------
                $organization = Organization::create([
                    'name'          => $data['organization_name'],
                    'subdomain'     => $subdomain,
                    'slug'          => $subdomain,
                    'max_users'     => config("plans.{$plan}.max_users", 3),
                    'max_forms'     => config("plans.{$plan}.max_forms", 3),
                    'trial_ends_at' => now()->addDays(14),
                ]);

                // -----------------------------------------------------------
                // CREAZIONE USER (owner)
                // Hash::make usa bcrypt di default.
                // is_active = true: l'utente è subito attivo; l'accesso reale avviene solo cliccando il magic link nell'email.
                // -----------------------------------------------------------
                $user = User::create([
                    'organization_id' => $organization->id,
                    'name'            => $data['owner_name'],
                    'email'           => $data['email'],
                    'password'        => Hash::make($data['password']),
                    'role'            => 'owner',
                    'is_active'       => true
                 
                ]);

                // -----------------------------------------------------------
                // MAGIC LINK
                    // URL::temporarySignedRoute genera un URL signed with APP_KEY,
                // -----------------------------------------------------------
                $magicLink = URL::temporarySignedRoute(
                    'verify.email',
                    now()->addMinutes(60),
                    ['user' => $user->id,
                    'tag' => $user->last_login_at?->timestamp ?? 0]); // tag is added to invalidate old links if the user logs in again before using the magic link

                // -----------------------------------------------------------
                //  Email DB::afterCommit
                // -----------------------------------------------------------
                DB::afterCommit(function () use ($user, $magicLink) {
                    Mail::to($user->email)
                        ->queue(new WelcomeEmail($user->name, $magicLink));
                });

                // -----------------------------------------------------------
                // RETURN
                // Il magicLink viene deliberatamente escluso: è già stato consegnato ad afterCommit e non deve uscire dal service.
                //-----------------------------------------------------------
                return compact(
                 'organization',
                 'user');
            });

            return $result;

        } 
        catch (\Throwable $e) {
            // ---------------------------------------------------------------
            // LOGGING ERRORI
            // Logga email e messaggio di errore senza esporre dati sensibili
            // (no password, no magicLink).
            // L'eccezione viene rilanciata perché spetta al chiamante
            // ---------------------------------------------------------------
            Log::error('Registration failed', [
                'email' => $data['email'] ?? 'unknown',
                'error' => $e->getMessage(),
            ]);

            throw $e;
        }
    }
}
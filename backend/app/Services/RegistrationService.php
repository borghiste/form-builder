<?php

namespace App\Services;

use App\Mail\WelcomeEmail;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;

class RegistrationService
{
    /**
     * Registra una nuova organizzazione e il suo owner.
     *
     * @param  array $data  Dati validati dal Controller (organization_name, owner_name, email, password, plan?)
     * @return array        ['organization' => Organization, 'user' => User]
     * @throws \Throwable   Rilancia qualsiasi eccezione dopo averla loggata
     */
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
                    'is_active'       => true,
                ]);

                // -----------------------------------------------------------
                // MAGIC LINK
                // URL::temporarySignedRoute genera un URL firmato con APP_KEY,
                // valido 15 minuti, che punta alla route 'login.verify'.
                // La firma crittografica impedisce manomissioni dei parametri.
                // Il link NON viene restituito al chiamante: viaggia solo
                // via email per evitare esposizioni in log o API response.
                // -----------------------------------------------------------
                $magicLink = URL::temporarySignedRoute(
                    'verify.email',
                    now()->addMinutes(15),
                    ['user' => $user->id,
                    'tag' => $user->last_login_at?->timestamp ?? 0] // Aggiunta del timestamp per invalidare link vecchi 
                );

                // -----------------------------------------------------------
                // MAIL CON DB::afterCommit
                // Senza afterCommit, se la transaction fa rollback DOPO
                // che Mail::queue() è già stato chiamato, la mail partirebbe
                // comunque con dati che non esistono più nel DB.
                // afterCommit garantisce che il callback venga eseguito
                // SOLO se il commit ha avuto successo; in caso di rollback
                // il callback non viene mai invocato.
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

        } catch (\Throwable $e) {
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
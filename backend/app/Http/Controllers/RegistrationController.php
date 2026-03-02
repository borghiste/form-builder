<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\ActivityLog;
use Illuminate\Support\Facades\DB;
use App\Services\RegistrationService;

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
            'subdomain' => 'required|string|max:63|unique:organizations,subdomain|regex:/^[a-z0-9-]+$/',
            'plan' => 'nullable|in:free,pro,enterprise',
            'owner_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'password' => 'required|string|min:8|confirmed',
            
        ]);

        $result = $this ->registrationService->execute(($validated));

        return response()->json([
            'message' => 'Organization created successfully',
            'Organization' => $result['organization']
        ]);

     }
}

//      public function register(Request $request)
//      {

//          $validated = $request->validate([
//              'organization_name' => 'required|string|max:255',
//              'subdomain' => 'required|string|max:63|unique:organizations,subdomain|regex:/^[a-z0-9-]+$/',
//              'plan' => 'nullable| in:free,pro,enterprise',
//              'owner_name' => 'required|string|max:255',
//              'email' => 'required|email|max:255',
//              'password' => 'required|string|min:8|confirmed',
//          ]);
 
//          try {
//              DB::beginTransaction();
 
      
 
            
 
//              // Log activities
//              ActivityLog::create([
//                  'organization_id' => $organization->id,
//                  'user_id' => $user->id,
//                  'action' => 'organization_created',
//                  'entity_type' => 'organization',
//                  'entity_id' => $organization->id,
//                  'ip_address' => $request->ip(),
//                  'user_agent' => $request->userAgent(),
//              ]);
 
//              DB::commit();
 
//              // Generate token
//              $token = $user->createToken('auth-token')->plainTextToken;
 
//              return response()->json([
//                  'message' => 'Organization created successfully',
//                  'organization' => $organization,
//                  'user' => $user,
//                  'token' => $token,
//                  'workspace_url' => "https://{$organization->subdomain}." . config('app.domain'),
//              ], 201);
 
//          } catch (\Exception $e) {
//              DB::rollBack();
             
//              return response()->json([
//                  'error' => 'Failed to create organization',
//                  'message' => $e->getMessage()
//              ], 500);
//          }
//      }
 
//      private function getMaxUsers(string $plan): int
//      {
//          return match($plan) {
//              'free' => 1,
//              'pro' => 5,
//              'enterprise' => 999,
//              default => 1
//          };
//      }
 
//      private function getMaxForms(string $plan): int
//      {
//          return match($plan) {
//              'free' => 3,
//              'pro' => 50,
//              'enterprise' => 999,
//              default => 3
//          };
//      }
//  }


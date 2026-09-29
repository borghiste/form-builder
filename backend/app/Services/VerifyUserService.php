<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\Request;

class VerifyUserService
{

    public function verifyUser(Request $request, User $user)
    {
        $user = User::findOrFail($user->id);
        if ($request->query('tag') != ($user->last_login_at?->timestamp ?? 0)) {
        abort(403, 'Link is not valid');
        }
       
        $user->update(['last_login_at' => now(),
        'email_verified_at' => now()]);

       
        Auth() ->login($user);

        $subdomain = $user->organization->subdomain; 
        $url = config('app.frontend_url') . '/' . $subdomain. '/forms';
        
        return redirect()->away($url);
    }
}
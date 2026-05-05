<?php

namespace App\Services;

use GuzzleHttp\Psr7\Request;


class LoginService
{
   // This method handles the login request. It validates the incoming request data, attempts to authenticate the user using the provided credentials, and returns a JSON response with the user's information if authentication is successful. If authentication fails, it returns an unauthorized message.
  
     public function login($credntials)
     {
        if (auth()->attempt($credntials)) {
            $user = auth()->user();
            return $user;
        } else {
            throw new \Exception('Unauthorized');
        }
     }
}

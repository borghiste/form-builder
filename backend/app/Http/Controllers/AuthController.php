<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;




class AuthController extends Controller
{
    public function login( Request $request){
            $credentials = $request->validate([
                'email'=> 'required|email',
                'password'=>'required|string',
            ]);

            if(Auth::attempt($credentials)){
               Auth::attempt($credentials, true);
                    $user = Auth::user();
                   
                    return response()->json(['user' => $user]);
            }
            else{
                return response()->json(['message'=> 'unauthorized: email or password are invalid']);
            }
    }
}

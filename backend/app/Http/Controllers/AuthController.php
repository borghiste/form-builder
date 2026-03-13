<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;




class AuthController extends Controller
{
    public function verify(Request $request)
    {
        $response = [
            'message' => 'Email verification successful. You can now log in.',
        ];
        return response()->json($response);
    }
    public function login( Request $request){
            $credentials = $request->validate([
                 'email'=> 'required',
                'password'=>'required|string',
            ]);

            if(Auth::attempt($credentials)){
                
               
                    $user = Auth::user();
                   
           
                   
                    return response()->json(['user' => $user->only(['id', 'name', 'role'])]);
            }
            else{
                return response()->json(['message'=> 'unauthorized: email or password are invalid']);
            }
    }
    public function logout(Request $request){
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message'=> 'logged out successfully']);
        }
         
    }


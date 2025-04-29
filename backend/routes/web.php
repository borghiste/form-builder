<?php


use Illuminate\Support\Facades\Route;
use App\Models\User;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/hello', function(){
    return response()->json(['message' => 'hello world']);
});

Route::get('/users', function(){
    $users = User::all();
    return  response()->json($users);
});





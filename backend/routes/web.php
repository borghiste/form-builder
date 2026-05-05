<?php


use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Http\Controllers\AuthController;

//VERIFY EMAIL
Route::get('/verify.email/{user}', [AuthController::class, 'verify'])->name('verify.email')->middleware('signed');


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





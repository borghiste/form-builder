<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FormController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Form;
use App\Http\Controllers\FormListController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// users actions routes
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout']);


// forms action routes
Route::get('forms', [FormListController::class, 'getFormList']);

 Route::post('forms', [FormListController::class, 'addNewForm']);



// single form action routes

//get form 
 Route::get('forms/{id}', [FormController::class, 'getForm']);

 // create a new form
 Route::post('forms', [FormController::class, 'createNewForm']);

// delete form: delete existing form

Route::delete('forms/{formId}', [FormListController::class, 'deleteForm']);

// UPDATE FORM
Route::put('forms/{id}', [FormController::class, 'updateForm']);

// FORM ENTRIES

//SUBMIT FORM
Route::post('forms/submit', function (){
    return response()->json(['message' => 'recevied']);
});
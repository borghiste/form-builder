<?php

use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FormController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FormListController;
use App\Http\Controllers\FormEntryController;
use App\Http\Controllers\FormEntriesController;


/*
|--------------------------------------------------------------------------
| Public Routes (no tenant required)
|--------------------------------------------------------------------------
*/
// FIRST SIGN UP
// ths route points to the register method of the RegistrationController, which is responsible for handling user registration and creating the associated organization. When a user sends a POST request to this route with the necessary data for registration, the register method of the RegistrationController is called to process the request, create the user and organization, and send a verification email to the user.
Route::post('register', [RegistrationController::class, 'register']);

// AUTHENTICATION

Route::get('user', [AuthController::class, 'getAuthenticatedUser']);





// users actions routes
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout']);


// forms action routes
Route::get('forms', [FormListController::class, 'getFormList']);

 Route::post('forms', [FormListController::class, 'addNewForm']);

//GET ENTRIES
Route::get('forms/entries', [FormEntriesController::class, 'getFormsEntries']);

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

//GET ENTRIES
Route::get('entries', [FormEntriesController::class, 'getFormsEntries']);

//SUBMIT FORM
Route::post('forms/entries/submit', [FormEntryController::class, 'submitFormEntry']
);
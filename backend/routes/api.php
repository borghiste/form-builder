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
Route::post('register', [RegistrationController::class, 'register']);

//VERIFY EMAIL
Route::get('/verify-email/{user}', [AuthController::class, 'verify'])->name('login.verify');


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
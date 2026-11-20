<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\FormEntriesController;
use App\Http\Controllers\FormEntryController;
use App\Http\Controllers\FormListController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\RegisterController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public routes (no authentication required)
|--------------------------------------------------------------------------
*/

// First sign up: creates the user and the associated organization
Route::post('register', [AuthController::class, 'registerUser']);

// Registration through an invitation
Route::post('register-invitation', [RegisterController::class, 'registerInvitation']);

// Authentication
Route::middleware('web')->post('login', [AuthController::class, 'login'])->name('login');

/*
|--------------------------------------------------------------------------
| Protected routes (auth:sanctum)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    // Current user
    Route::get('user', [AuthController::class, 'getAuthenticatedUser']);
    Route::post('logout', [AuthController::class, 'logout']);

    // Invitations
    Route::prefix('invitations')->name('invitations.')->group(function () {
        Route::get('/', [InvitationController::class, 'getInvitations'])->name('index');
        Route::post('/sendinvite', [InvitationController::class, 'sendInvitations'])->name('send');
        Route::post('/{token}/accept', [InvitationController::class, 'acceptInvitation'])->name('accept');
    });

    // Forms
    Route::prefix('forms')->group(function () {
        Route::get('/', [FormListController::class, 'getFormList']);
        Route::post('/', [FormController::class, 'createNewForm']);
        Route::get('/{id}', [FormController::class, 'getForm']);
        Route::put('/{form}', [FormController::class, 'updateForm']); // {form} must match "Form $form" (route model binding)
        Route::delete('/{formId}', [FormListController::class, 'deleteForm']);
    });

    // Form submissions
    Route::get('entries', [FormEntriesController::class, 'getFormsEntries']);
    Route::post('entries/submit', [FormEntryController::class, 'submitFormEntry']);
});
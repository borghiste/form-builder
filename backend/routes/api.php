<?php


use App\Http\Controllers\RegisterController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\FormController;

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
Route::post('register', [AuthController::class, 'registerUser']);
// Route::post('register-invitation', [RegisterController::class, 'register']);
// AUTHENTICATION


Route::middleware('web')->post('login', [AuthController::class, 'login'])->name('login');
Route::post('register-invitation', [RegisterController::class, 'registerInvitation']);

Route::middleware('auth:sanctum')->group(function () {

    // This route points to the getAuthenticatedUser method of the AuthController, which is responsible for retrieving the currently authenticated user's information. When a user sends a GET request to this route, the getAuthenticatedUser method is called to return the user's details in a JSON response. This route is protected by the auth:sanctum middleware, which ensures that only authenticated users can access it.
Route::get('user', [AuthController::class, 'getAuthenticatedUser']);
Route::post('logout', [AuthController::class, 'logout']);



// Invitations routes
Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('invitations')
        ->name('invitations')
        ->group(function () {
            // This route points to the getInvitations method of the InvitationController, which is responsible for retrieving a list of invitations associated with the authenticated user's organization. When a user sends a GET request to this route, the getInvitations method is called to return the invitations in a JSON response. This route is protected by the auth:sanctum middleware, ensuring that only authenticated users can access it.

            Route::get('/', [InvitationController::class, 'getInvitations'])->name('index');

            // This route points to the sendInvitations method of the InvitationController, which is responsible for sending invitations to users. When a user sends a POST request to this route with the necessary data for the invitations, the sendInvitations method is called to process the request, create invitation records in the database, and send invitation emails to the specified email addresses. This route is protected by the auth:sanctum middleware, ensuring that only authenticated users can access it.
            Route::post('/sendinvite', [InvitationController::class, 'sendInvitations'])->name('send');
            // This route points to the acceptInvitation method of the InvitationController, which is responsible for handling the acceptance of an invitation. When a user clicks on the invitation link (which contains a token) and sends a POST request to this route, the acceptInvitation method is called to validate the token, check if the invitation is still valid, and process the acceptance of the invitation.
            Route::post('/{token}/accept', [InvitationController::class, 'acceptInvitation'])->name('accept');
        });
});





// fORMS ACTION ROUTES
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
});


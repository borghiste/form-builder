<?php

use App\Http\Controllers\AuthController;
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

Route::get('formsList', [FormListController::class, 'getFormList']);

// forms action routes
 Route::post('new', [FormListController::class, 'addNewForm']);
//  Route::delete('delpost', [FormListController::class, 'deletepost'])


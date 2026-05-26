<?php



use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Http\Controllers\AuthController;
use App\Mail\InvitationMail;
use App\Http\Controllers\InvitationController;

//VERIFY EMAIL
Route::get('/verify.email/{user}', [AuthController::class, 'verify'])->name('verify.email')->middleware('signed');


// INVITATION ACCEPTANCE

Route::get('/invitations/accept/{token}', [InvitationController::class, 'acceptInvitation'])
    ->name('invitations.accept');


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

Route::get('/preview-mail', function () {
    return new App\Mail\WelcomeEmail(
        userName: 'Test User',
        magicLink: 'http://localhost:8000/pick.jf'
        
    );
});

Route::get('/preview-invite', function () {
    return new InvitationMail(
        invitedBy: 'Test User',
        role: 'Editor',
        invitationMessage: 'You have been invited to join our platform. Please click the link below to accept the invitation',
        invitationLink: 'http://localhost:8000/accept-invite'
    );
});



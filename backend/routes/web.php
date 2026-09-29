<?php



use App\Models\Invitation;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Http\Controllers\AuthController;
use App\Mail\InvitationMail;
use App\Http\Controllers\InvitationController;


//VERIFY EMAIL
Route::get('/verify.email/{user}', [AuthController::class, 'verifyUser'])->name('verify.email')->middleware('signed');



// INVITATION ACCEPTANCE

Route::get('/invitations/{token}/accept', [InvitationController::class, 'acceptInvitation'])
    ->middleware('signed')
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
        magicLink: URL::temporarySignedRoute(
            'verify.email',
            now()->addMinutes(1),
            ['user' => 1, 'tag' => 0]));
});



Route::get('invitations/invite', function () {

    $invitation = Invitation::factory()->create();
   

    return new InvitationMail(
        invitedBy: 'test user',
        role: 'admin',
        invitationMessage: 'test',
        invitationLink: url("/invitations/{$invitation->token}/accept"),

    );
});



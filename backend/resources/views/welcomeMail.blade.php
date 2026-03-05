
<!DOCTYPE html>
<html>
<body>
    <h1>Ciao, {{ $user->name }}!</h1>
    <p>Grazie per esserti registrato su {{ config('app.name') }}.</p>
    

    
    <a href="{{ $url }}">Accedi alla dashboard e inizia a costruire i tuoi form </a>
</body>
</html>

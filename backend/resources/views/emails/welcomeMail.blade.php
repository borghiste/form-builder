<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Benvenuto su {{ config('app.name') }}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background-color: #f5f5f3;
            color: #2c2c2a;
            padding: 40px 16px;
        }
        .container {
            max-width: 520px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            border: 0.5px solid #d3d1c7;
            overflow: hidden;
        }
        .header {
            padding: 32px 32px 24px;
            border-bottom: 0.5px solid #d3d1c7;
        }
        .logo {
            font-size: 15px;
            font-weight: 500;
            color: #2c2c2a;
            letter-spacing: -0.2px;
        }
        .body {
            padding: 32px;
        }
        .title {
            font-size: 22px;
            font-weight: 500;
            color: #2c2c2a;
            margin-bottom: 12px;
            letter-spacing: -0.3px;
        }
        .text {
            font-size: 15px;
            color: #5f5e5a;
            line-height: 1.7;
            margin-bottom: 16px;
        }
        .features {
            background: #f5f5f3;
            border-radius: 8px;
            border: 0.5px solid #d3d1c7;
            padding: 20px 24px;
            margin: 24px 0;
        }
        .feature {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 14px;
        }
        .feature:last-child { margin-bottom: 0; }
        .feature-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #888780;
            margin-top: 7px;
            flex-shrink: 0;
        }
        .feature-text {
            font-size: 14px;
            color: #5f5e5a;
            line-height: 1.5;
        }
        .feature-text strong {
            color: #2c2c2a;
            font-weight: 500;
        }
        .btn {
            display: inline-block;
            background: #2c2c2a;
            color: #ffffff !important;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            padding: 12px 24px;
            border-radius: 8px;
            margin-top: 8px;
            letter-spacing: -0.1px;
        }
        .footer {
            padding: 20px 32px;
            border-top: 0.5px solid #d3d1c7;
            background: #f5f5f3;
        }
        .footer-text {
            font-size: 13px;
            color: #888780;
            line-height: 1.6;
        }
        .footer-link {
            color: #5f5e5a;
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">

        <div class="header">
            <span class="logo">{{ config('app.name') }}</span>
        </div>

        <div class="body">
            <h1 class="title">Ciao, {{ $userName }}!</h1>
            <p class="text">
                We su {{ config('app.name') }}. Il tuo account è stato creato con successo.
                Da adesso puoi iniziare a costruire i tuoi form.
            </p>

            <div class="features">
                <div class="feature">
                    <div class="feature-dot"></div>
                    <span class="feature-text"><strong>Drag & drop</strong> — trascina i campi per costruire il tuo form in pochi secondi.</span>
                </div>
                <div class="feature">
                    <div class="feature-dot"></div>
                    <span class="feature-text"><strong>Validazioni</strong> — aggiungi regole di validazione direttamente dall'interfaccia.</span>
                </div>
                <div class="feature">
                    <div class="feature-dot"></div>
                    <span class="feature-text"><strong>Preview</strong> — visualizza il form in tempo reale prima di pubblicarlo.</span>
                </div>
            </div>

            <p class="text">Clicca il pulsante per accedere alla dashboard.</p>

            <a href="{{ $url }}" class="btn">Accedi alla dashboard →</a>
        </div>

        <div class="footer">
            <p class="footer-text">
                Hai ricevuto questa email perché hai creato un account su {{ config('app.name') }}.<br>
                Se non sei stato tu, <a href="{{ $url }}" class="footer-link">contattaci</a>.
            </p>
        </div>

    </div>
</body>
</html>
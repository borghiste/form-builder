<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Link Expired — {{ config('app.name') }}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background-color: #f5f5f3;
            color: #2c2c2a;
            padding: 40px 16px;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .flash {
            max-width: 520px;
            width: 100%;
            margin-bottom: 12px;
            background: #eef3fb;
            border: 0.5px solid #b8ccf0;
            border-radius: 8px;
            padding: 12px 16px;
            font-size: 14px;
            color: #2c5aad;
        }
        .container {
            max-width: 520px;
            width: 100%;
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
            text-decoration: none;
        }
        .body {
            padding: 40px 32px 36px;
        }
        .icon-wrap {
            width: 48px;
            height: 48px;
            background: #f5f5f3;
            border: 0.5px solid #d3d1c7;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 24px;
        }
        .icon-wrap svg {
            width: 22px;
            height: 22px;
            stroke: #888780;
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
            margin-bottom: 0;
        }
        .info-box {
            background: #f5f5f3;
            border-radius: 8px;
            border: 0.5px solid #d3d1c7;
            padding: 20px 24px;
            margin: 24px 0 28px;
        }
        .info-row {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 14px;
        }
        .info-row:last-child { margin-bottom: 0; }
        .info-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #888780;
            margin-top: 7px;
            flex-shrink: 0;
        }
        .info-text {
            font-size: 14px;
            color: #5f5e5a;
            line-height: 1.5;
        }
        .info-text strong {
            color: #2c2c2a;
            font-weight: 500;
        }
        .btn {
            display: block;
            background: #3D71D9;
            color: #ffffff;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            padding: 12px 24px;
            border-radius: 8px;
            letter-spacing: -0.1px;
            border: none;
            cursor: pointer;
            width: 100%;
            text-align: center;
        }
        .btn:hover { background: #3464c5; }
        .btn-outline {
            display: block;
            background: transparent;
            color: #2c2c2a;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            padding: 11px 24px;
            border-radius: 8px;
            border: 0.5px solid #d3d1c7;
            letter-spacing: -0.1px;
            width: 100%;
            text-align: center;
        }
        .btn-outline:hover { border-color: #2c2c2a; }
        .btn-group {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .btn-group form { display: contents; }
        .divider {
            height: 0.5px;
            background: #d3d1c7;
            margin: 28px 0;
        }
        .help-box {
            background: #f5f5f3;
            border-radius: 8px;
            border: 0.5px solid #d3d1c7;
            padding: 20px 24px;
        }
        .help-label {
            font-size: 11px;
            font-weight: 500;
            color: #888780;
            letter-spacing: 0.6px;
            text-transform: uppercase;
            margin-bottom: 8px;
        }
        .help-title {
            font-size: 15px;
            font-weight: 500;
            color: #2c2c2a;
            margin-bottom: 8px;
            letter-spacing: -0.2px;
        }
        .help-text {
            font-size: 14px;
            color: #5f5e5a;
            line-height: 1.6;
        }
        .help-text a { color: #3D71D9; text-decoration: none; }
        .help-text a:hover { text-decoration: underline; }
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
        .footer-link { color: #5f5e5a; text-decoration: underline; }
    </style>
</head>
<body>

    @if(session('status'))
        <div class="flash">{{ session('status') }}</div>
    @endif

    <div class="container">

        <div class="header">
            <a href="{{ url('/') }}" class="logo">{{ config('app.name') }}</a>
        </div>

        <div class="body">

            <div class="icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="9"/>
                    <polyline points="12 7 12 12 15.5 12"/>
                    <line x1="12" y1="2" x2="12" y2="4"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                </svg>
            </div>

            <h1 class="title">This link has expired</h1>
            <p class="text">
                The email verification link you followed is no longer valid.
                Links expire after a short period for security reasons.
                You can request a new one below.
            </p>

            <div class="info-box">
                <div class="info-row">
                    <div class="info-dot"></div>
                    <span class="info-text"><strong>Why does this happen?</strong> Verification links are valid for 60 minutes after they are sent.</span>
                </div>
                <div class="info-row">
                    <div class="info-dot"></div>
                    <span class="info-text"><strong>Check your inbox</strong> — a newer email may have already arrived with a fresh link.</span>
                </div>
                <div class="info-row">
                    <div class="info-dot"></div>
                    <span class="info-text"><strong>Still having trouble?</strong> Make sure you're logged in before requesting a new link.</span>
                </div>
            </div>

            <div class="btn-group">
                <a class="btn">
                    Request a new verification link
                </a>
                
            </div>

            <div class="divider"></div>

            <div class="help-box">
                <p class="help-label">Need help?</p>
                <h2 class="help-title">Still not receiving the email?</h2>
                <p class="help-text">
                    Check your spam folder or make sure the email address on your account is correct.
                    If the problem persists, <a href="mailto:{{ config('mail.support_address', 'support@example.com') }}">contact us</a> and we'll sort it out.
                </p>
            </div>

        </div>

        <div class="footer">
            <p class="footer-text">
                You received this because an account exists with your email on {{ config('app.name') }}.<br>
                If this wasn't you, please <a href="mailto:{{ config('mail.support_address', 'support@example.com') }}" class="footer-link">contact us</a>.
            </p>
        </div>

    </div>

</body>
</html>

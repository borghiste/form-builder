<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome on {{ config('app.name') }}</title>
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
            background: #3D71D9;
            color: #ffffff;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            padding: 12px 24px;
            border-radius: 8px;
            margin-top: 8px;
            letter-spacing: -0.1px;
        }
        .btn-outline {
            display: inline-block;
            background: transparent;
            color: #2c2c2a !important;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            padding: 11px 24px;
            border-radius: 8px;
            border: 0.5px solid #2c2c2a;
            margin-top: 8px;
            letter-spacing: -0.1px;
        }
        .divider {
            height: 0.5px;
            background: #d3d1c7;
            margin: 28px 0;
        }
        .invite {
            background: #f5f5f3;
            border-radius: 8px;
            border: 0.5px solid #d3d1c7;
            padding: 20px 24px;
        }
        .invite-label {
            font-size: 11px;
            font-weight: 500;
            color: #888780;
            letter-spacing: 0.6px;
            text-transform: uppercase;
            margin-bottom: 8px;
        }
        .invite-title {
            font-size: 15px;
            font-weight: 500;
            color: #2c2c2a;
            margin-bottom: 8px;
            letter-spacing: -0.2px;
        }
        .invite-text {
            font-size: 14px;
            color: #5f5e5a;
            line-height: 1.6;
            margin-bottom: 16px;
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
            <h1 class="title">Hello, {{ $userName }}!</h1>
            <p class="text">
                Welcome on {{ config('app.name') }}. Your account was created  successfully.
                Please, make sure to click the button below to verify your email address and activate your account so you can start building your forms immediately.

            </p>

            <h2 class="feature-title">Here's what you can do on PickForm</h2>
            <div class="features">
                <div class="feature">
                    <div class="feature-dot"></div>
                    <span class="feature-text"><strong>Drag & drop</strong> : drag fields to build your forms in few seconds, drop them anywhere you want.</span>
                </div>
                <div class="feature">
                    <div class="feature-dot"></div>
                    <span class="feature-text"><strong>Validations</strong>: add validation rules directly from the interface.</span>
                </div>
                <div class="feature">
                    <div class="feature-dot"></div>
                    <span class="feature-text"><strong>Preview</strong>: Preview your forms in real time.</span>
                </div>
            </div>

            <p class="text">Click the button to access the dashboard.</p>

            <a href="{{ $url }}" class="btn">Confirm your account →</a>

            <div class="divider"></div>

            <div class="invite">
               
                <h2 class="invite-title">Work together with your colleagues by sending them an invite
                </h2>
                
            
               
            </div>
        </div>

        <div class="footer">
            <p class="footer-text">
            You received this email because you created an account on {{ config('app.name') }}.<br>
                if this wasn't you, please <a href="mailto:sborghi92@gmail.com" class="footer-link">contatact me</a>.
            </p>
        </div>

    </div>
</body>
</html>
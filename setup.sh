#!/bin/bash

echo "📦 Installing backend dependencies..."
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate

echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

echo "✅ Setup complete!"

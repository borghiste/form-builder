

echo "🚀 Starting backend..."
cd backend
php artisan serve --host=127.0.0.1 --port=8000 &

echo "🚀 Starting frontend..."
cd ../frontend
npm run dev -- --host 127.0.0.1 --port 5173 &

wait

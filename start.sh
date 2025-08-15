

echo "🚀 Starting backend..."
cd backend
php artisan serve &

echo "🚀 Starting frontend..."
cd ../frontend
npm run dev &

wait

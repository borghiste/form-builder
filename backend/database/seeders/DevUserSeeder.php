<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use function Symfony\Component\Clock\now;


class DevUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Dev Admin',
            'email' => 'devadmin@example.com',
            'created_at' => now(),
            'updated_at' => now()

        ]);

        $token = $user->createToken('dev-token')->plainTextToken;
echo "DEV_TOKEN=" . $token . "\n"; 
    }
}

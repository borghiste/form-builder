<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class UserSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
      

        User::factory()->create([
           
            'role' => 'admin',
            'email' => 'admin@example.com',
            'updated_at' => now(),
            'created_at' => now(),
        ]);
    }
}

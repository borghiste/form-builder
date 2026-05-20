<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Invitation;
use App\Models\User;

class InvitationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      
        $user = User::where('email', 'devadmin@example.com')->first();
    
      
        if ($user)
        {
            Invitation::factory()
            ->count(1)
            ->create([
                'user_id' => $user->id 
            ]);
        }
    }
}
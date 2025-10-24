<?php

namespace Database\Seeders;

use App\Models\Form;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FormSeeder extends Seeder
{
   
    public function run(): void
    {
        Form::factory()->create([
            'name' => 'form name',
            'description' => 'this is a simple form',
            'updated_at' => now()->format('y-m-d'),
            'created_at' => now()->format('y-m-d')
        ]);
    }
}

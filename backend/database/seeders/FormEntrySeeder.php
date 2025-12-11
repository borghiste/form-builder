<?php

namespace Database\Seeders;

use App\Models\FormEntry;
use Illuminate\Database\Seeder;

class FormEntrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        FormEntry::factory()->create([
            'data' => json_encode([
                'name' => 'Mario Rossi',
                'email' => 'mario@example.com',
                'age' => 30,
                'newsletter' => true,
                'satisfaction' => 80
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}

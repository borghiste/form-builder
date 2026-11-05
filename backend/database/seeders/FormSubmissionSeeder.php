<?php

namespace Database\Seeders;

use App\Models\FormSubmission;
use Illuminate\Database\Seeder;

class FormSubmissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        FormSubmission::factory()->create([
            
            'data' => json_encode([
                'form_id' => 1,
                'name' => 'Jon Doe',
                'email' => 'Jon@example.com',
                'role' => 'user',
                'form' => ['name' => 'feedback form',
                'description',
                'fields' => [
                    'label' => 'input 1',
                    'type' => 'text',
                    'value' => 'test 1'] ]
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}

<?php

namespace Database\Factories;

use App\Models\Form;
use Illuminate\Database\Eloquent\Factories\Factory;

class FormEntryFactory extends Factory
{
    public function definition(): array
    {
        return [
            'form_id' => Form::factory(),
            'data' => [
                'name' => $this->faker->name(),
                'email' => $this->faker->email(),
                'role' => $this->faker->randomElement(['user', 'admin']),
                'form' => [
                    'name' => 'feedback form',
                    'description' => $this->faker->sentence(),
                    'fields' => [
                        [
                            'label' => 'Input 1',
                            'type' => 'text',
                            'value' => $this->faker->word()
                        ],
                        [
                            'label' => 'Input 2',
                            'type' => 'email',
                            'value' => $this->faker->email()
                        ]
                    ]
                ],
                
                
            ],
        ];
    }
}
<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\FormField;

class FormFieldFactory extends Factory
{
    protected $model = FormField::class;

    public function definition(): array
    {
        return [
            'label' => $this->faker->word(),
            'type' => $this->faker->randomElement(['text', 'email', 'number']),
            'required' => $this->faker->boolean(),
        ];
    }
}


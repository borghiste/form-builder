<?php

namespace Database\Factories;
use App\Models\FormEntry;
use App\Models\Form;
use Illuminate\Database\Eloquent\Factories\Factory;

class FormEntryFactory extends Factory
{
    protected $model = FormEntry::class;

    public function definition(): array
    {
        return [
            'form_id' => Form::factory(), // genera un form collegato
            'data' => [
                'name' => $this->faker->name(),
                'email' => $this->faker->email(),
                'data' => $this->faker->sentence(),
            ],
        ];
    }
}

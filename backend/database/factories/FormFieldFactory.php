<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\FormField;
use App\Models\Form;

class FormFieldFactory extends Factory
{
    protected $model = FormField::class;

    public function definition(): array
    {
        $formId = Form::query()->inRandomOrder()->value('id');

        if (! $formId) {
            $formId = Form::factory()->create()->id;
        }

        return [
            'label' => $this->faker->word(),
            'type' => $this->faker->randomElement(['text', 'email', 'number']),
            'required' => $this->faker->boolean(),
            'form_id' => $formId,
        ];
    }
}


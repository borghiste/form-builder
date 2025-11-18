<?php

namespace Database\Factories;

use App\Models\FormField;
use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\Form;




/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Form>
 */
class FormFactory extends Factory
{
    


    protected $model = Form::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
        ];
    }

   
    public function configure()
    {
        return $this->afterCreating(function (Form $form) {
            FormField::factory()->count(3)->create([
                'form_id' => $form->id, //  
            ]);
        });
    }
}

    
    

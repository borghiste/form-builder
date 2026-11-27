<?php

namespace Database\Factories;

use App\Models\Organization;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Form;
use App\Models\User;




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

            'organization_id' => Organization::factory(),
        ];
    }
}

    
    

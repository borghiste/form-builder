<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Organization>
 */
class OrganizationFactory extends Factory
{
   
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $suffix = Str::lower(Str::random(12));

        return [
            'name' => fake()->company(),
            'subdomain' => fake()->domainWord().'-'.$suffix,
            'slug' => fake()->slug().'-'.$suffix,
        ];
    }
}

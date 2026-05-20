<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Invitation>
 */
class InvitationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'organization_id' => \App\Models\Organization::factory(),
            'invited_by' => \App\Models\User::factory(),
            'email' => $this->faker->unique()->safeEmail(),
            'role' => $this->faker->randomElement(['viewer', 'editor', 'admin']),
            'message' => $this->faker->sentence(),
            'token' => \App\Models\Invitation::generateToken(),
            'status' => 'pending',
            'expires_at' => now()->addDays(7),
        ];
    }
}

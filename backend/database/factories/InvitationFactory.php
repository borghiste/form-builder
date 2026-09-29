<?php

namespace Database\Factories;

use App\Models\Organization;
use App\Models\User;
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
        $organization = Organization::factory()->create();

        return [
            'user_id' => User::factory()->state([
                'organization_id' => $organization->id,
                'email' => $this->faker->unique()->safeEmail(),
            ]),
            'organization_id' => $organization->id,
            'invited_by' => User::factory()->state([
                'organization_id' => $organization->id,
                'email' => $this->faker->unique()->safeEmail(),
            ]),
            'email' => $this->faker->unique()->safeEmail(),
            'role' => $this->faker->randomElement(['viewer', 'admin']),
            'message' => $this->faker->sentence(),
            'token' => \App\Models\Invitation::generateToken(),
            'status' => 'pending',
            'expires_at' => now()->addDays(7),
        ];
    }
}

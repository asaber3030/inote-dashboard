<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MaterialWorkingHrs>
 */
class MaterialWorkingHrsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
      return [
        'started_at' => fake()->date('Y:m:d h:i:s'),
        'ended_at' => fake()->date('Y:m:d h:i:s'),
        'additional_hrs' => fake()->numberBetween(10, 200),
        'compute_hrs' => fake()->numberBetween(10, 200),
        'taken_amount' => fake()->numberBetween(10, 200),
        'cost' => fake()->numberBetween(100, 20000),
        'material' => fake()->numberBetween(1, 19999),
        'taken_notes' => fake()->text(),
      ];
    }
}

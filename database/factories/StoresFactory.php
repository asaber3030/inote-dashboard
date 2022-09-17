<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Stores>
 */
class StoresFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition()
  {
    return [
      'store_tag' => fake()->numberBetween(100, 20000),
      'store_name' => fake()->name(),
      'store_type' => fake()->text(20),
      'store_capacity' => fake()->numberBetween(1000, 1000000)
    ];
  }
}

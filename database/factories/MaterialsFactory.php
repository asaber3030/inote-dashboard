<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Materials>
 */
class MaterialsFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition()
  {
    return [
      'material_name' => fake()->name,
      'material_tag' => fake()->numberBetween(10, 8000),
      'material_specifications' => fake()->text(),
      'material_amount' => fake()->numberBetween(1, 10000),
      'store' => fake()->numberBetween(10, 9888),
    ];
  }
}

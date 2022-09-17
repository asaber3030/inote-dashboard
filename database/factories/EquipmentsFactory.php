<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Equipments>
 */
class EquipmentsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
          'eq_name' => fake()->realText(),
          'eq_type' => fake()->text(5),
          'eq_tag' => fake()->randomKey(),
          'productivity' => fake()->numberBetween(10, 1000000)
        ];
    }
}

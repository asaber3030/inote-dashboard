<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contractors>
 */
class ContractorsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
      $con_type = rand(0, 2);
        return [
          'con_name' => fake()->name('male'),
          'con_phone' => '1123525123',
          'con_type' => $con_type,
        ];
    }
}

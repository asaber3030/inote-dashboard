<?php

namespace Database\Factories;

use App\Models\ContractorWorkers;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ContractorWorkers>
 */
class ContractorWorkersFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = ContractorWorkers::class;

    public function definition()
    {
        return [
          'con_wr_name' => fake()->name(),
          'con_wr_phone' => '1123525123',
          'con_wr_type' => fake()->numberBetween(0, 2),
          'compute_mins' => fake()->numberBetween(1, 60),
          'compute_months' => fake()->numberBetween(1, 12),
          'compute_years' => fake()->numberBetween(199, 2022),
          'compute_days' => fake()->numberBetween(1, 31),
          'compute_hrs' => fake()->numberBetween(1, 60),
          'started_at' => fake()->date('Y:m:d h:i:s'),
          'ended_at' => fake()->date('Y:m:d h:i:s'),
          'belongs_to_con' => fake()->numberBetween(1, 2000),
          'cost' => fake()->numberBetween(10, 20000)
        ];
    }
}

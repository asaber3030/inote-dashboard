<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MaterialWorkingHrs extends Model
{
  use HasFactory;
  protected $table = 'materials_working_hrs';
  protected $primaryKey = 'material_wr_hr_id';
  protected $fillable = [
    'started_at',
    'ended_at',
    'additional_hrs',
    'compute_hrs',
    'taken_amount',
    'taken_notes',
    'material',
    'width',
    'length',
    'height'
  ];

  public function material() {
    return $this->belongsTo(Materials::class, 'material', 'material_id');
  }

}

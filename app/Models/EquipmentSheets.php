<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EquipmentSheets extends Model
{
  use HasFactory;
  protected $table = 'equipment_sheets';
  protected $primaryKey = 'sheet_id';
  protected $fillable = [
    'sheet_code', 'equipment', 'include_summary', 'sheet_data'
  ];

  function equipment() {
    return $this->belongsTo(Equipments::class, 'equipment', 'eq_id');
  }

  static function createSheet($code, $data, $include_summary, $equipment) {
    return self::create([
      'sheet_code' => $code,
      'sheet_data' => $data,
      'include_summary' => $include_summary,
      'equipment' => $equipment
    ]);
  }
}

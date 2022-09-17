<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MaterialSheets extends Model
{
  use HasFactory;
  protected $table = 'materials_sheets';
  protected $primaryKey = 'sheet_id';
  protected $fillable = [
    'sheet_code', 'material', 'include_summary', 'sheet_data'
  ];

  function material() {
    return $this->belongsTo(Materials::class, 'material', 'material_id');
  }

  static function createSheet($code, $data, $include_summary, $material) {
    return self::create([
      'sheet_code' => $code,
      'sheet_data' => $data,
      'include_summary' => $include_summary,
      'material' => $material
    ]);
  }

}

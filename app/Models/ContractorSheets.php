<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContractorSheets extends Model
{
  use HasFactory;

  protected $table = 'contractor_sheets';
  protected $primaryKey = 'sheet_id';
  protected $fillable = [
    'sheet_type', 'sheet_code', 'include_summary', 'sheet_data', 'contractor'
  ];

  public function contractor() {
    return $this->belongsTo(Contractors::class, 'contractor', 'con_id');
  }

  public static function createSheet(
    string $type, string $code, int $include_summary, int $contractor, string $data,
    string $message, string $message_type = 'success', string $route) {

    ContractorSheets::create([
      'sheet_type' => $type,
      'sheet_code' => $code,
      'include_summary' => $include_summary,
      'contractor' => $contractor,
      'sheet_data' => $data
    ]);
    message($message, $message_type);
    return to_route($route);
  }
}

<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContractorMeters extends Model
{
  protected $table = 'contractor_meters';
  protected $fillable = [
    'meters', 'area', 'cost',
    'length', 'width', 'height',
    'belongs_to_con', 'started_at'
  ];
  protected $primaryKey = 'con_mt_id';

  public function contractor() {
    return $this->belongsTo(Contractors::class, 'belongs_to_con', 'con_id');
  }

  public static function selectByMonth(int $month, int $contractor)  {
    return self::where('belongs_to_con', $contractor)
      ->whereMonth('started_at', $month)
      ->get();
  }
  public static function selectByDay(int $day, int $contractor)  {
    return self::where('belongs_to_con', $contractor)
      ->whereDay('started_at', $day)
      ->get();
  }
  public static function selectByBoth(int $month, int $day, int $contractor)  {
    return self::where('belongs_to_con', $contractor)
      ->whereDay('started_at', $day)
      ->whereMonth('started_at', $month)
      ->get();
  }
  public static function selectToday(int $contractor)  {
    return self::where('belongs_to_con', $contractor)
      ->whereDate('started_at', Carbon::today())
      ->get();
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

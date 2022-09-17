<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContractorWorkers extends Model
{
  use HasFactory;
  protected $table = 'contractor_workers';
  protected $fillable = [
    'con_wr_name', 'con_wr_phone', 'con_wr_type',
    'compute_mins', 'compute_months', 'compute_years', 'compute_days', 'compute_hrs',
    'started_at', 'ended_at',
    'belongs_to_con', 'cost'
  ];
  protected $primaryKey = 'con_wr_id';

  public function contractor() {
    return $this->belongsTo(Contractors::class, 'belongs_to_con', 'con_id');
  }

  public static function selectByMonth($month, $contractor, $type = 0)  {
    return self::where('belongs_to_con', $contractor)
      ->where('con_wr_type', $type)
      ->whereMonth('started_at', $month)
      ->get();
  }
  public static function selectByDay($day, $contractor, $type = 0)  {
    return self::where('belongs_to_con', $contractor)
      ->where('con_wr_type', $type)
      ->whereDay('started_at', $day)
      ->get();
  }
  public static function selectByBoth($month, $day, $contractor, $type = 0)  {
    return self::where('belongs_to_con', $contractor)
      ->where('con_wr_type', $type)
      ->whereDay('started_at', $day)
      ->whereMonth('started_at', $month)
      ->get();
  }
  public static function selectToday($contractor, $type = 0)  {
    return self::where('belongs_to_con', $contractor)
      ->where('con_wr_type', $type)
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

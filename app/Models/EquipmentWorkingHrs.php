<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EquipmentWorkingHrs extends Model
{
  use HasFactory;
  protected $table = 'equipments_working_hrs';
  protected $primaryKey = 'eq_hr_id';
  public $timestamps = false;
  protected $fillable = [
    'equipment', 'contractor', 'working_location', 'note', 'started_at', 'ended_at',
    'additional_hrs', 'compute_hrs', 'cost'
  ];

  public function equipment() {
    return $this->belongsTo(Equipments::class, 'equipment', 'eq_id');
  }

  public function contractor() {
    return $this->belongsTo(Contractors::class, 'contractor', 'con_id');
  }

  public static function selectByMonth(int $month, int $contractor, int $type = 0)  {
    return self::where('contractor', $contractor)
      ->whereMonth('started_at', $month)
      ->get();
  }
  public static function selectByDay(int $day, int $contractor, int $type = 0)  {
    return self::where('contractor', $contractor)
      ->whereDay('started_at', $day)
      ->get();
  }
  public static function selectByBoth(int $month, int $day, int $contractor, int $type = 0)  {
    return self::where('contractor', $contractor)
      ->whereDay('started_at', $day)
      ->whereMonth('started_at', $month)
      ->get();
  }
  public static function selectToday(int $contractor, int $type = 0)  {
    return self::where('contractor', $contractor)
      ->whereDate('started_at', Carbon::today())
      ->get();
  }

}

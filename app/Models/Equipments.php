<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Equipments extends Model
{
  use HasFactory, SoftDeletes;
  protected $table = 'equipments';
  protected $primaryKey = 'eq_id';
  protected $fillable = [
    'eq_name', 'eq_type', 'eq_tag', 'productivity'
  ];

  public function working_hrs() {
    return $this->hasMany(EquipmentWorkingHrs::class, 'equipment', 'eq_id');
  }

  public function sheets() {
    return $this->hasMany(EquipmentSheets::class, 'equipment', 'eq_id');
  }

  static function equipmentWorkingHrsByToday($id) {
    return EquipmentWorkingHrs::whereDate('started_at', Carbon::today())->where('equipment', $id)->get();
  }
  static function equipmentWorkingHrsByDay($id, $day) {
    return EquipmentWorkingHrs::whereDay('started_at', $day)->where('equipment', $id)->get();
  }
  static function equipmentWorkingHrsByMonth($id, $month) {
    return EquipmentWorkingHrs::whereMonth('started_at', $month)->where('equipment', $id)->get();
  }
  static function equipmentWorkingHrsByBoth($id, $month, $day) {
    return EquipmentWorkingHrs::whereMonth('started_at', $month)->whereDay('started_at', $day)->where('equipment', $id)->get();
  }

}

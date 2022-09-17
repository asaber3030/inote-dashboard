<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Materials extends Model
{
  use HasFactory, SoftDeletes;
  protected $fillable = ['material_name', 'material_icon', 'material_tag', 'material_specifications', 'material_amount', 'store'];
  protected $table = 'materials';
  protected $primaryKey = 'material_id';

  public function store() {
    return $this->belongsTo(Stores::class, 'store', 'store_id');
  }

  public function working_hrs() {
    return $this->hasMany(MaterialWorkingHrs::class, 'material', 'material_id');
  }

  public function sheets() {
    return $this->hasMany(MaterialSheets::class, 'material', 'material_id');
  }

  static function materialWorkingHrsByToday($id) {
    return MaterialWorkingHrs::whereDate('compute_hrs', Carbon::today())->where('material', $id)->get();
  }
  static function materialWorkingHrsByDay($id, $day) {
    return MaterialWorkingHrs::whereDay('compute_hrs', $day)->where('material', $id)->get();
  }
  static function materialWorkingHrsByMonth($id, $month) {
    return MaterialWorkingHrs::whereMonth('compute_hrs', $month)->where('material', $id)->get();
  }
  static function materialWorkingHrsByBoth($id, $month, $day) {
    return MaterialWorkingHrs::whereMonth('compute_hrs', $month)->whereDay('created_at', $day)->where('material', $id)->get();
  }

}

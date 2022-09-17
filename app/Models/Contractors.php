<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Contractors extends Model
{
  use HasFactory, SoftDeletes;
  protected $fillable = [
    'con_name', 'con_phone', 'con_type',
  ];
  protected $primaryKey = 'con_id';
  protected $table = 'contractors';

  public function equipments_working_hrs() {
    return $this->hasMany(EquipmentWorkingHrs::class, 'contractor', 'con_id');
  }

  public function workers() {
    return $this->hasMany(ContractorWorkers::class, 'belongs_to_con', 'con_id');
  }

  public function meters() {
    return $this->hasMany(ContractorMeters::class, 'belongs_to_con', 'con_id');
  }

  public function sheets() {
    return $this->hasMany(ContractorSheets::class, 'contractor', 'con_id');
  }

}

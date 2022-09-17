<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Stores extends Model
{
  use HasFactory, SoftDeletes;
  protected $fillable = ['store_tag', 'store_name', 'store_type', 'store_capacity'];
  protected $table = 'stores';
  protected $primaryKey = 'store_id';

  public function materials() {
    return $this->hasMany(Materials::class, 'store', 'store_id');
  }
}

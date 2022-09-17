<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserTimeline extends Model
{
  use HasFactory;
  protected $table = 'engineer_timeline';
  protected $fillable = ['title', 'user', 'type', 'icon', 'url', 'description'];
  protected $primaryKey = 'id';

  public function user() {
    return $this->belongsTo(User::class, 'user', 'id');
  }
}

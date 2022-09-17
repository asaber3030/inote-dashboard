<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

  protected $table = 'users';
  protected $fillable = [
    'name',
    'email',
    'password',
    'title',
    'username',
    'is_admin',
    'phone',
    'image',
    'security_code',
    'allow_two_factor',
    'theme',
    'language',
  ];


  protected $hidden = [
    'password',
    'remember_token',
  ];

  protected $casts = [
    'email_verified_at' => 'datetime',
  ];

  // Relations
  public function activities() {
    return $this->hasMany(UserTimeline::class, 'user', 'id');
  }

  // Helpers

  # Save to timeline
  public static function saveActivity($title, $desc, $icon, $url, $type) {
    return UserTimeline::create([
      'user' => auth()->id(),
      'title' => $title,
      'url' => $url,
      'icon' => $icon,
      'description' => $desc,
      'type' => $type
    ]);
  }

  # Change security two-factoy method
  public static function activateTwoFactor($value) {
    return User::where('id', auth()->id())->update([
      'allow_two_factor' => $value
    ]);
  }

  # Change Theme
  public static function changeUserTheme($to) {
    return User::where('id', auth()->id())->update([
      'theme' => $to
    ]);
  }

  # Change Language
  public static function changeUserLang($to) {
    return User::where('id', auth()->id())->update([
      'language' => $to
    ]);
  }

}

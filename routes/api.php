<?php

use App\Models\Contractors;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Carbon\Carbon;
use App\Models\ContractorMeters;
use App\Models\ContractorWorkers;

use App\Http\Controllers\HandleApi;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});

Route::controller(HandleApi::class)->group(function () {
  Route::get('contractor-todays-sheet/{contractor}/{type}', 'HandleControllerTodaysSheet')->name('con.sheet.today');
  Route::get('contractor-day-sheet/{contractor}/{type}/{day}', 'HandleControllerDaySheet')->name('con.sheet.day');
  Route::get('contractor-month-sheet/{contractor}/{type}/{month}', 'HandleControllerMonthSheet')->name('con.sheet.month');
  Route::get('contractor-both-sheet/{contractor}/{type}/{day}/{month}', 'HandleControllerBothSheet')->name('con.sheet.both');

  Route::get('current-user-lang', 'CurrentUserLang')->name('current-lang');

  Route::get('material-todays-sheet/{material}', 'GetMaterialTodaySheet')->name('material.sheet.today');
  Route::get('material-day-sheet/{material}/{day}', 'GetMaterialDaySheet')->name('material.sheet.day');
  Route::get('material-month-sheet/{material}/{month}', 'GetMaterialMonthSheet')->name('material.sheet.month');
  Route::get('material-both-sheet/{material}/{month}/{day}', 'GetMaterialBothSheet')->name('material.sheet.both');

  Route::get('equipment-todays-sheet/{equipment}', 'GetEquipmentTodaySheet')->name('eq.sheet.today');
  Route::get('equipment-day-sheet/{equipment}/{day}', 'GetEquipmentDaySheet')->name('eq.sheet.day');
  Route::get('equipment-month-sheet/{equipment}/{month}', 'GetEquipmentMonthSheet')->name('eq.sheet.month');
  Route::get('equipment-both-sheet/{equipment}/{month}/{day}', 'GetEquipmentBothSheet')->name('eq.sheet.both');



});



<?php

namespace App\Http\Controllers;

use App\Models\ContractorMeters;
use App\Models\Equipments;
use App\Models\EquipmentWorkingHrs;
use App\Models\Materials;
use App\Models\MaterialWorkingHrs;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Contractors;
use App\Models\ContractorWorkers;

class HandleApi extends Controller {

  ##### Contractors #####

  // Get Today's Sheet For $type
  function HandleControllerTodaysSheet(Contractors $contractor, string $type) {
    $data = [];
    if ($type == 'worker') {
      $data = ContractorWorkers::selectToday(
        contractor: $contractor->con_id,
        type: 0
      );
    } else if ($type == 'tech') {
      $data = ContractorWorkers::selectToday(
        contractor: $contractor->con_id,
        type: 1
      );
    } elseif ($type == 'meter') {
      $data = ContractorMeters::selectToday(contractor: $contractor->con_id);
    } elseif ($type == 'equipment') {
      $data = EquipmentWorkingHrs::selectToday(contractor: $contractor->con_id);
    }
    return response()->json([
      'data' => $data
    ]);

  }

  // Filter Sheet By Day for $type
  function HandleControllerDaySheet(Contractors $contractor, $type, $day) {
    if ($type == 'worker') {
      $data = ContractorWorkers::selectByDay(
        contractor: $contractor->con_id,
        type: 0,
        day: $day
      );
    } else if ($type == 'tech') {
      $data = ContractorWorkers::selectByDay(
        contractor: $contractor->con_id,
        type: 1,
        day: $day
      );
    } elseif ($type == 'meter') {
      $data = ContractorMeters::selectByDay(
        contractor: $contractor->con_id,
        day: $day
      );
    } elseif ($type == 'equipment') {
      $data = EquipmentWorkingHrs::selectByDay(
        contractor: $contractor->con_id,
        day: $day
      );
    }
    return response()->json([
      'data' => $data
    ]);
  }

  // Filter Sheet By month for $type
  function HandleControllerMonthSheet(Contractors $contractor, $type, $month) {
    if ($type == 'worker') {
      $data = ContractorWorkers::selectByMonth(
        contractor: $contractor->con_id,
        type: 0,
        month: $month
      );
    } else if ($type == 'tech') {
      $data = ContractorWorkers::selectByMonth(
        contractor: $contractor->con_id,
        type: 1,
        month: $month
      );
    } elseif ($type == 'meter') {
      $data = ContractorMeters::selectByMonth(
        contractor: $contractor->con_id,
        month: $month
      );
    } elseif ($type == 'equipment') {
      $data = EquipmentWorkingHrs::selectByMonth(
        contractor: $contractor->con_id,
        month: $month
      );
    }
    return response()->json([
      'data' => $data
    ]);
  }

  // Filter Sheet By month & day for $type
  function HandleControllerBothSheet(Contractors $contractor, $type, $day, $month) {
    if ($type == 'worker') {
      $data = ContractorWorkers::selectByBoth(
        month: $month,
        contractor: $contractor->con_id,
        type: 0,
        day: $day
      );
    } else if ($type == 'tech') {
      $data = ContractorWorkers::selectByBoth(
        month: $month,
        contractor: $contractor->con_id,
        type: 1,
        day: $day
      );
    } elseif ($type == 'meter') {
      $data = ContractorMeters::selectByBoth(
        month: $month,
        contractor: $contractor->con_id,
        day: $day
      );
    } elseif ($type == 'equipment') {
      $data = EquipmentWorkingHrs::selectByBoth(
        month: $month,
        contractor: $contractor->con_id,
        day: $day
      );
    }
    return response()->json([
      'data' => $data
    ]);
  }

  ##### Engineers #####

  // Current user lang
  function CurrentUserLang() {
    $userlng = User::find(auth()->id())->language;
    return response()->json([
      'lang' => $userlng
    ]);
  }

  ##### Materials #####
  function GetMaterialTodaySheet(Materials $material) {
    return response()->json([
      'data' => MaterialWorkingHrs::whereDate('compute_hrs', Carbon::today())->where('material', $material->material_id)->get()
    ]);
  }
  function GetMaterialDaySheet(Materials $material, $day) {
    return response()->json([
      'data' => MaterialWorkingHrs::whereDay('compute_hrs', $day)->where('material', $material->material_id)->get()
    ]);
  }
  function GetMaterialMonthSheet(Materials $material, $month) {
    return response()->json([
      'data' => MaterialWorkingHrs::whereMonth('compute_hrs', $month)->where('material', $material->material_id)->get()
    ]);
  }
  function GetMaterialBothSheet(Materials $material, $month, $day) {
    return response()->json([
      'data' => MaterialWorkingHrs::whereMonth('compute_hrs', $month)->whereDay('created_at', $day)->where('material', $material->material_id)->get()
    ]);
  }

  ##### Equipments #####
  function GetEquipmentTodaySheet(Equipments $equipment) {
    return response()->json([
      'data' => Equipments::equipmentWorkingHrsByToday($equipment->eq_id)
    ]);
  }
  function GetEquipmentDaySheet(Equipments $equipment, $day) {
    return response()->json([
      'data' => Equipments::equipmentWorkingHrsByDay($equipment->eq_id, $day)
    ]);
  }
  function GetEquipmentMonthSheet(Equipments $equipment, $month) {
    return response()->json([
      'data' => Equipments::equipmentWorkingHrsByMonth($equipment->eq_id, $month)
    ]);
  }
  function GetEquipmentBothSheet(Equipments $equipment, $month, $day) {
    return response()->json([
      'data' => Equipments::equipmentWorkingHrsByBoth($equipment->eq_id, $month)
    ]);
  }

  function ChangeLanguage($language, $id) {
    User::where('id', $id)->update([
      'language' => $language
    ]);
    return redirect()->back();
  }

  function ChangeTheme($theme, $id) {
    User::where('id', $id)->update([
      'theme' => $theme
    ]);
    return redirect()->back();
  }

}

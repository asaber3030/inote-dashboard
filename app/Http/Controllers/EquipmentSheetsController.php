<?php

namespace App\Http\Controllers;

use App\Models\EquipmentSheets;
use App\Models\Equipments;
use App\Models\EquipmentWorkingHrs;
use App\Models\MaterialSheets;
use App\Models\MaterialWorkingHrs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EquipmentSheetsController
{
  function SheetsList() {
    return inertia('Sheets/EquipmentSheets/EquipmentsSheets', [
      'sheets' => EquipmentSheets::with('equipment')->get(),
      'equipments' => Equipments::all()
    ]);
  }

  function CreateSheetView(Equipments $equipment) {
    return inertia('Sheets/EquipmentSheets/Add/AddSheet', [
      'equipment_working_hrs' => EquipmentWorkingHrs::with('equipment', 'contractor')->where('equipment', $equipment->eq_id)->get(),
      'equipment' => $equipment,
      'sheet_code' => "SHEQU" . DB::table('equipment_sheets')->orderBy('sheet_id', 'desc')->get()->first()->sheet_id + 1
    ]);
  }
  function CreateSheetAction(Request $request, Equipments $equipment) {

    $filter = $request->input('filterType');
    $code = "SHEQU" . DB::table('equipment_sheets')->orderBy('sheet_id', 'desc')->get()->first()->sheet_id + 1;
    $day = $request->input('day');
    $month = $request->input('month');

    $data = [];

    if ($filter == 'today') {
      $data = Equipments::equipmentWorkingHrsByToday($equipment->eq_id);
    } else if ($filter == 'day') {
      $data = Equipments::equipmentWorkingHrsByDay($equipment->eq_id, $day);
    } else if ($filter == 'month') {
      $data = Equipments::equipmentWorkingHrsByMonth($equipment->eq_id, $month);
    } else if ($filter == 'both') {
      $data = Equipments::equipmentWorkingHrsByBoth($equipment->eq_id, $month, $day);
    }

    EquipmentSheets::createSheet(
      code: $code,
      data: json_encode($data),
      equipment: $equipment->eq_id,
      include_summary: $request->input('includeSummary')
    );
    message('Equipment sheet has been created!');
    return to_route('equipment.sheets.list');
  }

  // View Sheet
  function ViewSheet(EquipmentSheets $sheet) {
    return inertia('Sheets/EquipmentSheets/View/ViewEquipmentSheet', [
      'sheet' => EquipmentSheets::with('equipment')->find($sheet->sheet_id),
    ]);
  }

  function ChangeSummaryStatus(Request $request, EquipmentSheets $sheet) {
    if ($request->has('sheetID')) {
      EquipmentSheets::where('sheet_id', $sheet->sheet_id)->update([
        'include_summary' => $request->input('summaryStatus') == true ? 1 : 0
      ]);
      if ($request->input('summaryStatus') == true) {
        message('Sheet summary included!');
      } else {
        message('Sheet summary removed!');
      }
      return to_route('equipment.sheets.view', $sheet->sheet_id);
    }
  }

}

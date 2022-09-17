<?php

namespace App\Http\Controllers;

use App\Models\ContractorMeters;
use App\Models\ContractorSheets;
use App\Models\ContractorWorkers;
use App\Models\MaterialSheets;
use App\Models\Materials;
use App\Models\MaterialWorkingHrs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MaterialSheetsController extends Controller {
  function SheetsList() {
    return inertia('Sheets/MaterialsSheets/MaterialsSheets', [
      'sheets' => MaterialSheets::with('material')->get(),
      'materials' => Materials::all()
    ]);
  }

  function CreateSheetView(Materials $material) {
    return inertia('Sheets/MaterialsSheets/Add/AddSheet', [
      'material_working_hrs' => MaterialWorkingHrs::where('material', $material->material_id)->get(),
      'material' => $material,
      'sheet_code' => "SHMTR" . DB::table('materials_sheets')->orderBy('sheet_id', 'desc')->get()->first()->sheet_id + 1
    ]);
  }
  function CreateSheetAction(Request $request, Materials $material) {
    $filter = $request->input('filterType');
    $code = "SHMTR" . DB::table('materials_sheets')->orderBy('sheet_id', 'desc')->get()->first()->sheet_id + 1;
    $day = $request->input('day');
    $month = $request->input('month');

    $data = [];

    if ($filter == 'today') {
      $data = Materials::materialWorkingHrsByToday($material->material_id);
    } else if ($filter == 'day') {
      $data = Materials::materialWorkingHrsByDay($material->material_id, $day);
    } else if ($filter == 'month') {
      $data = Materials::materialWorkingHrsByMonth($material->material_id, $month);
    } else if ($filter == 'both') {
      $data = Materials::materialWorkingHrsByBoth($material->material_id, $month, $day);
    }

    MaterialSheets::createSheet(
      code: $code,
      data: json_encode($data),
      material: $material->material_id,
      include_summary: $request->input('includeSummary')
    );
    message('Material sheet has been created!');
    return to_route('material.sheets.list');
  }

  // View Sheet
  function ViewSheet(MaterialSheets $sheet) {
    return inertia('Sheets/MaterialsSheets/View/ViewMaterialSheet', [
      'sheet' => MaterialSheets::with([
        'material' => function ($q) {
          $q->with('store')->get();
        }
      ])->find($sheet->sheet_id),
    ]);
  }

  function ChangeSummaryStatus(Request $request, MaterialSheets $sheet) {
    if ($request->has('sheetID')) {
      MaterialSheets::where('sheet_id', $sheet->sheet_id)->update([
        'include_summary' => $request->input('summaryStatus') == true ? 1 : 0
      ]);
      if ($request->input('summaryStatus') == true) {
        message('Sheet summary included!');
      } else {
        message('Sheet summary removed!');
      }
      return to_route('material.sheets.view', $sheet->sheet_id);
    }
  }

}

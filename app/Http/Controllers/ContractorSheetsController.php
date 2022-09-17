<?php

namespace App\Http\Controllers;

use App\Models\ContractorMeters;
use App\Models\ContractorSheets;
use App\Models\ContractorWorkers;
use App\Models\Contractors;
use App\Models\EquipmentWorkingHrs;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ContractorSheetsController extends Controller {

  private array $SHEET_TYPE = [
    'meters' => 'Contractor Meters',
    'workers' => 'Contractor Workers',
    'techs' => 'Contractor Technicians',
    'equipments' => 'Contractor Equipments'
  ];

  function SheetsList() {
    return inertia('Sheets/ContractorSheets/ContractorSheets', [
      'sheets' => ContractorSheets::with('contractor')->orderBy('sheet_id', 'DESC')->get(),
      'contractors' => Contractors::all()
    ]);
  }

  // View Sheet
  function ViewSheet(ContractorSheets $sheet) {
    return inertia('Sheets/ContractorSheets/View/ViewSheet', [
      'sheet' => ContractorSheets::with('contractor')->find($sheet->sheet_id),
      'totalMoneyWrs' => ContractorWorkers::where('belongs_to_con', $sheet->contractor)->sum('cost'),
      'totalHoursWrs' => ContractorWorkers::where('belongs_to_con', $sheet->contractor)->sum('compute_hrs'),
      'totalMoneyMts' => ContractorMeters::where('belongs_to_con', $sheet->contractor)->sum('cost'),
      'totalMeters' => ContractorMeters::where('belongs_to_con', $sheet->contractor)->sum('meters'),
    ]);
  }

  // Create Sheet
  function CreateSheetView() {
    $lastID = DB::table('contractor_sheets')->orderBy('sheet_id', 'DESC')->first()->sheet_id ?? 0;
    $sheetCODE = 'SHCON' . ($lastID + 1);
    return inertia('Sheets/ContractorSheets/Add/AddSheet', [
      'sheets' => ContractorSheets::with('contractor')->get(),
      'workers' => ContractorWorkers::with('contractor')->where('con_wr_type', 0)->get(),
      'technicians' => ContractorWorkers::with('contractor')->where('con_wr_type', 1)->get(),
      'contractors' => Contractors::all(),
      'meters' => ContractorMeters::with('contractor')->get(),
      'equipments' => EquipmentWorkingHrs::with('contractor')->get(),
      'sheetCode' => $sheetCODE,
    ]);
  }
  function CreateSheetAction(Request $request) {
    $lastID = DB::table('contractor_sheets')->orderBy('sheet_id', 'DESC')->first()->sheet_id ?? 0;

    $sheetCODE = 'SHCON' . ($lastID + 1);
    $sheetType = $request->input('sheetType');
    $sheetSummaryStatus = $request->input('includeSummary');

    $filterByDay = $request->input('filterDay');
    $filterByMonth = $request->input('filterMonth');
    $filterType = $request->input('filterType');

    $contractorID = $request->input('contractor');
    $contractor = Contractors::with('workers', 'meters', 'equipments_working_hrs')->find($request->input('contractor'));

    // Sheet Type -> Workers or Technicians
    if ($sheetType == $this->SHEET_TYPE['workers'] || $sheetType == $this->SHEET_TYPE['techs']) {

      $workerType = $sheetType == $this->SHEET_TYPE['workers'] ? 0 : 1;

      switch ($filterType):

        case 'today':
          $finalData = ContractorWorkers::selectToday(contractor: $contractorID, type: $workerType);
          break;

        case 'month':
          $finalData = ContractorWorkers::selectByMonth(month: $filterByMonth, contractor: $contractorID, type: $workerType);
          break;

        case 'day':
          $finalData = ContractorWorkers::selectByDay(day: $filterByDay, contractor: $contractorID, type: $workerType);
          break;

        case 'both':
          $finalData = ContractorWorkers::selectByBoth(month: $filterByMonth, day: $filterByDay, contractor: $contractorID, type: $workerType);
          break;

      endswitch;
    }

    // Sheet Type -> Meters
    if ($sheetType == $this->SHEET_TYPE['meters']) {

      switch ($filterType):

        case 'today':
          $finalData = ContractorMeters::selectToday(contractor: $contractorID);
          break;

        case 'month':
          $finalData = ContractorMeters::selectByMonth(month: $filterByMonth, contractor: $contractorID);
          break;

        case 'day':
          $finalData = ContractorMeters::selectByDay(day: $filterByDay, contractor: $contractorID);
          break;

        case 'both':
          $finalData = ContractorMeters::selectByBoth(month: $filterByMonth, day: $filterByDay, contractor: $contractorID);
          break;

      endswitch;

    }

    // Sheet Type -> Meters
    if ($sheetType == $this->SHEET_TYPE['equipments']) {

      switch ($filterType):

        case 'today':
          $finalData = EquipmentWorkingHrs::selectToday(contractor: $contractorID);
          break;

        case 'month':
          $finalData = EquipmentWorkingHrs::selectByMonth(month: $filterByMonth, contractor: $contractorID);
          break;

        case 'day':
          $finalData = EquipmentWorkingHrs::selectByDay(day: $filterByDay, contractor: $contractorID);
          break;

        case 'both':
          $finalData = EquipmentWorkingHrs::selectByBoth(month: $filterByMonth, day: $filterByDay, contractor: $contractorID);
          break;

      endswitch;

    }

    // Create The Sheet
    ContractorSheets::createSheet(
      type: $sheetType,
      contractor: $contractorID,
      include_summary: $sheetSummaryStatus,
      data: json_encode($finalData),
      code: $sheetCODE,
      message: 'Sheet Created Successfully',
      route: 'contractor.sheets.list',
      message_type: 'success'
    );
    return to_route('contractor.sheets.list');
  }

  // Change Sheet Summary Status
  function ChangeSummaryStatus(Request $request, ContractorSheets $sheet) {
    if ($request->has('sheetID')) {
      ContractorSheets::where('sheet_id', $sheet->sheet_id)->update([
        'include_summary' => $request->input('summaryStatus') == true ? 1 : 0
      ]);
      if ($request->input('summaryStatus') == true) {
        message('Sheet summary included!');
      } else {
        message('Sheet summary removed!');
      }
      return to_route('contractor.sheets.view', $sheet->sheet_id);
    }
  }
}

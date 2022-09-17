<?php

namespace App\Http\Controllers;

use App\Models\ContractorMeters;
use App\Models\Contractors;
use App\Models\ContractorWorkers;
use App\Models\Equipments;
use App\Models\EquipmentWorkingHrs;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ContractorsController extends Controller {
  private const PATH = 'Contractors/';
  private const LIST_ROUTE = 'contractors.list';

  // List Contractors
  function Contractors() {
    return inertia(self::PATH . 'List/ListContractors', [
      'contractors' => Contractors::withTrashed()->orderBy('con_id', 'desc')->get()
    ]);
  }

  // Restore selected
  function RestoreSelected(Request $request) {
    foreach ($request->selected as $selected) {
      $contractor = Contractors::withTrashed()->where('con_id', $selected)->get()->first()->restore();
      session()->flash('msg', 'Selected Contractors has been restored successfully!');
      session()->flash('msg_type', 'success');
    }
    return to_route(self::LIST_ROUTE);
  }

  // Delete selected
  function DeleteSelected(Request $request) {
    foreach ($request->selected as $selected) {
      $contractor = Contractors::where('con_id', $selected)->get()->first()->delete();
      session()->flash('msg', 'Selected Contractors has been deleted! successfully!');
      session()->flash('msg_type', 'warning');
    }
    return to_route(self::LIST_ROUTE);
  }

  // View Contractor
  function ShowContractorView(Contractors $contractor) {
    return inertia(self::PATH . 'View/ViewContractor', [
      'contractor' => Contractors::with([
        'workers' => function ($q) {
          $q->orderBy('con_wr_type', 'desc')->get();
        }
      ])->find($contractor->con_id),
      'totalSpentMoney' => ContractorWorkers::where('belongs_to_con', $contractor->con_id)->sum('cost'),
      'avgSpentMoneyOnDay' => DB::table('contractor_workers')
        ->select( DB::raw("SUM(cost) as total_spent"), 'started_at', DB::raw("DATE_FORMAT(started_at, '%d') as date"))
        ->where('belongs_to_con', $contractor->con_id)
        ->groupBy('cost', 'started_at', 'date')
        ->get()
        ->sum('total_spent'),
      'avgSpentMoneyOnMonth' => DB::table('contractor_workers')
        ->select( DB::raw("SUM(cost) as total_spent"), 'started_at', DB::raw("DATE_FORMAT(started_at, '%m') as date"))
        ->where('belongs_to_con', $contractor->con_id)
        ->groupBy('cost', 'started_at', 'date')
        ->get()
        ->sum('total_spent'),
      'countMonths' => DB::table('contractor_workers')
        ->select(DB::raw("date_format(started_at, '%m') as date", 'started_at'))
        ->where('belongs_to_con', $contractor->con_id)
        ->groupBy('started_at')
        ->get()
        ->count(),
      'countWorkers' => ContractorWorkers::where([
          ['belongs_to_con', $contractor->con_id],
          ['con_wr_type', 0]
        ])->get()->count(),
      'countTechs' => ContractorWorkers::where([
        ['belongs_to_con', $contractor->con_id],
        ['con_wr_type', 1]
      ])->get()->count(),
      'avgWorkingHours' => ContractorWorkers::where('belongs_to_con', $contractor->con_id)->sum('compute_hrs')
    ]);
  }

  // Workers or Techinicans
  function ContractorWorkers(Contractors $contractor) {
    return inertia(self::PATH . 'Workers/Workers', [
      'unid' => uniqid(),
      'contractor' => Contractors::with([
        'workers' => function ($q) {
          $q->orderBy('con_wr_type', 'desc')->get();
        }
      ])->find($contractor->con_id),
      'totalSpentMoney' => ContractorWorkers::where('belongs_to_con', $contractor->con_id)->sum('cost'),
      'avgSpentMoneyOnDay' => DB::table('contractor_workers')
        ->select( DB::raw("SUM(cost) as total_spent"), 'started_at', DB::raw("DATE_FORMAT(started_at, '%d') as date"))
        ->where('belongs_to_con', $contractor->con_id)
        ->groupBy('cost', 'started_at', 'date')
        ->get()
        ->sum('total_spent'),
      'avgSpentMoneyOnMonth' => DB::table('contractor_workers')
        ->select( DB::raw("SUM(cost) as total_spent"), 'started_at', DB::raw("DATE_FORMAT(started_at, '%m') as date"))
        ->where('belongs_to_con', $contractor->con_id)
        ->groupBy('cost', 'started_at', 'date')
        ->get()
        ->sum('total_spent'),
      'countMonths' => DB::table('contractor_workers')
        ->select(DB::raw("date_format(started_at, '%m') as date", 'started_at'))
        ->where('belongs_to_con', $contractor->con_id)
        ->groupBy('started_at')
        ->get()
        ->count(),
      'countWorkers' => ContractorWorkers::where([
        ['belongs_to_con', $contractor->con_id],
        ['con_wr_type', 0]
      ])->get()->count(),
      'countTechs' => ContractorWorkers::where([
        ['belongs_to_con', $contractor->con_id],
        ['con_wr_type', 1]
      ])->get()->count(),
      'avgWorkingHours' => ContractorWorkers::where('belongs_to_con', $contractor->con_id)->sum('compute_hrs')
    ]);
  }

  // Workers or Techinicans
  function ContractorTechs(Contractors $contractor) {
    return inertia(self::PATH . 'Techs/Technicians', [
      'unid' => uniqid(),
      'contractor' => Contractors::with([
        'workers' => function ($q) {
          $q->orderBy('con_wr_type', 'desc')->get();
        }
      ])->find($contractor->con_id),
      'totalSpentMoney' => ContractorWorkers::where('belongs_to_con', $contractor->con_id)->sum('cost'),
      'avgSpentMoneyOnDay' => DB::table('contractor_workers')
        ->select( DB::raw("SUM(cost) as total_spent"), 'started_at', DB::raw("DATE_FORMAT(started_at, '%d') as date"))
        ->where('belongs_to_con', $contractor->con_id)
        ->groupBy('cost', 'started_at', 'date')
        ->get()
        ->sum('total_spent'),
      'avgSpentMoneyOnMonth' => DB::table('contractor_workers')
        ->select( DB::raw("SUM(cost) as total_spent"), 'started_at', DB::raw("DATE_FORMAT(started_at, '%m') as date"))
        ->where('belongs_to_con', $contractor->con_id)
        ->groupBy('cost', 'started_at', 'date')
        ->get()
        ->sum('total_spent'),
      'countMonths' => DB::table('contractor_workers')
        ->select(DB::raw("date_format(started_at, '%m') as date", 'started_at'))
        ->where('belongs_to_con', $contractor->con_id)
        ->groupBy('started_at')
        ->get()
        ->count(),
      'countWorkers' => ContractorWorkers::where([
        ['belongs_to_con', $contractor->con_id],
        ['con_wr_type', 0]
      ])->get()->count(),
      'countTechs' => ContractorWorkers::where([
        ['belongs_to_con', $contractor->con_id],
        ['con_wr_type', 1]
      ])->get()->count(),
      'avgWorkingHours' => ContractorWorkers::where('belongs_to_con', $contractor->con_id)->sum('compute_hrs')
    ]);
  }

  // Add Worker or techinican
  function AddWorkerView(Contractors $contractor, int $type = 0) {
    if ($type === 0 || $type === 1) {
      return inertia(self::PATH . 'AddWorker/AddWorker', [
        'contractor' => $contractor,
        'type' => $type ?? 0,
        'contractors' => Contractors::all()
      ]);
    } else {
      abort(404);
    }

  }
  function AddWorkerAction(Request $request, Contractors $contractor, int $type = 0) {
    $request->validate([
      'worker_name' => 'required|min:3|max:100',
      'worker_type' => 'required|integer|in:1,0',
      'worker_phone' => 'required|integer|regex:/^1[0125][0-9]{8}$/u',
      'started_at' => 'required|date',
      'ended_at' => 'required|date|after:started_at',
      'contractor' => 'required|integer|exists:contractors,con_id',
      'cost' => 'required|integer',
    ]);
    $started_date = Carbon::parse($request->input('started_at'));
    $ended_date = Carbon::parse($request->input('ended_at'));
    $diff = $started_date->diff($ended_date);
    ContractorWorkers::create([
      'con_wr_name' => $request->input('worker_name'),
      'con_wr_phone' => $request->input('worker_phone'),
      'con_wr_type' => $request->input('worker_type'),
      'started_at' => $request->input('started_at'),
      'ended_at' => $request->input('ended_at'),
      'belongs_to_con' => $request->input('contractor'),
      'cost' => $request->input('cost'),
      'compute_hrs' => $diff->h,
      'compute_mins' => $diff->i,
      'compute_months' => $diff->m,
      'compute_years' => $diff->y,
      'compute_days' => $diff->d,
    ]);
    message('Worker has been added!');
    return to_route('contractors.workers', $request->input('contractor'));
  }

  // Filtering data
  function FilterData(Contractors $contractor, $month = null, $day = null) {
    $status = '';
    if (!is_null($month) && !is_null($day)) {
      $data = DB::table('contractors')
        ->join('contractor_workers', 'contractor_workers.belongs_to_con', 'contractors.con_id')
        ->where([
          [DB::raw("DATE_FORMAT(started_at, '%d')"), $day],
          [DB::raw("DATE_FORMAT(started_at, '%m')"), $month]
        ])
        ->where('con_id', $contractor->con_id)
        ->get();

      $status = 'with_two';
    } elseif (is_null($month) && !is_null($day)) {
      $data = DB::table('contractors')
        ->join('contractor_workers', 'contractor_workers.belongs_to_con', 'contractors.con_id')
        ->where(DB::raw("DATE_FORMAT(started_at, '%d')"), $day)
        ->where('con_id', $contractor->con_id)
        ->get();

      $status = 'with_only_day';
    } elseif (!is_null($month) && is_null($day)) {
      $data = DB::table('contractors')
        ->join('contractor_workers', 'contractor_workers.belongs_to_con', 'contractors.con_id')
        ->where(DB::raw("DATE_FORMAT(started_at, '%m')"), $month)
        ->where('con_id', $contractor->con_id)
        ->get();

      $status = 'with_only_month';
    } elseif (is_null($month) && is_null($day)) {
      $data = DB::table('contractors')
        ->join('contractor_workers', 'contractor_workers.belongs_to_con', 'contractors.con_id')
        ->where('con_id', $contractor->con_id)
        ->get();
      $status = 'nullable';
    }
    return inertia(self::PATH . 'Filter/FilterData', [
      'month' => $month,
      'day' => $day,
      'data' => $data,
      'sts' => $status,
      'contractor' => $contractor
    ]);
  }

  // Meters data
  function ContractorMetersView(Contractors $contractor, $month = null, $day = null) {
    $status = '';
    if (!is_null($month) && !is_null($day)) {
      $data = DB::table('contractors')
        ->join('contractor_meters', 'contractor_meters.belongs_to_con', 'contractors.con_id')
        ->where([
          [DB::raw("DATE_FORMAT(started_at, '%d')"), $day],
          [DB::raw("DATE_FORMAT(started_at, '%m')"), $month]
        ])
        ->where('con_id', $contractor->con_id)
        ->get();
      $status = 'with_two';
    } elseif (is_null($month) && !is_null($day)) {
      $data = DB::table('contractors')
        ->join('contractor_meters', 'contractor_meters.belongs_to_con', 'contractors.con_id')
        ->where(DB::raw("DATE_FORMAT(started_at, '%d')"), $day)
        ->where('con_id', $contractor->con_id)
        ->get();

      $status = 'with_only_day';
    } elseif (!is_null($month) && is_null($day)) {
      $data = DB::table('contractors')
        ->join('contractor_meters', 'contractor_meters.belongs_to_con', 'contractors.con_id')
        ->where(DB::raw("DATE_FORMAT(started_at, '%m')"), $month)
        ->where('con_id', $contractor->con_id)
        ->get();

      $status = 'with_only_month';
    } elseif (is_null($month) && is_null($day)) {
      $data = DB::table('contractors')
        ->join('contractor_meters', 'contractor_meters.belongs_to_con', 'contractors.con_id')
        ->where('con_id', $contractor->con_id)
        ->get();
      $status = 'nullable';
    }
    if ($contractor->con_type) {
      return inertia(self::PATH . 'Meters/ContractorMeters', [
        'month' => $month,
        'day' => $day,
        'data' => $data,
        'sts' => $status,
        'contractor' => $contractor
      ]);
    }
    return abort(404);
  }

  // Add Meter Working Hour
  function ContractorMetersAddView(Contractors $contractor) {
    if ($contractor->con_type == 1) {
      return inertia('Contractors/AddMeter/AddMeter', [
        'contractor' => $contractor,
      ]);
    }
    return abort(404);
  }
  function ContractorMetersAddAction(Request $request, Contractors $contractor) {
    $request->validate([
      'meters' => 'required|integer',
      'area' => 'required|integer',
      'width' => 'required|integer',
      'length' => 'required|integer',
      'height' => 'required|integer',
      'cost' => 'required|integer',
      'started_at' => 'required|date',
    ]);
    ContractorMeters::create([
      'meters' => $request->input('meters'),
      'area' => $request->input('area'),
      'cost' => $request->input('cost'),
      'width' => $request->input('width'),
      'length' => $request->input('length'),
      'height' => $request->input('height'),
      'started_at' => $request->input('started_at'),
      'belongs_to_con' => $contractor->con_id,
    ]);
    message('Meter data added successfully!');
    return to_route('contractors.meters', $contractor->con_id);
  }

  // Equipments data
  function ContractorEquipmentsView(Contractors $contractor, $month = null, $day = null) {
    $data = EquipmentWorkingHrs::with('equipment', 'contractor')
      ->where('contractor', $contractor->con_id);

    if (is_null($month) && is_null($day)) {
      $data = $data->get();
    } elseif (!is_null($month) && is_null($day)) {
      $data = $data->whereMonth('started_at', $month)->get();
    } elseif (is_null($month) && !is_null($day)) {
      $data = $data->whereDay('started_at', $day)->get();
    } elseif (!is_null($month) && !is_null($day)) {
      $data = $data->whereDay('started_at', $day)->whereMonth('started_at', $month)->get();
    }

    if ($contractor->con_type == 2) {
      return inertia(self::PATH . 'Equipments/ContractorEquipments', [
        'month' => $month,
        'day' => $day,
        'data' => $data,
        'contractor' => $contractor
      ]);
    }
    return abort(404);
  }

  // Add Equipments for Contractor
  public function ContractorEquipmentsAddView(Contractors $contractor) {
    if ($contractor->con_type == 2) {
      return inertia('Contractors/AddEquipment/AddEquipment', [
        'contractor' => $contractor,
        'equipments' => Equipments::withTrashed()->get()
      ]);
    }
    return abort(404);
  }
  public function ContractorEquipmentsAddAction(Request $request, Contractors $contractor) {
    $request->validate([
      'started_at' => 'required|date',
      'ended_at' => 'required|date|after:started_at',
      'additional_hrs' => 'required|integer',
      'working_location' => 'required',
      'note' => 'required|max:255',
      'cost' => 'required|integer|max:100000000',
      'equipment' => 'required|integer'
    ]);

    EquipmentWorkingHrs::create([
      'started_at' => $request->input('started_at'),
      'ended_at' => $request->input('ended_at'),
      'additional_hrs' => $request->input('additional_hrs'),
      'working_location' => $request->input('working_location'),
      'note' => $request->input('note'),
      'cost' => $request->input('cost'),
      'contractor' => $contractor->con_id,
      'equipment' => $request->input('equipment')
    ]);

    message('Working hour for equipment has been added');
    return to_route('contractors.equipments', $contractor->con_id);
  }

  // New Contractor
  function AddContractorView() {
    return inertia('Contractors/Add/AddContractor', [
      'contractors' => Contractors::withTrashed()->orderBy('con_id', 'desc')->get(),
    ]);
  }
  function AddContractorAction(Request $request) {
    $request->validate([
      'contractor_name' => 'required|min:3|max:100',
      'contractor_type' => 'required',
      'contractor_phone' => 'required|integer|regex:/^1[0125][0-9]{8}$/u',
    ], [
      'contractor_phone.regex' => "This field must be an egyptain phone for e.g. 1123456789"
    ]);
    Contractors::create([
      'con_name' => $request->input('contractor_name'),
      'con_type' => $request->input('contractor_type'),
      'con_phone' => $request->input('contractor_phone'),
    ]);
    session()->flash('msg', 'Contractor Created successfully!');
    session()->flash('msg_type', 'success');
    return to_route(self::LIST_ROUTE);
  }

  // Update Contractor
  function UpdateContractorView(Contractors $contractor) {
    return inertia('Contractors/Update/UpdateContractor', [
      'contractors' => Contractors::withTrashed()->orderBy('con_id', 'desc')->get(),
      'contractor' => $contractor,
    ]);
  }
  function UpdateContractorAction(Request $request, Contractors $contractor) {
    $request->validate([
      'contractor_name' => 'required|min:3|max:100|unique:contractors,con_id,' . $contractor->con_id . ',con_id',
      'contractor_type' => 'required',
      'contractor_phone' => 'required|integer|regex:/^1[0125][0-9]{8}$/u',
    ], [
      'contractor_phone.regex' => "This field must be an egyptain phone number for e.g. 1123456789"
    ]);
    Contractors::where('con_id', $contractor->con_id)->update([
      'con_name' => $request->input('contractor_name'),
      'con_type' => $request->input('contractor_type'),
      'con_phone' => $request->input('contractor_phone'),
    ]);
    session()->flash('msg', 'Contractor Updated successfully!');
    session()->flash('msg_type', 'success');
    return to_route(self::LIST_ROUTE);
  }

  // Delete Contractor
  function DeleteContractorView(Contractors $contractor) {
    return inertia('Contractors/Delete/DeleteContractor', [
      'contractors' => Contractors::withTrashed()->orderBy('con_id', 'desc')->get(),
      'contractor' => $contractor,
    ]);
  }
  function DeleteContractorAction(Request $request, Contractors $contractor) {
    $contractor->delete();
    session()->flash('msg', 'Contractor has been deleted, you can restore it again..!');
    session()->flash('msg_type', 'warning');
    return to_route('contractors.list');
  }

  // Restore Contractor
  function RestoreContractorView($id) {
    return inertia('Contractors/Restore/RestoreContractor', [
      'contractors' => Contractors::withTrashed()->orderBy('con_id', 'desc')->get(),
      'contractor' => Contractors::withTrashed()->where('con_id', $id)->get()->first(),
    ]);
  }
  function RestoreContractorAction(Request $request, $id) {
    $contractor = Contractors::withTrashed()->where('con_id', $id)->get()->first();
    $contractor->restore();
    session()->flash('msg', 'Contractor has been restored successfully!');
    session()->flash('msg_type', 'primary');
    return to_route('contractors.list');
  }

}

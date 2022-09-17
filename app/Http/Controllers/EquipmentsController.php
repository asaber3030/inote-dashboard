<?php

namespace App\Http\Controllers;

use App\Models\Contractors;
use App\Models\Equipments;
use App\Models\EquipmentWorkingHrs;
use App\Models\Materials;
use App\Models\MaterialWorkingHrs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EquipmentsController extends Controller
{
  private const PATH = 'Equipments/';

  public function Equipments() {
    return inertia(self::PATH . 'List/ListEquipments', [
      'equipments' => Equipments::withTrashed()->get()
    ]);
  }

  public function AddEquipmentView() {
    return inertia(self::PATH . 'Add/AddEquipment', [
      'equipments' => Equipments::all(),
      'lastEquipmentID' => DB::table('equipments')->orderBy('eq_id', 'desc')->first()->eq_id
    ]);
  }
  public function AddEquipmentAction(Request $request) {
    $last_id = DB::table('equipments')->orderBy('eq_id', 'desc')->first()->eq_id + 1;
    $request->validate([
      'equipment_name' => 'required',
      'equipment_type' => 'required',
      'productivity' => 'required|integer',
    ]);
    Equipments::create([
      'eq_name' => $request->input('equipment_name'),
      'eq_type' => $request->input('equipment_type'),
      'productivity' => $request->input('productivity'),
      'eq_tag' => 'EQU' . $last_id
    ]);
    session()->flash('msg', 'Equipment has been created successfully!');
    return to_route('equipments.list');
  }

  public function UpdateEquipmentView(Equipments $equipment) {
    return inertia(self::PATH . 'Update/UpdateEquipment', [
      'equipment' => $equipment,
      'equipments' => Equipments::all(),
      'lastEquipmentID' => DB::table('equipments')->orderBy('eq_id', 'desc')->first()->eq_id
    ]);
  }
  public function UpdateEquipmentAction(Request $request, Equipments $equipment) {
    $request->validate([
      'equipment_name' => 'required',
      'equipment_type' => 'required',
      'productivity' => 'required|integer',
    ]);
    Equipments::where('eq_id', $equipment->eq_id)->update([
      'eq_name' => $request->input('equipment_name'),
      'eq_type' => $request->input('equipment_type'),
      'productivity' => $request->input('productivity'),
    ]);
    session()->flash('msg', 'Equipment has been updated successfully!');
    return to_route('equipments.list');
  }

  public function DeleteEquipmentView(Equipments $equipment) {
    return inertia(self::PATH . 'Delete/DeleteEquipment', [
      'equipments' => Equipments::withTrashed()->get(),
      'equipment' => $equipment
    ]);
  }
  public function DeleteEquipmentAction(Request $request, Equipments $equipment) {
    $equipment->delete();
    message(msg: 'Equipment has been deleted successfully', type: 'error');
    return to_route('equipments.list');
  }
  public function DeleteSelected(Request $request) {
    if (!empty($request->selected)) {
      foreach ($request->selected as $s) {
        $equipment = Equipments::find($s);
        $equipment->delete();
      }
      message(msg: 'Equipments has been restored successfully', type: 'error');
      return to_route('equipments.list');
    }
  }

  public function RestoreEquipmentView($id) {
    $equipment = Equipments::withTrashed()->find($id);
    return inertia(self::PATH . 'Restore/RestoreEquipment', [
      'equipments' => Equipments::withTrashed()->get(),
      'equipment' => $equipment
    ]);
  }
  public function RestoreEquipmentAction(Request $request, $id) {
    $equipment = Equipments::withTrashed()->find($id);
    $equipment->restore();
    message(msg: 'Equipment has been restored successfully');
    return to_route('equipments.list');
  }
  public function RestoreSelected(Request $request) {
    if (!empty($request->selected)) {
      foreach ($request->selected as $s) {
        $equipment = Equipments::withTrashed()->find($s);
        $equipment->restore();
      }
      message(msg: 'Equipments has been restored successfully');
      return to_route('equipments.list');
    }
  }

  public function WorkingHours(Equipments $equipment) {
    return inertia(self::PATH . 'WorkingHours/EquipmentWorkingHours', [
      'data' => Equipments::with(['working_hrs' => function($q) {
        $q->with('contractor', 'equipment')->get();
      }])->find($equipment->eq_id),
      'equipment' => $equipment
    ]);
  }

  // Add Working Hours For Material
  public function AddHourView(Equipments $equipment) {
    return inertia('Equipments/AddHour/AddWorkingHour', [
      'equipment' => $equipment,
      'contractors' => Contractors::all()
    ]);
  }
  public function AddHourAction(Request $request, Equipments $equipment) {
    $request->validate([
      'started_at' => 'required|date',
      'ended_at' => 'required|date|after:started_at',
      'additional_hrs' => 'required|integer',
      'working_location' => 'required',
      'contractor' => 'required|integer',
      'note' => 'required|max:255',
      'cost' => 'required|integer|max:100000000',
    ]);

    EquipmentWorkingHrs::create([
      'started_at' => $request->input('started_at'),
      'ended_at' => $request->input('ended_at'),
      'additional_hrs' => $request->input('additional_hrs'),
      'working_location' => $request->input('working_location'),
      'note' => $request->input('note'),
      'cost' => $request->input('cost'),
      'contractor' => $request->input('contractor'),
      'equipment' => $equipment->eq_id
    ]);

    session()->flash('msg', 'Working hour for equipment has been added');
    return to_route('equipments.hours', $equipment->eq_id);
  }

}

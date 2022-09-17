<?php

namespace App\Http\Controllers;

use App\Models\Materials;
use App\Models\MaterialWorkingHrs;
use App\Models\Stores;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MaterialsController extends Controller
{
  // List Materials
  public function Materials() {
    return inertia('Materials/List/ListMaterials', [
      'materials' => Materials::withTrashed()->with('store')->get()
    ]);
  }

  // Add Materials
  public function AddMaterialView() {
    return inertia('Materials/Add/AddMaterial', [
      'stores' => Stores::withTrashed()->get(),
      'materials' => Materials::withTrashed()->get(),
      'lastMaterialID' => Materials::withTrashed()->orderBy('material_id', 'desc')->take(1)->get()->first()->material_id ?? 0
    ]);
  }
  public function AddMaterialAction(Request $request) {
    $last_id = Materials::withTrashed()->orderBy('material_id', 'desc')->take(1)->get()->first()->material_id ?? 0;
    $request->validate([
      'material_name' => 'required|unique:materials|min:3|max:255',
      'material_amount' => 'required|integer',
      'material_icon' => 'required|mimes:png',
      'store' => 'required|integer',
      'material_specifications' => 'required|min:110|max:255',
    ]);
    $file = $request->file('material_icon');
    $target = 'uploads/materials/';
    $material_icon_name = 'material_' . uniqid() . time() . '.' . $file->getClientOriginalExtension();
    $file->move($target, $material_icon_name);
    Materials::create([
      'material_tag' => 'MTR' . ($last_id + 1),
      'material_name' => $request->input('material_name'),
      'material_amount' => $request->input('material_amount'),
      'store' => $request->input('store'),
      'material_specifications' => $request->input('material_specifications'),
      'material_icon' => $target . $material_icon_name,
    ]);
    session()->flash('msg', 'Material has been added successfully!');
    session()->flash('msg_type', 'success');
    return to_route('materials.list');
  }

  // Working Hours for each material
  public function WorkingHours(Materials $material) {
    return inertia('Materials/WorkingHours/MaterialWorkingHours', [
      'material' => Materials::withTrashed()->with('store')->where('material_id', $material->material_id)->get()->first(),
      'data' => Materials::with('working_hrs')->find($material->material_id)
    ]);
  }

  // Add Working Hours For Material
  public function AddHourView(Materials $material) {
    return inertia('Materials/AddHour/AddWorkingHour', [
      'material' => $material
    ]);
  }
  public function AddHourAction(Request $request, Materials $material) {
    $request->validate([
      'compute_hrs' => 'required|date',
      'taken_amount' => 'required|integer',
      'length' => 'required|integer',
      'width' => 'required|integer',
      'height' => 'required|integer',
      'cost' => 'required|integer',
    ]);

    $materialAmount = $material->material_amount;

    if ($request->input('taken_amount') > $materialAmount) {
      message('Material amount is ' . $materialAmount . ' cannot take ' . $request->input('taken_amount'));
    } else {
      MaterialWorkingHrs::create([
        'taken_amount' => $request->input('taken_amount'),
        'compute_hrs' => $request->input('compute_hrs'),
        'length' => $request->input('length'),
        'width' => $request->input('width'),
        'height' => $request->input('height'),
        'taken_notes' => $request->input('taken_notes'),
        'cost' => $request->input('salary'),
        'material' => $material->material_id
      ]);

      Materials::where('material_id', $material->material_id)->update([
        'material_amount' => $materialAmount - $request->input('taken_amount')
      ]);

      message('Working hour for material ' . $material->material_name . ' has been added');
      return to_route('materials.hours', $material->material_id);
    }
  }

  // Searching for
  public function FilterHours(Materials $material, $filter, $day, $month = 0) {

    if ($filter === 'multi' && $month != 0) {
      $data = MaterialWorkingHrs::with(['material' => function($q) {
        $q->with('store');
      }])->whereDay('compute_hrs', '=', $day)
        ->whereMonth('compute_hrs', '=', $month)
        ->get();
    } elseif ($filter == 'only' && $day == 0) {
      $data = MaterialWorkingHrs::with(['material' => function($q) {
        $q->with('store');
      }])->whereMonth('compute_hrs', '=', $month)->get();
    } else {
      $data = [];
    }

    $material_data = Materials::with('store')->find($material->material_id);
    return inertia('Materials/Searching/SearchableHours', [
      'material' => $material_data,
      'day' => $day,
      'month' => $month,
      'data' => $data,
      'filter' => $filter,
    ]);
  }
}

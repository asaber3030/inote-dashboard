<?php

namespace App\Http\Controllers;

use App\Exports\ExportStores;
use App\Models\Materials;
use App\Models\Stores;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Enums\TagsEnum;

class StoresController extends Controller
{
  // Listing Stores Page
  public function Stores() {
    return inertia('Stores/List/ListStores', [
      'stores' => Stores::withTrashed()->get()
    ]);
  }

  // Trashed Stores
  public function TrashedStores() {
    return inertia('Stores/Trashed/TrashedStores', [
      'stores' => Stores::onlyTrashed()->get()
    ]);
  }

  // New Store
  public function CreateStoreView() {
    return inertia('Stores/Add/AddStore', [
      'stores' => Stores::withTrashed()->get(),
      'lastStoreID' => Stores::withTrashed()->orderBy('store_id', 'desc')->take(1)->get()->first()->store_id ?? 0
    ]);
  }
  public function CreateStoreAction(Request $request) {
    $id = Stores::withTrashed()->orderBy('store_id', 'desc')->take(1)->get()->first();
    $last_id = "STR" . ($id->store_id ?? 0 + 1);
    $request->validate([
      'store_name' => 'required|unique:stores|min:3|max:100',
      'store_type' => 'required|min:3|max:100',
      'store_capacity' => 'required|integer',
    ]);
    if ($last_id === $request->input('store_tag')) {
      Stores::create([
        'store_name' => $request->input('store_name'),
        'store_type' => $request->input('store_type'),
        'store_capacity' => $request->input('store_capacity'),
        'store_tag' => $last_id,
      ]);
      session()->flash('msg', 'Created successfully!');
      session()->flash('msg_type', 'success');
    } else {
      session()->flash('msg', 'There is something wrong with tag name of store');
    }

  }

  // Update Store
  public function UpdateStoreView(Stores $store) {
    return inertia('Stores/Update/UpdateStore', [
      'stores' => Stores::withTrashed()->get(),
      'store' => $store,
      'lastStoreID' => Stores::withTrashed()->orderBy('store_id', 'desc')->take(1)->get()->first()->store_id
    ]);
  }
  public function UpdateStoreAction(Request $request, Stores $store) {
    $request->validate([
      'store_name' => 'required|min:3|max:100|unique:stores,store_id,' . $store->store_id . ',store_id',
      'store_type' => 'required|min:3|max:100',
      'store_capacity' => 'required|integer',
    ]);
    Stores::where('store_id', $store->store_id)->update([
      'store_name' => $request->input('store_name'),
      'store_type' => $request->input('store_type'),
      'store_capacity' => $request->input('store_capacity'),
    ]);
    session()->flash('msg', 'Updated successfully!');
    session()->flash('msg_type', 'success');

  }

  // Delete Store
  public function DeleteStoreView(Stores $store) {
    return inertia('Stores/Delete/DeleteStore', [
      'stores' => Stores::withTrashed()->get(),
      'store' => $store,
    ]);
  }
  public function DeleteStoreAction(Request $request, Stores $store) {
    $store->delete();
    session()->flash('msg', 'Store has been deleted, you can restore it again..!');
    session()->flash('msg_type', 'warning');
    return to_route('stores.list');
  }

  // Restore Store
  public function RestoreStoreView($id) {
    return inertia('Stores/Restore/RestoreStore', [
      'stores' => Stores::withTrashed()->get(),
      'store' => Stores::withTrashed()->where('store_id', $id)->get()->first(),
    ]);
  }
  public function RestoreStoreAction(Request $request, $id) {
    $store = Stores::withTrashed()->where('store_id', $id)->get()->first();
    $store->restore();
    session()->flash('msg', 'Store has been restored successfully!');
    session()->flash('msg_type', 'primary');
    return to_route('stores.list');
  }

  // Restore selected
  public function RestoreSelected(Request $request) {
    foreach ($request->selected as $selected) {
      $store = Stores::withTrashed()->where('store_id', $selected)->get()->first()->restore();
      session()->flash('msg', 'Stores has been restored successfully!');
      session()->flash('msg_type', 'success');
    }
    return to_route('stores.list');
  }

  // Delete selected
  public function DeleteSelected(Request $request) {
    foreach ($request->selected as $selected) {
      $store = Stores::withTrashed()->where('store_id', $selected)->get()->first()->delete();
      session()->flash('msg', 'Stores has been deleted! successfully!');
      session()->flash('msg_type', 'warning');
    }
    return to_route('stores.list');
  }

  // Export
  public function ExportStores(Request $request) {
    return (new ExportStores())->store('stores.csv');
  }

  // Stored Materials
  public function StoredMaterials(Stores $store) {
    return inertia('Stores/Materials/StoredMaterials', [
      'store' => $store,
      'data' => Stores::where('store_id', $store->store_id)->with(['materials' => function ($q) {
        $q->withTrashed()->get();
      }])->get()[0]
    ]);
  }

  // Add Materials
  public function AddMaterialView(Stores $store) {
    return inertia('Stores/AddMaterial/AddMaterial', [
      'store' => $store,
      'materials' => Materials::withTrashed()->where('store', $store->store_id)->get(),
      'lastMaterialID' => Materials::withTrashed()->orderBy('material_id', 'desc')->take(1)->get()->first()->material_id ?? 0
    ]);
  }
  public function AddMaterialAction(Request $request, Stores $store) {
    $last_id = Materials::withTrashed()->orderBy('material_id', 'desc')->take(1)->get()->first()->material_id ?? 0;
    $request->validate([
      'material_name' => 'required|unique:materials|min:3|max:255',
      'material_amount' => 'required|integer',
    ]);

    $target = 'uploads/materials/';
    $material_icon_name = '';

    if ($request->hasFile('material_icon')) {
      $file = $request->file('material_icon');
      $material_icon_name = 'material_' . uniqid() . time() . '.' . $file->getClientOriginalExtension();
      $file->move($target, $material_icon_name);
    }
    Materials::create([
      'material_tag' => 'MTR' . ($last_id + 1),
      'material_name' => $request->input('material_name'),
      'material_amount' => $request->input('material_amount'),
      'material_icon' => $request->hasFile('material_icon') ? $target . $material_icon_name : 'images/defaults/material.png',
      'store' => $store->store_id,
      'material_specifications' => $request->input('material_specifications') ?? 'N/A',
    ]);
    session()->flash('msg', 'Material has been added successfully!');
    session()->flash('msg_type', 'success');
    return to_route('stores.materials', $store->store_id);
  }

  // Update Material
  public function UpdateMaterialView(Materials $material) {
    return inertia('Stores/UpdateMaterial/UpdateMaterial', [
      'material' => $material,
      'materials' => Materials::withTrashed()->where('store', $material->store)->get(),
      'lastMaterialID' => Materials::withTrashed()->orderBy('material_id', 'desc')->take(1)->get()->first()->material_id ?? 0

    ]);
  }
  public function UpdateMaterialAction(Request $request, Materials $material) {
    $request->validate([
      'material_name' => 'required|min:3|max:255|unique:materials,material_id,' . $material->material_id . ',material_id',
      'material_amount' => 'required|integer',
      'material_specifications' => 'required|min:110|max:255',
    ]);
    Materials::where('material_id', $material->material_id)->update([
      'material_name' => $request->input('material_name'),
      'material_amount' => $request->input('material_amount'),
      'material_specifications' => $request->input('material_specifications'),
    ]);
    session()->flash('msg', 'Material has been updated successfully!');
    session()->flash('msg_type', 'success');
    return to_route('stores.materials', $material->store);
  }

  // Delete Material
  public function DeleteMaterialView(Materials $material) {
    return inertia('Stores/DeleteMaterial/DeleteMaterial', [
      'material' => $material,
      'materials' => Materials::withTrashed()->where('store', $material->store)->get(),
      'lastMaterialID' => Materials::withTrashed()->orderBy('material_id', 'desc')->take(1)->get()->first()->material_id ?? 0
    ]);
  }
  public function DeleteMaterialAction(Request $request, Materials $material) {
    $material->delete();
    session()->flash('msg', 'Material has been deleted you can restore later!');
    session()->flash('msg_type', 'warning');
    return to_route('stores.materials', $material->store);
  }

  // Restore Material
  public function RestoreMaterialView($id) {
    $m = Materials::withTrashed()->where('material_id', $id)->get()->first();
    return inertia('Stores/RestoreMaterial/RestoreMaterial', [
      'material' => Materials::withTrashed()->where('material_id', $id)->get()->first(),
      'materials' => Materials::withTrashed()->where('store', $m->store)->get(),
      'lastMaterialID' => Materials::withTrashed()->orderBy('material_id', 'desc')->take(1)->get()->first()->material_id ?? 0
    ]);
  }
  public function RestoreMaterialAction(Request $request, $id) {
    $material = Materials::withTrashed()->where('material_id', $id)->get()->first();
    $material->restore();
    message('Material has been restored!');
    return to_route('stores.materials', $material->store);
  }

}

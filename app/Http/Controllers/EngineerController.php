<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserTimeline;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class EngineerController extends Controller {

  // Public Profile
  function PublicProfileView() {
    return inertia('Profile/Profile/Profile');
  }
  function PublicProfileAction(Request $request) {
    $request->validate([
      'username' => 'required|min:3|max:20|unique:users,id,' . auth()->id() . ',id',
      'title' => 'required|min:3|max:100',
      'name' => 'required|min:5|max:255'
    ]);
    User::where('id', auth()->id())->update([
      'username' => $request->input('username'),
      'title' => $request->input('title'),
      'name' => $request->input('name')
    ]);
    $user = auth()->user();
    saveEngineerActivity(
      title: 'Updating Personal Information',
      desc: "Changing username from '{$user->username}' to '{$request->input('username')}' & Job Title from '{$user->title}' to '{$request->input('title')}' & name from '{$user->name}' to '{$request->input('name')}'",
      icon: 'edit',
      type: 'Update',
      url: route('profile.main')
    );
    message('User data has been updated successfully!');
    return to_route('profile.main');
  }

  // Contact Information
  function ContactInformationView() {
    return inertia('Profile/Contact/ContactInformation');
  }
  function ContactInformationAction(Request $request) {
    $request->validate([
      'email' => 'required|max:255|unique:users,id,' . auth()->id() . ',id',
      'phone' => 'required|min:3|max:100'
    ]);
    User::where('id', auth()->id())->update([
      'email' => $request->input('email'),
      'phone' => $request->input('phone')
    ]);

    $user = auth()->user();

    saveEngineerActivity(
      title: 'Updating Contact Information',
      desc: "Changing email from '{$user->email}' to '{$request->input('email')}' & phone-number from '{$user->phone}' to '{$request->input('phone')}'",
      icon: 'edit',
      type: 'Update',
      url: route('profile.contact')
    );

    message('User data has been updated successfully!');
    return to_route('profile.contact');
  }

  // Password
  function PasswordView() {
    return inertia('Profile/Password/ChangePassword');
  }
  function PasswordAction(Request $request) {
    $request->validate([
      'old_password' => 'required',
      'new_password' => 'required|min:8|max:30|different:old_password'
    ]);

    $user = auth()->user();

    if (Hash::check($request->input('old_password'), $user->getAuthPassword())) {
      User::where('id', auth()->id())->update([
        'password' => Hash::make($request->input('new_password')),
      ]);
      saveEngineerActivity(
        title: 'Password Changed',
        desc: "New password has been assigned to this account!",
        icon: 'user-lock',
        type: 'Update',
        url: route('profile.password')
      );

      message('Password has been updated successfully!');
      return to_route('profile.password');
    } else {
      message('Entered Password does not match current password', 'error');
    }
  }

  // Contact Information
  function PictureView() {
    return inertia('Profile/Picture/ChangePicture');
  }
  function PictureAction(Request $request) {
    $request->validate([
      'image' => 'required|mimes:png,jpg,jpeg,svg',
    ]);

    $user = auth()->user();
    $image = $request->file('image');

    $image_name = uniqid() . '_' . $user->username . '_' . time() . '.' . $image->getClientOriginalExtension();
    $target = 'uploads/user-pictures/';

    $image->move($target, $image_name);

    User::where('id', auth()->id())->update([
      'image' => $target . $image_name,
    ]);
    saveEngineerActivity(
      title: 'Profile Picture Changed',
      desc: "Profile picture has been updated successfully!",
      icon: 'image',
      type: 'Update',
      url: route('profile.picture')
    );

    message('Profile Picture has been updated successfully!');
    return to_route('profile.picture');
  }

  // Profile Security
  function ProfileSecurityView() {
    return inertia('Profile/Security/Security');
  }
  function ProfileSecurityAction(Request $request) {

    $activate = $request->input('isActive');
    $password = $request->input('password');

    $request->validate([
      'password' => 'required'
    ]);

    if (Hash::check($password, auth()->user()->getAuthPassword())) {
      User::activateTwoFactor($activate);
      message($activate == 1 ? 'Two-factor authentication has been activated' : 'Two-factor authentication has been disabled');
    } else {
      message('Please enter your valid password', 'warning');
    }
    return to_route('profile.security');

    saveEngineerActivity(
      title: $activate == 1 ? 'Two-factor authentication activated' : 'Two-factor authentication disabled',
      desc: "Two-factor login security way has been activated!",
      icon: 'user-shield',
      type: 'Update',
      url: route('profile.security')
    );

    message('Profile Picture has been updated successfully!');
    return to_route('profile.picture');
  }

  // Export Data
  function ExportDataView() {
    return inertia('Profile/ExportData/ExportData', [
      'timeline' => UserTimeline::where('user', auth()->id())->get()
    ]);
  }

  // Change Theme
  function ChangeThemeView() {
    return inertia('Profile/Theme/ChangeTheme');
  }
  function ChangeThemeAction(Request $request) {
    $availableThemes = 'light,dark';
    $request->validate([ 'theme' => "required|in:{$availableThemes}" ]);
    User::changeUserTheme($request->input('theme'));
    message('Theme has been changed successfully!');
    $user = auth()->user();
    saveEngineerActivity(
      title: 'Theme changed to ' . $request->input('theme'),
      desc: "Theme has been changed from {$user->theme} to {$request->input('theme')}",
      icon: 'palette',
      type: 'Update',
      url: route('profile.theme')
    );
    return to_route('profile.theme');
  }

  // Change Theme
  function ChangeLanguageView() {
    return inertia('Profile/Language/ChangeLanguage');
  }
  function ChangeLanguageAction(Request $request) {
    $availableLanguages = 'arabic,english';
    $request->validate([ 'language' => "required|in:{$availableLanguages}" ]);
    User::changeUserLang($request->input('language'));
    message('Language has been changed successfully!');
    $user = auth()->user();
    saveEngineerActivity(
      title: 'Language changed to ' . $request->input('language'),
      desc: "Language has been changed from {$user->language} to {$request->input('language')}",
      icon: 'globe-africa',
      type: 'Update',
      url: route('profile.language')
    );
    return to_route('profile.language');
  }

  // View Timeline
  function EngineerTimeLine() {
    return inertia('Profile/Timeline/Timeline', [
      'timeline' => UserTimeline::where('user', auth()->id())->get()
    ]);
  }

  // Database Information
  function DatabaseView() {
    return inertia('Profile/Database/AppDatabase', [
      'dbName' => config('database.connections.mysql.database'),
      'dbHost' => config('database.connections.mysql.host'),
      'dbUsername' => config('database.connections.mysql.username'),
      'dbPort' => config('database.connections.mysql.port'),
      'dbConnection' => config('database.connections.mysql.driver'),
      'dbCharset' => config('database.connections.mysql.charset'),
      'countTabeles' => count(DB::select('SHOW TABLES')),
      'dbTables' => DB::select('SHOW TABLES')
    ]);
  }

  // Tables Information
  function TablesView() {
    return inertia('Profile/Tables/TablesView', [
      'dbName' => config('database.connections.mysql.database'),
      'countTabeles' => count(DB::select('SHOW TABLES')),
      'dbTables' => DB::select('SHOW TABLES')
    ]);
  }

  // View Table
  function ViewTable($table) {
    return inertia('Profile/Tables/ViewTableData', [
      'tableData' => DB::select('SHOW Columns from ' . $table),
      'tableName' => $table,
      'dbName' => config('database.connections.mysql.database'),
      'countTables' => count(DB::select('SHOW TABLES')),
      'tableInnerDataCount' => count(DB::select("SELECT * from " . $table)),
    ]);
  }

  // Actions

  # List
  function Engineers() {
    return inertia('Engineers/List/ListEngineers', [
      'engineers' => User::withTrashed()->where('id', '!=', auth()->id())->orderBy('id', 'desc')->get()
    ]);
  }

  # Add
  function AddEngineerView() {
    return inertia('Engineers/Add/AddEngineer', [
      'engineers' => User::where('id', '!=', auth()->id())->orderBy('id', 'desc')->get()
    ]);
  }
  function AddEngineerAction(Request $request) {
    $request->validate([
      'name' => 'required',
      'username' => 'required|unique:users|min:2',
      'email' => 'required|email|unique:users',
      'password' => 'required|min:8|max:50',
      'phone' => 'required|regex:/^01[0125][0-9]{8}$/u',
      'title' => 'required',
      'admin_role' => 'required',
      'theme' => 'required|in:light,dark',
      'language' => 'required|in:arabic,english',
      'allow_two_factor' => 'in:0,1',
    ]);

    $image = '';

    if ($request->hasFile('image')) {
      $imageTarget = 'uploads/user-pictures/';
      $image       = $request->file('image');
      $imageName   = uniqid() . '_' . $request->input('username') . '.' . $image->getClientOriginalExtension();
      $image->move($imageTarget, $imageName);
    }

    User::create([
      'name' => $request->input('name'),
      'username' => $request->input('username'),
      'email' => $request->input('email'),
      'password' => Hash::make($request->input('password')),
      'phone' => $request->input('phone'),
      'image' => $image != '' ? $imageTarget . $imageName : 'images/defaults/user.svg',
      'title' => $request->input('title'),
      'is_admin' => $request->input('admin_role'),
      'theme' => $request->input('theme'),
      'language' => $request->input('language'),
      'allow_two_factor' => $request->input('allow_two_factor'),
      'security_code' => Str::random(8)
    ]);

    message('Engineer has created successfully!');
    return to_route('engineers.list');

  }

  # Update
  function UpdateEngineerView(User $engineer) {
    return inertia('Engineers/Update/UpdateEngineer', [
      'engineers' => User::where('id', '!=', auth()->id())->orderBy('id', 'desc')->get(),
      'engineer' => $engineer
    ]);
  }
  function UpdateEngineerAction(Request $request, User $engineer) {
    $request->validate([
      'name' => 'required',
      'username' => 'required|min:4|unique:users,id,' . auth()->id() . ',id',
      'email' => 'required|email|unique:users,id,' . auth()->id() . ',id',
      'phone' => 'required|regex:/^01[0125][0-9]{8}$/u',
      'title' => 'required',
      'admin_role' => 'required',
      'theme' => 'required|in:light,dark',
      'language' => 'required|in:arabic,english',
      'allow_two_factor' => 'in:0,1',
    ]);
    User::where('id', $engineer->id)->update([
      'name'      => $request->input('name'),
      'username'  => $request->input('username'),
      'email'     => $request->input('email'),
      'phone'     => $request->input('phone'),
      'title'     => $request->input('title'),
      'is_admin'  => $request->input('admin_role'),
      'theme'     => $request->input('theme'),
      'language'  => $request->input('language'),
      'allow_two_factor' => $request->input('allow_two_factor'),
      'security_code' => Str::random(8)
    ]);

    message('Engineer has been updated successfully!');
    return to_route('engineers.list');

  }

  # Delete
  function DeleteEngineerView(User $engineer) {
    return inertia('Engineers/Delete/DeleteEngineer', [
      'engineers' => User::where('id', '!=', auth()->id())->orderBy('id', 'desc')->get(),
      'engineer' => $engineer
    ]);
  }
  function DeleteEngineerAction(Request $request, User $engineer) {
    $engineer->delete();
    message('Engineer has been deleted', 'warning');
    return to_route('engineers.list');
  }

  # Restore
  function RestoreEngineerView($id) {
    $engineer = User::withTrashed()->find($id);
    return inertia('Engineers/Restore/RestoreEngineer', [
      'engineers' => User::where('id', '!=', auth()->id())->orderBy('id', 'desc')->get(),
      'engineer' => $engineer
    ]);
  }
  function RestoreEngineerAction(Request $request, $id) {
    $engineer = User::withTrashed()->find($id);
    $engineer->restore();
    message('Engineer has been restored');
    return to_route('engineers.list');
  }

  # Restore selected
  function RestoreSelected(Request $request) {
    foreach ($request->selected as $selected) {
      $engs = User::withTrashed()->where('id', $selected)->get()->first()->restore();
      session()->flash('msg', 'Selected Engineers has been restored successfully!');
      session()->flash('msg_type', 'success');
    }
    return to_route('engineers.list');
  }

  # Delete selected
  function DeleteSelected(Request $request) {
    foreach ($request->selected as $selected) {
      $engs = User::where('id', $selected)->get()->first()->delete();
      session()->flash('msg', 'Selected engineers has been deleted! successfully!');
      session()->flash('msg_type', 'warning');
    }
    return to_route('engineers.list');
  }
}

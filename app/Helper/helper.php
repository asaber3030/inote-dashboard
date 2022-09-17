<?php

use Illuminate\Http\RedirectResponse;

  function message(string $msg, string $type = 'success'): void {
    session()->flash('msg', $msg);
    session()->flash('msg_type', $type);
  }

  function saveEngineerActivity($title, $desc, $icon, $url, $type) {
    return \App\Models\User::saveActivity($title, $desc, $icon, $url, $type);
  }

  function userLanguage() {
    return auth()->user()->language;
  }

  function userTheme() {
    return auth()->user()->theme;
  }

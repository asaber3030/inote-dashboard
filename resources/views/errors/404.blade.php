<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
  <title>404 Not Found</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">

  <style>
    * {
      padding: 0;
      margin: 0;
      font-family: 'Inter', sans-serif;
    }
    body {
      background-color: #e5e5e5;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .error-container {
      margin-top: 100px;
      display: flex;
      align-items: center;
      gap: 100px
    }
    img {
      width: 600px;
      height: 600px;
    }
    .right {
      text-align: center;
    }
    h1 {
      font-size: 150px;
      color: #5c0606;
      text-shadow: 0 2px 3px #ddd;
      display: flex;
      align-items: center;
      gap: 15px;
      justify-content: center;
    }
    span {
      font-size: 40px;
      font-weight: 400;
    }
    p {
      color: gray;
    }
    a {
      text-decoration: none;
      border: 1px solid #ddd;
      border-radius: 5px;
      margin: 25px 0;
      padding: 10px 15px;
      cursor: pointer;
      background-color: #1da1f2;
      color: #FFF;
      display: block;
      width: fit-content;
      margin: 15px auto;
    }
  </style>

</head>
<body>
  <div class="error-container">
    <div class="left">
      <img src="{{ asset('images/404.svg') }}" alt="">
    </div>
    <div class="right">
      <h1 class="heading">404 <span>ERROR</span></h1>
      <p>The Requested URL <b>"{{ request()->url() }}"</b> is not found</p>
      @auth
        <a href="{{ route('dashboard') }}">Dashboard</a>
      @endauth
    </div>
  </div>
</body>
</html>

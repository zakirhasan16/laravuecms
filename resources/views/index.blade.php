<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>E-Kurs Merkezi Yönetim Paneli</title>
    <link rel="stylesheet" href="{{asset('css/frontend/app.css')}}">

</head>
<body>
    <div id="app"></div>

    <script src="{{ asset('js/frontend/app.js') }}"></script>
</body>
</html>

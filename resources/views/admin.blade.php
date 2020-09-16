<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Laravel Vue Basic CMS</title>

        <script>
            var redirectToPage = "{{$redirect}}";
        </script>
        <link rel="stylesheet" href="{{asset('css/admin/app.css')}}">
    </head>
    <body>
        <div id="app"></div>

        <script src="{{asset('js/admin/app.js')}}"></script>
    </body>
</html>

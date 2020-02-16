<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" href="{{ asset('/css/font.css') }}">

        <title>فرم</title>
        <style>
            body,html{
                padding: 0;
                margin: 0;
            }
        </style>
    </head>
    <body style="background-color: #160031;font-family: 'IRANSans' !important" dir="rtl">
        <div id="app"></div>
        <script src="{{ asset('/js/app.js') }}"></script>
    </body>
</html>

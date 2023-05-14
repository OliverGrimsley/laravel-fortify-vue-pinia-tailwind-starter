<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="_token" content="{{ csrf_token() }}">
    <title>Your name here site</title>
    <link rel="icon" href="/favicon.png" />
    @routes
    @vite(['resources/js/app.ts'])

</head>

<body>
    <div id="app" class="dark:bg-gray-800 mx-auto">
        <flash></flash>
        <router-view></router-view>
    </div>
</body>

</html>
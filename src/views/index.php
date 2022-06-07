<?php
$postfix = time();
$lang = $blog['config']['lang'];
$baseUrl = $blog['config']['baseUrl'];
?>
<!doctype html>
<html lang="<?=$lang?>">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />

    <title>Pointless Editor</title>

    <link rel="stylesheet" href="<?=$baseUrl?>assets/styles/editor.min.css?<?=$postfix?>" />
    <script src="<?=$baseUrl?>assets/scripts/editor.min.js?<?=$postfix?>" async></script>
</head>
<body>
    <div id="pe-root"></div>
</body>
</html>
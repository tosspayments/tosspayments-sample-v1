<?php
$message = $_GET['message'];
$code = $_GET['code'];
?>

<!DOCTYPE html>
<html lang="ko">
<head>
    <title>결제 실패</title>
    <meta http-equiv="x-ua-compatible" content="ie=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
</head>
<body>
<section>
    <h1>결제 실패</h1>
    <p><?php echo htmlspecialchars($message ?? '', ENT_QUOTES, 'UTF-8') ?></p>
    <span>에러코드: <?php echo htmlspecialchars($code ?? '', ENT_QUOTES, 'UTF-8') ?></span>
</section>
</body>
</html>





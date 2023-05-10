<?php
$message = $_GET['message'];
$code = $_GET['code'];
?>

<!DOCTYPE html>
<html lang="kr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>토스페이먼츠 샘플페이지-결제실패</title>
</head>

<body>
    <div>
        <h2 style="margin-top:10px; padding:20px 0px 10px 0px">
            <img width="45px" src="https://static.toss.im/3d-emojis/u1F975-apng.png">
            결제 실패
        </h2>
        <div>
            <p>에러메세지: <?php echo $message ?></p>
            <p>에러코드: <?php echo $code ?></p>
        </div>
    </div>
</body>

</html>
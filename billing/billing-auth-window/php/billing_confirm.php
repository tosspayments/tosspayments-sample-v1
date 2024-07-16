<?php

$customerKey = $_GET['customerKey'];
$authKey = $_GET['authKey'];


$secretKey = 'test_sk_jZ61JOxRQVENaNGNeJmrW0X9bAqw'; 

$url = 'https://api.tosspayments.com/v1/billing/authorizations/issue';

$data = ['authKey' => $authKey, 'customerKey' => $customerKey];

$credential = base64_encode($secretKey . ':');

$curlHandle = curl_init($url);

curl_setopt_array($curlHandle, [
    CURLOPT_POST => TRUE,
    CURLOPT_RETURNTRANSFER => TRUE,
    CURLOPT_HTTPHEADER => [
        'Authorization: Basic ' . $credential,
        'Content-Type: application/json'
    ],
    CURLOPT_POSTFIELDS => json_encode($data)
]);

$response = curl_exec($curlHandle);

$httpCode = curl_getinfo($curlHandle, CURLINFO_HTTP_CODE);
$isSuccess = $httpCode == 200;
$responseJson = json_decode($response);

?>

<!DOCTYPE html>
<html lang="ko">
<head>
    <title>빌링키 발급</title>
    <meta http-equiv="x-ua-compatible" content="ie=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
</head>
<body>
<section>
    <?php
    if ($isSuccess) { ?>
        <h1>빌링키 발급 성공</h1>
        <p>결과 데이터: <?php echo json_encode($responseJson, JSON_UNESCAPED_UNICODE); ?></p>
        <p>billingKey : <?php echo $responseJson->billingKey ?></p>
        <p>cardCompany : <?php echo $responseJson->cardCompany ?></p>
        <p>cardNumber : <?php echo $responseJson->cardNumber ?></p>
        <?php
    } else { ?>
        <h1>빌링키 발급 실패</h1>
        <p><?php echo $responseJson->message ?></p>
        <span>에러코드: <?php echo $responseJson->code ?></span>
        <?php
    }
    ?>

</section>
</body>
</html>

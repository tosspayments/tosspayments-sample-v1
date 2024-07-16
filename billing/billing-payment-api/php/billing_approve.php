<?php
error_reporting(E_ALL);
ini_set("display_errors", true);


$billingKey = "";
$customerKey = "test_customer_key";

$orderId = "billing-" . time()*1000;
$amount = 50000;
$customerEmail = "customer@email.com";
$customerName = "박토스";
$orderName = "토스 정기 결제";

$secretKey = 'test_ak_ZORzdMaqN3wQd5k6ygr5AkYXQGwy'; 

$url = 'https://api.tosspayments.com/v1/billing/' . $billingKey;

$data = ['orderId' => $orderId, 'amount' => $amount, 'customerKey' => $customerKey, 'customerEmail' => $customerEmail, 'customerName' => $customerName, 'orderName' => $orderName];

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
    <title>결제 성공</title>
    <meta http-equiv="x-ua-compatible" content="ie=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
</head>
<body>
<section>
    <?php
    if ($isSuccess) { ?>
        <h1>결제 성공</h1>
        <p>결과 데이터 : <?php echo json_encode($responseJson, JSON_UNESCAPED_UNICODE); ?></p>
        <p>orderName : <?php echo $responseJson->orderName ?></p>
        <p>method : <?php echo $responseJson->method ?></p>
        <p>card -> number : <?php echo $responseJson->card->number ?></p>
              
        <?php
    } else { ?>
        <h1>결제 실패</h1>
        <p>에러메시지 : <?php echo $responseJson->message ?></p>
        <span>에러코드: <?php echo $responseJson->code ?></span>
        <?php
    }
    ?>

</section>
</body>
</html>

<?php
error_reporting(E_ALL);
// 개발할 때만 화면에 오류를 보여 줘요(APP_DEBUG=true). 운영 환경에서는 끄세요.
ini_set("display_errors", getenv("APP_DEBUG") === "true" ? "1" : "0");


$paymentKey = $_GET['paymentKey'];
$orderId = $_GET['orderId'];
$amount = $_GET['amount'];

$secretKey = '{SECRET_KEY}'; 

// TODO: 결제를 요청하기 전에 orderId, amount를 서버에 저장하고, 승인하기 전에 저장한 값과 비교하세요.
// 값이 다르면 결제 승인 API를 호출하지 말고 실패로 처리해요.
// 예시)
// $savedAmount = findAmountByOrderId($orderId); // 결제 요청 전에 서버에 저장한 금액
// if ($savedAmount === null || (int) $savedAmount !== (int) $amount) {
//     http_response_code(400);
//     echo '결제 금액이 주문 금액과 달라요.';
//     exit;
// }
$url = 'https://api.tosspayments.com/v1/payments/confirm';

$data = ['paymentKey' => $paymentKey, 'orderId' => $orderId, 'amount' => $amount];

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
        <p>결과 데이터 : <?php echo htmlspecialchars(json_encode(array_intersect_key((array) $responseJson, array_flip(['paymentKey', 'orderId', 'orderName', 'status', 'method', 'totalAmount', 'approvedAt'])), JSON_UNESCAPED_UNICODE), ENT_QUOTES, 'UTF-8'); ?></p>
        <p>orderName : <?php echo htmlspecialchars((string) ($responseJson->orderName ?? ''), ENT_QUOTES, 'UTF-8') ?></p>
        <p>method : <?php echo htmlspecialchars((string) ($responseJson->method ?? ''), ENT_QUOTES, 'UTF-8') ?></p>
        <p>
           easyPay : <?php echo htmlspecialchars((string) ($responseJson->easyPay->provider ?? ''), ENT_QUOTES, 'UTF-8') ?>
        </p>
        <?php
    } else { ?>
        <h1>결제 실패</h1>
        <p>에러메시지 : <?php echo htmlspecialchars((string) ($responseJson->message ?? ''), ENT_QUOTES, 'UTF-8') ?></p>
        <span>에러코드: <?php echo htmlspecialchars((string) ($responseJson->code ?? ''), ENT_QUOTES, 'UTF-8') ?></span>
        <?php
    }
    ?>

</section>
</body>
</html>

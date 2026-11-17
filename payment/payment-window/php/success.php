<!-- 토스페이먼츠 결제 샘플 소스코드 -->
<?php
error_reporting(E_ALL);
// 개발할 때만 화면에 오류를 보여 줘요(APP_DEBUG=true). 운영 환경에서는 끄세요.
ini_set("display_errors", getenv("APP_DEBUG") === "true" ? "1" : "0");

$paymentKey = $_GET['paymentKey'];
$orderId = $_GET['orderId'];
$amount = $_GET['amount'];

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

$secretKey = '{SECRET_KEY}'; 
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
<html lang="kr">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>토스페이먼츠 샘플페이지-결제결과</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
  <style>
    @import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);
    body {font-family: 'Noto Sans KR', sans-serif;} 
    .box_section { background-color: white; border-radius: 10px; box-shadow: 0 10px 20px rgb(0 0 0 / 1%), 0 6px 6px rgb(0 0 0 / 6%); margin-top: 30px; padding: 20px}
  </style>
</head>

<body class="bg-light">
  <div class="container">
    <div class="row">
      <div class="col-md-3"></div>

      <div class="col-md-6">
        <!-- 결제 성공 시 -->
        <?php if ($isSuccess) { ?>
        <h2 style="margin-top:10px;  padding:20px 0px 10px 0px">
          <img width="45px" src="https://static.toss.im/3d-emojis/u1F911-apng.png">
          결제 성공
        </h2>

        <div class="box_section">
          <div class="card-body">
            <div class="gray">
              <p>상품명 : <?php echo htmlspecialchars((string) ($responseJson->orderName ?? ''), ENT_QUOTES, 'UTF-8') ?></p>
              <p>결제수단 : <?php echo htmlspecialchars((string) ($responseJson->method ?? ''), ENT_QUOTES, 'UTF-8') ?> (
                <?php if($responseJson->method === "카드") { echo htmlspecialchars((string) ($responseJson->card->number ?? ''), ENT_QUOTES, 'UTF-8');} ?>
                <?php if($responseJson->method === "가상계좌") { echo htmlspecialchars((string) ($responseJson->virtualAccount->accountNumber ?? ''), ENT_QUOTES, 'UTF-8');} ?>
                <?php if($responseJson->method === "계좌이체") { echo htmlspecialchars((string) ($responseJson->transfer->bank ?? ''), ENT_QUOTES, 'UTF-8');} ?>
                <?php if($responseJson->method === "휴대폰") { echo htmlspecialchars((string) ($responseJson->mobilePhone->customerMobilePhone ?? ''), ENT_QUOTES, 'UTF-8');} ?>
                )</p>
            </div>
          </div>
        </div> 

        <div class="box_section">
          <div class="card-body">
            <div class="gray">
              <b>Response Data :</b>
              <pre>
                <?php echo htmlspecialchars(json_encode(array_intersect_key((array) $responseJson, array_flip(['paymentKey', 'orderId', 'orderName', 'status', 'method', 'totalAmount', 'approvedAt'])), JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE), ENT_QUOTES, 'UTF-8'); ?>
              </pre>
            </div>
          </div> 
        </div>

        <!-- 결제 실패 시 -->
        <?php }else{ ?>

        <h2 style="margin-top:10px; padding:20px 0px 10px 0px">
          <img width="45px" src="https://static.toss.im/3d-emojis/u1F975-apng.png">
          결제 실패
        </h2>

        <div id="info" class="box_section">
          <div class="card-body">
            <div class="gray">
              <p>에러메시지 : <?php echo htmlspecialchars((string) ($responseJson->message ?? ''), ENT_QUOTES, 'UTF-8') ?></p>
              <p>에러코드: <?php echo htmlspecialchars((string) ($responseJson->code ?? ''), ENT_QUOTES, 'UTF-8') ?></p>
            </div>
          </div>
        </div>
        
        <?php } ?>

        <div class="col-md-3"></div>
      </div>
    </div>
</body>

</html>

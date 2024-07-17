<!-- 토스페이먼츠 결제 샘플 소스코드 -->
<?php
error_reporting(E_ALL);
ini_set("display_errors", true);

$paymentKey = $_GET['paymentKey'];
$orderId = $_GET['orderId'];
$amount = $_GET['amount'];

$url = 'https://api.tosspayments.com/v1/payments/confirm';
$data = ['paymentKey' => $paymentKey, 'orderId' => $orderId, 'amount' => $amount];

$secretKey = 'test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R'; 
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
              <p>상품명 : <?php echo $responseJson->orderName ?></p>
              <p>결제수단 : <?php echo $responseJson->method ?> (
                <?php if($responseJson->method === "카드") { echo $responseJson->card->number;} ?>
                <?php if($responseJson->method === "가상계좌") { echo $responseJson->virtualAccount->accountNumber;} ?>
                <?php if($responseJson->method === "계좌이체") { echo $responseJson->transfer->bank;} ?>
                <?php if($responseJson->method === "휴대폰") { echo $responseJson->mobilePhone->customerMobilePhone;} ?>
                )</p>
            </div>
          </div>
        </div> 

        <div class="box_section">
          <div class="card-body">
            <div class="gray">
              <b>Response Data :</b>
              <pre>
                <?php echo trim(json_encode($responseJson,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE)); ?>
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
              <p>에러메시지 : <?php echo $responseJson->message ?></p>
              <p>에러코드: <?php echo $responseJson->code ?></p>
            </div>
          </div>
        </div>
        
        <?php } ?>

        <div class="col-md-3"></div>
      </div>
    </div>
</body>

</html>

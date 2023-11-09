<?php
error_reporting(E_ALL);
ini_set("display_errors", true);

$paymentKey = $_GET['paymentKey'];
$orderId = $_GET['orderId'];
$amount = $_GET['amount'];

$url = 'https://api.tosspayments.com/v1/payments/confirm';
$data = ['paymentKey' => $paymentKey, 'orderId' => $orderId, 'amount' => $amount];

// TODO: 개발자센터에 로그인해서 내 결제위젯 연동 키 > 시크릿 키를 입력하세요. 시크릿 키는 외부에 공개되면 안돼요.
// @docs https://docs.tosspayments.com/reference/using-api/api-keys
$secretKey = 'test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6';

// 토스페이먼츠 API는 시크릿 키를 사용자 ID로 사용하고, 비밀번호는 사용하지 않습니다.
// 비밀번호가 없다는 것을 알리기 위해 시크릿 키 뒤에 콜론을 추가합니다.
// @docs https://docs.tosspayments.com/reference/using-api/authorization#%EC%9D%B8%EC%A6%9D
$credential = base64_encode($secretKey . ':');

// ------ 결제 승인 API 호출 ------
// @docs https://docs.tosspayments.com/guides/payment-widget/integration#3-결제-승인하기
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
    <meta charset="utf-8" />
    <link rel="icon" href="https://static.toss.im/icons/png/4x/icon-toss-logo.png" />
    <link rel="stylesheet" type="text/css" href="./public/style.css" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>토스페이먼츠 샘플 프로젝트</title>
</head>

<body>
    <div>
        <div>
            <!-- 결제 성공 시 -->
            <?php if ($isSuccess) { ?>
                <div class="result wrapper">
                  <div class="box_section">  

                    <h2 style="padding: 20px 0px 10px 0px">
                        <img
                            width="35px"
                            src="https://static.toss.im/3d-emojis/u1F389_apng.png"
                        />
                        결제 성공
                    </h2>

                    <p> paymentKey = <?php echo $responseJson->paymentKey ?></p>
                    <p> orderId = <?php echo $responseJson->orderId ?></p>
                    <p> amount = <?php echo $responseJson->totalAmount ?></p>
                    <div class="result wrapper">
                        <button class="button" onclick="location.href='https://docs.tosspayments.com/guides/payment-widget/integration';"
                        style="margin-top:30px; ">연동 문서</button>
                        <button class="button" onclick="location.href='https://discord.gg/A4fRFXQhRu';"
                        style="margin-top:30px;background-color: #e8f3ff;color:#1b64da ">실시간 문의</button>
                    </div>   

                </div>
            </div>

                </div>

            <!-- 결제 실패 시 -->
            <?php } else { ?>

                <div class="result wrapper">
                    <div class="box_section">  
                        <h2 style="padding: 20px 0px 10px 0px">
                        <img
                            width="25px"
                            src="https://static.toss.im/3d-emojis/u1F6A8-apng.png"
                        />
                        결제 실패
                        </h2>
                        <p>code = <?php echo $responseJson->message ?></p>
                        <p>message = <?php echo $responseJson->code ?></p>
                        <div class="result wrapper">
                        <button class="button" onclick="location.href='https://docs.tosspayments.com/guides/payment-widget/integration';"
                        style="margin-top:30px; ">연동 문서</button>
                        <button class="button" onclick="location.href='https://discord.gg/A4fRFXQhRu';"
                        style="margin-top:30px;background-color: #e8f3ff;color:#1b64da ">실시간 문의</button>
                        </div>   
                    </div>
                    </div>

            <?php } ?>
        </div>
</body>

</html>
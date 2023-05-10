<?php
error_reporting(E_ALL);
ini_set("display_errors", true);

$paymentKey = $_GET['paymentKey'];
$orderId = $_GET['orderId'];
$amount = $_GET['amount'];

$url = 'https://api.tosspayments.com/v1/payments/confirm';
$data = ['paymentKey' => $paymentKey, 'orderId' => $orderId, 'amount' => $amount];

$secretKey = 'test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R';


/**
 * 토스페이먼츠 API는 시크릿 키를 사용자 ID로 사용하고, 비밀번호는 사용하지 않습니다.
 * 비밀번호가 없다는 것을 알리기 위해 시크릿 키 뒤에 콜론을 추가합니다.
 * @see https://docs.tosspayments.com/reference/using-api/authorization#%EC%9D%B8%EC%A6%9D
 */
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
</head>

<body>
    <div>
        <div>
            <!-- 결제 성공 시 -->
            <?php if ($isSuccess) { ?>
                <h2 style="margin-top:10px; padding:20px 0px 10px 0px">
                    <img width="45px" src="https://static.toss.im/3d-emojis/u1F911-apng.png">
                    결제 성공
                </h2>

                <p>상품명 : <?php echo $responseJson->orderName ?></p>
                <p>결제수단 : <?php echo $responseJson->method ?> (
                    <?php if ($responseJson->method === "카드") {
                        echo $responseJson->card->number;
                    } ?>
                    <?php if ($responseJson->method === "가상계좌") {
                        echo $responseJson->virtualAccount->accountNumber;
                    } ?>
                    <?php if ($responseJson->method === "계좌이체") {
                        echo $responseJson->transfer->bank;
                    } ?>
                    <?php if ($responseJson->method === "휴대폰") {
                        echo $responseJson->mobilePhone->customerMobilePhone;
                    } ?>
                    )</p>

                <div>
                    <b>Response Data :</b>
                    <pre>
            <?php echo trim(json_encode($responseJson, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)); ?>
          </pre>
                </div>

                <!-- 결제 실패 시 -->
            <?php } else { ?>

                <h2 style="margin-top:10px; padding:20px 0px 10px 0px">
                    <img width="45px" src="https://static.toss.im/3d-emojis/u1F975-apng.png">
                    결제 실패
                </h2>

                <div id="info">
                    <div>
                        <div>
                            <p>에러메시지 : <?php echo $responseJson->message ?></p>
                            <p>에러코드: <?php echo $responseJson->code ?></p>
                        </div>
                    </div>
                </div>

            <?php } ?>
        </div>
</body>

</html>
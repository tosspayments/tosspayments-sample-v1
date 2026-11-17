<?php
header('Content-Type: text/plain; charset=utf-8');
include_once './var.php';
$credential = base64_encode($secretKey . ':');


$code = $_GET['code'];
$customerKey = $_GET['customerKey'];
// TODO: 요청으로 받은 customerKey 가 로그인한 구매자의 것인지 확인하세요.

$curl = curl_init();

$data = ['grantType' => 'AuthorizationCode', 'code' => $code, 'customerKey'=>$customerKey];

curl_setopt_array($curl, [
  CURLOPT_URL => "https://api.tosspayments.com/v1/brandpay/authorizations/access-token",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => json_encode($data),
  CURLOPT_HTTPHEADER => [
    "Authorization: Basic ".$credential,
    "Content-Type: application/json"
  ],
]);

$response = curl_exec($curl);
$statusCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

// TODO: 발급받은 Access Token 은 서버에 저장하고, 브라우저에는 결과만 알려 주세요.
if ($statusCode === 0) {
    $statusCode = 500;
} elseif ($statusCode < 400) {
    $statusCode = 200;
}
http_response_code($statusCode);
echo $statusCode === 200 ? 'OK' : 'FAIL';
?>

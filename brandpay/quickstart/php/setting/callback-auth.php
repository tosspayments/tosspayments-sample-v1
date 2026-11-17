<?php
header('Content-Type: application/json');
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
echo $response;
?>

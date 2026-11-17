<?php
include_once './setting/var.php';

$data = file_get_contents("php://input");
$jsonData = json_decode($data, true);
$paymentKey = $jsonData['paymentKey'];
$orderId = $jsonData['orderId'];
$amount = $jsonData['amount'];
$customerKey = $jsonData['customerKey'];
// TODO: 요청으로 받은 customerKey 가 로그인한 구매자의 것인지 확인하세요.
// TODO: 결제를 요청하기 전에 orderId, amount를 서버에 저장하고, 승인하기 전에 저장한 값과 비교하세요.
// 값이 다르면 결제 승인 API를 호출하지 말고 실패로 처리해요.
// 예시)
// $savedAmount = findAmountByOrderId($orderId); // 결제 요청 전에 서버에 저장한 금액
// if ($savedAmount === null || (int) $savedAmount !== (int) $amount) {
//     http_response_code(400);
//     echo json_encode(['code' => 'INVALID_AMOUNT', 'message' => '결제 금액이 주문 금액과 달라요.']);
//     exit;
// }
$credential = base64_encode($secretKey . ':');

$url = 'https://api.tosspayments.com/v1/brandpay/payments/confirm';
$data = ['orderId' => $orderId, 'amount' => $amount, 'paymentKey'=>$paymentKey,'customerKey'=>$customerKey];


$curl = curl_init($url);
curl_setopt_array($curl, [
  CURLOPT_POST => TRUE,
  CURLOPT_RETURNTRANSFER => TRUE,
  CURLOPT_HTTPHEADER => [
      'Authorization: Basic ' . $credential,
      'Content-Type: application/json',
  ],
  CURLOPT_POSTFIELDS => json_encode($data)
]);

$response = curl_exec($curl);
$err = curl_error($curl);

echo $response; 
?>